---
title: Vue3系列讲解-8
date: 2020-10-09
tags:
 - Vue
 - 原理
 - Vue3
categories: 
 -  Vue
---

:::tip Abstract
1. Vue3相关新增和底层
2. `effect`
3. `toRef` 和 `toRefs`
:::

<!-- more -->

## watchEffect

`watchEffect` 的作用是在响应式数据发生变化的时候产生对应的副作用。

例如

```vue
<template>
<div>
  <p>{{obj.foo}}</p>
  <button @click="inc">button</button>
</div>
</template>

<script>
import { reactive, watchEffect } from 'vue';
export default {
  name: 'App',
  setup() {
    let obj = reactive({
      foo: 1
    }); // obj 是响应式数据

    watchEffect(() => {
      console.log(obj.foo);
    }) // 跟踪依赖数据 （obj.foo）

    function inc() {
      obj.foo += 1;
    }

    return {
      obj,
      inc
    };
  }
}
</script>
```

![0UWGkQ.png](https://s1.ax1x.com/2020/10/06/0UWGkQ.png)

![0UW10S.png](https://s1.ax1x.com/2020/10/06/0UW10S.png)

可以看到，每次 `obj.foo` 变化的时候都会触发 `watchEffect` 中定义的函数

值得注意的是，如果跟踪的依赖数据不会向下延伸，例如

```javascript
watchEffect(() => {
  console.log(obj);
}) // 跟踪依赖数据 （obj）
```

我们将追踪的依赖从 `obj.foo` 改为 `obj` ，那么当 `obj.foo` 变化时，将不会引起 `watchEffect` 反应。

![0UWlm8.png](https://s1.ax1x.com/2020/10/06/0UWlm8.png)

## toRef

有的时候，我们会存在追踪数据。

例如

```vue
<template>
<div>
  <p>{{obj.foo}}</p>
  <button @click="inc">button</button>
</div>
</template>

<script>
import { reactive, watchEffect } from 'vue';
export default {
  name: 'App',
  setup() {
    let obj = reactive({
      foo: 1
    }); // obj 是响应式数据

    let trackObj = {
      foo: obj.foo
    };

    watchEffect(() => {
      console.log('obj.foo =', obj.foo);
      console.log('trackObj.foo' ,trackObj.foo);
    })

    function inc() {
      obj.foo += 1;
    }

    return {
      obj,
      inc
    };
  }
}
</script>
```

这里 `trackObj` 的 `foo` 属性渴望追踪 `obj` 的 `foo` ，实现同步变化，这段代码并不能实现。

![0BGka6.png](https://s1.ax1x.com/2020/10/09/0BGka6.png)

其中缘由无需我赘述，大家很容易想到，问题是如何去实现这种追踪变化。

实现响应式绑定，最简单的方案应该是我们之前一直使用的 `ref` 和 `reactive` 。

我们可以这样做：

```javascript
let trackObj = {
  foo: ref(obj.foo)
};
```

![0BGPq1.png](https://s1.ax1x.com/2020/10/09/0BGPq1.png)

仍然无法实现。

`toRef` 能将一个目标转化成 `类Ref` 类型。

```javascript
let trackObj = {
  foo: toRef(obj.foo)
};
```

![0BGAIK.png](https://s1.ax1x.com/2020/10/09/0BGAIK.png)

那么，`toRef` 和 `ref` 又有什么区别呢？

首先，`toRef` 不会引起 视图层 的变化。

```vue
<template>
<div>
  <p>{{obj.foo}}</p>
  <p class="track">{{trackObj.foo.value}}</p>
  <button @click="inc">button</button>
</div>
</template>

<script>
import { reactive, toRef, watchEffect } from 'vue';
export default {
  name: 'App',
  setup() {
    let obj = {
      foo: 1
    }
    // obj 不是响应式数据

    let trackObj = {
      foo: toRef(obj, 'foo')
    };

    watchEffect(() => {
      console.log('obj.foo =', obj.foo);
      console.log('trackObj.foo' ,trackObj);
    })

    function inc() {
      obj.foo += 1;
      console.log('obj.foo =', obj.foo);
      console.log('trackObj.foo =', trackObj.foo);
    }

    return {
      obj,
      trackObj,
      inc
    };
  }
}
</script>
```

这里我们将 `obj` 设置成了非响应式数据，因此现在整个项目中之后 `trackObj` 的 `foo` 是响应式的数据。为了检测 `obj` 和 `trackObj` 的变化，我们在 点击 事件上新增了两个控制台的打印。

![0BGCrR.png](https://s1.ax1x.com/2020/10/09/0BGCrR.png)

可以发现， `obj.foo` 和 `trackObj.foo` 都是有变化的，但是视图层并未检测这种变化，而且 `watchEffect` 函数也没有检测到这些变化。

### 总结

`ref` 和 `toRef` 的区别

1. `ref` 是单纯的复制，修改响应式数据相互影响。
2. `toRef` 是引用，修改响应式数据会影响以前的数据。
3. `ref` 数据会引起监听行为，而 `toRef` 不会。

如果想让响应式数据和以前的数据关联起来，并且更新响应式数据之后还不想更新 UI ，那么就可以使用 `toRef`。

## toRefs

为了将多个数据都设置监听，或者对整个对象的所有数据发起监听，`vue3` 提供了便利的 API `toRefs` 。

```vue
<template>
<div>
  <p>{{obj.foo}}</p>
  <button @click="inc">button</button>
</div>
</template>

<script>
import { toRefs, watchEffect } from 'vue';
export default {
  name: 'App',
  setup() {
    let obj = {
      foo: 1,
      attr: 2,
      item: 3
    };

    let trackObj = toRefs(obj);

    watchEffect(() => {
      console.log('obj.foo =', obj);
      console.log('trackObj.foo' ,trackObj);
    })

    function inc() {
      Object.keys(obj).forEach(function(key){
        obj[key] += 1;
      });
      console.log(obj);
      console.log(trackObj);
    }

    return {
      obj,
      inc
    };
  }
}
</script>
```

![0BGmxH.png](https://s1.ax1x.com/2020/10/09/0BGmxH.png)

你会发现 `toRefs` 和 `toRef` ，都会通过 `_object` 引用源数据的值来实现对源数据的追踪。

由于 `toRef` 和 `toRefs` 都会将目标转化成 `类ref` 对象，所以修改内容的时候需要访问 `value` 值。

```vue
<template>
<div>
  <p>{{obj.foo}}</p>
  <button @click="inc">button</button>
</div>
</template>

<script>
import { toRefs, watchEffect } from 'vue';
export default {
  name: 'App',
  setup() {
    let obj = {
      foo: 1,
      attr: 2,
      item: 3
    };

    let trackObj = toRefs(obj);

    watchEffect(() => {
      console.log('obj.foo =', obj);
      console.log('trackObj.foo' ,trackObj);
    })

    function inc() {
      Object.keys(trackObj).forEach(function(key){
        trackObj[key].value += 1;
      });
      // 这里我们，通过修改追踪数据，来修改源数据
      console.log(obj);
      console.log(trackObj);
    }

    return {
      obj,
      inc
    };
  }
}
</script>
```

![0BGuMd.png](https://s1.ax1x.com/2020/10/09/0BGuMd.png)

 
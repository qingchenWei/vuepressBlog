---
title: Vue3系列讲解-7
date: 2020-10-08
tags:
 - Vue
 - 原理
 - Vue3
categories: 
 -  Vue
---

:::tip Abstract

1. Vue3相关新增和底层
2. `toRaw`
:::

<!-- more -->

## 关于 `Reactive` 的一些补充

先看代码

```vue
<template>
<div>
  <p>msg.content = {{msg.content}}</p>
  <button @click="changeObj">changeObj</button>
  <button @click="changeMsg">changeMsg</button>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = {
      content: 'content'
    };
    let msg = reactive(obj);
    function changeMsg() {
      msg.content = 'changedMsg'
      console.log(msg);
      console.log(obj);
    };
    function changeObj() {
      obj.content = 'changedObj'
      console.log(msg);
      console.log(obj);
    };
    return {
      msg,
      changeMsg,
      changeObj
    };
  }
}
</script>
```

在这里，我创建了一个对象 `obj` ，然后通过 `msg` 创建 `reactive` 参数指定这个对象。那么很明显，通过 `reactive` 创建出来的这个 `proxy` 对象将会获得 `obj` 的引用。

和以前一样，如果我们修改 `msg` 的 `content` ，毫无疑问，是会由于数据绑定而引起视图层的变化的。

![0NsvNt.png](https://s1.ax1x.com/2020/10/06/0NsvNt.png)

同时，`msg` 的引用 `obj` 也同步发生了改变。

但是还有一个疑问，那就是如果我们修改 `msg` 的参数引用 `obj` ，能导致视图层发生变化吗？

![0NyS9f.png](https://s1.ax1x.com/2020/10/06/0NyS9f.png)

观察界面和控制台，我点击了 `changeObj` 的按钮，在控制台显示 `msg` 和 `obj` 的内容都发生了改变，但视图层并没有捕捉到这个变化。也就是说，如果我们找到 `reactive` 的源数据，对源数据进行改变的时候，是不会引起界面的改变，也就不会产生有关的计算了。

如果我们有修改 `msg` 的内容，又不想触发界面改变的时候，我们就可以修改 `obj`。

可问题是，如果我没创建 `obj` 呢？又或者 `obj` 在另一个文件里创建了，而另一个文件里只有从它创建的 `msg` 的时候怎么办。

## toRaw

> raw
>
> (of food) not cooked
>
> （食物）生的，未經烹調的，沒煮的
>
> (of materials) in a natural state, without having been through any chemical or industrial process
>
> 原料未經加工的，自然狀態的

### `reactive` 的 `raw`

```vue
<template>
<div>
  <p>msg.content = {{msg.content}}</p>
  <button @click="changeRaw">changeRaw</button>
  <button @click="changeMsg">changeMsg</button>
</div>
</template>

<script>
import { reactive, toRaw } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = reactive({
      content: 'content'
    });

    let raw = toRaw(msg);

    console.log(raw);

    function changeMsg() {
      msg.content = 'changedMsg'
      console.log(msg);
      console.log(raw);
    };
    function changeRaw() {
      raw.content = 'changedRaw'
      console.log(msg);
      console.log(raw);
    };
    return {
      msg,
      changeMsg,
      changeRaw
    };
  }
}
</script>
```

1. 刚加载时候的状态（未点击按钮）

![0Nyp38.png](https://s1.ax1x.com/2020/10/06/0Nyp38.png)

2. 点击 `changeRaw`

![0Ny9gS.png](https://s1.ax1x.com/2020/10/06/0Ny9gS.png)

3. 点击 `changeMsg`

![0NyCjg.png](https://s1.ax1x.com/2020/10/06/0NyCjg.png)

可以发现，点击 `changeRaw` 和之前直接修改 `obj` 一样，并不会引起界面的改动，而只有 `changeMsg` 才会生效。 

聪明的人肯定已经发现了 `changeRaw` 的作用。我们在一开始就打印了 `raw` 的值，很明显，它就是 `msg` 中的 `reactive` 的引用。通过这种方式，如果我们想修改 `msg` 的内容而不引起界面的改动，就只需要用 `toRaw` 取出它的 “源值” 进行修改就行了。

总之， `toRaw` 是一个用来优化资源加载的方案。

### `ref` 的 `toRaw`

#### 基本类型

```vue
<template>
<div>
  <p>msg = {{msg}}</p>
  <button @click="changeRaw">changeRaw</button>
  <button @click="changeMsg">changeMsg</button>
</div>
</template>

<script>
import { ref, toRaw } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = ref(123);

    let raw = toRaw(msg);

    console.log('msg =', msg);
    console.log('raw =', raw);

    function changeMsg() {
      msg.value = 'changedMsg'
      console.log('msg =', msg);
      console.log('raw =', raw);
    };
    function changeRaw() {
      raw = 'changedRaw'
      console.log('msg =', msg);
      console.log('raw =', raw);
    };
    return {
      msg,
      changeMsg,
      changeRaw
    };
  }
}
</script>
```

我们首先看看，对于通常的基本类型的 `ref` 对象，`toRaw` 会得到什么。

![0NsHje.png](https://s1.ax1x.com/2020/10/06/0NsHje.png)



没有任何点击的情况下，默认显示的 `raw` 仍然是一个 `ref` 对象，跟`msg` 毫无区别。

![0NykHs.png](https://s1.ax1x.com/2020/10/06/0NykHs.png)

点击 `changeMsg`，`msg` 和 `raw` 的内容都发生了改变，这一点和 `reactive` 的 `raw` 表现一致。

![0NyEEn.png](https://s1.ax1x.com/2020/10/06/0NyEEn.png)

点击 `changeRaw` ，此时 `raw` 的值直接从对象变成了 字符串，而 `msg` 却毫无变化。

#### 对象

现在我们尝试一下**对象** `ref` 的 `toRaw`。

```vue
<template>
<div>
  <p>msg.content = {{msg.content}}</p>
  <button @click="changeRaw">changeRaw</button>
  <button @click="changeMsg">changeMsg</button>
</div>
</template>

<script>
import { ref, toRaw } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = ref({
      content: 'content'
    });

    let raw = toRaw(msg);

    console.log(raw);
    

    function changeMsg() {
      msg.value.content = 'changedMsg'
      console.log(msg);
      console.log(raw);
    };
    function changeRaw() {
      raw.content = 'changedRaw'
      console.log(msg);
      console.log(raw);
    };
    return {
      msg,
      changeMsg,
      changeRaw
    };
  }
}
</script>
```

![0NyZ40.png](https://s1.ax1x.com/2020/10/06/0NyZ40.png)

`raw` 的初始值竟然仍然是一个 `ref` 对象，而且 `raw` 和 `msg` 仍然毫无区别，那我们尝试点击一下两个按钮。

![0NymCV.png](https://s1.ax1x.com/2020/10/06/0NymCV.png)

无区别，和基本类型的表现一致。

![0Nyn3T.png](https://s1.ax1x.com/2020/10/06/0Nyn3T.png)

点击 `changeRaw` ，这是什么玩意儿？`value` 值毫无变化，但是在 `RefImpl` 整个大对象蹦出了个属性 `content`。

#### 总结

其实聪明的朋友早就明白了这是咋回事。我们的 `toRaw` 并没有找到 *有 `content` 属性的那个对象*，而是去找了 *有 `value` 属性的那个对象* ，我们的 `raw` 实际上。我用最简单的说法，那就是

`RefImpl` 对象的 `toRaw` 处理后结果是它自己。

```javascript
let raw = toRaw(msg);

console.log(raw === msg); // true
```

如果我们要找到真正的 `msg` 的源值，我们需要**打深一层**去进行获取。

```javascript
let raw = toRaw(msg.value);
```

现在我们再看

```vue
<template>
<div>
  <p>msg.content = {{msg.content}}</p>
  <button @click="changeRaw">changeRaw</button>
  <button @click="changeMsg">changeMsg</button>
</div>
</template>

<script>
import { ref, toRaw } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = ref({
      content: 'content'
    });

    let raw = toRaw(msg.value);

    console.log('msg =', msg);
    console.log('raw =', raw);

    function changeMsg() {
      msg.value.content = 'changedMsg'
      console.log('msg =', msg);
      console.log('raw =', raw);
    };
    function changeRaw() {
      raw.content = 'changedRaw'
      console.log('msg =', msg);
      console.log('raw =', raw);
    };
    return {
      msg,
      changeMsg,
      changeRaw
    };
  }
}
</script>
```

![0NyugU.png](https://s1.ax1x.com/2020/10/06/0NyugU.png)

![0NyQu4.png](https://s1.ax1x.com/2020/10/06/0NyQu4.png)

![0NsqnH.png](https://s1.ax1x.com/2020/10/06/0NsqnH.png)

此时和 `reactive` 的 `toRaw` 效果就完全一致了。

## markRaw

有的时候，我们希望某些数据是无法被改变的。

`markRaw`

显式标记一个 **对象** （不能是简单类型） 为“永远不会转为响应式代理”，函数返回这个对象本身。

```javascript
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// 如果被 markRaw 标记了，即使在响应式对象中作属性，也依然不是响应式的
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```

例如，

```vue
<template>
<div>
  <p>msg.canChangeContent.content = {{msg.canChangeContent.content}}</p>
  <p>msg.noChangeContent.content = {{msg.noChangeContent.content}}</p>
  <button @click="change">change</button>
</div>
</template>

<script>
import { markRaw, reactive, toRaw} from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = reactive({
      canChangeContent: {
        content: 'content'
      },
      noChangeContent: {
        content: 'neverChange'
      }
    });

    let raw = toRaw(msg);
    msg = reactive(markRaw(Object.assign({}, raw)));

    function change() {
      msg.canChangeContent.content = 'changedContent';
      msg.noChangeContent.content = 'changedContent'
      console.log('msg =', msg);
    };
    return {
      msg,
      change
    };
  }
}
</script>
```

查看控制台，我们可以发现整个 `raw` 对象多了一个属性 `__v_skip`，此时我们再点击 `change`，会发现

![0Ns7cD.png](https://s1.ax1x.com/2020/10/06/0Ns7cD.png)

控制台里显示内容已经更改了，但是界面上并无反应出现。

![0NsjAI.png](https://s1.ax1x.com/2020/10/06/0NsjAI.png)

也就是说，被 `mark` 了的源数据对象是不可被监听的。

> 经试验，首先，我们不能只在 `raw` 值上进行标记，必须要重新创建 `reactive` 传递回 `msg`，因为 `reactive` 之后就已经生米煮成熟饭了，之后再 __v_skip 就没有意义了。
>
> 其次，如果处理的是整个 `raw`，而不是 `raw` 的子对象，需要执行拷贝，否则 `reactive` 会忽略新的 `reactive` 行为。

更多信息请查阅 [官方文档](https://composition-api.vuejs.org/zh/api.html#markraw)，对于这个 `API` ，还存在有 标记混淆 的问题，这一点比较难以理解。

假如一个 `msg` 的 `raw` 有多个属性，只想对其中部分属性进行标记 `markRaw`，可以采用下面这种方式：

```vue
<template>
<div>
  <p>msg.canChangeContent.content = {{msg.canChangeContent.content}}</p>
  <p>msg.noChangeContent.content = {{msg.noChangeContent.content}}</p>
  <button @click="change">change</button>
</div>
</template>

<script>
import { markRaw, reactive, toRaw} from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = reactive({
      canChangeContent: {
        content: 'content'
      },
      noChangeContent: {
        content: 'neverChange'
      }
    });

    let raw = toRaw(msg);
    msg.noChangeContent = reactive(markRaw(raw.noChangeContent));

    function change() {
      // msg.canChangeContent.content = 'changedContent';
      msg.noChangeContent.content = 'changedContent'
      console.log('msg =', msg);
    };
    return {
      msg,
      change
    };
  }
}
</script>
```

![0Nsx4P.png](https://s1.ax1x.com/2020/10/06/0Nsx4P.png)

这里要注意，虽然 `noChangeContent` 是不会主动进行监听的，但果我们又修改了 `canChangeContent`，会引起整个 `msg` 的监听行为从而带动 `noChangeContent` 的变化。

 
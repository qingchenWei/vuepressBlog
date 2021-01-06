---
title: Vue3系列讲解-4
date: 2020-10-05
tags:
 - Vue
 - 原理
 - Vue3
categories: 
 -  Vue
---

:::tip Abstract

1. Vue3相关新增和底层
2. `reactive` 相关讲解
:::

<!-- more -->

## reactive

+ `reactive` 是 Vue3 中提供的实现响应式数据的方法。
+ 在 Vue2 中响应式数据是通过 defineProperty 来实现的，在 Vue3 中响应式数据是通过 ES6 的 `Proxy` 来实现的。具体参照[Vue双向数据绑定](https://dxmo.gitee.io/views/ vue/2020/Vue/Vue%E5%8F%8C%E5%90%91%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.html)，[Vue3 的 Proxy 和 defineProperty 的比较](https://dxmo.gitee.io/views/ vue/2020/Vue/Vue3%E7%9A%84Proxy.html)。

+ reactive 参数必须是对象 (json / arr)
+ 如果给 reactive 传递了其它对象
  + 默认情况下，修改对象无法实现界面的数据绑定更新。
  + 如果需要更新，需要进行重新赋值。（即不允许直接操作数据，需要放个新的数据来替代原数据）

## 在 `reactive` 使用基本类型参数

基本类型（数字、字符串、布尔值）在 `reactive` 中无法被创建成 `proxy` 对象，也就无法实现监听。

```vue
<template>
<div>
  <p>{{msg}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = reactive(0)
    function c() {
      console.log(msg);
      msg ++;
    }
    return {
      msg,
      c
    };
  }
}
</script>
```

![08utpj.png](https://s1.ax1x.com/2020/10/03/08utpj.png)

点击 button ，我们期望的结果是数字从 0 变成 1，然而实际上界面上的数字并没有发生任何改变。

查看控制台，它的输出是这样的（我点了 3 次）

![08uN1s.png](https://s1.ax1x.com/2020/10/03/08uN1s.png)

出现提示

> value cannot be made reactive: 0

而输出的值确实发生了变化，只不过这种变化并没有反馈到界面上，也就是说并没有实现双向数据绑定。当然，如果是 `ref` 的话，就不存在这样的问题。而如果要使用 `reactive` ，我们需要将参数从 基本类型 转化为 对象。

```vue
<template>
<div>
  <p>{{msg.num}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = reactive({
      num: 0
    })
    function c() {
      console.log(msg);
      msg.num ++;
    }
    return {
      msg,
      c
    };
  }
}
</script>
```

将参数替换成了对象 `{num: 0}`，此时，点击按钮界面就会产生改变（我点了 3 次）。

![08u8AS.png](https://s1.ax1x.com/2020/10/03/08u8AS.png)

在控制台打印消息

![08uGtg.png](https://s1.ax1x.com/2020/10/03/08uGtg.png)

可以看到，`msg` 成功被创建成了 `proxy` 对象，他通过劫持对象的 `get` 和 `set` 方法实现了对象的双向数据绑定。

深层的、对象内部的变化也能被察觉到（注意下面代码中的 `inner` ）

```vue
<template>
<div>
  <p>{{msg.num.inner}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = reactive({
      num: {
        inner: 0
      }
    })
    function c() {
      console.log(msg);
      msg.num.inner ++;
    }
    return {
      msg,
      c
    };
  }
}
</script>
```

![08uJhQ.png](https://s1.ax1x.com/2020/10/03/08uJhQ.png)

数组变化也不在话下。

```vue
<template>
<div>
  <p>{{msg}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = reactive([1, 2, 3])
    function c() {
      console.log(msg);
      msg[0] += 1;
      msg[1] = 5;
    }
    return {
      msg,
      c
    };
  }
}
</script>
```

![08uUcn.png](https://s1.ax1x.com/2020/10/03/08uUcn.png)



## 在 `reactive` 使用 `Date` 参数

如果参数不是数组、对象，而是稍微奇怪一点的数据类型，例如说 `Date` ，那么麻烦又来了。

```vue
<template>
<div>
  <p>{{msg}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = reactive(new Date())
    function c() {
      console.log(msg);
      msg.setDate(msg.getDate() + 1);
      console.log(msg);
    }
    return {
      msg,
      c
    };
  }
}
</script>
```

![08uaXq.png](https://s1.ax1x.com/2020/10/03/08uaXq.png)

![08uwn0.png](https://s1.ax1x.com/2020/10/03/08uwn0.png)

这里我先打印了 `msg` 两次，可以看到，点击一次 button ，`msg` 的数据是存在变化的，但界面并未发生变化，同时我们发现在控制台里，`msg` 并未被识别成 `proxy`。

就算我们把 `Date` 放在对象里，就像这样

```vue
<template>
<div>
  <p>{{msg.date}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = reactive({
      date: new Date()
    });
    function c() {
      console.log(msg);
      msg.date.setDate(msg.date.getDate() + 1);
      console.log(msg);
    }
    return {
      msg,
      c
    };
  }
}
</script>
```

也仍然不起效果。

![08u0BV.png](https://s1.ax1x.com/2020/10/03/08u0BV.png)

![08uB7T.png](https://s1.ax1x.com/2020/10/03/08uB7T.png)

显然，对于这种数据类型，我们需要做特殊处理。

这个特殊处理就是重新赋值（，而不是直接修改原来的值）。

```vue
<template>
<div>
  <p>{{msg.date}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = reactive({
      date: new Date()
    });
    function c() {
      console.log(msg);
      msg.date.setDate((msg.date.getDate() + 1));
      msg.date = new Date(msg.date);
      console.log(msg);
    }
    return {
      msg,
      c
    };
  }
}
</script>
```

这里我采用了拷贝的方案重新赋值了 `msg.date`，界面成功发生了变化（日期 + 1）。

![08urAU.png](https://s1.ax1x.com/2020/10/03/08urAU.png)

 
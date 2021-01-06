---
title: Vue3系列讲解-3
date: 2020-10-04
tags:
 - Vue
 - 原理
 - Vue3
categories: 
 - Vue
---

:::tip Abstract

1. Vue3相关新增和底层
2. setup 函数的相关注意点
3. `reactive` 的注意点
4. `composition api` + `option api`
:::

<!-- more -->

## setup 函数

上一篇我们简单讲过 `setup` 函数的一些相关事项，这里再做一些回顾和补充。这些信息都来自于[官方文档]()

1. 新的 `setup` 组件选项在**创建组件之前**执行。

> **WARNING**

> 由于在执行 `setup` 时尚未创建组件实例，因此在 `setup` 选项中没有 `this`。这意味着，除了 `props` 之外，你将无法访问组件中声明的任何属性——**本地状态**、**计算属性**或**方法**。

​		也就是说，`data`，`computed` 等自主定义的那些初始化数据都将会无法提供访问。

2. **在 `setup()` 内部，`this` 不会是该活跃实例的引用**，因为 `setup()` 是在解析其它组件选项之前被调用的，所以 `setup()` 内部的 `this` 的行为与其它选项中的 `this` 完全不同。这在和其它选项式 API 一起使用 `setup()` 时可能会导致混淆。

   简单来说，就是在 `setup()` 中，`this` 指向 `undefined` 。

## composition api + option api

`composition api` 和 `option api` 允许混用。`option api` 就是过去那种 data，computed 的 Vue2.x 函数定义方案。

混用示例如下。

```vue
<template>
<div>
  <p>{{msg1}}</p>
  <button @click="c1">button1</button>
  <p>{{msg2}}</p>
  <button @click="c2">button2</button>
</div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'App',
  data() {
    return {
      msg1: 0
    }
  },
  methods: {
    c1() {
      this.msg1 ++;
    }
  },
  setup() {
    let msg2 = ref(0);
    function c2() {
      msg2.value ++;
    }
    return {
      msg2,
      c2
    };
  }
}

</script>
```

这是一个 两个api 相互之间没有交互的示例，你也可以让 `option api` 引用 `compostion api` 中的内容。

```vue
<template>
<div>
  <p>{{msg1}}</p>
  <button @click="c1">button1</button>
  <p>{{msg2}}</p>
  <button @click="c2">button2</button>
</div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'App',
  data() {
    return {
      msg1: 0
    }
  },
  methods: {
    c1() {
      this.msg1 ++;
      this.msg2 --;
    }
  },
  setup() {
    let msg2 = ref(0);
    function c2() {
      msg2.value ++;
    }
    return {
      msg2,
      c2
    };
  }
}

</script>
```

这个示例我在 `methods` 的 `c1` 中使用了 `composition api` 的 `msg2` ，这样你点按 `button1` 的时候，两个数字都会发生变化。

记得，只有 `option api` 引用 `composition api` 的份，没有反过来的份。

而且由于 `composition api` 立即执行并 return 的原因，它不被允许作为 `async` 异步函数进行定义。

 
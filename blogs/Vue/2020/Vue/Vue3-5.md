---
title: Vue3系列讲解-5
date: 2020-10-06
tags:
 - Vue
 - 原理
 - Vue3
categories: 
 -  Vue
---

:::tip Abstract

1. Vue3相关新增和底层
2. `ref` 相关讲解
:::

<!-- more -->

## ref

### 入门

+ `ref` 和 `reactive` 一样，也是用来实现响应式数据的方法
+ 由于 `reactive` 必须传递一个对象，所以导致在企业开发中，如果我们只想让某个变量实现响应式的时候会非常麻烦，而`ref`就能实现对简单值的监听。

### `ref` 关键源码

```javascript
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue
  }
  let value = shallow ? rawValue : convert(rawValue)
  const r = {
    __v_isRef: true,
    get value() {
      track(r, TrackOpTypes.GET, 'value')
      return value
    },
    set value(newVal) {
      if (hasChanged(toRaw(newVal), rawValue)) {
        rawValue = newVal
        value = shallow ? newVal : convert(newVal)
        trigger(
          r,
          TriggerOpTypes.SET,
          'value',
          __DEV__ ? { newValue: newVal } : void 0
        )
      }
    }
  }
  return r
}
```

看不懂没关系，首先关注几个重点就行。

```javascript
let value = shallow ? rawValue : convert(rawValue)
```

这一行会获得这个对象在使用的时候实际返回的有效 `value` 值。如果是 `shallow` 对象，那么不会对它进行任何封装。`shallow` 是什么后面会讲。

`convert` 方法的内容如下

```javascript
const convert = val => isObject(val) ? reactive(val) : val
```

如果不是对象，那么不做改变；如果是对象，那么将它转化为 `reactive` 。可以这么理解，`ref` 是多做了一层的 `reactive` 。

```javascript
__v_isRef: true
```

vue3 通过这个数值来判断 `ref` 对象。

通过 `ref` 创建并 `return` 的对象，在 `html` 中引用的时候是可以忽略掉 `value` 的。例如我们在上一个篇章中提到的 `Date` 对象。

```vue
<template>
<div>
  <p>{{msg}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = ref(new Date());
    function c() {
      console.log(msg);
      msg.value.setDate((msg.value.getDate() + 1));
      msg.value = new Date(msg.value);
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

如果传入的参数是个对象，而我们要使用的是它的子元素的话，依然可以这么做。

```vue
<template>
<div>
  <p>{{msg.date}}</p>
  <button @click="c">button</button>
</div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {
    let msg = ref({date: new Date()});
    function c() {
      console.log(msg);
      msg.value.date.setDate((msg.value.date.getDate() + 1));
      msg.value.date = new Date(msg.value.date);
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

 
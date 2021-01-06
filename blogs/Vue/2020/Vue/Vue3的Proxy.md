---
title: Vue3 的 Proxy 和 defineProperty 的比较
date: 2020-04-17
tags:
 - Proxy
 - Vue
 - defineProperty
categories: 
 -  Vue
---

:::tip Abstract
1. Vue3 中，抛弃了defineProperty而使用Proxy来实现数据监听，本文讲述它们两者的区别
:::

<!-- more -->

[参考网址](https://www.infoq.cn/article/sPCMAcrdAZQfmLbGJeGr)

## `Object.defineProperty` VS Proxy

**1. `Object.defineProperty`只能劫持对象的属性，而 Proxy 是直接代理对象。**

由于 `Object.defineProperty` 只能对属性进行劫持，需要遍历对象的每个属性，如果属性值也是对象，则需要深度遍历。而 Proxy 直接代理对象，不需要遍历操作。

**2. `Object.defineProperty`对新增属性需要手动进行 Observe。**

由于 `Object.defineProperty`劫持的是对象的属性，所以新增属性时，需要重新遍历对象，对其新增属性再使用 `Object.defineProperty` 进行劫持。

也正是因为这个原因，使用 Vue 给 data 中的数组或对象新增属性时，需要使用 vm.$set 才能保证新增的属性也是响应式的。

下面看一下 Vue 的 set 方法是如何实现的，set 方法定义在 core/observer/index.js ，下面是核心代码。

```js
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set (target: Array<any> | Object, key: any, val: any): any {
  // 如果 target 是数组，且 key 是有效的数组索引，会调用数组的 splice 方法，
  // 我们上面说过，数组的 splice 方法会被重写，重写的方法中会手动 Observe
  // 所以 vue 的 set 方法，对于数组，就是直接调用重写 splice 方法
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 对于对象，如果 key 本来就是对象中的属性，直接修改值就可以触发更新
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // vue 的响应式对象中都会添加了 __ob__ 属性，所以可以根据是否有 __ob__ 属性判断是否为响应式对象
  const ob = (target: any).__ob__
  // 如果不是响应式对象，直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 调用 defineReactive 给数据添加了 getter 和 setter，
  // 所以 vue 的 set 方法，对于响应式的对象，就会调用 defineReactive 重新定义响应式对象，defineReactive 函数
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

在 set 方法中，对 target 是数组和对象做了分别的处理，target 是数组时，会调用重写过的 splice 方法进行手动 Observe 。

对于对象，如果 `key` 本来就是对象的属性，则直接修改值触发更新，否则调用 defineReactive 方法重新定义响应式对象。

如果采用 `proxy` 实现，`Proxy` 通过 `set(target, propKey, value, receiver)` 拦截对象属性的设置，是可以拦截到对象的新增属性的。

![为什么Vue3.0不再使用defineProperty实现数据监听？](https://static001.infoq.cn/resource/image/e2/a4/e2343cd3f9db6420d3ec97af35a3eba4.png)

不止如此，Proxy 对数组的方法也可以监测到，不需要像上面 Vue2.x 源码中那样进行 hack。

![为什么Vue3.0不再使用defineProperty实现数据监听？](https://static001.infoq.cn/resource/image/e8/5e/e8ef44354b7ccb0bd06d0160a00de15e.png)

完美！！！

**3. `Proxy`支持 13 种拦截操作，这是`defineProperty`所不具有的。**

- **`get(target, propKey, receiver)`**：拦截对象属性的读取，比如 `proxy.foo` 和`proxy['foo']`。
- **`set(target, propKey, value, receiver)`**：拦截对象属性的设置，比如`proxy.foo = v` 或 `proxy['foo'] = v`，返回一个布尔值。
- **`has(target, propKey)`**：拦截 `propKey in proxy` 的操作，返回一个布尔值。
- **`deleteProperty(target, propKey)`**：拦截 `delete proxy[propKey]` 的操作，返回一个布尔值。
- **`ownKeys(target)`**：拦截`Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 `Object.keys()` 的返回结果仅包括目标对象自身的可遍历属性。
- **`getOwnPropertyDescriptor(target, propKey)`**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **`defineProperty(target, propKey, propDesc)`**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **`preventExtensions(target)`**：拦截 `Object.preventExtensions(proxy)`，返回一个布尔值。
- **`getPrototypeOf(target)`**：拦截 `Object.getPrototypeOf(proxy)`，返回一个对象。
- **`isExtensible(target)`**：拦截 `Object.isExtensible(proxy)`，返回一个布尔值。
- **`setPrototypeOf(target, proto)`**：拦截 `Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- **`apply(target, object, args)`**：拦截 `Proxy` 实例作为函数调用的操作，比如`proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)`。
- **`construct(target, args)`**：拦截 `Proxy` 实例作为构造函数调用的操作，比如`new proxy(...args)`。

**4. 新标准性能红利**

`Proxy` 作为新标准，从长远来看，JS 引擎会继续优化 `Proxy`，但 `getter` 和 `setter` 基本不会再有针对性优化。

**5. `Proxy` 兼容性差**

![为什么Vue3.0不再使用defineProperty实现数据监听？](https://static001.infoq.cn/resource/image/45/bb/4548f6bc1d02622fa91450f6335663bb.png)

可以看到，`Proxy` 对于 IE 浏览器来说简直是灾难。

并且目前并没有一个完整支持 Proxy 所有拦截方法的 Polyfill 方案，有一个 google 编写的 [proxy-polyfill ](https://github.com/GoogleChrome/proxy-polyfill)也只支持了 get、set、apply、construct 四种拦截，可以支持到 IE9+ 和 Safari 6+。

## 总结

1. `Object.defineProperty` 并非不能监控数组下标的变化，Vue2.x 中无法通过数组索引来实现响应式数据的自动更新是 Vue 本身的设计导致的，不是 defineProperty 的锅。
2. `Object.defineProperty` 和 `Proxy` 本质差别是，`defineProperty` 只能对属性进行劫持，所以出现了需要递归遍历，新增属性需要手动 `Observe` 的问题。
3. `Proxy` 作为新标准，浏览器厂商势必会对其进行持续优化，但它的兼容性也是块硬伤，并且目前还没有完整的 polyfill 方案。

 
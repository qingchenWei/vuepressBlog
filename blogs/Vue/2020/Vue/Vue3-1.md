---
title: Vue3系列讲解-1
date: 2020-10-02
tags:
 - Vue
 - 原理
 - Vue3
categories: 
 - Vue
---

:::tip Abstract

1. Vue3相关新增和底层
2. Diff
3. Vue3项目创建
:::

<!-- more -->

## Diff

### 静态标记

Vue3 中仅对静态标记标记对象进行比较。

[对于动态{{msg}}的绑定](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%3E%5Cr%5Cn%20%20%3Cp%3EXmo%3C%2Fp%3E%5Cr%5Cn%20%20%3Cp%3EXmo%3C%2Fp%3E%5Cr%5Cn%20%20%3Cp%3EXmo%3C%2Fp%3E%5Cr%5Cn%20%20%3Cp%3E%7B%7Bmsg%7D%7D%3C%2Fp%3E%5Cr%5Cn%3C%2Fdiv%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeImports%22%3Afalse%2C%22hoistStatic%22%3Afalse%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup%22%2C%22foo%22%3A%22setup%22%2C%22bar%22%3A%22props%22%7D%7D%7D)

```html
<div>
  <p>Xmo</p>
  <p>Xmo</p>
  <p>Xmo</p>
  <p>{{msg}}</p>
</div>
```

```javascript
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("p", null, "Xmo"),
    _createVNode("p", null, "Xmo"),
    _createVNode("p", null, "Xmo"),
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}

// Check the console for the AST
```

可以看到，源码中，对 msg 设计了静态标记，这里是1，后面跟注释 TEXT ，代表这个标签的 TEXT 数据是会动态变化的。（动态变化的东西反而叫静态标记，可还行）

```javascript
_createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
```

+ Vue2 中的虚拟dom是进行全量的杜比
+ Vue3 新增了静态标记（PatchFlag）
  + 只比对带有 PF 的节点
  + 并且通过 Flag 的信息得知当前节点要比对的具体内容

### 静态提升

对上面的代码开启静态提升（hoistStatic）

右上角开启静态提升

![01CvnA.png](https://s1.ax1x.com/2020/10/02/01CvnA.png)

> hoist - 抬起，吊起 - verb

[静态提升之后的效果](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%3E%5Cr%5Cn%20%20%3Cp%3EXmo%3C%2Fp%3E%5Cr%5Cn%20%20%3Cp%3EXmo%3C%2Fp%3E%5Cr%5Cn%20%20%3Cp%3EXmo%3C%2Fp%3E%5Cr%5Cn%20%20%3Cp%3E%7B%7Bmsg%7D%7D%3C%2Fp%3E%5Cr%5Cn%3C%2Fdiv%3E%22%2C%22ssr%22%3Afalse%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeImports%22%3Afalse%2C%22hoistStatic%22%3Atrue%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup%22%2C%22foo%22%3A%22setup%22%2C%22bar%22%3A%22props%22%7D%7D%7D)

```javascript
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

const _hoisted_1 = /*#__PURE__*/_createVNode("p", null, "Xmo", -1 /* HOISTED */)
const _hoisted_2 = /*#__PURE__*/_createVNode("p", null, "Xmo", -1 /* HOISTED */)
const _hoisted_3 = /*#__PURE__*/_createVNode("p", null, "Xmo", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    _hoisted_3,
    _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}

// Check the console for the AST
```

其实就是我最喜欢写代码的方式，将静态内容提取出来，变成常量再进行赋值。

+ 以后每次进行render的时候，就不会重复创建这些静态的内容，而是直接从一开始就创建好的常量中取就行了。

### 事件侦听器缓存

新写一段[代码](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%3E%5Cr%5Cn%20%20%3Cbutton%20%40click%3D%5C%22onClick%5C%22%3Ebtn%3C%2Fbutton%3E%5Cr%5Cn%3C%2Fdiv%3E%22%2C%22ssr%22%3Afalse%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeImports%22%3Afalse%2C%22hoistStatic%22%3Afalse%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup%22%2C%22foo%22%3A%22setup%22%2C%22bar%22%3A%22props%22%7D%7D%7D)

```html
<div>
  <button @click="onClick">btn</button>
</div>
```

```javascript
import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", { onClick: _ctx.onClick }, "btn", 8 /* PROPS */, ["onClick"])
  ]))
}

// Check the console for the AST
```

这里我们还没有开启事件监听缓存，熟悉的静态标记 `8 /* PROPS */` 出现了，它将标签的 Props （属性） 标记动态属性。

如果我们存在属性不会改变，不希望这个属性被标记为动态，那么就需要 cacheHandler 的出场了。

![01CXXd.png](https://s1.ax1x.com/2020/10/02/01CXXd.png)

[效果](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%3E%5Cr%5Cn%20%20%3Cbutton%20%40click%3D%5C%22onClick%5C%22%3Ebtn%3C%2Fbutton%3E%5Cr%5Cn%3C%2Fdiv%3E%22%2C%22ssr%22%3Afalse%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeImports%22%3Afalse%2C%22hoistStatic%22%3Afalse%2C%22cacheHandlers%22%3Atrue%2C%22scopeId%22%3Anull%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup%22%2C%22foo%22%3A%22setup%22%2C%22bar%22%3A%22props%22%7D%7D%7D)

```javascript
import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick(...args)))
    }, "btn")
  ]))
}

// Check the console for the AST
```

_createVnode 的第二个属性，从 

`{ onClick: _ctx.onClick }` 

变为了

`{ onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick(...args))) }`

它的意思很明显，onClick 方法被存入 cache。在使用的时候，如果能在缓存中找到这个方法，那么它将直接被使用。如果找不到，那么将这个方法注入缓存。总之，就是把方法给缓存了。

如果有多个标签、方法，效果

```html
<div>
  <button @click="onClick" @mouseover="onMouseover">btn</button>
  <button @click="onClick1">btn</button>
</div>
```

```java
import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("button", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick(...args))),
      onMouseover: _cache[2] || (_cache[2] = (...args) => (_ctx.onMouseover(...args)))
    }, "btn", 32 /* HYDRATE_EVENTS */),
    _createVNode("button", {
      onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.onClick1(...args)))
    }, "btn")
  ]))
}

// Check the console for the AST
```

值得注意的是，在测试过程中，只要监听了除了 click 以外的方法，都会添加 `32 /* HYDRATE_EVENTS */` 事件监听静态标记（事件的方法静态的，但监听的事件则是动态的【onMouseover是缓存的，而mouseover事件则不是】）。

总之，静态提升之后，事件就不会在 diff 算法中进行比较了。

## Vue3 项目创建

创建 Vue3 的三种方式

+ Vue-Cli
+ Webpack
+ Vite

我用 Vite （尤自创的方案），另外两种方法请自己搜索。

- Vite 的实现原理是利用 ES6 的 import 会发送请求去加载文件的特性，拦截这些请求，做一些预编译，省去 webpack 冗长的打包时间。

1. 安装 Vite

   ```bash
   npm install -g create-vite-app
   ```

2. 利用 Vite 创建 Vue3 项目

   ```bash
   create-vite-app projectName
   ```

3. ```bash
   cd projectName
   npm install
   npm run dev
   ```

### 全新的 main.js 文件

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```

一个过去在 Vue2 中，我没见过的方法，createApp，采用 querySelector 的方法将 App.vue 中的 id=app 标签内容进行挂载。

顺带一提，App.vue 长这样。

```vue
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
```

内容构造基本和 Vue2 没差。

另外 Vue3 也是基本兼容 Vue2 的，过去的语法这里依旧可以正常使用。

 
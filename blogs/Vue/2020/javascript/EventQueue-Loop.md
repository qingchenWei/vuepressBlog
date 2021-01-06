---
title: 【题】EventQueue-Loop
date: 2020-08-26
tags:
 - JavaScript
categories: 
 - JavaScript
---

:::tip Abstract
1. async、await、Promise -> 微任务
2. 定时器、事件绑定、ajax -> 宏任务
3. 创建微任务的逻辑。
:::

<!-- more -->

### 题目

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeOut');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
})

console.log('script end');
```

### 输出

```javascript
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeOut
```

### 要点

1. 首先会执行同步代码主线程，然后是微任务、宏任务。
2. 微任务包括async+await，Promise。
3. 宏任务这里是定时器。
4. await会将await之后的代码放入微任务中，await执行的代码本身并不放在微任务中。
5. 而 Promise 会将 resolve 或 reject 之后的代码放入 微任务 中，new Promise中的代码则会立即执行。


 
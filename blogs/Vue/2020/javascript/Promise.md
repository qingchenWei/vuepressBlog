---
title: 【题】Promise
date: 2020-09-10
tags:
 - JavaScript
categories: 
 - JavaScript
---

:::tip Abstract
1. 链式调用中，只有前一个 then 的回调执行完毕后，跟着的 then 中的回调才会被加入至微任务队列。
2. 同一个 Promise 的每个链式调用的开端会首先依次进入微任务队列。
3. then 返回一个新的 Promise，并且会用这个 Promise 去 resolve 返回值。
4. [source](https://juejin.im/post/6869573288478113799).
:::

<!-- more -->

## 初级

```javascript
Promise.resolve()
  .then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
      console.log("then1-1");
    });
  })
  .then(() => {
    console.log("then2");
  });
```

### ans

```bash
then1
then1-1
then2
```

每个then后的执行函数都会被放入微任务序列，按顺序放入。

## 中级

### 1 -

```javascript
let p = Promise.resolve();

p.then(() => {
  console.log("then1");
  Promise.resolve().then(() => {
    console.log("then1-1");
  });
}).then(() => {
  console.log("then1-2");
});

p.then(() => {
  console.log("then2");
}); 
```

#### ans

```bash
then1
then2
then1-1
then1-2
```

### 2-

```javascript
let p = Promise.resolve().then(() => {
  console.log("then1");
  Promise.resolve().then(() => {
    console.log("then1-1");
  });
}).then(() => {
  console.log("then2");
});

p.then(() => {
  console.log("then3");
});
```

#### ans

```bash
then1
then1-1
then2
then3
```

## 高级

### 1 -

```javascript
Promise.resolve()
  .then(() => {
    console.log("then1");
    Promise.resolve()
      .then(() => {
        console.log("then1-1");
        return 1;
      })
      .then(() => {
        console.log("then1-2");
      });
  })
  .then(() => {
    console.log("then2");
  })
  .then(() => {
    console.log("then3");
  })
  .then(() => {
    console.log("then4");
  });
```

#### ans

```bash
then1
then1-1
then2
then1-2
then3
then4
```

### 2-

```javascript
Promise.resolve()
  .then(() => {
    console.log("then1");
    Promise.resolve()
      .then(() => {
        console.log("then1-1");
        return Promise.resolve();
      })
      .then(() => {
        console.log("then1-2");
      });
  })
  .then(() => {
    console.log("then2");
  })
  .then(() => {
    console.log("then3");
  })
  .then(() => {
    console.log("then4");
  })
  .then(() => {
   	console.log("then5");
  });
```

#### ans

```bash
then1
then1-1
then2
then3
then4
then1-2
then5
```

**返回Promise.resolve()会导致执行两次微任务**

 
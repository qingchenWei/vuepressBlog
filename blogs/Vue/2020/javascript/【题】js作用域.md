---
title: 【题】js作用域
date: 2020-09-04
tags:
 - JavaScript
categories: 
 - JavaScript
---

:::tip Abstract
1. 一道关于js作用域、立即执行函数的题目
:::

<!-- more -->

## 题目

```javascript
var x = 2;
var y = {
  x: 3,
  z: (function(x) {
    this.x *= x;
    x += 2;
    return function(n) {
      this.x *= n;
      x += 3;
      console.log(x);
    }
  })(x)
}

var m = y.z;

m(4);

y.z(5);

console.log(x, y.x);
```

## 答案

7

10

16 15

## 解答

1. 立即执行函数创建了一个函数上下文，值得注意的是，立即执行函数的this指向的是window/全局。

   ```javascript
   var x = 2;
   var y = {
     x: 3,
     z: (function(x) {
       // 立即执行函数的this永远是全局window，这里的this.x就是全局的2，传入的变量x也是2.
    		// 传入的变量是全局2的拷贝，不要弄混   
       this.x *= x;
       x += 2;
       // 此时，全局 x 变为 4，这个执行上下文的 x 也变成了 4。
       return function(n) {
         this.x *= n;
         x += 3;
         console.log(x);
       }
     })(x)
   }
   ```

   此时的 y.z 已经可以看作是。

   ```javascript
   x = 4;
   z = function(n) {
     this.x *= n;
     x += 3;
     console.log(x);
   }
   ```

2. ```javascript
   var m = y.z;
   m(4);
   ```

   转化一下，就是，

   ```javascript
   var m = function(n) {
     this.x *= n;
     x += 3;
     console.log(x);
   }
   m(4);
   ```

   很明显，这里的产生调用的this是全局，因此 this.x *= n 使得全局的 x *= 4. 之前已经变成了 4 ， 4\*4就是16了。全局的 x 变成了 16.

   然后是 x += 3，我们这里没有x，向上找，找到的是执行上下文里的x，它现在是4，加了3就是7了。

   console.log(7);

3. ```javascript
   y.z(5);
   ```

   这里产生调用的this是对象y，因此this.x *= n 使得 y 的 x \*= 5。就成了15.

   然后是 x +=3， 我们这里没有x，向上找，找到的是执行上下文里的x，它现在是7，加了3就是10了。

4. ```javascript
   console.log(x, y.x);
   ```

   从上面的叙述中，我们知道，x = 16，y.x = 15，结束。

 
---
title: Js的Object和Object.create
date: 2020-09-09
tags:
 - JavaScript
categories: 
 - JavaScript
---

:::tip Abstract
1. Object.create()、new Object()和{}的区别
2. new实际作用，自己手写一个Object.create
3. [source](https://juejin.im/post/6844903917835436045)
:::

<!-- more -->

# 直接字面量创建

```javascript
var objA = {};
objA.name = 'a';
objA.sayName = function() {
    console.log(`My name is ${this.name} !`);
}

objA.sayName();
console.log(objA.__proto__ === Object.prototype); // true
console.log(objA instanceof Object); // true
```

# new关键字创建

```javascript
var objB = new Object();
// var objB = Object();
objB.name = 'b';
objB.sayName = function() {
    console.log(`My name is ${this.name} !`);
}
objB.sayName();
console.log(objB.__proto__ === Object.prototype); // true
console.log(objB instanceof Object); // true
```

`new`操作符其实做了以下四步：

```javascript
var obj = new Object(); // 创建一个空对象
obj.__proto__ = F.prototype; // obj的__proto__指向构造函数的prototype
var result = F.call(obj); // 把构造函数的this指向obj，并执行构造函数把结果赋值给result
if (typeof(result) === 'object') {
    objB = result; // 构造函数F的执行结果是引用类型，就把这个引用类型的对象返回给objB
} else {
    objB = obj; // 构造函数F的执行结果是值类型，就返回obj这个空对象给objB
}
```

这样一比较，其实字面量创建和new关键字创建并没有区别，创建的新对象的`__proto__`都指向`Object.prototype`，只是字面量创建更高效一些，少了`__proto__`指向赋值和`this`。

# Object.create()

--- `Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。 ---

```javascript
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};
const me = Object.create(person); // me.__proto__ === person
me.name = "Matthew"; // name属性被设置在新对象me上，而不是现有对象person上
me.isHuman = true; // 继承的属性可以被重写
me.printIntroduction(); // My name is Matthew. Am I human? true
```

--- Object.create(proto[, propertiesObject]) ---

`proto`必填参数，是新对象的原型对象，如上面代码里新对象`me`的`__proto__`指向`person`。注意，如果这个参数是`null`，那新对象就彻彻底底是个空对象，没有继承`Object.prototype`上的任何属性和方法，如`hasOwnProperty()、toString()`等。

```javascript
var a = Object.create(null);
console.dir(a); // {}
console.log(a.__proto__); // undefined
console.log(a.__proto__ === Object.prototype); // false
console.log(a instanceof Object); // false 没有继承`Object.prototype`上的任何属性和方法，所以原型链上不会出现Object
```

`propertiesObject`是可选参数，指定要添加到新对象上的可枚举的属性（即其自定义的属性和方法，可用`hasOwnProperty()`获取的，而不是原型对象上的）的描述符及相应的属性名称。

```javascript
var bb = Object.create(null, {
    a: {
        value: 2,
        writable: true,
        configurable: true
    }
});
console.dir(bb); // {a: 2}
console.log(bb.__proto__); // undefined
console.log(bb.__proto__ === Object.prototype); // false
console.log(bb instanceof Object); // false 没有继承`Object.prototype`上的任何属性和方法，所以原型链上不会出现Object

// ----------------------------------------------------------

var cc = Object.create({b: 1}, {
    a: {
        value: 3,
        writable: true,
        configurable: true
    }
});
console.log(cc); // {a: 3}
console.log(cc.hasOwnProperty('a'), cc.hasOwnProperty('b')); // true false 说明第二个参数设置的是新对象自身可枚举的属性
console.log(cc.__proto__); // {b: 1} 新对象cc的__proto__指向{b: 1}
console.log(cc.__proto__ === Object.protorype); // false
console.log(cc instanceof Object); // true cc是对象，原型链上肯定会出现Object
```

`Object.create()`创建的对象的原型指向传入的对象。跟字面量和`new`关键字创建有区别。

- 自己实现一个Object.create()

```javascript
Object.myCreate = function(proto, properties) {
  // 第一步，创建一个返回对象
  function F() {};
  // 第二步，将返回对象的原型设置为 第一个参数，如果是null，则设置成 null
  F.prototype = proto;
  // 第三步，将 属性定义给 返回值，定义方式为
  // Object.defineProperties
  if(properties) {
      Object.defineProperties(F, properties);
  }
  return new F();
}
var hh = Object.myCreate({a: 11}, {mm: {value: 10}});
console.dir(hh);
```

# 总结

 字面量和`new`关键字创建的对象是`Object`的实例，原型指向`Object.prototype`，继承内置对象`Object`。

`Object.create(arg, pro)`创建的对象的原型取决于`arg`，`arg`为`null`，新对象是空对象，没有原型，不继承任何对象；`arg`为指定对象，新对象的原型指向指定对象，继承指定对象。

 
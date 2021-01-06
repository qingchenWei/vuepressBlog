---
title: CSS盒子模型
date: 2020-08-04
publish: true
tags:
 -  vue
 - css
 - html
categories: 
 -  Css+Html
---

:::tip Abstract
1. CSS盒子模型 - IE盒模型和W3C标准盒模型
2. flex弹性伸缩盒子模型 多列布局盒子模型（column）
:::

<!-- more -->

## W3C 标准盒模型：

  属性width,height只包含内容content，不包含border和padding。

  ![W3C标准盒子模型](https://pic4.zhimg.com/80/v2-ad08059be04698f8a70d2729cea8ec18_720w.jpg)

## IE 盒模型

  属性width,height包含border和padding，指的是content+padding+border。

  ![IE盒子模型](https://pic3.zhimg.com/80/v2-d755200d4f64ca2463b75375a2b47d26_720w.jpg)

  在ie8+浏览器中使用哪个盒模型可以由box-sizing(CSS新增的属性)控制，默认值为content-box，即标准盒模型；如果将box-sizing设为border-box则用的是IE盒模型。如果在ie6,7,8中DOCTYPE缺失会触发IE模式。在当前W3C标准中盒模型是可以通过box-sizing自由的进行切换的。

  content-box（标准盒模型）
  width = 内容的宽度
  height = 内容的高度
  border-box（IE盒模型）
  width = border + padding + 内容的宽度
  height = border + padding + 内容的高度

  由于其content内容会自动变化而不会改变整个元素所占位置的缘故，该盒子模型在各大公司项目中也有广泛使用的现象。

除此之外，还包含一些额外的非公认的盒子模型，例如Flex弹性伸缩盒子模型，多列布局盒子模型（Column）

 
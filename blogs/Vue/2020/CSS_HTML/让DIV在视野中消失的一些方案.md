---
title: 让DIV在视野中消失的一些方案
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
1. 让div在视野中消失的一些方案
2. 最常见的是 hidden none 和 opacity（filter）
:::

<!-- more -->

```css
position:absolute/relative/fixed  +  方位 top/bottom/left/right: -9999px
display:none
visibility:hidden
width:0 + overflow:hidden
  height:0 +  overflow:hidden
margin-top/bottom/left/right:-9999px;
background-color:transparent
opacity:0 
(filter:alpha(opacity=0);       /* IE */)
transform: translateX(-9999px)/translateY(-9999px)/translate(-9999px,-9999px)
transform: scale(0)
```

其中，最有用的是

```css
display:none
visibility:hidden
opacity:0 
(filter:alpha(opacity=0);       /* IE */)
```

display直接人没了，而其它两位都还在。

剩下的都是拉胯的方案，不建议使用。

 
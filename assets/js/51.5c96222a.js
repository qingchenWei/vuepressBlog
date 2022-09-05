(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{557:function(s,n,t){"use strict";t.r(n);var e=t(4),a=Object(e.a)({},(function(){var s=this,n=s.$createElement,t=s._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[s._v("Abstract")]),s._v(" "),t("ol",[t("li",[s._v("关于javascript事件捕获和冒泡的说明")])])]),s._v(" "),t("h2",{attrs:{id:"_1-事件冒泡与事件捕获"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-事件冒泡与事件捕获"}},[s._v("#")]),s._v(" 1. 事件冒泡与事件捕获")]),s._v(" "),t("p",[s._v("事件冒泡和事件捕获分别由微软和网景公司提出，这两个概念都是为了解决页面中"),t("strong",[s._v("事件流")]),s._v("（事件发生顺序）的问题。")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('<div id="outer">\n    <p id="inner">Click me!</p>\n</div>复制代码\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("上面的代码当中一个div元素当中有一个p子元素，如果两个元素都有一个click的处理函数，那么我们怎么才能知道哪一个函数会首先被触发呢？")]),s._v(" "),t("p",[s._v("为了解决这个问题微软和网景提出了两种几乎完全相反的概念。")]),s._v(" "),t("h3",{attrs:{id:"事件冒泡"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#事件冒泡"}},[s._v("#")]),s._v(" 事件冒泡")]),s._v(" "),t("p",[s._v("微软提出了名为"),t("strong",[s._v("事件冒泡")]),s._v("(event bubbling)的事件流。事件冒泡可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。")]),s._v(" "),t("p",[s._v("因此上面的例子在事件冒泡的概念下发生click事件的顺序应该是")]),s._v(" "),t("p",[t("strong",[s._v("p -> div -> body -> html -> document")])]),s._v(" "),t("h3",{attrs:{id:"事件捕获"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#事件捕获"}},[s._v("#")]),s._v(" 事件捕获")]),s._v(" "),t("p",[s._v("网景提出另一种事件流名为"),t("strong",[s._v("事件捕获")]),s._v("(event capturing)。与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。")]),s._v(" "),t("p",[s._v("上面的例子在事件捕获的概念下发生click事件的顺序应该是")]),s._v(" "),t("p",[t("strong",[s._v("document -> html -> body -> div -> p")])]),s._v(" "),t("p",[t("strong",[s._v("事件冒泡和事件捕获过程图：")])]),s._v(" "),t("p",[t("img",{attrs:{src:"https://s1.ax1x.com/2020/08/07/aRsCFI.png",alt:"aRsCFI.png"}})]),s._v(" "),t("p",[s._v("1-5是捕获过程，5-6是目标阶段，6-10是冒泡阶段；")]),s._v(" "),t("h2",{attrs:{id:"_2-addeventlistener-的第三个参数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-addeventlistener-的第三个参数"}},[s._v("#")]),s._v(" 2. addEventListener 的第三个参数")]),s._v(" "),t("p",[s._v("DOM2级事件”中规定的事件流同时支持了事件捕获阶段和事件冒泡阶段，而作为开发者，我们可以选择事件处理函数在哪一个阶段被调用。")]),s._v(" "),t("p",[s._v("addEventListener方法用来为一个特定的元素绑定一个事件处理函数，是JavaScript中的常用方法。addEventListener有三个参数：")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(" element.addEventListener(event, function, useCapture)复制代码\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("table",[t("thead",[t("tr",[t("th",[s._v("参数")]),s._v(" "),t("th",[s._v("描述")])])]),s._v(" "),t("tbody",[t("tr",[t("td",[s._v("event")]),s._v(" "),t("td",[s._v("必须。字符串，指定事件名。  "),t("strong",[s._v("注意:")]),s._v(' 不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。   '),t("strong",[s._v("提示：")]),s._v(" 所有 HTML DOM 事件，可以查看我们完整的 "),t("a",{attrs:{href:"http://www.runoob.com/jsref/dom-obj-event.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("HTML DOM Event 对象参考手册"),t("OutboundLink")],1),s._v("。")])]),s._v(" "),t("tr",[t("td",[s._v("function")]),s._v(" "),t("td",[s._v('必须。指定要事件触发时执行的函数。   当事件对象会作为第一个参数传入函数。 事件对象的类型取决于特定的事件。例如， "click" 事件属于 MouseEvent(鼠标事件) 对象。')])]),s._v(" "),t("tr",[t("td",[s._v("useCapture")]),s._v(" "),t("td",[s._v("可选。布尔值，指定事件是否在捕获或冒泡阶段执行。  可能值:true - 事件句柄在捕获阶段执行（即在事件捕获阶段调用处理函数）false- false- 默认。事件句柄在冒泡阶段执行（即表示在事件冒泡的阶段调用事件处理函数）")])])])]),s._v(" "),t("h2",{attrs:{id:"_3-事件代理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-事件代理"}},[s._v("#")]),s._v(" 3. 事件代理")]),s._v(" "),t("p",[s._v("在实际的开发当中，利用事件流的特性，我们可以使用一种叫做事件代理的方法。")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('<ul class="color_list">        \n    <li>red</li>        \n    <li>orange</li>        \n    <li>yellow</li>        \n    <li>green</li>        \n    <li>blue</li>        \n    <li>purple</li>    \n</ul>\n<div class="box"></div>复制代码\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v(".color_list{            \n    display: flex;            \n    display: -webkit-flex;        \n}        \n.color_list li{            \n    width: 100px;            \n    height: 100px;            \n    list-style: none;            \n    text-align: center;            \n    line-height: 100px;        \n}\n//每个li加上对应的颜色，此处省略\n.box{            \n    width: 600px;            \n    height: 150px;            \n    background-color: #cccccc;            \n    line-height: 150px;            \n    text-align: center;        \n}\n复制代码\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://s1.ax1x.com/2020/08/07/aRspTA.png",alt:"aRspTA.png"}})]),s._v(" "),t("p",[s._v("我们想要在点击每个 li 标签时，输出li当中的颜色"),t("code",[s._v("（innerHTML）")]),s._v(" 。常规做法是遍历每个 li ,然后在每个 li 上绑定一个点击事件：")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('var color_list=document.querySelector(".color_list");            \nvar colors=color_list.getElementsByTagName("li");            \nvar box=document.querySelector(".box");            \nfor(var n=0;n<colors.length;n++){                \n    colors[n].addEventListener("click",function(){                    \n        console.log(this.innerHTML)                    \n        box.innerHTML="该颜色为 "+this.innerHTML;                \n    })            \n}复制代码\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br")])]),t("p",[s._v("这种做法在 li 较少的时候可以使用，但如果有一万个 li ，那就会导致性能降低（少了遍历所有 li 节点的操作，性能上肯定更加优化）。")]),s._v(" "),t("p",[s._v("这时就需要事件代理出场了，利用事件流的特性，我们只绑定一个事件处理函数也可以完成：")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('function colorChange(e){                \n    var e=e||window.event;//兼容性的处理         \n    if(e.target.nodeName.toLowerCase()==="li"){                    \n        box.innerHTML="该颜色为 "+e.target.innerHTML;                \n    }                            \n}            \ncolor_list.addEventListener("click",colorChange,false)复制代码\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("p",[s._v("**由于事件冒泡机制，点击了 li 后会冒泡到 ul ，此时就会触发绑定在 ul 上的点击事件，再利用 target 找到事件实际发生的元素，就可以达到预期的效果。\n**")]),s._v(" "),t("p",[t("strong",[s._v("使用事件代理的好处不仅在于将多个事件处理函数减为一个，而且对于不同的元素可以有不同的处理方法。假如上述列表元素当中添加了其他的元素节点（如：a、span等），我们不必再一次循环给每一个元素绑定事件，直接修改事件代理的事件处理函数即可。")]),s._v("**\n**")]),s._v(" "),t("p",[t("strong",[s._v("（1）toLowerCase()")]),s._v(" 方法用于把字符串转换为小写。**语法：**stringObject.toLowerCase()")]),s._v(" "),t("p",[s._v("**返回值：**一个新的字符串，在其中 stringObject 的所有大写字符全部被转换为了小写字符。")]),s._v(" "),t("p",[t("strong",[s._v("（2）nodeName")]),s._v(" 属性指定节点的节点名称。如果节点是元素节点，则 nodeName 属性返回标签名。如果节点是属性节点，则 nodeName 属性返回属性的名称。对于其他节点类型，nodeName 属性返回不同节点类型的不同名称。")]),s._v(" "),t("p",[t("strong",[s._v("所有主流浏览器均支持 nodeName 属性。")])]),s._v(" "),t("h3",{attrs:{id:"冒泡还是捕获"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#冒泡还是捕获"}},[s._v("#")]),s._v(" 冒泡还是捕获？")]),s._v(" "),t("p",[s._v("对于事件代理来说，在事件捕获或者事件冒泡阶段处理并没有明显的优劣之分，但是由于事件冒泡的事件流模型被所有主流的浏览器兼容，从兼容性角度来说还是建议大家使用事件冒泡模型。")]),s._v(" "),t("h3",{attrs:{id:"ie浏览器兼容"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ie浏览器兼容"}},[s._v("#")]),s._v(" IE浏览器兼容")]),s._v(" "),t("p",[s._v("IE浏览器对addEventListener兼容性并不算太好，只有IE9以上可以使用。")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://s1.ax1x.com/2020/08/07/aRsifP.png",alt:"aRsifP.png"}})]),s._v(" "),t("p",[s._v("要兼容旧版本的IE浏览器，可以使用IE的attachEvent函数")]),s._v(" "),t("blockquote",[t("p",[s._v("object.attachEvent(event, function)")])]),s._v(" "),t("p",[s._v('两个参数与addEventListener相似，分别是事件和处理函数，默认是事件冒泡阶段调用处理函数，要注意的是，写事件名时候要加上"on"前缀（"onload"、"onclick"等）。')]),s._v(" "),t("h3",{attrs:{id:"阻止事件冒泡"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#阻止事件冒泡"}},[s._v("#")]),s._v(" 阻止事件冒泡")]),s._v(" "),t("p",[t("strong",[s._v("1. 给子级加 event.stopPropagation( )")])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('$("#div1").mousedown(function(e){\n    var e=event||window.event;\n    event.stopPropagation();\n});复制代码\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[t("strong",[s._v("2. 在事件处理函数中返回 false")])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v('$("#div1").mousedown(function(event){\n    var e=e||window.event;\n    return false;\n});复制代码\n')])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("但是这两种方式是有区别的。"),t("code",[s._v("return false")]),s._v(" 不仅阻止了事件往上冒泡，而且阻止了事件本身(默认事件)。"),t("code",[s._v("event.stopPropagation()")]),s._v("则只阻止事件往上冒泡，不阻止事件本身。")]),s._v(" "),t("p",[t("strong",[s._v("3. event.target==event.currentTarget，让触发事件的元素等于绑定事件的元素，也可以阻止事件冒泡；")])]),s._v(" "),t("p",[t("img",{attrs:{src:"https://s1.ax1x.com/2020/08/07/aRsPYt.png",alt:"aRsPYt.png"}}),t("img",{attrs:{src:"https://s1.ax1x.com/2020/08/07/aRsSwd.png",alt:"aRsSwd.png"}})]),s._v(" "),t("h3",{attrs:{id:"阻止默认事件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#阻止默认事件"}},[s._v("#")]),s._v(" 阻止默认事件")]),s._v(" "),t("p",[s._v("（1）event.preventDefault( )")]),s._v(" "),t("p",[s._v("（2）return false")])])}),[],!1,null,null,null);n.default=a.exports}}]);
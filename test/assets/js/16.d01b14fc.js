(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{523:function(a,t,s){"use strict";s.r(t);var e=s(4),r=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"vue2-0基于vuex、axios拦截器实现loading效果"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue2-0基于vuex、axios拦截器实现loading效果"}},[a._v("#")]),a._v(" vue2.0基于vuex、axios拦截器实现loading效果")]),a._v(" "),s("h3",{attrs:{id:"_1-在main-js中先引入axios、qs以及引进vuex-import-axios-from-axios-import-qs-from-qs-import-store-from-vuex"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-在main-js中先引入axios、qs以及引进vuex-import-axios-from-axios-import-qs-from-qs-import-store-from-vuex"}},[a._v("#")]),a._v(' 1.在main.js中先引入axios、qs以及引进vuex import axios from “axios” import qs from “qs” import store from "./vuex"')]),a._v(" "),s("h3",{attrs:{id:"_2-在main-js中设置全局axios"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-在main-js中设置全局axios"}},[a._v("#")]),a._v(" 2.在main.js中设置全局axios")]),a._v(" "),s("h1",{attrs:{id:""}},[s("a",{staticClass:"header-anchor",attrs:{href:"#"}},[a._v("#")]),a._v(" (```)")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v("//全局axios\naxios.defaults.timeout = 15000; //请求超时时间  发送请求后，多长时间还没有收到请求答复，就超时报错\nVue.prototype.$ajax = axios;//将axios请求挂载到 Vue.prototype上，将axios改写为vue的原型属性，在原型上定义它们使其在每个 Vue 的实例中可用。\nVue.prototype.$qs = qs;\n")])])]),s("h1",{attrs:{id:"-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#-2"}},[a._v("#")]),a._v(" (```)")]),a._v(" "),s("h3",{attrs:{id:"_3-定义一个拦截器和一个响应拦截器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-定义一个拦截器和一个响应拦截器"}},[a._v("#")]),a._v(" 3.定义一个拦截器和一个响应拦截器")]),a._v(" "),s("h1",{attrs:{id:"-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#-3"}},[a._v("#")]),a._v(" (```)")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v("//定义一个拦截器\naxios.interceptors.request.use(function(config) {\n//在请求发出之前进行一些操作\nstore.state.loadding = true;\nreturn config;\n});\n//定义一个响应拦截器\naxios.interceptors.response.use(function(config) {\n//在这里对返回的值进行处理\nstore.state.loadding = false;\nreturn config;\n});\n在这里可以看到其中有vuex中store.state的数据代码\n")])])]),s("h1",{attrs:{id:"-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#-4"}},[a._v("#")]),a._v(" (```)")]),a._v(" "),s("h3",{attrs:{id:"_4-在vuex中修改store-state的数据"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-在vuex中修改store-state的数据"}},[a._v("#")]),a._v(" 4.在vuex中修改store.state的数据")]),a._v(" "),s("h1",{attrs:{id:"-5"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#-5"}},[a._v("#")]),a._v(" (```)")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v('import Vue from "vue";\nimport vueX from "vuex";\nVue.use(vueX);\nvar store=new vueX.Store({      \n        state{\n            //状态\n            loadding:false\n        }，\n        mutations：{\n            //loadding状态修改方法\n            //store.commit()调用\n            showloadding(state, load) {\n                state.loadding = load;\n            },\n        }，\n})\n//！！！导出store \nexport default store\n')])])]),s("h1",{attrs:{id:"-6"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#-6"}},[a._v("#")]),a._v(" (```)")]),a._v(" "),s("h3",{attrs:{id:"_5-然后需要一个显示在页面的loadding-我这里用的是vant的loadding-在app-vue中将vant的loadding代码和router-view写在一起这样在路由跳转时没有请求到数据之前都会显示loadding加载中-自定义loadding样式及显示位置-app-vue"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-然后需要一个显示在页面的loadding-我这里用的是vant的loadding-在app-vue中将vant的loadding代码和router-view写在一起这样在路由跳转时没有请求到数据之前都会显示loadding加载中-自定义loadding样式及显示位置-app-vue"}},[a._v("#")]),a._v(" 5.然后需要一个显示在页面的loadding 我这里用的是vant的loadding 在App.vue中将vant的loadding代码和router-view写在一起这样在路由跳转时没有请求到数据之前都会显示loadding加载中 自定义loadding样式及显示位置 App.vue")])])}),[],!1,null,null,null);t.default=r.exports}}]);
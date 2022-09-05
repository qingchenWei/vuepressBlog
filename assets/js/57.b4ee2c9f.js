(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{561:function(_,v,t){"use strict";t.r(v);var a=t(4),s=Object(a.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[_._v("Abstract")]),_._v(" "),t("ol",[t("li",[_._v("常见的 web 安全面试题")]),_._v(" "),t("li",[t("a",{attrs:{href:"https://juejin.im/post/6844904100945985543",target:"_blank",rel:"noopener noreferrer"}},[_._v("来源"),t("OutboundLink")],1)])])]),_._v(" "),t("h2",{attrs:{id:"_0-cia三元组知道吗"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_0-cia三元组知道吗"}},[_._v("#")]),_._v(" 0.CIA三元组知道吗？")]),_._v(" "),t("ul",[t("li",[_._v("机密性（"),t("code",[_._v("Confidentiality")]),_._v("）")]),_._v(" "),t("li",[_._v("完整性（"),t("code",[_._v("Integrity")]),_._v("）")]),_._v(" "),t("li",[_._v("可用性（"),t("code",[_._v("Availability")]),_._v("）")])]),_._v(" "),t("h2",{attrs:{id:"_1-xss攻击是如何产生的"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-xss攻击是如何产生的"}},[_._v("#")]),_._v(" 1.XSS攻击是如何产生的？")]),_._v(" "),t("p",[_._v("黑客在你的浏览器中插入一段恶意 "),t("code",[_._v("JavaScript")]),_._v(" 脚本，窃取你的隐私信息、冒充你的身份进行操作。这就是 XSS 攻击("),t("code",[_._v("Cross-Site Scripting")]),_._v("，跨站脚本攻击)")]),_._v(" "),t("p",[_._v("因为浏览器无法区分脚本是被恶意注入的还是正常的内容，它都会执行，况且 "),t("code",[_._v("HTML")]),_._v(" 非常灵活，可以在任何时候对它进行修改。")]),_._v(" "),t("h2",{attrs:{id:"_2-知道xss有哪几种类型吗"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-知道xss有哪几种类型吗"}},[_._v("#")]),_._v(" 2.知道XSS有哪几种类型吗？")]),_._v(" "),t("p",[_._v("（送分题）")]),_._v(" "),t("ul",[t("li",[_._v("反射型 XSS (也叫非持久型)")]),_._v(" "),t("li",[_._v("基于 DOM 的 XSS")]),_._v(" "),t("li",[_._v("存储型 XSS (也叫持久型 XSS)")])]),_._v(" "),t("h2",{attrs:{id:"_3-分别说一下它们的实现原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-分别说一下它们的实现原理"}},[_._v("#")]),_._v(" 3.分别说一下它们的实现原理")]),_._v(" "),t("p",[t("code",[_._v("反射型")]),_._v("：顾名思义，恶意 "),t("code",[_._v("JavaScript")]),_._v(" 脚本属于用户发送给网站请求中的一部分，随后网站又将这部分返回给用户，恶意脚本在页面中被执行。一般发生在前后端一体的应用中，服务端逻辑会改变最终的网页代码。")]),_._v(" "),t("p",[t("code",[_._v("基于DOM型")]),_._v("：目前更流行前后端分离的项目，反射型 XSS 无用武之地。 但这种攻击不需要经过服务器，我们知道，网页本身的 "),t("code",[_._v("JavaScript")]),_._v(" 也是可以改变 "),t("code",[_._v("HTML")]),_._v(" 的，黑客正是利用这一点来实现插入恶意脚本。")]),_._v(" "),t("p",[t("code",[_._v("存储型")]),_._v("：又叫持久型 XSS，顾名思义，黑客将恶意 "),t("code",[_._v("JavaScript")]),_._v(" 脚本长期保存在服务端数据库中，用户一旦访问相关页面数据，恶意脚本就会被执行。常见于搜索、微博、社区贴吧评论等。")]),_._v(" "),t("h2",{attrs:{id:"_4-说一说它们之间的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-说一说它们之间的区别"}},[_._v("#")]),_._v(" 4.说一说它们之间的区别")]),_._v(" "),t("p",[t("code",[_._v("反射型的 XSS")]),_._v(" 的恶意脚本存在 "),t("code",[_._v("URL")]),_._v(" 里，"),t("code",[_._v("存储型 XSS")]),_._v(" 的恶意代码存在数据库里。")]),_._v(" "),t("p",[_._v("而基于"),t("code",[_._v("DOM型的XSS")]),_._v(" 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 "),t("code",[_._v("JavaScript")]),_._v(" 自身的安全漏洞，其他两种 "),t("code",[_._v("XSS")]),_._v(" 都属于服务端的安全漏洞。")]),_._v(" "),t("h2",{attrs:{id:"_5-再画个图解释一下"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-再画个图解释一下"}},[_._v("#")]),_._v(" 5.再画个图解释一下")]),_._v(" "),t("h3",{attrs:{id:"反射型-xss"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#反射型-xss"}},[_._v("#")]),_._v(" 反射型 XSS")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://s1.ax1x.com/2020/09/13/wBpuDJ.png",alt:"wBpuDJ.png"}})]),_._v(" "),t("h3",{attrs:{id:"存储型-xss"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#存储型-xss"}},[_._v("#")]),_._v(" 存储型 XSS")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://s1.ax1x.com/2020/09/13/wBpKb9.png",alt:"wBpKb9.png"}})]),_._v(" "),t("h3",{attrs:{id:"dom型-xss"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dom型-xss"}},[_._v("#")]),_._v(" DOM型 XSS")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://s1.ax1x.com/2020/09/13/wBpnu4.png",alt:"wBpnu4.png"}})]),_._v(" "),t("h2",{attrs:{id:"_6-黑客可以通过xss攻击做哪些事儿"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-黑客可以通过xss攻击做哪些事儿"}},[_._v("#")]),_._v(" 6.黑客可以通过XSS攻击做哪些事儿？")]),_._v(" "),t("ul",[t("li",[_._v("盗取用户 Cookie")]),_._v(" "),t("li",[_._v("未授权操作")]),_._v(" "),t("li",[_._v("修改 DOM")]),_._v(" "),t("li",[_._v("刷浮窗广告")]),_._v(" "),t("li",[_._v("发动 XSS 蠕虫攻击")]),_._v(" "),t("li",[_._v("劫持用户行为，进一步渗透内网")])]),_._v(" "),t("h2",{attrs:{id:"_7-xss攻击如何进行防护"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7-xss攻击如何进行防护"}},[_._v("#")]),_._v(" 7.XSS攻击如何进行防护？")]),_._v(" "),t("ul",[t("li",[_._v("一切用户输入皆不可信，"),t("code",[_._v("在输出时进行验证")])]),_._v(" "),t("li",[_._v("将 "),t("code",[_._v("HTML 元素内容、属性以及 URL 请求参数、CSS 值进行编码")])]),_._v(" "),t("li",[_._v("当编码影响业务时，使用"),t("code",[_._v("白名单规则进行检测和过滤")])]),_._v(" "),t("li",[_._v("使用 W3C 提出的 "),t("code",[_._v("CSP (Content Security Policy，内容安全策略)")]),_._v("，定义域名白名单")]),_._v(" "),t("li",[_._v("设置 "),t("code",[_._v("Cookie 的 HttpOnly")]),_._v(" 属性")])]),_._v(" "),t("h2",{attrs:{id:"_8-知道哪些xss攻击案例简单说一下"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_8-知道哪些xss攻击案例简单说一下"}},[_._v("#")]),_._v(" 8.知道哪些XSS攻击案例简单说一下")]),_._v(" "),t("ul",[t("li",[_._v("2005年，年仅19岁的 Samy Kamkar 发起了对 MySpace.com 的 XSS Worm 攻击。 Samy Kamkar 的蠕虫在短短几小时内就感染了100万用户——它在每个用户的自我简介后边加了一句话：“but most of all, Samy is my hero.”（Samy是我的偶像）。这是 Web 安全史上第一个重量级的 XSS Worm，具有里程碑意义。")]),_._v(" "),t("li",[_._v("2007年12月，百度空间收到蠕虫攻击，用户之间开始转发垃圾短消息。")]),_._v(" "),t("li",[_._v("QQ 邮箱 m.exmail.qq.com 域名被发现反射型 XSS 漏洞")]),_._v(" "),t("li",[_._v("2011年新浪微博曾被黑客 XSS 攻击，黑客诱导用户点击一个带有诱惑性的链接，便会自动发送一条带有同样诱惑性链接微博。攻击范围层层扩大，也是一种蠕虫攻击。")])]),_._v(" "),t("h2",{attrs:{id:"_9-什么是csrf攻击"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_9-什么是csrf攻击"}},[_._v("#")]),_._v(" 9.什么是CSRF攻击？")]),_._v(" "),t("p",[_._v("CSRF 英文全称是 "),t("code",[_._v("Cross-site request forgery")]),_._v("，又称为“跨站请求伪造”。")]),_._v(" "),t("p",[_._v("顾名思义，"),t("code",[_._v("CSRF 攻击就是黑客引诱用户打开黑客的网站，利用用户的登陆状态发起跨站请求。")])]),_._v(" "),t("p",[_._v("降维解释：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。 利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证， 达到冒充用户对被攻击的网站执行某项操作的目的。")]),_._v(" "),t("h2",{attrs:{id:"_10-csrf攻击一般怎么实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_10-csrf攻击一般怎么实现"}},[_._v("#")]),_._v(" 10.CSRF攻击一般怎么实现？")]),_._v(" "),t("ul",[t("li",[_._v("最容易实现的是 "),t("code",[_._v("Get")]),_._v(" 请求，一般进入黑客网站后，可以通过设置 "),t("code",[_._v("img")]),_._v("的 "),t("code",[_._v("src")]),_._v(" 属性来自动发起请求")]),_._v(" "),t("li",[_._v("在黑客的网站中，构造隐藏表单来自动发起 "),t("code",[_._v("Post")]),_._v(" 请求")]),_._v(" "),t("li",[_._v("通过引诱链接诱惑用户点击触发请求，利用 "),t("code",[_._v("a")]),_._v(" 标签的 "),t("code",[_._v("href")]),_._v("。")])]),_._v(" "),t("h2",{attrs:{id:"_11-csrf攻击和xss攻击有什么区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_11-csrf攻击和xss攻击有什么区别"}},[_._v("#")]),_._v(" 11.CSRF攻击和XSS攻击有什么区别？")]),_._v(" "),t("p",[_._v("CSRF 攻击不需要将恶意代码注入用户的页面，仅仅是利用服务器的漏洞和用户的登录状态来实施攻击。")]),_._v(" "),t("p",[_._v("CSRF 攻击成本也比 XSS 低，用户每天都要访问大量网页，无法确认每一个网页的合法性， 从用户角度来说，无法彻底防止 CSRF 攻击。")]),_._v(" "),t("h2",{attrs:{id:"_12-那应该如何防范csrf攻击"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_12-那应该如何防范csrf攻击"}},[_._v("#")]),_._v(" 12.那应该如何防范CSRF攻击？")]),_._v(" "),t("ul",[t("li",[_._v("针对实际情况，设置关键 Cookie 的 "),t("code",[_._v("SameSite")]),_._v(" 属性为 "),t("code",[_._v("Strict")]),_._v(" 或 "),t("code",[_._v("Lax")])]),_._v(" "),t("li",[_._v("服务端验证请求来源站点("),t("code",[_._v("Referer、Origin")]),_._v(")")]),_._v(" "),t("li",[_._v("使用 "),t("code",[_._v("CSRF Token")]),_._v("，服务端随机生成返回给浏览器的 Token，每一次请求都会携带不同的 CSRF Token")]),_._v(" "),t("li",[_._v("加入二次验证(独立的支付密码)")])]),_._v(" "),t("h2",{attrs:{id:"_13-关于web密码学你了解哪些呢"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_13-关于web密码学你了解哪些呢"}},[_._v("#")]),_._v(" 13.关于Web密码学你了解哪些呢？")]),_._v(" "),t("ul",[t("li",[_._v("对称加密算法\n"),t("ul",[t("li",[_._v("对称加密算法就是加密和解密使用同一个密钥，简单粗暴")]),_._v(" "),t("li",[_._v("常见的经典对称加密算法有 "),t("code",[_._v("DES、AES(AES-128)、IDEA、国密SM1、国密SM4")])])])]),_._v(" "),t("li",[_._v("非对称加密算法\n"),t("ul",[t("li",[_._v("非对称加密就是加密和解密使用不同的密钥。发送方使用公钥对信息进行加密，接收方收到密文后，使用私钥进行解密。")]),_._v(" "),t("li",[_._v("主要解决了密钥分发的难题")]),_._v(" "),t("li",[_._v("我们常说的签名就是私钥加密")]),_._v(" "),t("li",[_._v("常见的经典非对称加密算法有"),t("code",[_._v("RSA、ECC和国密SM2")])])])]),_._v(" "),t("li",[_._v("散列算法\n"),t("ul",[t("li",[_._v("不可逆性、鲁棒性、唯一性")]),_._v(" "),t("li",[t("code",[_._v("MD5、SHA(SHA-256)、国密SM3")])]),_._v(" "),t("li",[_._v("使用时记得加盐")])])])]),_._v(" "),t("p",[t("code",[_._v("AES")]),_._v(" 是国际上最认可的密码学算法，只要算力没有极大的突破性进展，这种算法在可预期的未来都是安全的。")]),_._v(" "),t("p",[t("code",[_._v("ECC")]),_._v(" 是目前国际上加密强度最高的非对称加密算法。")]),_._v(" "),t("p",[t("code",[_._v("MD5")]),_._v(" 和 "),t("code",[_._v("SHA")]),_._v(" 的唯一性被*解了，但是大部分场景下，不会构成安全问题。一般使用 "),t("code",[_._v("SHA-256 加盐")]),_._v("即可满足大部分使用场景。")]),_._v(" "),t("h2",{attrs:{id:"_14-简单说一下https的实现原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_14-简单说一下https的实现原理"}},[_._v("#")]),_._v(" 14.简单说一下HTTPS的实现原理")]),_._v(" "),t("ol",[t("li",[_._v("Client 发送 "),t("code",[_._v("random1+对称加密套件列表+非对称加密套件列表")])]),_._v(" "),t("li",[_._v("Server 收到信息， 选择 "),t("code",[_._v("对称加密套件+非对称加密套件 并和 random2+证书(公钥在证书中)")]),_._v(" 一起返回")]),_._v(" "),t("li",[_._v("Client 验证证书有效性，并用 "),t("code",[_._v("random1+random2 生成 pre-master 通过服务器公钥加密+浏览器确认")]),_._v(" 发送给 Server")]),_._v(" "),t("li",[_._v("Server 收到 pre-master，"),t("code",[_._v("根据约定的加密算法对 random1+random2+pre-master（解密）生成 master-secret，然后发送服务器确认")])]),_._v(" "),t("li",[_._v("Client 收到生成同样的 "),t("code",[_._v("master-secert")]),_._v("，对称加密秘钥传输完毕")])]),_._v(" "),t("p",[_._v("(基操，勿6)")]),_._v(" "),t("p",[_._v("HTTPS 在 TCP 和 HTTP 中间加入了 SSL/TLS 安全层。")]),_._v(" "),t("ul",[t("li",[_._v("对发起 HTTP 请求的数据进行加密操作")]),_._v(" "),t("li",[_._v("对接收到 HTTP 的内容进行解密操作。")])]),_._v(" "),t("p",[_._v("采用对称加密的方式加密传输数据和非对称加密的方式来传输密钥，既可以解决传输效率问题也能保证两端数据的安全传输。除此之外，为了能够证明服务器是可靠的，引入了数字证书，让浏览器验证证书的可靠性。")])])}),[],!1,null,null,null);v.default=s.exports}}]);
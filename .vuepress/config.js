module.exports = {
  title: "卫鹏辉",
  description: "这世界上没有优秀的理念，只有脚踏实地的结果。",
  base: "/mypro/",
  dest: "test",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
    [
      "script",
      {
        language: "javascript",
        type: "text/javascript",
        src: "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js",
      },
    ],
    // 引入鼠标点击脚本
    [
      "script",
      {
        language: "javascript",
        type: "text/javascript",
        src: "/click.js",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "时间线",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "链接",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/qingchenWei",
            icon: "reco-github",
          },
        ],
      },
    ],
    sidebar: {
      "/docs/theme-reco/": ["", "theme", "plugin", "api"],
    },
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "分类",
      },
      tag: {
        location: 3,
        text: "标签",
      },
    },
    logo: "/avatar.png",
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: "auto",
    // 最后更新时间
    lastUpdated: "最后更新时间",
    // 作者
    author: "卫鹏辉",
    // 作者头像
    authorAvatar: "/avatar.png",
    // 备案号
    record: "20180610",
    // 项目开始时间
    startYear: "2018",
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "欢迎来到我的小屋！",
        hideIcon: "/failure.ico",
        hideText: "快点回来看看我！",
        recoverTime: 2000,
      },
    ],
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: [
          "koharu",
          "blackCat",
          "whiteCat",
          "haru1",
          "haru2",
          "haruto",
          "izumi",
          "shizuku",
          "wanko",
          "miku",
          "z16",
        ],
        clean: false,
        messages: {
          welcome: "我是lookroot欢迎你的关注 ",
          home: "心里的花，我想要带你回家。",
          theme: "好吧，希望你能喜欢我的其他小伙伴。",
          close: "不想看见我你可以关闭哦",
        },
        width: 240,
        height: 352,
      },
    ],
    // [
    //   'meting', {
    //     metingApi: "https://api.i-meto.com/meting/api",
    //     meting: {
    //       server: "netease",
    //       type: "playlist",
    //       mid: "2539599584",
    //     },          // 不配置该项的话不会出现全局播放器
    //     aplayer: {
    //       lrcType: 3
    //     }
    //   },
    // ],
  ],
};

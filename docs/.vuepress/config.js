module.exports = {
  base: "/Blog/",
  title: "Blog",
  ga: "",
  description: "个人工作资料与笔记",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ]
  ],
  port: 8201,
  markdown: {
    toc: {
      includeLevel: [2, 3, 4, 5, 6]
    }
  },
  themeConfig: {
    repo: "guiguzigang/Blog",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "欢迎指正",
    sidebarDepth: 3,
    displayAllHeaders: true,
    lastUpdated: "上次更新",
    serviceWorker: {
      updatePopup: true // Boolean | Object, 默认值是 undefined.
      // 如果设置为 true, 默认的文本配置将是:
      // updatePopup: {
      //    message: "New content is available.",
      //    buttonText: "Refresh"
      // }
    },
    nav: [
      {
        text: "笔记",
        link: "/note/"
      },
      {
        text: "框架",
        // link: '/framework/'
        items: [
          { text: "Vue", link: "/framework/vue/" },
          { text: "React", link: "/framework/react/" }
        ]
      },
      {
        text: "扩展阅读",
        link: "/more/"
      },
      {
        text: '资源',
        link: '/source/'
      }
    ],
    sidebar: {
      "/note/": [
        {
          title: "笔记",
          collapsable: false,
          children: [
            // "",
            "command"
          ]
        }
      ],
      "/framework/vue/": [
        {
          title: "Vue",
          collapsable: false,
          children: [""]
        },
        {
          title: "Vue-Router",
          collapsable: false,
          children: ["vue-router/"]
        },
        {
          title: 'Vuex',
          collapsable: false,
          children: [
            "vuex/",
            'vuex/hotreload'
          ]
        }
      ],
      "/framework/react/": [
        {
          title: "React",
          collapsable: false,
          children: [""]
        }
      ],
      "/source/": [
        {
          title: '前端资源',
          collapsable: false,
          children: [""]
        }
      ],
      "/more/": [
        {
          title: "扩展阅读",
          collapsable: false,
          children: [""]
        }
      ]
    }
  }
};
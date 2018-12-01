module.exports = {
  base: "/blog/",
  title: "Blog",
  ga: "",
  description: "个人工作资料与笔记",
  resolve: {
    alias: {
      'img': './public/img'
    }
  },
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
    repo: "guiguzigang/blog",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "欢迎指正",
    sidebarDepth: 3,
    displayAllHeaders: true,
    // lastUpdated: "上次更新",
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
        text: "前端技术栈",
        link: "/base/js/dom-event"
        // items: [
        //   { text: "JavaScript", link: "/base/js/" },
        //   { text: "CSS", link: "/base/css/" },
        //   { text: "HTTP", link: "/base/http/" },
        //   { text: "NodeJs", link: "/base/node/" },
        //   { text: "命令行工具", link: "/base/command/" }
        // ]
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
        link: "/more/performanceOptimization"
      },
      {
        text: '资源',
        link: '/source/'
      }
    ],
    sidebar: {
      "/base/": [
        /* {
          title: "前端技术栈",
          collapsable: false,
          children: [
            ''
          ]
        }, */
        {
          title: "JavaScript",
          collapsable: true,
          children: [
            'js/dom-event',
            'js/scopechain',
            "js/prototype",
            "js/class",
            'js/generator'
          ]
        },
        {
          title: "CSS",
          collapsable: true,
          children: [
            "css/box-model"
          ]
        },
        {
          title: "NodeJs",
          collapsable: true,
          children: ["node/"]
        },
        {
          title: "HTTP协议",
          collapsable: true,
          children: ["http/"]
        },
        {
          title: "命令行工具",
          collapsable: true,
          children: ["command/"]
        }
      ],
      // "/base/js/": [
      //   {
      //     title: "JavaScript",
      //     collapsable: false,
      //     children: [
      //       // ''
      //     ]
      //   },
      //   {
      //     title: "DOM事件",
      //     collapsable: false,
      //     children: [
      //       // '',
      //       'dom-event/',
      //       // 'scopechain/',
      //       // "prototype/",
      //       // 'generator/'
      //     ]
      //   }
      // ],
      // "/base/css/": [
      //   {
      //     title: "CSS",
      //     collapsable: false,
      //     children: [
      //       "box-model/"
      //     ]
      //   }
      // ],
      // "/base/http/": [
      //   {
      //     title: "HTTP协议",
      //     collapsable: false,
      //     children: [
      //       ""
      //     ]
      //   }
      // ],
      // "/base/node/": [
      //   {
      //     title: "NodeJs",
      //     collapsable: false,
      //     children: [
      //       ""
      //     ]
      //   }
      // ],
      // "/base/command/": [
      //   {
      //     title: "命令行工具",
      //     collapsable: false,
      //     children: [
      //       ""
      //     ]
      //   }
      // ],
      "/framework/vue/": [
        {
          title: "Vue",
          collapsable: true,
          children: [""]
        },
        {
          title: "Vue-Router",
          collapsable: true,
          children: ["vue-router/"]
        },
        {
          title: 'Vuex',
          collapsable: true,
          children: [
            "vuex/",
            'vuex/hotreload'
          ]
        },
        {
          title: '微信',
          collapsable: true,
          children: [
            "weixin/"
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
          children: [
            // "",
            "performanceOptimization"
          ]
        }
      ]
    }
  }
}
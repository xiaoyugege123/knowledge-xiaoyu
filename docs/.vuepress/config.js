import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { copyCodePlugin } from "@vuepress/plugin-copy-code";
import { searchPlugin } from "@vuepress/plugin-search";
import { gitPlugin } from '@vuepress/plugin-git'
import { readingTimePlugin } from '@vuepress/plugin-reading-time'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      {
        text: "内容介绍",
        link: "/intro/",
      },
      {
        text: "前端基础学习",
        link: "/base/",
      },
      {
        text: "数据结构与算法",
        children: [
          {text:'介绍',link:"/algorithm/README.md"},
          {text:"手撕数据结构",link:"/algorithm/手撕数据结构.md"},
          {
            text:"LeetCode算法题",
            children:[
              {text:"二叉树🍈",link:"/algorithm/二叉树🍈.md"},
              {text:"双指针_滑动窗口🍨",link:"/algorithm/双指针_滑动窗口🍨.md"},
              {text:"二分查找🍰",link:"/algorithm/二分查找🍰.md"},
              {text:"动态规划🍓",link:"/algorithm/动态规划🍓.md"},
              {text:"技巧_数学🍌",link:"/algorithm/技巧_数学🍌.md"},
              {text:"矩阵🍇",link:"/algorithm/矩阵🍇.md"},
              {text:"栈_堆🍊",link:"/algorithm/栈_堆🍊.md"},
              {text:"贪心🍉",link:"/algorithm/贪心🍉.md"},
              {text:"回溯算法🌽",link:"/algorithm/回溯算法🌽.md"}
            ]
          },
          {
            text:"算法推荐学习网站",
            children:[
              {text:"hello算法",link:"https://www.hello-algo.com/"},
              {text:"代码随想录",link:"https://www.programmercarl.com/"}
            ]
          }
        ],
      },
      {
        text: "计算机基础",
        children:[
          {text:"介绍",link:"/computer/README.md"},
          "/computer/计算机网络.md",
          "/computer/Web应用安全.md",
          "/computer/设计模式.md",
          "/computer/Linux.md",
          "/computer/数据库.md",
          "/computer/操作系统_编译原理.md",
          {
            text:"软件工程",
            children:[
              {text:"Git",link:"/computer/Git.md"}
            ]
          },
        ]
      },
      {
        text: "前端进阶",
        link: "/advance/",
      },
      {
        text: "项目",
        link: "/project/",
      },
      {
        text: "面试",
        link: "/interview/",
      },
    ],
    sidebar: {
      "/intro/": [
        {
          text: "内容介绍",
          children: [
            "/intro/pre.md",
            "/intro/README.md",
            "/intro/learn.md",
            "/intro/asset.md",
            "/intro/group.md",
          ],
        },
      ],
      "/base/": [
        {
          text: "前端基础学习",
          children: [
            "/base/README.md",
            "/base/JS模块化历程.md",
            "/base/AJAX.md",
            "/base/手写题.md",
            "/base/哦！又学到了！.md",
            "/base/CSS3.md",
            "/base/正则表达式.md",
            "/base/继承.md",
            "/base/拖拽.md",
          ],
        },
      ],
      "/algorithm/": [
        {
          text: "数据结构与算法",
          children: [
            "/algorithm/README.md",
            "/algorithm/手撕数据结构.md",
            "/algorithm/二叉树🍈.md",
            "/algorithm/双指针_滑动窗口🍨.md",
            "/algorithm/二分查找🍰.md",
            "/algorithm/动态规划🍓.md",
            "/algorithm/技巧_数学🍌.md",
            "/algorithm/矩阵🍇.md",
            "/algorithm/贪心🍉.md",
            "/algorithm/栈_堆🍊.md",
            "/algorithm/回溯算法🌽.md",
          ],
        },
      ],
      "/project/": [
        {
          text: "项目",
          children: [
            "/project/README.md",
            "/project/react-cli.md",
            "/project/vue-cli.md",
            "/project/summary.md",
          ],
        },
      ],
      "/interview/": [
        {
          text: "面试",
          children: [
            "/interview/README.md",
            "/interview/interview.md",
            "/interview/other.md",
            "/interview/CSRF.md",
            "/interview/coding.md",
            "/interview/codingStyle.md",
            "/interview/codeReview.md",
            "/interview/statusCode.md",
          ],
        },
      ],
      "/computer/":[
        {
          text:"计算机基础",
          children:[
            "/computer/README.md",
            "/computer/计算机网络.md",
            "/computer/Web应用安全.md",
            "/computer/设计模式.md",
            "/computer/Linux.md",
            "/computer/数据库.md",
            "/computer/操作系统_编译原理.md",
            "/computer/Git.md",
          ]
        }
      ],
      "/advance/":[
        {
          text:"前端进阶",
          children:[
            "/advance/README.md",
            "/advance/前端路由的实现原理.md",
            "/advance/数据代理Proxy.md",
            "/advance/前端性能优化.md",
            "/advance/Performance.md",
            "/advance/Webpack打包原理.md",
            "/advance/浏览器缓存.md",
            "/advance/中间件.md",
            "/advance/别想调试我的前端页面代码!.md",
            "/advance/花里胡哨的console.log.md",
            "/advance/前端如何防止接口重复提交.md",
            "/advance/消息推送技术.md",
          ]
        }
      ]
    },
  }),
  lang:"zh-CN",
  title: "🍰 小雨的学习记录",
  description:
    "在互联网的广阔天地，深知技术日新月异，不进则退，对前端开发的热爱，源于对生活持续学习、不断进步的态度",
  base: "/",
  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "/imgs/favicon.ico" }],
  ],
  plugins: [
    copyCodePlugin({
      // options
    }),
    searchPlugin({
      locales: {//搜索框在不同 locales 下的文字
        "/": {
          placeholder: "搜索",
        },
      },
      maxSuggestions:10,//指定搜索结果的最大条数
    }),
    gitPlugin({
      // 配置项
      createdTime: true,
      updatedTime: true,
      contributors:true,
    }),
    readingTimePlugin({
      // 配置项
      wordPerMinute:300
    }),
  ],
});

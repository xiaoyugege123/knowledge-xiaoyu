import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { copyCodePlugin } from "@vuepress/plugin-copy-code";
import { searchPlugin } from "@vuepress/plugin-search";
import { gitPlugin } from '@vuepress/plugin-git'

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
        link: "/algorithm/",
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
              {text:"贪心🍉",link:"/algorithm/贪心🍉.md"}
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
        link: "/computer/",
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
        link: "/origin/",
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
            "/base/base.md",
            "/base/config.md",
            "/base/development.md",
            "/base/css.md",
            "/base/image.md",
            "/base/output.md",
            "/base/clean.md",
            "/base/font.md",
            "/base/other.md",
            "/base/javascript.md",
            "/base/html.md",
            "/base/server.md",
            "/base/production.md",
            "/base/optimizeCss.md",
            "/base/minifyHtml.md",
            "/base/summary.md",
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
      "/origin/": [
        {
          text: "面试",
          children: [
            "/origin/README.md",
            "/origin/loader.md",
            "/origin/plugin.md",
            "/origin/summary.md",
          ],
        },
      ],
    },
  }),
  lang:"zh-CN",
  title: "🍰 小雨的学习记录",
  description:
    "在互联网的广阔天地，深知技术日新月异，不进则退，对前端开发的热爱，源于对生活持续学习、不断进步的态度",
  base: "/knowledge-xiaoyu/",
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
    }),
  ],
});

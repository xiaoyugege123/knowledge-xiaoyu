# Performance

> **什么是前端性能优化？**
>
> `前端性能`是指⻚⾯信息加⼯（⽐如数据展现、动画、操作效率等）的效率。
>
> `优化`是指借助相关技术⼿段提⾼这样的效率。

**文章参考**<br>
[前端性能优化之利用 Chrome Dev Tools 进行页面性能分析 - 知乎](https://zhuanlan.zhihu.com/p/105561186) <br>
[FP、FCP、FMP、LCP 都是什么 P？ - 知乎](https://zhuanlan.zhihu.com/p/495649475)

## 为什么前端性能如此重要?

我们知道，现在就是⼀个“流量为王”的时代，⼀个⽹站最重要的的就是⽤⼾，有了⽤⼾你才能有
业务，打⽐⽅，你是⼀个电商⽹站，那么你肯定希望你的⽤⼾越多越好，这样才会有更多的⼈去浏
览你的商品，从⽽在你的⽹站上花钱，买东西，这样你才能产⽣收益，但假如你的⽹站打开要⼗⼏
秒，请求接⼝要⼗⼏秒，那⽤⼾还愿意等么？

看⼀下以下的⽤⼾体验图：
![](https://img2.imgtp.com/2024/05/17/W0SHqC1V.jpg)

国外⼀些著名公司的调研：

- BBC ⻚⾯**加载时⻓每增加 1 秒，⽤⼾流失 10%**
- Pinterest**减少⻚⾯加载时⻓ 40%,提⾼了搜索和注册数 15%**
- DoubleClick 发现如果**移动⽹站加载时⻓超过 3 秒，53%的⽤⼾会放弃**

所以说，做好性能优化，提⾼⽤⼾体验很重要！

## ⽹⻚性能指标及影响因素

### Timing

⻚⾯运⾏的时间线（统计了从浏览器从⽹址开始导航到 `window.onload` 事件触发的⼀系列关键的时间点）：
![时间线](https://img2.imgtp.com/2024/05/18/eiAwfrNM.jpg)

### 关于 Performance API

> `Performance API`是⼀组⽤于衡量 web 应⽤性能的标准接⼝，学习链接：[Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)

**常⽤ Performance API：**<br>

- [performance.timing](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)可以获取⽹⻚运⾏过程中每个时间点对应的时间戳(绝对时间，ms)，但却即将**废弃**
  ![Timing](https://img2.imgtp.com/2024/05/18/KA0L3QiR.jpg)

- [performance.getEntries()](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/getEntries)，以对象数组的⽅式返回所有资源的数据，包括 css，img，script，
  xmlhttprequest，link 等等

- [performance.getEntriesByType(:string)](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)，和上⾯的 getEntries ⽅法类似，不过是多了⼀层类型
  的筛选，常⻅性能类型可以有**navigation(⻚⾯导航)、resource(资源加载)、paint（绘制指标）
  等**

```js
// ⻚⾯导航时间
performance.getEntriesByType("navigation");
// 静态资源
performance.getEntriesByType("resource");
// 绘制指标
performance.getEntriesByType("paint");

/*需要定时轮询， 才能持续获取性能指标*/
```

- [performance.getEntriesByName(name:string,type?:string)](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByName)，原理和上⾯的 getEntries ⽅法类似，多了⼀层名字的筛选，也可以传第⼆个参数再加⼀层类型的筛选

```js
performance.getEntriesByName(
  "https://i0.hdslb.com/bfs/svgnext/BDC/danmu_square_line/v1.json"
);

performance.getEntriesByName(
  "https://cloud.tencent.com/developer/api/user/session"
);

/*需要定时轮询， 才能持续获取性能指标*/
```

- [performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)，返回当前时间与`performance.timing.navigationStart`的时间差

```js
console.log(performance.now());
// 5483324.099999994
```

- [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)`（观察者模式）推荐，主要⽤于监测性能度量事件`

```js
/* 写法⼀ */
//直接往 PerformanceObserver() ⼊参匿名回调函数，成功 new 了⼀个PerformanceObserver 类的，名为 observer 的对象
var observer = new PerformanceObserver(function (list, obj) {
  var entries = list.getEntries();
  for (var i = 0; i < entries.length; i++) {
    //处理“navigation”和“resource”事件
  }
});
//调⽤ observer 对象的 observe() ⽅法
observer.observe({ entryTypes: ["navigation", "resource"] });

/* 写法⼆ */
//预先声明回调函数 perf_observer
function perf_observer(list, observer) {
  //处理“navigation”事件
}
//再将其传⼊ PerformanceObserver()，成功 new 了⼀个 PerformanceObserver 类的，名为observer2 的对象
var observer2 = new PerformanceObserver(perf_observer);
//调⽤ observer2 对象的 observe() ⽅法
observer2.observe({ entryTypes: ["navigation"] });
```

实例化 PerformanceObserver 对象，observe ⽅法的 entryTypes 主要性能类型有哪些？

```js
console.log(PerformanceObserver.supportedEntryTypes);
/*
['element', 'event', 'first-input', 'largest-contentful-paint', 'layoutshift',
'longtask', 'mark', 'measure', 'navigation', 'paint', 'resource',
'visibility-state']
*/
```

具体每个性能类型的含义：
|类型|描述|
|:--:|:---|
|element |元素加载时间，实例项是 PerformanceElementTiming 对象。|
|event| 事件延迟，实例项是 PerformanceEventTiming 对象。|
|first-input| ⽤⼾第⼀次与⽹站交互（即点击链接、点击按钮或使⽤⾃定义的 JavaScript 控件时）到浏览器实际能够响应该交互的时间，称之为 Firstinputdelay‒FID。|
|largest-contentful-paint| 屏幕上触发的最⼤绘制元素，实例项是 LargestContentfulPaint 对象。|
| layout-shift |元素移动时候的布局稳定性，实例项是 LayoutShift 对象。|
| long-animation-frame| ⻓动画关键帧。|
| longtask| ⻓任务实例，归属于 PerformanceLongTaskTiming 对象。|
| mark| ⽤⼾⾃定义的性能标记。实例项是 PerformanceMark 对象。|
| measure| ⽤⼾⾃定义的性能测量。实例项是 PerformanceMeasure 对象。|
| navigation| ⻚⾯导航出去的时间，实例项是 PerformancePaintTiming 对象。|
| pain| ⻚⾯加载时内容渲染的关键时刻（第⼀次绘制，第⼀次有内容的绘制，实例项是 PerformancePaintTiming 对象。|
|resource | ⻚⾯中资源的加载时间信息，实例项是 PerformanceResourceTiming 对象。|
|visibility-state | ⻚⾯可⻅性状态更改的时间，即选项卡何时从前台更改为后台，反之亦然。实例项是 VisibilityStateEntry 对象。|
|soft-navigation | - |

### 用户为导向性能指标介绍

![piant](https://img2.imgtp.com/2024/05/18/IcjR69Hl.png)

**⾸次绘制（First Paint）和⾸次内容绘制（First Contentful Paint）**

> ⾸次绘制（FP）和⾸次内容绘制（FCP）。在浏览器导航并渲染出像素点后，这些性能指标点⽴即被标记。 这些点对于⽤⼾⽽⾔⼗分重要，直乎感官体验！<br>
> ⾸次绘制（FP），⾸次渲染的时间点。FP 和 FCP 有点像，但 FP ⼀定先于 FCP 发⽣，例如⼀个⻚⾯加载时，第⼀个 DOM 还没绘制完成，但是可能这时⻚⾯的背景颜⾊已经出来了，这时 FP 指标就被记录下来了。⽽ FCP 会在⻚⾯绘制完第⼀个 DOM 内容后记录。<br>
> ⾸次内容绘制（FCP）,⾸次内容绘制的时间，指⻚⾯从开始加载到⻚⾯内容的任何部分在屏幕上完成渲染的时间。

```js
/* PerformanceObserver监控 */
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    if (entry.name === "first-paint") {
      console.log("FP（⾸次绘制）:", entry.startTime);
    } else if (entry.name === "first-contentful-paint") {
      console.log("FCP（⾸次内容绘制）:", entry.startTime);
    }
  });
});
observer.observe({ entryTypes: ["paint"] });

/* performance.getEntriesByName*/
console.log(
  "FP（⾸次绘制）：" + performance.getEntriesByName("first-paint")[0].startTime
);
console.log(
  "FCP（⾸次内容绘制）：" +
    performance.getEntriesByName("first-contentful-paint")[0].startTime
);
```

**⾸次有效绘制（First Meaningful Paint）**

> 有效内容，这种⼀般很难清晰地界定哪些元素的加载是「有⽤」的（因此⽬前尚⽆规范），但对于开发者他们⾃⼰⽽⾔，他们更知道⻚⾯的哪些部分对于⽤⼾⽽⾔是最为有⽤的，所以这样的衡量标准更多的时候是掌握在开发者⼿上！

```js
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    if (entry.name === "https://xxxxxx.xxx.jpg") {
      console.log(entry.startTime);
    }
  });
});
observer.observe({ entryTypes: ["resource"] }); // 可以是图⽚、某个Dom元素
```

**可交互时间（`TTI`）**

> 指标测量⻚⾯从开始加载(FCP)到主要⼦资源完成渲染，并能够快速、可靠地响应⽤⼾输⼊所需的时间。阻塞会影响正常可交互的时间，浏览器`主线程⼀次只能处理⼀个任务`，如果主线程⻓时间被占⽤，那么可交互时间也会变⻓，所以更多的 TTI 都是发⽣在主线程处于空闲的时间点<br>
> 良好的`TTI`应该控制在 5 秒以内。<br>
> 测量 `TTI` 的最佳⽅法是在⽹站上运⾏ Lighthouse 性能审核<br>

```js
console.log(performance.timing.domInteractive); // 可交互时间点
```

**⻓任务（Long Task）**

> 浏览器主线程⼀次只能处理⼀个任务。 某些情况下，⼀些任务将可能会花费很⻓的时间来执⾏，持续占⽤主进程资源，如果这种情况发⽣了，主线程阻塞，剩下的任务只能在队列中等待。<br>
> ⽤⼾所感知到的可能是输⼊的延迟，或者是哐当⼀下全部出现。这些是当今⽹⻚糟糕体验的主要来源之⼀。<br>
> Long Tasks API 认为任何超过 50 毫秒的任务（Task）都可能存在潜在的问题，并将这些任务相关信息回调给给前端。<br>
> 把 long task 时间定义为 50ms 的主要理论依据是 Chrome 提出的 RAIL 模型，RAIL 认为事件响应应该在 100ms 以内，滚动和动画处理应该在 16ms 以内，才能保证好的⽤⼾体验，⽽如果⼀个 task 执⾏超过 50ms，则很有可能让体验达不到 RAIL 的标准，故我们需要重点关注执⾏时间超过 50ms 的任务。

```js
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log("Long Task（⻓任务）:", entry);
  });
});
observer.observe({ entryTypes: ["longtask"] });
```

### 核心网页指标

![target](https://img2.imgtp.com/2024/05/18/x2xuZyeN.png)

- `Largest Contentful Paint (LCP)`：最⼤内容绘制， ⽤于衡量加载性能。 为了提供良好的⽤⼾体
  验，LCP 应在⽹⻚⾸次开始加载后的 2.5 秒内发⽣。
- `First Input Delay (FID)`：⾸次输⼊延迟，⽤于衡量可交互性。为了提供良好的⽤⼾体验，⻚⾯的
  FID 应不超过 100 毫秒。
- `Cumulative Layout Shift (CLS)`：累积布局偏移，⽤于衡量视觉稳定性。为了提供良好的⽤⼾体
  验，⻚⾯应保持 0.1 或更低的 CLS

**Lighthouse-知名测评⼯具**
![LightHouse](https://img2.imgtp.com/2024/05/18/ZblXmuQe.png)

### 常⻅优化⼿段

#### 异步加载

说起`异步加载`，我们需要先了解⼀下什么是同步加载？

```js
// 默认就是同步加载
<script src="http://abc.com/script.js"></script>
```

- 同步加载: 同步模式⼜称`阻塞模式`，会阻⽌浏览器的后续处理，停⽌了后续的⽂件的解析，执⾏，
  如图像的渲染。流览器之所以会采⽤同步模式，是因为加载的 js ⽂件中有对 dom 的操作，重定向，
  输出 document 等默认⾏为，所以同步才是最安全的。所以⼀般我们都会把 script 标签放置在 body
  结束标签之前，减少阻塞。
- 所以异步加载，其实就是⼀种⾮阻塞加载模式的⽅式，就是浏览器在下载执⾏ js 的同时，还会继续
  进⾏后续⻚⾯的处理。

⼏种常⻅的异步加载脚本⽅式:

_async 和 defer_<br>
在 JavaScript 脚本增加 async 或者 defer 属性

```html
// ⾯试经常问: script标签的defer和async的区别？ //
defer要等到html解析完成之后执⾏脚本
<script src="main.js" defer></script>
// async异步加载脚本后便会执⾏脚本
<script src="main.js" async></script>
```

_动态添加 script 标签_

```js
// js代码中动态添加script标签，并将其插⼊⻚⾯
const script = document.createElement("script");
script.src = "a.js";
document.head.appendChild(script);
```

_通过 XHR 异步加载 js_

```js
// ⾯试经常问： 谈谈JS中的 XMLHttpRequest 对象的理解？
var xhr = new XMLHttpRequest();
/*
第⼀个参数是请求类型
第⼆个参数是请求的URL
第三个参数是是否为异步请求
*/
xhr.open("get", "/getUser", true); // true代表我们需要异步加载该脚本
xhr.setRequestHeader("testHeader", "1111"); // ⾃定义Header
xhr.send(null); // 参数为请求主体发送的数据，为必填项，当不需要发送数据时，使⽤null
xhr.onreadyStateChange = function () {
  if (xhr.readystate === 4) {
    // ⾯试经常问： 说出你知道的哪些HTTP状态码？
    if (xhr.status === 304 || (xhr.status >= 200 && xhr.status < 300)) {
      console.log("成功, result: ", xhr.responseText);
    } else {
      console.log("错误, errCode:", xhr.status);
    }
  }
};
```

#### 按需打包与按需加载

随着 Webpack 等构建⼯具的能⼒越来越强，开发者在构建阶段可以随⼼所欲地打造项⽬流程，与此同
时按需加载和按需打包的技术曝光度也越来越⾼，甚⾄决定着⼯程化构建的结果，直接影响应⽤的性
能优化。

两者的概念：

- 按需打包表⽰的是针对第三⽅依赖库及业务模块。只打包真正在运⾏时可能会⽤到的代码。
- 按需加载表⽰的是代码模块在交互的时候需要动态导⼊。

**按需打包**<br>
按需打包⼀般通过两种⽅法来实现：

1. 使⽤ ES Module ⽀持的 Tree Shaking ⽅案，使⽤构建⼯具时候完成按需打包。
   我们看⼀下这种场景：

```js
import { Button } from "antd";
// 假设我们的业务使⽤了Button组件，同时该组件库没有提供ES Module版本，
// 那么这样的引⽤会导致最终打包的代码是所有antd导出的内容，这样会⼤⼤增加代码的体积

// 但是如果我们组件库提供了ES Module版本（静态分析能⼒），并且开启了Tree Shaking功能，
// 那么我们就可以通过“摇树”特性
// 将不会被使⽤的代码在构建阶段移除。
```

正确使⽤ Tree Shaking 的姿势：<br>
antd 组件库

```js
// package.json
{
    // ...
    "main": "lib/index.js", // 暴露CommonJS规范代码lib/index.js
    "module": "es/index.js", // ⾮package.json标准字段，打包⼯具专⽤字段，指定符合ESM规范的⼊⼝⽂件
    // 副作⽤配置字段，告诉打包⼯具遇到sideEffects匹配到的资源，均为⽆副作⽤的模块呢？
    "sideEffects": [
        "*.css",
        " expample.js"
    ],
}
```

```js
// 啥叫作副作⽤模块
// expample.js
const b = 2;
export const a = 1;
console.log(b);
```

项⽬：<br>
Tree Shaking ⼀般与 Babel 搭配使⽤，需要在项⽬⾥⾯配置 Babel，因为 Babel 默认会把 ESM 规范打包
成 CommonJs 代码，所以需要通过配置 babel-preset-env#moudles 编译降级

```js
production： {
    presets: [
        '@babel/preset-env',
        {
            modules: false
        }
    ]
}
```

webpack4.0 以上在 mode 为 production 的时候会⾃动开启 Tree Shaking，实际就是依赖了、UglifyJS
等压缩插件，默认配置

```js
const config = {
    mode: 'production',
    optimization: {
        // 三类标记：
        // used export： 被使⽤过的export会这样标记
        // unused ha by rmony export： 没有被使⽤过的export被这样标记
        // harmony import： 所有import会被这样标记
        usedExports: true, // 使⽤usedExports进⾏标记
        minimizer: {
            new TerserPlugin({...}) // ⽀持删除未引⽤代码的压缩器
        }
    }
}
```

2. 使⽤以 babel-plugin-import 为主的 Babel 插件完成按需打包。

```js
[
  {
    libraryName: "antd",
    libraryDirectory: "lib", // default: lib
    style: true,
  },
  {
    libraryName: "antd",
  },
];
```

```js
import { TimePicker } from "antd"
↓ ↓ ↓ ↓ ↓ ↓
var _button = require('antd/lib/time-picker');
```

**按需加载**<br>
如何才能动态地按需导⼊模块呢？<br>
动态导⼊ `import(module)` ⽅法加载模块并返回⼀个 promise，该 promise resolve 为⼀个包含其所有导出的模块对象。我们可以在代码中的任意位置调⽤这个表达式。不兼容浏览器，可以⽤ Babel 进⾏转换（`@babel/plugin-syntax-dynamic-import `）

```js
// say.js
export function hi() {
    alert(`你好`);
}
export function bye() {
    alert(`拜拜`);
}
export default function() {
    alert("默认到处");
}
{
hi: () => {},
bye: () => {},
default:"sdsd"
}
```

```html
<!DOCTYPE html>
<script>
  async function load() {
    let say = await import("./say.js");
    say.hi(); // 你好
    say.bye(); // 拜拜
    say.default(); // 默认导出
  }
</script>
<button onclick="load()">Click me</button>
```

如果让你⼿写⼀个不考虑兼容性的 import(module)⽅法，你会怎么写？可以看下以下 Function-like

```js
// 利⽤ES6模块化来实现
const dynamicImport = (url) => {
    return new Promise((resolve, reject) => {
        // 创建script标签
        const script = document.createElement("script");
        const tempGlobal = "__tempModuleVariable" + Math.random().toString(32).substring(2);
        // 通过设置 type="module"，告诉浏览器该脚本是⼀个 ES6 模块，需要按照
        模块规范进⾏导⼊和导出
        script.type = "module";
        script.crossorigin="anonymous"; // 跨域
        script.textContent = `import * as m from "${url}";window.${tempGlobal} = m;`;
        // load 回调
        script.onload = () => {
            resolve(window[tempGlobal]);
            delete window[tempGlobal];
            script.remove();
        };
        // error回调
        script.onerror = () => {
            reject(new Error(`Fail to load module script with URL:${url}`));
            delete window[tempGlobal];
            script.remove();
        };
        document.documentElement.appendChild(script);
    });
}
```

### Vue性能优化常见策略
> 可以从代码分割、服务端渲染、组件缓存、⻓列表优化等⻆度去分析Vue性能优化常⻅的策略。

- 最常⻅的路由懒加载：有效拆分App体积⼤⼩，访问时异步加载
```js
const router = createRouter({
    routes: [
        // 借助import()实现异步组件
        { path: '/foo', component: () => import('./Foo.vue') }
    ]
})
```
- `keep-alive` 缓存⻚⾯：避免重复创建组件实例，且能保留缓存组件状态
```js
<keep-alive>
    <component :is="Component"></component>
</keep-alive>
```
- 使⽤ `v-show` 复⽤DOM：避免重复创建组件
```vue
<template>
    <div class="cell">
    <!-- 这种情况⽤v-show复⽤DOM，⽐v-if效果好 -->
        <div v-show="value" class="on">
            <Count :num="10000"/> display:none
        </div>
        <section v-show="!value" class="off">
            <Count :num="10000"/>
        </section>
    </div>
</template>
```
- 不再变化的数据使⽤ `v-once`
```html
<!-- single element -->
<span v-once>This will never change: {{msg}}</span>
<!-- the element have children -->
<div v-once>
    <h1>comment</h1>
    <p>{{msg}}</p>
</div>
<!-- component -->
<my-component v-once :comment="msg"></my-component>
<!-- `v-for` directive -->
<ul>
    <li v-for="i in list" v-once>{{i}}</li>
</ul>
```
- ⻓列表性能优化：如果是⼤数据⻓列表，可采⽤虚拟滚动，只渲染少部分区域的内容，第三库`vuevirtual-scroller`、`vue-virtual-scroll-grid`

- 图片懒加载
```vue
<!-- vue-lazyload -->
<img v-lazy="/static/img/1.png">
```
- 第三⽅插件按需引⼊
```js
import { createApp } from 'vue';
import { Button, Select } from 'element-plus';

const app = createApp()
app.use(Button)
app.use(Select)
```
- 服务端渲染/静态⽹站⽣成：SSR/SSG
- ……

### React性能优化常⻅策略
![React性能优化](https://img2.imgtp.com/2024/05/18/h85K8Ebp.png)

####【render过程】避免不必要的Render
- `类组件跳过没有必要的组件更新`, 对应的技巧⼿段：PureComponent、React.memo、
shouldComponentUpdate。 

> PureComponent 是对类组件的 Props 和 State 进⾏浅⽐较 <br>
> React.memo是对函数组件的 Props 进⾏浅⽐较 <br>
> shouldComponentUpdate是React类组件的钩⼦，在该钩⼦函数我们可以对前后props进⾏深⽐对，返回false可以禁⽌更新组件，我们可以⼿动控制组件的更新 <br>

- **Hook的useMemo、useCallback 获得稳定的 Props 值** 
> 传给⼦组件的派⽣状态或函数，每次都是新的引⽤，这样会导致⼦组件重新刷新
```js
import { useCallback， useState, useMemo } from 'react';
const [count, setCount] = useState(0);
// 保证函数引⽤是⼀样的，在将该函数作为props往下传递给其他组件的时候，不会导致
// 其他组件像PureComponent、shouldComponentUpdate、React.memo等相关优化失效
// const oldFunc = () => setCount(count => count + 1)
const newFunc = useCallback(() => setCount(count => count + 1), [])
// useMemo与useCallback ⼏乎是99%相似，只是useMemo⼀般⽤于密集型计算⼤的⼀些缓存，
// 它得到的是函数执⾏的结果
const calcValue = useMemo(() => {
    return Array(100000).fill('').map(v => /*耗时计算*/ v);
}, [count]);
```
- **state状态下沉，减⼩影响范围**
> 如果⼀个P组件，它有4个⼦组件ABCD，本⾝有个状态state p， 该状态只影响到AB ，那么我们可以把AB组件进⾏封装， state p 维护⾥⾯，那么state p变化了，也不会影响到CD组件的渲染

- **⽤redux、React上下⽂ContextAPI 跳过中间组件Render** 
```js
import ReactDOM from "react-dom";
import { createContext, useState, useContext, useMemo } from "react";
const Context = createContext({ val: 0 });
const MyProvider = ({ children }) => {
    const [val, setVal] = useState(0);
    const handleClick = useCallback(() => {
        setVal(val + 1);
    },[val]);
    const value = useMemo(() => {
        return {
        val: val
        };
    }, [val]);
    return (
        <Context.Provider value={value}>
            {children}
            <button onClick={handleClick}>context change</button>
        </Context.Provider>
   );
};

const useVal = () => useContext(Context);
const Child1 = () => {
    const { val } = useVal();
    console.log("Child1重新渲染", val);
    return <div>Child1</div>;
};
const Child2 = () => {
    console.log("Child2只渲染⼀次");
    return <div>Child2</div>;
};
function App() {
return (
    <MyProvider>
        <Child1 />
        <Child2 />
    </MyProvider>
    );
} 
const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
```
- **避免使⽤内联函数**
- **使⽤ Immutable，减少渲染的次数**
- **列表项使⽤ key 属性，React 官⽅推荐将每项数据的 ID 作为组件的 key**

那我如果使⽤索引值index作为key，为啥不推荐？⾯试题
```html
// ⽆⽤更新
<!-- 更新前 -->
<li key="0">Tom</li>
<li key="1">Sam</li>
<li key="2">Ben</li>
<li key="3">Pam</li>
<!-- 删除后更新 -->
<li key="0">Sam</li>
<li key="1">Ben</li>
<li key="2">Pam</li>

// 输⼊错乱
<!-- 更新前 -->
<input key="0" value="1" id="id1"/>
<input key="1" value="2" id="id2"/>
<input key="3" value="3" id="id3"/>
<input key="4" value="4" id="id4"/>
<!-- 删除后更新 -->
<input key="1" value="1" id="id2"/>
<input key="3" value="2" id="id3"/>
<input key="4" value="3" id="id4"/>
```

#### 其他优化
- 组件懒加载，可以是通过 Webpack 的动态导⼊和  `React.lazy`  ⽅法 
```js
import { lazy, Suspense, Component } from "react"
const Com = lazy(() => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
        reject(new Error("error"))
        } else {
        resolve(import("./Component"))
        }
    }, 1000)
  })
})
// ...
<Suspense fallback="加载...">
    <Com />
</Suspense>
```

- 虚拟滚动，react-window 和 react-virtualized， 常⻅⾯试题是：给你10000条数据⼀次性展⽰，怎么才不会卡，虚拟滚动的原理？
- debounce、throttle 优化触发的回调，如input组件onChange防抖 Lodash 
- 善⽤缓存，如上⾯⽤的useMemo，可以做⼀些耗时计算并保持引⽤不变，减少重新渲染
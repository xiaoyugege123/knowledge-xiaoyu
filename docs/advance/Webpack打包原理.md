# Webpack 打包原理

## Webpack 介绍

**参考文章**<br>
[webpack 打包原理及流程解析，超详细！CSDN](https://blog.csdn.net/qq_35942348/article/details/131847520)<br>
[webpack 打包原理 ? 看完这篇你就懂了 !](https://segmentfault.com/a/1190000021494964#item-5-10)<br>
[webpack 打包原理  哔站](https://www.bilibili.com/video/BV1aL411P7R6/?spm_id_from=333.337.search-card.all.click&vd_source=bf3353ad677b1fdc2e25b9a255e71902)<br>

- 本质上,webpack 是一个现代 JavaScript 应用程序的静态模块打包器。当 webpack 处理应用程序时,它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块,然后将所有这些模块打包成一个或多个 bundle。
- webpack 就像一条生产线,要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的,多个流程之间有存在依赖关系,只有完成当前处理后才能交给下一个流程去处理。
- 插件就像是一个插入到生产线中的一个功能,在特定的时机对生产线上的资源做处理。
- webpack 通过 Tapable 来组织这条复杂的生产线。 webpack 在运行过程中会广播事件,插件只需要监听它所关心的事件,就能加入到这条生产线中,去改变生产线的运作。 webpack 的事件流机制保证了插件的有序性,使得整个系统扩展性很好。

> 在目前的项目中，我们会有很多依赖包，webpack 负责将浏览器不能识别的文件类型、语法等转化为可识别的前端三剑客（html，css，js），并在这个过程中充当组织者与优化者的角色。

## webpack 核心概念

#### bundle

> - Bundle（捆绑包）是指将所有相关的模块和资源打包在一起形成的单个文件。它是应用程序的最终输出，可以在浏览器中加载和执行。
> - 捆绑包通常由 Webpack 根据入口点（entry）和它们的依赖关系自动创建。当你运行 Webpack 构建时，它会根据配置将所有模块和资源打包成一个或多个捆绑包。

#### Chunk

> - Chunk（代码块）是 Webpack 在打包过程中生成的中间文件，它代表着一个模块的集合。
> - Webpack 根据代码的拓扑结构和配置将模块组织成不同的代码块。每个代码块可以是一个独立的文件，也可以与其他代码块组合成一个捆绑包。
> - Webpack 使用代码分割（code splitting）技术将应用程序代码拆分成更小的代码块，以便在需要时进行按需加载。这有助于减小初始加载的文件大小，提高应用程序的性能。
> - 在 Webpack 中，捆绑包和代码块之间存在一对多的关系。一个捆绑包可以包含多个代码块，而一个代码块也可以属于多个不同的捆绑包。这取决于 Webpack 配置中的拆分点（split points）和代码块的依赖关系。
> - 总结起来，bundle 是 Webpack 打包过程的最终输出文件，而 chunk 是 Webpack 在打包过程中生成的中间文件，用于组织和按需加载模块。

#### Entry

> - 入口起点(entry point)指示 webpack 应该使用哪个模块,来作为构建其内部依赖图的开始。
> - 进入入口起点后,webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
> - 每个依赖项随即被处理,最后输出到称之为 bundles 的文件中。

#### Output

> - output 属性告诉 webpack 在哪里输出它所创建的 bundles,以及如何命名这些文件,默认值为 ./dist。
> - 基本上,整个应用程序结构,都会被编译到你指定的输出路径的文件夹中。

#### Module

> 模块,在 Webpack 里一切皆模块,一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

#### Chunk

> 代码块,一个 Chunk 由多个模块组合而成,用于代码合并与分割。

#### Loader

> - loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。
> - loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块,然后你就可以利用 webpack 的打包能力,对它们进行处理。
> - 本质上,webpack loader 将所有类型的文件,转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

#### Plugin

> - loader 被用于转换某些类型的模块,而插件则可以用于执行范围更广的任务。
> - 插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量。插件接口功能极其强大,可以用来处理各种各样的任务。

## webpack 构建流程

Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数。
1. 开始编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
1. 确定入口：根据配置中的 entry 找出所有的入口文件。
1. 编译模块：从入口文件出发,调用所有配置的 Loader 对模块进行翻译,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
1. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
1. 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会。
1. 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。

在以上过程中,Webpack 会在特定的时间点广播出特定的事件,插件在监听到感兴趣的事件后会执行特定的逻辑,并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

**1. 初始化一个构建流程的 demo，并安装 webpack**

```sh
npm init -y  # 直接进行初始，不用管细节

npm i webpack webpack-cli -D
```

package.json 文件中添加

```json
"build": "webpack --mode development"
```

**2. 配置项目 webpack.config.js 和 src/**

```js
// webpack.config.js
const path = require("path");
module.exports = {
  // 入口
  entry: path.resolve(__dirname, "src/index.js"),
  // 出口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "./",
  },
};
```

src/index.js

```js
const test = require("./test");
const a = 12;
const b = 12;
function add(x, y) {
  return x + y;
}
const c = add(a, b);
console.log(c);
test();
```

src/test.js

```js
function test() {
  console.log(2);
}

module.exports = test;
```

**3. 打包后的结果：**

```js
(() => {
  //管理的模块
  var __webpack_modules__ = {
    "./src/index.js": (
      __unused_webpack_module,
      __unused_webpack_exports,
      __webpack_require__
    ) => {
      eval(
        //开始引入test.js进行分析
        'const test = __webpack_require__(/*! ./test */ "./src/test.js");\r\nconst a = 12;\r\nconst b = 12;\r\nfunction add(x, y) {\r\n  return x + y;\r\n}\r\nconst c = add(a, b);\r\nconsole.log(c);\r\ntest();\r\n\n\n//# sourceURL=webpack://webpackdemo/./src/index.js?'
      );
    },

    "./src/test.js": (module) => {
      eval(
        "function test() {\r\n  console.log(2);\r\n}\r\n\r\nmodule.exports = test;\r\n\n\n//# sourceURL=webpack://webpackdemo/./src/test.js?"
      );
    },
  };

  // The module cache
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = (__webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {},
    });

    // Execute the module function
    __webpack_modules__[moduleId](
      //模块中执行函数传入module，code中进行赋值操作！
      module,
      module.exports,
      __webpack_require__
    );
    //立马导出module
    // Return the exports of the module
    return module.exports;
  }

  // startup
  // Load entry module and return exports
  // This entry module can't be inlined because the eval devtool is used.
  var __webpack_exports__ = __webpack_require__("./src/index.js");
})();
```

从打包的代码可以看出：

> - 打包后的代码是一个立即执行函数，在 Webpack 打包过程中，每个模块都会被转换为一个独立的函数，并通过**webpack_modules**对象进行注册和管理。这个对象以文件路径为 key，以文件内容为 value，它包含了所有打包后的模块。
> - 当模块被引用或加载时，Webpack 会使用**webpack_modules**来查找和执行相应的模块函数。通过使用**webpack_modules**，Webpack 可以管理模块之间的依赖关系，并在需要时按需加载和执行模块。
> - 接着定义了一个模块加载函数 **webpack_require**它接收的参数是 moduleId，其实就是文件路径。
>   > 它的执行过程如下：
>   >
>   > - 判断模块是否有缓存，如果有则返回缓存模块的 export 对象，即 module.exports。
>   > - 新建一个模块 module，并放入缓存。
>   > - 执行文件路径对应的模块函数。
>   > - 执行完模块后，返回该模块的 exports 对象。
> - 其中 module、module.exports 的作用和 CommonJS 中的 module、module.exports 的作用是一样的，而 webpack_require 相当于 CommonJS 中的 require。
> - 在立即函数的最后，使用了 webpack_require() 加载入口模块。并传入了入口模块的路径 ./src/index.js。
> - 将打包后的模块代码和原模块的代码进行对比，可以发现仅有一个地方发生了变化，那就是 require 变成了 webpack_require。

## webpack 打包原理

1. 简单需求

- 浏览器不支持 ES6 的模块

2. 核心打包功能
   > 1. 需要读取到入口文件里的内容
   > 2. 分析入口文件，递归去读取模块所依赖的文件内容，生成 AST 语法
   > 3. 根据 AST 语法书，生成浏览器能够运行的最终代码

```
1. 获取模块内容
2. 分析模块内容
  - 安装@bable/parse包(转AST)
3. 对模块内容处理
  - 安装@babel/traverse包(遍历AST)
  - 安装@bebel/core和@babel/preset-env(ES6转ES5)
4. 递归所有模块
5. 生成最终代码
```

3. 手动 loader、plugin
   1. 实现一个同步 loader
   2. 实现一个异步 loader
   3. 实现一个 plugin

**src 文件夹下的文件**
```js
// index.js
import add from "./add.js";
import { minus } from "./minus.js";

const sum = add(1, 2);
const divison = minus(2, 1);

console.log(sum);
console.log(divison);
```
```js
// add.js
export default (a, b) => {
  return a + b;
};
```
```js
// minus.js
export const minus = (a, b) => {
  return a - b;
};
```
**根目录下的bundle.js核心打包文件**
```js
// 1. 获取模块内容
const fs = require("fs");
const parser = require("@babel/parser");
const path = require("path");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

// 获取文件内容的函数
const getMouduleInfo = (file) => {
  const body = fs.readFileSync(file, "utf-8");
  //生成抽象语法树，这里表示解析ES6模块
  const AST = parser.parse(body, { sourceType: "module" });
  const deps = {}; //收集依赖路径
  traverse(AST, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      const newFile = "./" + path.join(dirname, node.source.value);
      deps[node.source.value] = newFile;
    },
  });
  console.log("依赖收集:", deps);
  //ES6转ES5传出的代码，ES6 --> AST --> ES5
  const { code } = babel.transformFromAst(AST, null, {
    presets: ["@babel/preset-env"],
  });
  const moduleInfo = {
    file,
    deps,
    code,
  };
  return moduleInfo;
};
// getMouduleInfo("./src/index.js");

//返回所有文件信息
const parseModules = (file) => {
  // 获取入口信息
  const entry = getMouduleInfo(file);
  const temp = [entry];
  const depsGraph = {};
  // 这里的逻辑很值得一看！！！temp.length在增加，同时遍历了相关的依赖！！！
  for (let i = 0; i < temp.length; i++) {
    const deps = temp[i].deps;
    if (JSON.stringify(deps) !== "{}") {
      //遍历模块依赖 递归获取信息
      for (let j in deps) {
        if (deps.hasOwnProperty(j)) {
          temp.push(getMouduleInfo(deps[j]));
        }
      }
    }
  }
  temp.forEach((moduleInfo) => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });
  console.log(depsGraph);
  return depsGraph;
};

// parseModules("./src/index.js");

// 最终能在浏览器中执行的代码
const bundle = (file) => {
  const depsGraph = parseModules(file);
  const bundle = `
    (function(graph){
        function require(file){
            function absRequire(relPath){
                return require(graph[file].deps[relPath])
            }
            var exports={};
            (function(require,exports,code){
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('${file}')
    })(${JSON.stringify(depsGraph)})
    `;
  return bundle;
};

const build = (file) => {
  // fs.mkdirSync("./dist");
  fs.writeFileSync("./dist/bundle.js", bundle(file));
};
build("./src/index.js");
```
**打包输出文件及展示文件**
```js
// dist/bundle.js
(function (graph) {
  function require(file) {
    function absRequire(relPath) {
      return require(graph[file].deps[relPath]);
    }
    var exports = {};
    (function (require, exports, code) {
      eval(code);
    })(absRequire, exports, graph[file].code);
    return exports;
  }
  require("./src/index.js");
})({
  "./src/index.js": {
    deps: { "./add.js": "./src\\add.js", "./minus.js": "./src\\minus.js" },
    code: '"use strict";\n\nvar _add = _interopRequireDefault(require("./add.js"));\nvar _minus = require("./minus.js");\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }\nvar sum = (0, _add["default"])(1, 2);\nvar divison = (0, _minus.minus)(2, 1);\nconsole.log(sum);\nconsole.log(divison);',
  },
  "./src\\add.js": {
    deps: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports["default"] = void 0;\nvar _default = exports["default"] = function _default(a, b) {\n  return a + b;\n};',
  },
  "./src\\minus.js": {
    deps: {},
    code: '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.minus = void 0;\nvar minus = exports.minus = function minus(a, b) {\n  return a - b;\n};',
  },
});
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./dist/bundle.js"></script>
</body>
</html>
```
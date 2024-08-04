# JS 模块化历程

![JS模块化.png](/imgs/JS模块化.png)

## 模块化概述

### 1.1.什么是模块化？

- 将程序文件依据一定规则拆分成多个文件，这种编码方式就是模块化的编码方式。
- 拆分出来的每个文件就是一个模块，模块中的数据都是私有的，模块之间相互隔离。
- 同时也能通过一些手段，可以把模块内的指定数据“交出去”，供其他模块使用。

### 1.2.为什么需要模块化？

随着应用的复杂度越来越高，其代码量和文件数量都会急剧增加，会逐渐发现以下问题：

1. 全局污染问题（大量的变量和函数写在了全局 window 对象上）
2. 依赖混乱问题（引入大量 script 链接，不清楚依赖关系）
3. 数据安全问题（可以进行数据访问，没有隔离好）

## 模块化的历程

> 这个是面试过程中面试官经常问到的点，需要好好准备一下！
> 分享一个不错的博客链接 [模块化](https://blog.csdn.net/hangao233/article/details/122868611)

### 全局的 function 模式

```html
<!-- test.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./module.js"></script>
    <script>
      foo();
      bar();

      msg = "小雨呀";
      foo();
    </script>
  </body>
</html>
```

```js
// module.js
/* 全局函数模式：将不同的功能封装成不同的全局函数…… */
let msg = "xiaoyu";
function foo() {
  console.log("foo()", msg);
}

function bar() {
  console.log("bar()", msg);
}
```

### Namespace 模式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./module.js"></script>
    <script>
      obj.foo();
      obj.msg = "小雨";
      obj.foo();
    </script>
  </body>
</html>
```

```js
// module.js
/* namespace 模式：简单对象封装…… */
let obj = {
  msg: "xiaoyu",
  foo() {
    console.log("foo()", this.msg);
  },
};
```

### IIFE 模式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./index.js"></script>
    <script>
      util.foo();
    </script>
  </body>
</html>
```

```js
// index.js
/* IIFE模式：匿名函数自调用（闭包） */
// IIFE模式

let util = (function () {
  let msg = "xiaoyu";
  function foo() {
    console.log("foo()", msg);
  }
  var module = {
    foo,
  };

  return module;
})();
```

### IIFE 增强模式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./index.js"></script>
    <script>
      module();
    </script>
  </body>
</html>
```

```js
// index.js
/* IIFE增强模式：引入依赖  这是现代模块化实现的基石 */

(function (window, document) {
  let msg = "xiaoyu";
  function foo() {
    console.log("foo()", msg);
  }
  window.module = foo;
  document.querySelector("body").style.backgroundColor = "red";
})(window, document);
```

## AMD

### NO-AMD

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 注意顺序不能变化，这种依赖一开始就写好的！！！ -->
    <script src="./js/dataService.js"></script>
    <script src="./js/alerter.js"></script>
    <script src="./app.js"></script>
  </body>
</html>
```

```js
// js/dataService.js
// 定义一个没有依赖的模块
(function () {
  let name = "dataService.js";
  function getName() {
    return name;
  }
  window.dataService = { getName };
})(window);
```

```js
// js/alerter.js
//定义一个有依赖的模块
(function (window, dataService) {
  let msg = "alerter.js";
  function showMsg() {
    console.log(msg, dataService.getName());
  }
  window.alerter = { showMsg };
})(window, dataService);
```

```js
// app.js
(function (alerter) {
  alerter.showMsg();
})(alerter);
```

### require.js

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 入口，运用！！！ 这个require.js自己去下载-->
    <script data-main="./js/main.js" src="./js/lib/require.js"></script>
  </body>
</html>
```

```js
// js/main.js
(function () {
  //66666 注意这个配置！！！
  requirejs.config({
    baseUrl: "js/", //基本的路径，出发点在根目录下
    paths: {
      //配置路径
      alerter: "./modules/alerter",
      dataService: "./modules/dataService",
    },
  });

  require(["alerter"], function (alerter) {
    alerter.showMsg();
  });
})();

// https://www.runoob.com/w3cnote/requirejs-tutorial-1.html
```

```js
// js/modules/dataService.js
// 定义没有依赖的模块

define(function () {
  // 'use strict';
  let name = "dataService.js";
  function getName() {
    return name;
  }

  //暴露模块
  return { getName };
});
```

```js
// js/modules/alerter.js
// 定义有依赖的模块
define(["dataService"], function (dataService) {
  // 'use strict';
  let msg = "alerter.js";
  function showMsg() {
    console.log(msg, dataService.getName());
  }

  return { showMsg };
});
```

## CMD - sea.js

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./js/libs/sea.js"></script>
    <script>
      seajs.use("./js/modules/main.js");
    </script>
  </body>
</html>
```

```js
// ./js/modules/main.js
//定义没有依赖的模块
define(function (require) {
  let module1 = require("./module1");
  module1.foo();
  let module4 = require("./module4");
  module4.fun2();
});
```

```js
// ./js/modules/module1.js
//定义没有依赖的模块
define(function (require, exports, module) {
  let msg = "module1";
  function foo() {
    return msg;
  }
  //暴露模块
  module.exports = { foo };
});
```

```js
// ./js/modules/module4.js
//定义有依赖的模块
define(function (require, exports, module) {
  let msg = "module4";
  //  同步
  let module2 = require("./module2");
  module2();
  //异步引用
  require.async("./module3.js", function (module3) {
    module3.fun();
  });
  function fun2() {
    console.log(msg);
  }
  exports.fun2 = fun2;
});
```

```js
// module2.js
//定义没有依赖的模块
define(function (require, exports, module) {
  let msg = "module2";
  function bar() {
    console.log(msg);
  }
  //暴露模块
  module.exports = bar;
});
```

```js
// module3.js
//定义没有依赖的模块
define(function (require, exports, module) {
  let msg = "module3";
  function fun() {
    console.log(msg);
  }
  //暴露模块
  exports.fun = fun;
});
```

## CommonJS

**导出数据**

在 CommonJS 标准中，导出数据有两种方式：

- 第一种方式：`module.exports=value`
- 第二种方式：`exports.name=value`

注意点如下：

> 1. 每个模块内部的：`this`、`exports`、`modules.exports`在初始时，都指向`同一个空对象`。
> 2. 无论如何修改导出对象，最终导出的都是`module.exports`的值。
> 3. `exports`是对`module.exports`的初始引用，仅为了方便导出对象添加属性，所以不能使用`exports = value`的形式导出数据，但是可以使用`modules.exports = XXXX`导出数据

**导入数据**
`const hh =require("hh.js")`

**扩展知识点……**

一个 JS 模块在执行时，是被包裹在一个`内置函数`中执行的，所以每个模块都有自己的作用域，我们可以通过如下方式验证这一说法：

```js
console.log(arguments);
console.log(arguments.callee.toString());
```

内置函数的大致形式如下：

```js
function (exports,require,module,__filename,__dirname){
    /**********************/
}
```

```json
{
  "name": "commonjs-node",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

```js
// main.js
// 将其他的模块汇集到主模块
let module1 = require("./modules/module1");
let module2 = require("./modules/module2");
let module3 = require("./modules/module3");

module1.foo();
module2();
module3.bar();
module3.foo();
```

```js
// modules/module1.js
// module.exports = value 暴露一个对象

module.exports = {
  msg: "module1",
  foo() {
    console.log("foo()", this.msg);
  },
};
```

```js
// modules/module2.js
// 暴露一个函数   module.exports = function(){}

module.exports = function () {
  console.log("module2");
};
```

```js
// modules/module3.js
// exports.xxx = value
exports.foo = function () {
  console.log("foo() module3");
};

exports.bar = function () {
  console.log("bar() module3");
};
```

## ES Module

在服务端运行ES模块，可以将通过两种方式使其正常运行：
1. 文件后缀改成.mjs
2. 在同级目录下添加package.json文件，再添加`{type:"module"}`

在浏览器端运行ES模块，只需在引入script标签上添加`type="module"`

**三种导出方式**
- 分别导出：`export const name="小雨"`
- 统一导出：`export {name}`（注意这个不是导出对象哈）
- 默认导出：`export default Person`

**导入数据（导入的数据都当常量用）**
- 导入全部(通用)：`import * as student from "./student.js`
- 命名导入(对应导出方式：分别导出、统一导出)：`import {name as studentName} from "./student.js`
- 默认导入(对应对出方式：默认导出)：`import student from "./student.js"`(随意变量接收)
- 命名导入与默认导入可以混合使用：`import student,{name} from "./student.js`

**数据引用问题**
- CommonJS是复制出来的
- ES模块是引用同一块内存空间

```json
{
  "name": "es6",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- ES6 注意路径哈  node 和 浏览器环境-->
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```js
// main.js
//注意js类型为module
// 默认导出不带括号，其他带括号
// 括号里面的名字得匹配引入的，括号外的可以变名字
import Person, { name, age, sayName, obj } from "./js/count.js";

console.log(name, age, sayName(), obj);
const p1 = new Person("xiaoma", 18);
console.log(p1);

import hh from "./js/test.js";
hh();
```

```js
// js/count.js
// ES6模块功能主要由两个命令构成：export 和 import
// export用于规定模块的对外接口 import用于输入其他模块提供的功能
// 一个模块就是一个独立的文件
export const name = "zhnagsan";
export const age = 18;
export function sayName() {
  return "my name is 小马哥";
}
/* export{
    name,
    age,
    sayName
} */
export const obj = {
  foo: "foo",
};

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayName() {
    return this.name;
  }
  sayAge() {
    return this.age;
  }
}
// 默认导出
export default Person;
```

```js
// js/test.js
export default function () {
  console.log("sb");
}
```

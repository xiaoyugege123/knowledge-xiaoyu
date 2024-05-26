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

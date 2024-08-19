# 杨小爱系列-实用的 JS 技巧

1. 元素滚动[Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

> 如果希望将元素平滑地滚动到视口的起点

```js
const scrollToTop = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "start" });

scrollToTop(document.body);
```

> 如果希望将元素平滑地滚动到视口的端点

```js
const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" });
scrollToBottom(document.body);
```

2. JavaScript 中 双感叹号 !! 的作用
   > 作用：!! 将后面的表达式强制转换为布尔类型的数据（boolean），也就是只能是 true 或者 false;

```js
var a;
console.log(a); //undefined
console.log(!a); //true
console.log(!!a); //false
```

3. 从给定文本中去除 HTML [DOMParser--将文本转为 DOM 对象](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser)

```js
const stripHtml = (html) =>
  new DOMParser().parseFromString(html, "text/html").body.textContent || "";

stripHtml("<div>test</div>"); // 'test'
```

4. 异步函数检查

```js
const isAsyncFunction = (v) =>
  Object.prototype.toString.call(v) === "[object AsyncFunction]";

isAsyncFunction(async function () {}); // true
```

5. 截断数
   > 当需要截断小数点后的某些数字而不进行四舍五入时。

```js
// 原生Number.toFixed()，截断后进行了四舍五入！
(10.255).toFixed(2); // '10.26'

const toFixed = (n, fixed) =>
  `${n}`.match(new RegExp(`^-?[0-9]+(?:\.[0-9]{0,${fixed}})?`))[0];
`${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0]; // 注意这里RegExp有些地方转义需要两道斜杠！
toFixed(10.255, 2); // 10.25
```

6. 删除无效属性
   > 当需要删除对象中值为空或未定义的所有属性时。

```js
const removeNullUndefined = (obj) =>
  Object.entries(obj).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );

removeNullUndefined({ name: "", age: undefined, sex: null }); // { name: '' }
```

7. 反转对象键值对

```js
const invert = (obj) =>
  Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {});

invert({ name: "jack" }); // {jack: 'name'}
```

8. 矩阵行列交换

```js
const transpose = (matrix) =>
  matrix[0].map((col, i) => matrix.map((row) => row[i]));
transpose(
  [
    // [
    [1, 2, 3], //      [1, 4, 7],
    [4, 5, 6], //      [2, 5, 8],
    [7, 8, 9], //      [3, 6, 9],
  ] //  ]
);
```

9. 根据 name 获取 cookie 的值

```js
const getCookie = (name) =>
  document.cookie.split(`${name}=`).pop().split("; ").shift();
```

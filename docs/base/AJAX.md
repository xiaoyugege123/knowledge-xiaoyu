# 异步请求 AJAX

## XMLHttpRequest

手写一个基本且常规的原生请求模板

```js
// 创建一个XMLHttpRequest对象
const xhr = new XMLHttpRequest();
// 打开一个 URL
xhr.open("get", "http://127.0.0.1:8000/server");
// 最后发送请求
xhr.send();

//两种进行处理的方式
// >>>>>>>>>>>>> first-start
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      result.innerHTML = xhr.response;
    }
  }
};
// >>>>>>>>>>>>> first-end
// >>>>>>>>>>>>> second-start
xhr.addEventListener("load", reqListener);
function reqListener() {
  console.log(this.responseText);
}
// >>>>>>>>>>>>> second-end
```

重要属性介绍：

> - `XMLHttpRequest.onreadystatechange`：当 readyState 属性发生变化时，调用的事件处理器。
> - `XMLHttpRequest.readyState`：返回 一个无符号短整型（unsigned short）数字，代表请求的状态码。
>   > readystate 属性有五个,保存 XMLHttpRequest 的状态。
>   >
>   >        0：请求未初始化
>   >        1：服务器连接已建立
>   >        2：请求已收到
>   >        3：正在处理请求
>   >        4：请求已完成且响应已就绪
> - `XMLHttpRequest.response`：返回一个 ArrayBuffer、Blob、Document，或 DOMString，具体是哪种类型取决于 XMLHttpRequest.responseType 的值。其中包含整个响应实体（response entity body）。
> - `XMLHttpRequest.responseText`：返回一个 DOMString，该 DOMString 包含对请求的响应，如果请求未成功或尚未发送，则返回 null。
> - `XMLHttpRequest.responseType`：一个用于定义响应类型的枚举值（enumerated value）。
> - `XMLHttpRequest.responseURL`：返回经过序列化（serialized）的响应 URL，如果该 URL 为空，则返回空字符串。
> - `XMLHttpRequest.responseXML`：返回一个 Document，其中包含该请求的响应，如果请求未成功、尚未发送或是不能被解析为 XML 或 HTML，则返回 null。
> - `XMLHttpRequest.status`：返回一个无符号短整型（unsigned short）数字，代表请求的响应状态。
> - `XMLHttpRequest.statusText`：返回一个 DOMString，其中包含 HTTP 服务器返回的响应状态。与 XMLHTTPRequest.status 不同的是，它包含完整的响应状态文本（例如，"200 OK"）。
> - `XMLHttpRequest.timeout`：一个无符号长整型（unsigned long）数字，表示该请求的最大请求时间（毫秒），若超出该时间，请求会自动终止。
> - `XMLHttpRequest.upload`：XMLHttpRequestUpload，代表上传进度。
> - `XMLHttpRequest.withCredentials`：一个布尔值，用来指定跨域 Access-Control 请求是否应当带有授权信息，如 cookie 或授权 header 头。

这里还有一些实例方法和事件，在实际遇到了可以去[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)上进行查看

**GET 请求**

```js
// 1.创建对象
const xhr = new XMLHttpRequest();
// 设置响应体为json
xhr.responseType = "json"; //如果要获取JSON数据的，就这样设置
//get方式设置请求参数
xhr.open("get", "http://127.0.0.1:8000/server?a=100&b=200&c=300");
// 3.发送
xhr.send();
// 4.事件绑定，处理服务器端的返回数据 onreadystatechange
xhr.onreadystatechange = function () {
  // 判断（服务端反悔了所有的结果）
  if (xhr.readyState === 4) {
    // 判断响应状态码 200 403 404 500 401
    // 2XX:成功
    if (xhr.status >= 200 && xhr.status < 300) {
      // 处理结果  行 头 空行 体
      // 1.响应行
      console.log(xhr.status); //状态码
      console.log(xhr.statusText); //状态字符串
      console.log(xhr.getAllResponseHeaders); //所有响应头
      console.log(xhr.response); //响应体
      result.innerHTML = xhr.response;
    }
  }
};
```

**POST 请求**

```js
// 1.创建对象
const xhr = new XMLHttpRequest();
// 2.初始化，设置请求方法和URL
xhr.open("post", "http://127.0.0.1:8000/server"); //post匹配服务器也应该为post

// 设置请求头
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("name", "luoyu"); //自定义请求头

// 3.发送(请求体)
xhr.send("a=100&b=200&c=300"); //post的参数在send()中可以有，注意是post
xhr.onreadystatechange = function () {
  // 判断（服务端返回了所有的结果）
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      result.innerHTML = xhr.response;
    }
  }
};
```

**超时与网络异常**

```js
const xhr = new XMLHttpRequest();
// 超时设置 2s 设置,2s钟还没响应就取消
xhr.timeout = 2000;
// 设置超时回调
xhr.ontimeout = function () {
  alert("你的网络请求超时了！");
};
// 网络异常回调
xhr.onerror = function () {
  alert("你的网络出现了异常");
};
xhr.open("get", "http://127.0.0.1:8000/delay");
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      result.innerHTML = xhr.response;
    }
  }
};
```

**请求重复问题**

```js
let isSending = false; //标识是否在发送AJAX请求
let x = null;
const btns = document.querySelectorAll("button");
btns[0].onclick = function () {
  if (isSending) x.abort();
  x = new XMLHttpRequest(); //现在发现个问题，这个要作为对象来new一个
  isSending = true;
  x.open("get", "http://127.0.0.1:8000/delay");
  x.send();
  // 这里的话我给请求的地方进行了三秒的延迟
  x.onreadystatechange = function () {
    if (x.readyState === 4) {
      isSending = false;
    }
  };
};
```

**监测进度**

```js
var oReq = new XMLHttpRequest();

// 在请求调用 open() 之前添加事件监听。否则 progress 事件将不会被触发。
oReq.addEventListener("progress", updateProgress);
oReq.addEventListener("load", transferComplete);
oReq.addEventListener("error", transferFailed);
oReq.addEventListener("abort", transferCanceled);

oReq.open();

// ...

// 服务端到客户端的传输进程（下载）
function updateProgress(oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = (oEvent.loaded / oEvent.total) * 100;
    // ...
  } else {
    // 总大小未知时不能计算进程信息
  }
}

function transferComplete(evt) {
  console.log("The transfer is complete.");
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}
```

**绕过缓存**

> 在面试的时候，面试官问过我，关于强缓存，在没到达过期时间之前如何更新呢？因为你可能更改了服务端资源。——更新路径

有一个跨浏览器兼容的方法，就是给 URL 添加时间戳。请确保你酌情地添加了 "?" or "&" 。例如，将：

```sh
http://example.com/bar.html -> http://example.com/bar.html?12345
http://example.com/bar.html?foobar=baz -> http://example.com/bar.html?foobar=baz&12345
```

因为本地缓存都是以 URL 作为索引的，这样就可以使每个请求都是唯一的，也就可以这样来绕开缓存。

你也可以用下面的方法自动更改缓存：

```js
Copy to Clipboard
const req = new XMLHttpRequest();

req.open("GET", url + (/\?/.test(url) ? "&" : "?") + new Date().getTime());
req.send(null);
```

**同步请求和异步请求**

> XMLHttpRequest 支持同步和异步通信。但是，一般来说，出于性能原因，异步请求应优先于同步请求。
> 同步请求阻止代码的执行，这会导致屏幕上出现“冻结”和无响应的用户体验。

```js
xhr.open("GET", "/bar/foo.txt", true); //异步，默认
xhr.open("GET", "http://www.mozilla.org/", false); //同步
```

备注： 从 Gecko 30.0，Blink 39.0 和 Edge 13 开始，主线程上的同步请求由于对用户体验的负面影响而被弃用。同步 XHR 不允许所有新的 XHR 功能（如 timeout 或 abort）。这样做会调用 InvalidAccessError。

## fetch

Fetch有几个特点的了解一下，面试可能问，深挖你的知识点！
- 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve（如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false），仅当网络故障时或请求被阻止时，才会标记为 reject。
- fetch 不会发送跨域 cookie，除非你使用了 credentials 的初始化选项。

**fetch 发送 GET 请求**

```js
fetch("http://ajax-base-api-t.itheima.net/api/getbooks")
  .then((response) => {
    //这个response是一个Response对象，需要通过一个异步操作取出其中的内容
    return response.json();
  })
  .then((data) => {
    //经过response.json()处理过的数据
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

/* 下面使用async-await改写 ：把代码封装成async异步函数 */
async function getData() {
  try {
    //先获取Response对象
    let response = await fetch(
      "http://ajax-base-api-t.itheima.net/api/getbooks"
    );
    console.log(response);

    //需要通过response.json() 取出response对象中的结果
    let json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
getData();
```

**fetch 发送 POST 请求**

```js
//post发送:json格式
async function add() {
  let obj = {
    bookname: "魔法书之如何学好前端",
    author: "阿利亚",
    publisher: "格兰芬多",
  };
  let res = await fetch("http://ajax-base-api-t.itheima.net/api/addbook", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  let json = await res.json();
  console.log(json);
}
add();
```

**fetch 封装**

```js
//封装http函数（fetch请求）
async function http(obj) {
  let { method, url, params, data } = obj;
  let res;
  //params需要处理-->转化成key1=value1&key2=value2的形式
  if (params) {
    //固定写法：将params参数拼接成参数字符串
    let str = new URLSearchParams(params).toString();
    //拼接到url上去
    url += "?" + str;
  }

  //data需要处理-->如果有data，此时需要写完整的代码headers...
  if (data) {
    res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } else {
    res = await fetch(url);
  }
  //把获取的结果经过处理之后，返回出去
  return res.json();
}

//测试代码1
async function fn1() {
  //通过http函数发送get请求获取数据
  let result = await http({
    method: "get",
    url: "http://ajax-base-api-t.itheima.net/api/getbooks",
    params: {
      id: 2,
    },
  });
  console.log(result);
}
fn1();

//测试代码2
async function fn2() {
  //通过http函数发送post请求获取数据
  let result = await http({
    method: "post",
    url: "http://ajax-base-api-t.itheima.net/api/addbook",
    data: {
      bookname: "如何高新就业",
      author: "大佬",
      publisher: "哈哈出版社",
    },
  });
  console.log(result);
}
fn2();
```

**更多的详情，请求响应和相关方法可以查看[MDN-Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)**

## axiso 请求库
由于项目中经常会用这个库来进行请求，有问题一般是去查看[Axiso文档](https://www.axios-http.cn/)
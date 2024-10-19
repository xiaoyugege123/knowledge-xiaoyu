# CR 中常见的问题

1. 回调嵌套层次太多

```js
getUserInfo().then((userInfo) => {
  getArticles(userInfo).then((articles) => {
    Promise.all(articles.map((article) => getArticleDetail(article))).then(
      (articleDetails) => {
        console.log(articleDetails);
      }
    );
  });
});
```

修改如下，一定要清楚这一种做法哈，这种链式调用的写法

```js
getUserInfo()
  .then(getArticles)
  .then((articles) =>
    Promise.all(articles.map((article) => getArticleDetail(article)))
  )
  .then((articleDetails) => {
    console.log(articleDetails);
  });
```

2. 害怕报错
   > 有些程序员害怕看到报错，于是做了一件事，全部用 try catch 包起来，这样控制台就看不见错误了呗。这里就有点像出了问题先把自己的眼睛蒙上，当做没有问题。这里的处理方式就是展示报错消息，或者进行错误上报

```js
const getUserInfo = async () => {
  try {
    const userInfo = await fetch("/api/getUserInfo");
  } catch (err) {
    //为了避免报错的空白catch
    // 正确处理应该如下
    toast(err.message);
    log_upload(err);
  }
};
```

3. 参数过多的罗列
   > 像下面这种就会给调用者产生不小的心智负担，要确保每个参数必须传进来，还要确保传递参数的顺序是否正确。

```js
const getUserInfo = (
  name,
  age,
  weight,
  gender,
  mobile,
  nationality,
  hobby,
  address
) => {
  // ...
};

getUserInfo("xiaoyu", 19, 160, "男", "sddfd", "iduf", "dssd", "咋");
```

修改过后，这种就显得可阅读多了吧！

```js
const getUserInfo = (options) => {
  const { name, age } = options;
  // ...
};

getUserInfo({
  name: "xiaoyu",
  age: 18,
});
```

4. 不清楚的状态

```js
// compenents1.js
if (state === 1 || state === 2) {
  // ...
} else if (state === 3) {
  // ...
}

// compenent2.js
if (state === 1 || state === 2) {
  // ...
}

// 刚开始学JS语言的时候
node.nodeType === 1; // 不清楚这个数字的节点类型是什么？
```

修改之后，应该使用常量

```js
const STATE_TYPE = {
  NORMAL: 1,
  VIP: 2,
  SUPER_VIP: 3,
};

// compenents1.js
if (state === STATE_TYPE.NORMAL || state === STATE_TYPE.VIP) {
  // ...
} else if (state === STATE_TYPE.SUPER_VIP) {
  // ...
}

// compenent2.js
if (state === STATE_TYPE.NORMAL || state === STATE_TYPE.VIP) {
  // ...
}
```

5. 无意义的注释
   > 注释的作用不是让你把代码重复一遍，而是要提供代码里边看不出来的信息

```js
let id = 1; //给id赋值为1
```

修改如下，赋予这句代码额外的一些信息

```js
let id = 1; //要查找的文章id
```

6. 命名啰嗦

```js
class User {
  userName;
  userAge;
  userPwd;
  userLogin() {}
  getUserProfile() {}
}
```

修改如下

```js
class User {
  name;
  age;
  pwd;
  login() {}
  getProfile() {}
}
```

7. 代码可优化

```js
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
```

优化如下

```js
function counter(state = 0, action) {
  const step = {
    INCREMENT: 1,
    DECREMENT: -1,
  };
  return state + (step[action.type] ?? 0);
}
```

8. 看不懂代码片段在做什么

```js
function checkGameStatus() {
  if (
    remaining === 0 ||
    (remaining === 1 && remainingPlayers === 1) ||
    remainingPlayers === 0
  ) {
    quitGame();
  }
}
```

优化后,将代码片段提取出来更好的了解清楚

```js
function isGameOver() {
  return (
    remaining === 0 ||
    (remaining === 1 && remainingPlayers === 1) ||
    remainingPlayers === 0
  );
}

function checkGameStatus() {
  if (isGameOver()) {
    quitGame();
  }
}
```

9. 判断逻辑难以阅读

```js
function publishPost(post) {
  if (isLoggedIn()) {
    if (post) {
      if (isPostDoubleChecked()) {
        doPost();
      } else {
        throw new Error("不要重复发布文章");
      }
    } else {
      throw new Error("文章不可为空");
    }
  } else {
    throw new Error("你需要登录");
  }
}
```

修改如下，错误问题前置

```js
function publishPost(post) {
  if (!isLoggedIn()) {
    throw new Error("你需要登录");
  }
  if (!post) {
    throw new Error("文章不可为空");
  }
  if (!isPostDoubleChecked()) {
    throw new Error("不要重复发布文章");
  }
  doPost();
}
```

10. 很多的硬编码

```js
function responseInterceptor(resp) {
  const token = resp.headers.get("authorization");
  if (token) {
    localStorage.setItem("token", token);
  }
}
// ajax请求拦截器
function requestInterceptor(req) {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.set("authorization", `Bearer ${token}`);
  }
}
```

修改如下

```js
const AUTH_KEY = "authorization";
const TOKEN_KEY = "token";

function responseInterceptor(resp) {
  const token = resp.headers.get(AUTH_KEY);
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}
// ajax请求拦截器
function requestInterceptor(req) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    req.headers.set(AUTH_KEY, `Bearer ${token}`);
  }
}
```

# 花里胡哨的 console.log

## console 的基本介绍

看着干嘛，把这里丢控制台打印啊！

```js
// 基本打印展示部分
console.log("小雨");
console.info("小雨呀~");
console.error("下雨了！");
console.warn("啊啊啊，又生气了");

// 实用功能性打印部分
console.table({ name: "xiaoyu", age: 20 });
console.dir({ name: "xiaoyu", age: 20 });
```

console.count()

```js
function myFunction() {
  console.count("myFunction 被执行的次数");
}
myFunction(); //myFunction 被执行的次数: 1
myFunction(); //myFunction 被执行的次数: 2
myFunction(); //myFunction 被执行的次数: 3
```

console.time 和 console.timeEnd

```js
// 使用console.time来统计定义100000个数组所需要的时间
console.time("控制台计时器1");
for (var i = 0; i < 10000; i++) {
  for (var j = 0; j < 10000; j++) {}
}
console.timeEnd("控制台计时器1");

// 使用传统时间差统计定义100000个数组所需要的时间
var start = new Date().getTime();
arr = [];
for (var i = 0; i < 100000; i++) {
  arr[i] = new Array();
}
console.log(new Date().getTime() - start);
```

## console.log

> console.log() 可以接受任何类型的参数，包括字符串、数字、布尔值、对象、数组、函数等。最厉害的是，它支持占位符!

常用的占位符：

- %s - 字符串
- %d or %i - 整数
- %f - 浮点数
- %o - 对象
- %c - CSS 样式

#### 格式化字符串

console.log() 支持类似于 C 语言 printf 函数的格式化字符串。我们可以使用占位符来插入变量值。

```js
const name = "Alice";
const age = 30;
console.log("Name: %s, Age: %d", name, age); // Name: Alice, Age: 30
```

#### 添加样式

可以使用 %c 占位符添加 CSS 样式，使输出内容更加美观。

```js
console.log("%c This is a styled message", "color: red; font-size: 20px;");
//输出到控制台看看
```

## lets Go
**1. 开始制作花里胡哨的console.log（一个博主写的，进行了一点优化）**
> 注意：这样定义log有个问题，打印后面链接的定位代码就不是调用的位置了，而是封装后的位置，不利于跟踪代码。
```js
// 美化打印实现方法
const prettyLog = () => {
  //这里判断是否是生产环境
  //   const isProduction = import.meta.env.MODE === 'production';
  const isProduction = false;

  const isEmpty = (value) => {
    return value == null || value === undefined || value === "";
  };
  const prettyPrint = (title, text, color) => {
    if (isProduction) return;
    console.log(
      `%c ${title} %c ${text}`,
      `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`
    );
  };
  const info = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "Info" : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#909399");
  };
  const error = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "Error" : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#F56C6C");
  };
  const warning = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "Warning" : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#E6A23C");
  };
  const success = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "Success " : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#67C23A");
  };
  const table = () => {
    //上面这里可以解决简单的数组和 对象，需要进行判断
    //下面的数据需要pad进行长度补充
    const data = [
      { id: 1, name: "Alice  ", age: 25 },
      { id: 2, name: "Bob    ", age: 30 },
      { id: 3, name: "Charlie", age: 35 },
    ];
    //下面这里的打印数组可以通过逻辑来进行书写
    const arr = [
      "%c id%c name%c age %c\n%c 1 %c Bob  %c 30 %c\n%c 1 %c Bob  %c 30 ",
      "color: white; background-color: black; padding: 2px 10px;",
      "color: white; background-color: black; padding: 2px 10px;",
      "color: white; background-color: black; padding: 2px 10px;",
      "",
      "color: black; background-color: lightgray; padding: 2px 10px;",
      "color: black; background-color: lightgray; padding: 2px 10px;",
      "color: black; background-color: lightgray; padding: 2px 10px;",
      "",
      "color: black; background-color: lightgray; padding: 2px 10px;",
      "color: black; background-color: lightgray; padding: 2px 10px;",
      "color: black; background-color: lightgray; padding: 2px 10px;",
    ];
    console.log(...arr);

    data.forEach((row) => {
      console.log(
        `%c ${row.id} %c ${row.name} %c ${row.age} `,
        "color: black; background-color: lightgray; padding: 2px 10px;",
        "color: black; background-color: lightgray; padding: 2px 10px;",
        "color: black; background-color: lightgray; padding: 2px 10px;"
      );
    });
  };
  const picture = (url, scale = 1) => {
    if (isProduction) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");
      if (ctx) {
        c.width = img.width;
        c.height = img.height;
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0);
        const dataUri = c.toDataURL("image/png");

        console.log(
          `%c sup?`,
          `font-size: 1px;
           padding: ${Math.floor((img.height * scale) / 2)}px 
           ${Math.floor((img.width * scale) / 2)}px;
           background-image: url(${dataUri});
           background-repeat: no-repeat;
           background-size: ${img.width * scale}px ${img.height * scale}px;
           color: transparent;`
        );
      }
    };
    img.src = url;
  };

  return {
    info,
    error,
    warning,
    success,
    picture,
    table,
  };
};
// 创建打印对象
const log = prettyLog();
// 不带标题
log.info("这是基础信息!");

//带标题
log.info("注意看", "这是个男人叫小帅!");
log.error("奥德彪", "出来的时候穷 生活总是让我穷 所以现在还是穷。");

log.error("前方的路看似很危险,实际一点也不安全。");
log.warning("奥德彪", "我并非无路可走 我还有死路一条! ");   

log.success("奥德彪", "钱没了可以再赚，良心没了便可以赚的更多。 ");
log.picture(
  "https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0514%2Fd0ea93ebj00sdgx56001xd200u000gtg00hz00a2.jpg&thumbnail=660x2147483647&quality=80&type=jpg"
);
log.table();
console.table({ id: 1, name: "Alice  ", age: 25 });
```

![](/imgs/花里胡哨的console.log.png)


**2. 使用console.log输出特殊字符图案**
> -  访问这个网站，能帮你快速生成[https://patorjk.com/software/taag/](https://patorjk.com/software/taag/#p=display&f=Alpha&t=Rain%0A)
> -  你需要处理好字符串，防止特殊符号被转义
```js
        function makeMulti (string) {
            let l = new String(string)
            console.log(string);
            l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"))
            return l
        }
        let string = function () {
          /*           _____                    _____                    _____                    _____          
         /\    \                  /\    \                  /\    \                  /\    \         
        /::\    \                /::\    \                /::\    \                /::\____\        
       /::::\    \              /::::\    \               \:::\    \              /::::|   |        
      /::::::\    \            /::::::\    \               \:::\    \            /:::::|   |        
     /:::/\:::\    \          /:::/\:::\    \               \:::\    \          /::::::|   |        
    /:::/__\:::\    \        /:::/__\:::\    \               \:::\    \        /:::/|::|   |        
   /::::\   \:::\    \      /::::\   \:::\    \              /::::\    \      /:::/ |::|   |        
  /::::::\   \:::\    \    /::::::\   \:::\    \    ____    /::::::\    \    /:::/  |::|   | _____  
 /:::/\:::\   \:::\____\  /:::/\:::\   \:::\    \  /\   \  /:::/\:::\    \  /:::/   |::|   |/\    \ 
/:::/  \:::\   \:::|    |/:::/  \:::\   \:::\____\/::\   \/:::/  \:::\____\/:: /    |::|   /::\____\
\::/   |::::\  /:::|____|\::/    \:::\  /:::/    /\:::\  /:::/    \::/    /\::/    /|::|  /:::/    /
 \/____|:::::\/:::/    /  \/____/ \:::\/:::/    /  \:::\/:::/    / \/____/  \/____/ |::| /:::/    / 
       |:::::::::/    /            \::::::/    /    \::::::/    /                   |::|/:::/    /  
       |::|\::::/    /              \::::/    /      \::::/____/                    |::::::/    /   
       |::| \::/____/               /:::/    /        \:::\    \                    |:::::/    /    
       |::|  ~|                    /:::/    /          \:::\    \                   |::::/    /     
       |::|   |                   /:::/    /            \:::\    \                  /:::/    /      
       \::|   |                  /:::/    /              \:::\____\                /:::/    /       
        \:|   |                  \::/    /                \::/    /                \::/    /        
         \|___|                   \/____/                  \/____/                  \/____/         
                                                                                                @小雨   */
        }
        console.log(makeMulti(string));
        //下面是的模版字符串不进行转义
        console.log(String.raw`          _____                    _____                    _____                    _____          
         /\    \                  /\    \                  /\    \                  /\    \         
        /::\    \                /::\    \                /::\    \                /::\____\        
       /::::\    \              /::::\    \               \:::\    \              /::::|   |        
      /::::::\    \            /::::::\    \               \:::\    \            /:::::|   |        
     /:::/\:::\    \          /:::/\:::\    \               \:::\    \          /::::::|   |        
    /:::/__\:::\    \        /:::/__\:::\    \               \:::\    \        /:::/|::|   |        
   /::::\   \:::\    \      /::::\   \:::\    \              /::::\    \      /:::/ |::|   |        
  /::::::\   \:::\    \    /::::::\   \:::\    \    ____    /::::::\    \    /:::/  |::|   | _____  
 /:::/\:::\   \:::\____\  /:::/\:::\   \:::\    \  /\   \  /:::/\:::\    \  /:::/   |::|   |/\    \ 
/:::/  \:::\   \:::|    |/:::/  \:::\   \:::\____\/::\   \/:::/  \:::\____\/:: /    |::|   /::\____\
\::/   |::::\  /:::|____|\::/    \:::\  /:::/    /\:::\  /:::/    \::/    /\::/    /|::|  /:::/    /
 \/____|:::::\/:::/    /  \/____/ \:::\/:::/    /  \:::\/:::/    / \/____/  \/____/ |::| /:::/    / 
       |:::::::::/    /            \::::::/    /    \::::::/    /                   |::|/:::/    /  
       |::|\::::/    /              \::::/    /      \::::/____/                    |::::::/    /   
       |::| \::/____/               /:::/    /        \:::\    \                    |:::::/    /    
       |::|  ~|                    /:::/    /          \:::\    \                   |::::/    /     
       |::|   |                   /:::/    /            \:::\    \                  /:::/    /      
       \::|   |                  /:::/    /              \:::\____\                /:::/    /       
        \:|   |                  \::/    /                \::/    /                \::/    /        
         \|___|                   \/____/                  \/____/                  \/____/         
                                                                                                @小雨  `);
```
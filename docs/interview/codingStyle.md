# 前端代码风格上的工具
## Vue3项目创建时可选用的代码格式化 Prettier
![1.png](http://picture.gptkong.com/20240515/210922fa09359b40dd8ac4be34c90c21fe.png)
>  npm create vue@latest这一指令将会安装并执行 [create-vue](https://github.com/vuejs/create-vue)，它是 Vue 官方的项目脚手架工具。
> 这里引入了ESLint和Prettier代码格式化工具。
> npm run format进行代码格式化。

**代码格式化的魅力**
![2.png](http://picture.gptkong.com/20240515/21109000f4561949afa0de7dd339b84c8a.png)
![3.png](http://picture.gptkong.com/20240515/21107bee878244433bb6b3368c2601e5ea.png)
![4.png](http://picture.gptkong.com/20240515/21117219bb9214439190ee35718f2eddfd.png)
![5.png](http://picture.gptkong.com/20240515/21112fffbfc33e46afbc1eb3052fb43d40.png)
![6.png](http://picture.gptkong.com/20240515/2112720aa1d6fb475eaa2e50dd956ce2a6.png)
![7.png](http://picture.gptkong.com/20240515/21124a10c9b2f740e59fd62f690bf2fd30.png)
> 由于每次格式化的时候，我们都需要使用指令的话会比较麻烦。我们也可以在VScode上面安装prettier插件。


配置.prettierrc文件：

- useTabs：使用tab缩进还是空格缩进，选择false时表示使用空格；
- tabWidth：tab是空格的情况下，是几个空格，选择2个；
- printWidth：当行字符的长度，推荐80；
- singleQuote：使用单引号还是双引号，选择true，使用单引号；
- trailingComma：在多行输入的尾逗号是否添加，设置为 none；
- semi：语句末尾是否要加分号，默认值true，选择false表示不加；
- 更多的配置可以查看[官方文档](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Foptions.html)
## 项目中引入 ESLint
> 这个时候通过 npm run dev 跑起来的开发环境就已经开启了 ESlint 的校验，错误的提示将会出现在终端中。预期是希望这些错误能够直接高亮在 VSCode 中，因此需要继续开启 VSCode 的插件。下面这个插件能根据你项目根目录下的ESLint配置文件进行高亮显示！！！

![8.png](http://picture.gptkong.com/20240515/2113fcc028aa474f1e913bb4483466844d.png)
**文件的配置规则参考:**[规则参考 - ESLint - 插件化的 JavaScript 代码检查工具](https://zh-hans.eslint.org/docs/latest/rules/)
![9.png](http://picture.gptkong.com/20240515/2113e89a664bfb40b2aa33f9b9de04cacb.png)
**配置规则：**[配置规则 - ESLint - 插件化的 JavaScript 代码检查工具](https://zh-hans.eslint.org/docs/latest/use/configure/rules)
![10.png](http://picture.gptkong.com/20240515/2113d0c30bbb6f4ffeb32d7523fa4b9dcb.png)
![11.png](http://picture.gptkong.com/20240515/21144456ec25bc4750ae936aa1f68eabbd.png)
ESLint的几个配置去向：[配置 ESLint - ESLint - 插件化的 JavaScript 代码检查工具](https://zh-hans.eslint.org/docs/latest/use/configure/)
![12.png](http://picture.gptkong.com/20240515/211442bdac5d654595927e459ec2155dde.png)

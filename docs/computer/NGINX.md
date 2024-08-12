# Nginx

**推荐文章**

[Nginx快速入门——狂神说](https://www.kuangstudy.com/bbs/1353634800149213186)

[Nginx哔站视频——狂神说](https://www.bilibili.com/video/BV1F5411J7vK?p=1&vd_source=bf3353ad677b1fdc2e25b9a255e71902)

[技术蛋老师——Nginx视频](https://www.bilibili.com/video/BV1TZ421b7SD/?spm_id_from=333.337.search-card.all.click&vd_source=bf3353ad677b1fdc2e25b9a255e71902)

[万字带你搞懂nginx的配置文件](https://blog.csdn.net/qq_36551991/article/details/118612282)

[nginx一小时入门精讲课程(干货纯享版)](https://www.bilibili.com/video/BV1rG4y1e7BQ/?share_source=copy_web&vd_source=637a17631c58c283d29c16f50dab56a9)


## Nginx常用命令
```bash
nginx -s reopen #重启Nginx

nginx -s reload #重新加载Nginx配置文件，然后以优雅的方式重启Nginx

nginx -s stop #强制停止Nginx服务

nginx -s quit #优雅地停止Nginx服务（即处理完所有请求后再停止服务）

nginx -t #检测配置文件是否有语法错误，然后退出

nginx -?,-h #打开帮助信息

nginx -v #显示版本信息并退出

nginx -V #显示版本和配置选项信息，然后退出

nginx -t #检测配置文件是否有语法错误，然后退出

nginx -T #检测配置文件是否有语法错误，转储并退出

nginx -q #在检测配置文件期间屏蔽非错误信息

nginx -p prefix #设置前缀路径(默认是:/usr/share/nginx/)

nginx -c filename #设置配置文件(默认是:/etc/nginx/nginx.conf)

nginx -g directives #设置配置文件外的全局指令

killall nginx #杀死所有nginx进程

Nginx在windows下常用命令：

启动：
直接点击Nginx目录下的nginx.exe 或者 cmd运行start nginx

关闭
nginx -s stop 或者 nginx -s quit

stop表示立即停止nginx,不保存相关信息

quit表示正常退出nginx,并保存相关信息

nginx -s stop 或者 nginx -s quit

nginx -s reload ：修改配置后重新加载生效

nginx -s reopen ：重新打开日志文件

nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确
```

## Linux && Nginx
```bash
# 查看Nginx日志
tail -f /var/log/nginx/error.log
```

## Nginx出错的地方

### nginx “403 Forbidden” 错误的原因及解决办法

> Nginx 的 403 Forbidden errors 表示你在请求一个资源文件但是nginx不允许你查看。
403 Forbidden 只是一个HTTP状态码，像404,200一样不是技术上的错误。
哪些场景需要返回403状态码的场景？

1. 网站禁止特定的用户访问所有内容，例：网站屏蔽某个ip访问。
2. 访问禁止目录浏览的目录，例：设置autoindex off后访问目录。
3. 用户访问只能被内网访问的文件。

以上几种常见的需要返回 403 Forbidden 的场景。

由于服务器端的错误配置导致在不希望nginx返回403时返回403 Forbidden。

1. 权限配置不正确
```
这个是nginx出现403 forbidden最常见的原因。
为了保证文件能正确执行，nginx既需要文件的读权限,又需要文件所有父目录的可执行权限。
例如，当访问/usr/local/nginx/html/image.jpg时，nginx既需要image.jpg文件的可读权限，
也需要/, /usr,/usr/local,/usr/local/nginx,/usr/local/nginx/html的可以执行权限。

解决办法:设置所有父目录为755权限，设置文件为644权限可以避免权限不正确。

# 这个是nginx出现403 forbidden最常见的原因。
# 为了保证文件能正确执行，nginx既需要文件的读权限,又需要文件所有父目录的可执行权限。
# 解决办法：可以将权限修改为root，在nginx的nginx.conf 文件的顶部加上user root;指定操作的用户是root。
user root;
```


2. 目录索引设置错误（index指令配置）

```
网站根目录不包含index指令设置的文件。

例如，运行PHP的网站，通常像这样配置index

index index.html index.htm index.php;

当访问该网站的时，nginx 会按照 index.html，index.htm ，index.php 的先后顺序在根目录中查找文件。如果这三个文件都不存在，那么nginx就会返回403 Forbidden。

如果index中不定义 index.php ，nginx直接返回403 Forbidden而不会去检查index.php是否存在。

同样对于如果运行jsp, py时也需要添加index.jsp,index.py到目录索引指令index中。

解决办法:添加首页文件到index指令，常见的是index.php，index.jsp，index.jsp或者自定义首页文件。
```
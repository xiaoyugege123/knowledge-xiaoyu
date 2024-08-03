# Git

[常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)<br>
[git rebase与git merge图文详解](https://blog.csdn.net/weixin_45565886/article/details/133798840)<br>
[Git之GitFlow工作流 | Gitflow Workflow](https://blog.csdn.net/sunyctf/article/details/130587970)

## Git常用场景
**配置相关**
```bash
# 配置全局/局部的名字和邮箱，为了提交。
git config --global user.name "xiaoyu"
git config --global user.email "****@qq.com"

git config user.name "*****"
git config user.email "*****"

# 查看配置信息
git config list
```

## Git合作开发场景

**使用 stash 的一个场景**
```:no-line-numbers
问题场景:
甲和乙同时修改master分支代码。
甲修改了一部分，在本地，未提交
乙修改了一部分代码，提交到了远程
甲如何更新到乙修改的代码，同时本地修改保留?

解决:
1、执行git stash #暂存这些变更
2、git pull origin #拉取远程代码
3、git stash pop #重新应用储藏的变更
4、再次提交自己的代码到远程
    git commit -a -m "提交说明"
    git push origin master
```

**使用 stash 的另一个场景**
```:no-line-numbers
问题场景:
甲同学在自己的分支上开发进行一半了。
但是代码还不想进行提交（切换分支要清空工作区）。
现在要修改别的分支问题的时候。

1、git stash：保存开发到一半的代码
2、git commit -m '修改问题'
3、git stash pop：将代码追加到最新的提交之后
```

## Git特殊使用场景
> 因为担心自己的代码会被其他人看到，有些问题，或者说自己看着自己做的git操作，给后来的自己整无语了，想进行相关的修缮操作。

**篡改提交记录**

单条记录修改

Git提供了amend命令，可以用来修改最新的提交记录。`注意，这个命令只会修改最近一次的提交`，它能实现以下的功能：

- 修改提交信息
- 添加漏掉的文件到上一次的提交中
- 修改之前提交的文件
```bash
# 替换用户名、邮箱信息
git commit --amend --author="{username} <{email}>" --no-edit
# 如果已经修改了仓库的用户信息，直接执行命令重置
git commit --amend --reset-author --no-edit
```

批量修改

Git官网提供了很多种修改提交记录信息的方法，这里主要介绍下filter-branch，它可以通过脚本的方式批量修改历史提交记录信息。

filter-branch 它能实现如下的功能，正好符合我们要批量修改历史提交记录中用户、邮箱的需求。

```bash
git filter-branch --commit-filter '
        if [ "$GIT_AUTHOR_NAME" = "xiaofu" ];
        then
                GIT_AUTHOR_NAME="程序员小富";
                GIT_AUTHOR_EMAIL="515361725@qq.com";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD
```

# Git

[常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)<br>
[git rebase 与 git merge 图文详解](https://blog.csdn.net/weixin_45565886/article/details/133798840)<br>
[Git 之 GitFlow 工作流 | Gitflow Workflow](https://blog.csdn.net/sunyctf/article/details/130587970) <br>
[Git 中的三种后悔药](https://www.cnblogs.com/liuyuelinfighting/p/16788088.html)<br>
[Git 中的三种后悔药 二](https://www.cnblogs.com/liuyuelinfighting/p/16790887.html)

## Git 常用场景

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

## Git 合作开发场景

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

**切换远程仓库**

```bash
git remote -v # 查看当前远程仓库地址
git remote set-url origin <new url> # 修改远程地址为新的地址 <new url> 改为新的地址

# git remote show origin # 再次查看当前仓库远程地址 确认是否发生改变
```

**切换远程分支**

```
1.  查看远程所有分支

git branch -a

如：

* dev

  master

  remotes/origin/HEAD -> origin/master

  remotes/origin/master

  remotes/origin/release/caigou_v1.0

2.  本机新建分支并切换到指定分支（指定的远程分支）

  git checkout -b dev origin/release/caigou_v1.0

该命令可以将远程git仓库里的指定分支拉取到本地，这样就在本地新建了一个dev分支，
并和指定的远程分支release/caigou_v1.0关联了起来。
```

## Git 特殊使用场景

> 因为担心自己的代码会被其他人看到，有些问题，或者说自己看着自己做的 git 操作，给后来的自己整无语了，想进行相关的修缮操作。

**篡改提交记录**

单条记录修改

Git 提供了 amend 命令，可以用来修改最新的提交记录。`注意，这个命令只会修改最近一次的提交`，它能实现以下的功能：

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

Git 官网提供了很多种修改提交记录信息的方法，这里主要介绍下 filter-branch，它可以通过脚本的方式批量修改历史提交记录信息。

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

下面相当于在重写.git 文件夹

```
PS D:\web前端工程\WebDemo\React\happy-buy> git filter-branch --commit-filter '
>>         if [ "$GIT_AUTHOR_NAME" = "xiaoyugege123" ];
>>         then
>>                 GIT_AUTHOR_NAME="xiaoyu";
>>                 GIT_AUTHOR_EMAIL="luoyu2003@outlook.com";
>>                 git commit-tree "$@";
>>         else
>>                 git commit-tree "$@";
>>         fi' HEAD
$@"\x3b\x0a        else\x0a                git commit-tree "$@"\x3b\x0a        fi' HEAD;a6c62303-8523-46d7-a161-ece3222db78dWARNING: git-filter-branch has a glut of gotchas generating mangled history
         rewrites.  Hit Ctrl-C before proceeding to abort, then use an
         alternative filtering tool such as 'git filter-repo'
         (https://github.com/newren/git-filter-repo/) instead.  See the
         filter-branch manual page for more details; to squelch this warning,
         set FILTER_BRANCH_SQUELCH_WARNING=1.
Proceeding with filter-branch...

Rewrite 1159a0efac5311581fc69968c1d7b955cc7b26c0 (39/40) (21 seconds passed, remaining 0 predicted)
Ref 'refs/heads/master' was rewritten
```

## commit 规范

1.  type

        - feat: 新功能
        - fix: 修复问题
        - docs: 修改文档
        - style: 修改代码格式，不影响代码逻辑
        - refactor: 重构代码，理论上不影响现有功能
        - perf: 提升性能
        - test: 增加修改测试用例
        - chore: 修改工具相关（包括但不限于文档、代码生成等）
        - deps: 升级依赖

2.  scope

        - 修改文件的范围（包括但不限于 doc, middleware, proxy, core, config）

3.  subject

        - 用一句话清楚的描述这次提交做了什么

4.  body

        - 补充 subject，适当增加原因、目的等相关因素，也可不写。

5.  footer

        - 当有非兼容修改时可在这里描述清楚
        - 关联相关 issue，如 Closes #1, Closes #2, #3
        - 如果功能点有新增或修改的，还需要关联 chair-handbook 和 chair-init 的 MR，如 chair/doc!123

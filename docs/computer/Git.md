# Git

[常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

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


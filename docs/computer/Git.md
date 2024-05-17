# Git

## Git合作开发场景

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


# 小雨的学习记录

自动化提交部署上线（github page）
```bash
# 进行打包输出
call npm run docs:build

cd docs/.vuepress/dist

git init
git remote add origin https://github.com/xiaoyugege123/xiaoyugege123.github.io.git
git branch -M main
git add .
git commit -m "xiaoyu"

git push -f origin main
```

### 前端错误捕获和上报
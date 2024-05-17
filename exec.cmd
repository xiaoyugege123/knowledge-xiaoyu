# 进行打包输出
npm run docs:build

cd docs/.vuepress/dist

git init
git remote add https://github.com/xiaoyugege123/xiaoyugege123.github.io.git
git branch -M main
git add .
git commit -m ""

git push -f origin main
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd test

git init
git add -A
git commit -m 'deploy'

### imporant 注意替换 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@https://github.com/qingchenWei/vuepressBlog master:qcw-pages

cd -
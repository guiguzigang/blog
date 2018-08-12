#!/usr/bin/env sh

set -e

npm run build

cd .vuepress/dist

git init
git config user.name 'guiguzigang'
git config user.email '18616394882@163.com'
git add -A
git commit -m 'deploy'

git push -f git@github.com:guiguzigang/Blog.git master:gh-pages

cd -
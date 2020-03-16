#auther lxhyl
#desp 部署至github

git add .
git commit -m "自动部署"
git remote add origin git@github.com:zpfnb/zpfnb.github.io
git pull origin master
git push -u origin master


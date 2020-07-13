#auther lxhyl
#desp push to github


git add .
git commit -m "$1"
git remote add origin git@github.com:lxhyl/lxhyl.github.io
git pull origin master
git push -u origin master


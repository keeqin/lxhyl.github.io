#auther lxhyl
#desp ¿¿¿¿github
time=$(date "+%Y-%m-%d %H:%M:%S")


git add .
git commit -m "$time"
git remote add origin git@github.com:zpfnb/zpfnb.github.io
git pull origin master
git push -u origin master


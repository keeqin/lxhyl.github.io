记录下工作中常用git命令

# git state
查看工作区状态

# git log  

`git log` 查看提交历史   
`git log -p file`查看指定file的提交历史   

# git add 

添加文件至暂存区 
`git add .`
`git add [dir | files]`

# git commit   

`git commit -m [message]` 提交到本地仓库  
`git commit [file] -m [message]` 提交指定文件至本地仓库    
``

# git pull

`git pull` 拉取所有代码    
`git pull origin master` 拉取远程master分支的代码   
`git pull origin master:dev` 拉取远程master分支至本地dev分支   

# git fetch  
> `git fetch`不会自动合并代码，`git pull` 会自动merge  

`git fetch --all` 拉取远程所有代码  
`git fetch origin master` 拉取master代码

# git push 

`git push origin master` 将本地变动推送到远程master分支   
`git push origin -d [branch name]` 删除远程分支


# git checkout  

`git checkout name`切换至name分支   
`git checkout -b name` 新建name分支并切换   

# git branch  

**新建**   
`git branch name` 新建name分支
**查看**    
`git branch` 查看本地所有分支
`git branch -r` 查看远程分支
`git branch -a` 查看本地和远程的所有分支  
**删除**   
`git branch -D name` 删除本地naem分支  


# git merge  

`git merge name` 将本地name分支合并至当前工作分支   
`git merge --no-ff origin/name` 将远程name分支合并至当前工作分支  
`git merge --abort`  终止合并,回到merge之前的状态  


# git reset   

`git reset --soft commit_hash` 回退到暂存区    
`git reset --mixed commit_hash` 回退到工作区  
`git reset --hart commit_hash` 所有提交彻底回退   

# git revert 

git reset是彻底回退，git revert是将commit_hash作为新的commit，加在当前分支最前端



# 分支重命名

 * `git branch -m oldName newName` 重命名本地分支   
 * `git push --delete origin oldName` 删除远程分支   
 * `git push origin newName` 上传本地分支至远程   
 * `git branch --set-upstream-to origin/newName` 将本地分支与远程分支关联  
 

# 将几次commit合并为一次

 **git rebase**   

 * `git rebase -i HEAD~2` 从当前合并到往前两个版本
 * `git rebase -i *******` 合并到`*******`以前

运行命令后可能报错找不到编辑器，可以执行`git config --global core.editor vim`,将默认编辑器设为vim。然后在执行rebase。   

运行成功后会出现编辑器如下，在这里可以更改提交。每个命令后面都有相应的提示.  
```js
# Rebase 59bee03..9d5e4ee onto 59bee03 (2 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
pick dd0f9d2 提交1
pick 9d5e4ee 提交2
```

这里我做出更改   
```js
r dd0f9d2 添加git rebase
s 9d5e4ee 提交2
```
 * s 将此次提交合并到上一次
 * r 使用此次提交，但更改备注

然后wq退出 

若有冲突，修改完冲突再  
`git add`   
`git rebase -continue`    

无冲突就可以直接推到远程仓库，  
![git-rebase](https://raw.githubusercontent.com/lxhyl/lxhyl.github.io/master/files/img/git-rebase.png)

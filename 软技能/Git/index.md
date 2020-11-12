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

# 利用github actions自动化部署


我这里是自定义机器部署，只需要在仓库的`setting/actions/add runner`按照指示添加机器就行。   
添加的时候,可能会报错不能使用sudo,去掉`run.sh`里面那段检查的脚本就行。   


然后就可以写工作流文件了，在仓库根目录下，新建`.github/workflows/deploy.yml`文件。

可以参考[github actions文档](https://docs.github.com/cn/actions)。我的需求是每当push代码到仓库时，执行脚本，所以就很简单如下

```js
name: auto deploy // 指定名称
on: push    // 触发条件，还可以用branch定义分支等

jobs:   // jobs种写流程
  deploy:  // 流程名称
    runs-on: self-hosted // 运行环境，自定义机器
    steps: // 运行步骤
      - name: RunBash  // 步骤名称
        run: sudo -i /actions/bs/graduationProject/deploy.sh  // 运行的脚本

```

由于是在自己的机器上运行脚本，所以部署的逻辑就直接可以写在脚本里了,就简单的拉取代码，移动文件夹，重启后台服务。没什么难度
```shell
#!/bin/bash

cd /actions/bs/graduationProject
git pull origin main

# web
cp -r /actions/bs/graduationProject/web-app/dist/*  /usr/local/nginx/html/bsweb/

# node
cp -r /actions/bs/graduationProject/backEnd/* /node/serve/bsapi/

cd /node/serve/bsapi/
/node/node-v13.2.0/bin/pm2 delete ./index.js
/node/node-v13.2.0/bin/pm2 start ./index.js

```
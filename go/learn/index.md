go语言学习笔记

# 相关资料   
* [文档](http://www.topgoer.com/)  


# 初始  

安装和环境变量不用多说，安装只需要下载一直next即可，环境只需要把go安装目录添加到全局路径里就行   

首先需要设置`GOPATH`的路径，也就是设置工作区路径。    
`go env -w GOPATH=path`    
例如我设置的`go env -w GOPATH=/Users/lxhyl/go`, 那么工作区就是`Users/lxhyl/go/src`         
现在就可以在`src`目录下随意新建目录玩耍了，新建个`learn`目录. 执行`go mod init`,就会新建一个`go.mod`文件来管理项目的包 ***（和npm init差不多？）***。

还有个命令`go mod tidy`进行依赖包的安装 ***（和npm install差不多？）***
准备工作做完，然后在vs code安装go插件，就可以写代码了。

# hello world

```go
// hello.go
package main

import "fmt"

func main() {
	fmt.Printf("hello world")
}
```
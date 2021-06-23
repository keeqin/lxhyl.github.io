go语言学习笔记

学习的相关代码在`/Users/lxhyl/Documents/learn/go/learn`目录下   
# 相关资料   
* [topgoer.com](http://www.topgoer.com/)    
* [chai2010.cn](https://chai2010.cn/)

# 初始  

安装和环境变量不用多说，安装只需要下载一直next即可，环境只需要把go安装目录添加到全局路径里就行   

首先需要设置`GOPATH`的路径，也就是设置工作区路径。    
`go env -w GOPATH=path`    
例如我设置的`go env -w GOPATH=/Users/lxhyl/go`, 那么工作区就是`Users/lxhyl/go/src`         
现在就可以在`src`目录下随意新建目录玩耍了，新建个`learn`目录. 执行`go mod init`,就会新建一个`go.mod`文件来管理项目的包 **（和npm init差不多？）**。

还有个命令`go mod tidy`进行依赖包的安装
准备工作做完，然后在vs code安装go插件，就可以写代码了。


> 更新      

上面的太复杂，version1.16 可以在任意目录建立项目啦，只需要在项目根目录执行 `go mod init moduleName`,就会生成一个go.mod文件，这个mod文件里进行全局的模块/包管理 **（类似node package.json）**。   


# 还是熟悉的hello world

```go
// hello.go


// package用来此文件是那个包的
package main

// 导入fmt内置模块
import "fmt"

// 类似c语言的main函数
func main() {
	fmt.Printf("hello world")
}
```


# 基础   

## 类型 
> 值类型  
```go
bool
int(32 or 64), int8, int16, int32, int64
uint(32 or 64), uint8(byte), uint16, uint32, uint64
float32, float64
string
complex64, complex128 // 虚数
array  
```
> 引用类型    
```go
slice   -- 序列数组
map     -- 映射
chan    -- 管道
```
## “_” 下划线      
* 引入包时希望只执行包内的`init`,就可以使用 `import _ "packageName"`    
* 占位符

## 声明变量常量
和js差不多，变量`var`,常量`const`.    
```go
// 声明了两个都为int类型的常量a,b，并且分别赋值为1,2
const a, b int = 1, 2
// 可以不声明类型，类型推导
const c = 1
// 函数内部可以这样声明
d := "test"
```
## 字符串


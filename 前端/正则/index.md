我是看着这篇文章学习的[正则表达式学习](https://juejin.im/post/5965943ff265da6c30653879)

> 以下为笔记，总结
* g为全局匹配
* \为转义符
* ^为脱字符
# 一.正则表达式 字符匹配
 ## 1.模糊匹配
 ### 1.1横向模糊匹配
 > {m,n}表示前一个字符最少m次，最多n次
```js 
let reg = /ng{2,5}/g;
let str = 'zhangggpengfangggggg'
str.match(reg);
// ["nggg", "nggggg"]
```
 ### 1.2纵向模糊匹配
 > [mn]表示可以是m,n中任意一个
 ```js
 let reg = /n[gm]/g;
 let str = 'ngnmnc';
 str.match(reg);
//  ["ng", "nm"]
 ```

 ## 2.字符组
 ### 2.1. 范围表示法
> [a-c]表示[abc]中任意一个
```js
let reg = /z[a-c]/g;
let str = 'zazbzczdzef';
str.match(reg);
// ["za", "zb", "zc"]
```
### 2.2. 排除字符组
> [^abc]表示不能是abc中任何一个
```js
let reg = /z[^abc]/g;
let str = 'zazbzczdzef';
str.match(reg);
// ["zd", "ze"]
```

### 2.3简写
| 简写 | 完整 | 描述 |
|--|:--:   |:--|
|\d|[0-9]|表示是一位数字。记忆方式：其英文是digit（数字）。|
|\D|[^0-9]|表示除数字外的任意字符。|
|\w|[0-9a-zA-Z_]|表示数字、大小写字母和下划线。记忆方式：w是word的简写，也称单词字符。|
|\W|[^0-9a-zA-Z_]|非单词字符。|
|\s|[[\t\v\n\r\f]|表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式：s是space character的首字母。|
|\S|[^\t\v\n\r\f]|非空白符。|
|.|[^\n\r\u2028\u2029]|通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。记忆方式：想想省略号...中的每个点，都可以理解成占位符，表示任何类似的东西。|

### 练习
> 判断是否是手机号
```js
let num = 13345678910;
let reg = /1[3-9][\d]{9}/;
reg.test(num);
// true
```
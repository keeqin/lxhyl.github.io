我是看着这篇文章学习的[正则表达式](https://juejin.im/post/5965943ff265da6c30653879)

> 以下为笔记，总结
* g为全局匹配
* \为转义符
* m为多行匹配
* i为不区分大小写
# 一.正则表达式 字符匹配
 ## 模糊匹配
 ### 横向模糊匹配
 > {m,n}表示前一个字符最少m次，最多n次
```js 
let reg = /ng{2,5}/g;
let str = 'zhangggpengfangggggg'
str.match(reg);
// ["nggg", "nggggg"]
```
 ### 纵向模糊匹配
 > [mn]表示可以是m,n中任意一个
 ```js
 let reg = /n[gm]/g;
 let str = 'ngnmnc';
 str.match(reg);
//  ["ng", "nm"]
 ```

 ## 字符组
 ### 范围表示法
> [a-c]表示[abc]中任意一个
```js
let reg = /z[a-c]/g;
let str = 'zazbzczdzef';
str.match(reg);
// ["za", "zb", "zc"]
```
### 排除字符组
> [^abc]表示不能是abc中任何一个
```js
let reg = /z[^abc]/g;
let str = 'zazbzczdzef';
str.match(reg);
// ["zd", "ze"]
```

### 简写
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
## 量词
### 简写
| 简写 | 完整 | 描述 |
|--|:--:   |:--|
|{m,}|  |表示最少出现m次|
|{m}|{m,m}|出现m次|
|？|{0，1}|出现或者不出现|
|+|{1,}|至少出现1次|
|*|{0，}|出现任意次|


### 贪婪匹配
```js
let reg = /\d{2,4}/g
let str = '123ad41sda2223a11111'
str.match(reg);
// ["123", "41", "2223", "1111"]
```
上面例子表示匹配所有2-4位的数字，是贪婪的,尽可能多的匹配。

### 惰性匹配
```js
let reg = /\d{2,4}?/g
let str = '123ad41sda2223a11111'
str.match(reg);
// ["12", "41", "22", "23", "11", "11"]
```
在量词后面加 `?`，表示惰性匹配。
> 所有惰性匹配情形如下
* {m,n}?
* {m,}?
* ??
* +?
* *?

## 多选分支
> p1|p2|p3 表示p1,p2,p3其中任何之一，用`|`（管道符）分割。
```js
let reg = /good|goodbay/g
let str = 'goodbay'
str.match(reg)
// ["good"]
```
此例可以看出多选分支是惰性的

## 例题
> 匹配16进制颜色代码
```js
let reg = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g
let str = '#ffbbad #FFF #Fc01DF  #ffE'
str.match(reg)
// ["#ffbbad", "#FFF", "#Fc01DF", "#ffE"]
```
管道符是惰性的，所以得先匹配6位，再去匹配3位
> 匹配时间 24小时制
```js
let reg = /(([0-1][0-9])|(2[0-3])):[0-5][0-9]/g
let str = '24:00  00:01  00:00 25:11 19:59'
str.match(reg)
// ["00:01", "00:00", "19:59"]
```
利用管道符 小时的第一位是0或1时第二位可以是0-9，小时的第一位是2时，第二位只能是0-3
> 匹配日期 如yyyy-mm-dd格式为例。
```js
let reg = /\d{4}-(([0][0-9])|(1[0-2]))-(([0-2][0-9])|(3[0-1]))/g
str = '2000-01-02 2020-03-32 2020-13-13 2020-12-31'
str.match(reg)
// ["2000-01-02", "2020-12-31"]

```
月份前两位是0-3，是3的时候第二位只能是0，1
> 匹配id  
```js
let str = `<div id="container" class="main"></div><div id="111"></div>`;
let reg = /id="[\w]+"/g
str.match(reg)
// ["id="container"", "id="111""]
```

# 二.正则表达式位置匹配攻略
位置是指相邻字符之间的位置
## 匹配位置
ES5一共有6个锚字符  

` ^  $  \b  \B  (?=p)  (?!p) `   
### ^和$  
> ^（脱字符）匹配开头，在多行匹配中匹配行开头。  
> $（美元符号）匹配结尾，在多行匹配中匹配行结尾。

```js
let one = 'test'.replace(/^/g,'%')
// %test 
let one1 = 'test\ntest\ntest'.replace(/^/gm,'%')
// %test
// %test
// %test
let two = 'test'.replace(/$/g,'%')
// test%
let two1 = 'test\ntest\ntest'.replace(/$/gm,'%')
// test%
// test%
// test%
```

### \b和\B
> \b是单词边界，\w和\W之间的位置，\w和^之间的位置，\w和$之间 的位置
```js
let str = '[JS] Lesson_01.mp4';
str.replace(/\b/g,'%')
// [%JS%] %Lesson_01%.%mp4%
```
* 第一个%,`[`是`\W`,`J`是`\w`,
* 第二个%,`S`是`\w`,`]`是`\W`,
* 第三个%，空格是`s`,`L`是`\w`,
* 第四个%，`1`是`\w`,`.`是`\W`,
* 第五个%，`.`是`\W`,`m`是`\w`,
* 第六个%，`4`是`w`,结尾是`$`,
> \B是非单词边界，是\b的反面
```js
let str = '[JS] Lesson_01.mp4';
str.replace(/\B/g,'%')
// %[J%S]% L%e%s%s%o%n%_%0%1.m%p%4
```
### （?=p)和（?!p)
> (?=p)指p前面的位置
```js
let str = 'test'.replace(/(?=s)/g,'%')
// te%st
```
> (?!p)就是(?=p)的反面，指非p前面的位置
```js
let str = 'test'.replace(/(?!s)/g,'%')
// %t%es%t%
```
### 例题
> 数字的千分位表示法
```js
let str = '123456789'
let reg = /(?!^)(?=(\d{3})+$)/g
str.replace(reg,',')
// 123,456,789
```
(?=\d{3})表示三个数字之前的位置,+表示至少出现一次，$表示结尾的地方，
可能会出现这种情况:`,123,456,789`，所以得加上`(?!^)`,表示除了开头的地方。

# 三.括号的作用
## 分组
## 引用分组
以日期为例，yyyy-mm-dd
```js
let reg = /(\d{4})-(\d{2})-(\d{2})/;
```
### 提取数据
```js
let str = '2020-03-22'
let reg = /(\d{4})-(\d{2})-(\d{2})/
str.match(reg)
// ["2020-03-22", "2020", "03", "22", index: 0, input: "2020-03-22", groups: undefined]
```
match返回的一个数组，第一个元素是整体匹配结果，然后是各个分组（括号里）匹配的内容，然后是匹配下标，最后是输入的文本  

?> 也可使用$1-$9来获取
```js
let str = '2020-03-22'
let reg = /(\d{4})-(\d{2})-(\d{2})/
reg.test(str)
RegExp.$1 //2020
RegExp.$2 //03
RegExp.$3 //22
```
> 将yyyy-mm-dd改为mm/dd/yyyy的格式
```js
let str = '2020-03-22'
let reg = /(\d{4})-(\d{2})-(\d{2})/
str.replace(reg,'$2/$3/$1')
// 03/22/2020
```
### 反向引用
除了上面那样的api,也可在正则本身里引用之前出现的分组  

比如要写一个正则支持匹配如下三种格式：  
2016-06-12  
2016/06/12  
2016.06.12
如果这样写`\d{4}(-|/|\.)\d{2}(-|\/|\.)\d{2}`,可能`2020-03/22`这样的也会被匹配到。
这时可以反向引用
```js
var reg = /\d{4}(-|\/|\.)\d{2}\1\d{2}/
var str1 = '2020-03-22';
var str2 = '2020/03/22';
var str3 = '2020.03.22';
var str4 = '2020.03-22';
console.log(reg.test(str1)) //true
console.log(reg.test(str2)) //true
console.log(reg.test(str3)) //true
console.log(reg.test(str4)) //false
```
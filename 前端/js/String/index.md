代码文件路径`/Code/js/String/index.js`  
[参考:MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

# 转义字符
|Code|描述|
|:--:|:--:|
|\0  |空字符|
|\\'  |单引号|
|\\"  |双引号|
|\\\  |反斜杠|
|\n  |换行|
|\r  |回车|
|\v  |垂直制表符|
|\t  |水平制表符|
|\b  |退格|
|\f  |换页|
|\uXXXX|Unicode码|


# 属性  
## String.length
?> 返回字符串中字符编码单元的数量
* 空串为0  
* String.length 为1

# 方法

## String.fromCharCode()
?> 返回由指定的 UTF-16 代码单元序列创建的字符串。

**语法**
```js
/*
* @param {number} num1,...,numN  UTF-16代码单元的数字
* @return {string} 长度为n的字符串
*/
String.fromCharCode(num1[,...[,numN]]);
```

**示例**  
```js
String.fromCharCode(0x100,0x200); //"ĀȀ"
```


## String.fromCodePoint()
?> 返回使用指定的代码点序列创建的字符串。 
Unicode编码

**语法**
```js
/*
* @param {number} num1,...,numN  Unicode编码
* @return {string} 由指定Unicode编码生成的字符串
*/
String.fromCodePoint(num1[,...[,numN]]);
```

**示例**
```js
String.fromCodePoint(0x100,0x200); // ĀȀ
```

## String.raw()
?> 一个模板字符串的标签函数,是用来获取一个模板字符串的原始字符串的


**示例**
```js
    let name ='zpf';
    String.raw`name:${name}`; //name:zpf
    String.raw({ raw: 'test' }, 0, 1, 2); // t0e1s2t
    String.raw({raw:['name:',',']},'zpf') // name:zpf,
```


## String.prototype.charAt()
?> 从一个字符串中返回指定的字符。  

**语法**
```js
/*
* @param {number} index 索引
* @return {string} index处的字符
*/
str.charAt(index)
```

**示例**
```js
let str1 = 'abc';
str1.charAt(0); // "a"
```

## String.prototype.charCodeAt()
?> 返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码

**语法**
```js
/*
* @param {number} index 索引
* @return {number} index处字符的 UFT-16编码
*/
str.charCodeAt(index)
```

**示例**
```js
let str1 = '张';
str1.charCodeAt(0); // 24352
```

## String.prototype.codePointAt()
?> 返回 一个 Unicode 编码点值的非负整数。

**语法**
```js
/*
* @param {number} index 索引
* @param {Unicode} index处的unicode编码
*/
str.codePointAt(index)
```

**示例**
```js
let str1 = '我';
str1.codePointAt(0); // 25105
```

## String.prototype.concat()
?> 将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。

**语法**
```js
/*
* @param {string} str,...,strN 要连接的字符串
* @return {string} 新字符串
*/
str.concat(str1[,...[,strN]])
```

!> MDN强烈建议用`+`代替concat方法（性能不好）  

`/Code/js/String/index.js(17-36)`进行了实验验证

**示例**
```js
let str1 = 'a';
str1.concat('b','c'); // "abc"
```

## String.prototype.endsWith()
?> 判断当前字符串是否是以另外一个给定的子字符串“结尾”的
 
**语法**
```js
/*
* @param {string} searchString 要搜索的字符串
* @param {number} length||str.length 搜索的str的长度
*/
str.endsWith(searchString[,length])
```

**示例**
```js
  let str1 = 'abcdefg';
  str1.endsWith('de',5); // true
```
## String.prototype.startsWith()
?> 判断是否以参数字符串开头，同上



## String.prototype.includes()
?> 判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。

**语法**
```js
/*
* @param {string} searching 要搜索的字符串
* @param {number} position||0 开始搜索的索引
* @return {boolean} str包含searchString就返回true，反之false
*/
str.includes(searchString[,position])
```

* 大小写敏感

**示例**
```js
let str1 = 'abc';
str1.includes('a',1); //false
```


## String.prototype.indexOf()
?> 返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。

**语法**
```js
/*
* @param {string} searchValue 要搜索的字符串，如果没有提供，则默认为undefind
* @param {number} fromIndex 从此索引开始搜索,(如果大于字符长度且searchValue为空串，则会直接返回str的长度)
* @return {number} searchValue第一次出现的位置的索引，如果没有找到就返回 -1
*/
str.indexOf(searchValue[,fromIndex])
```
* `''`空串会产生奇怪的结果

**示例**
```js
let str1 = 'abc';
str1.indexOf(''); // 0
str1.indexOf('',1); // 1
str1.indexOf('a',10); // -1
str1.indexOf('',10);// 3
```

## String.prototype.lastIndexOf()
?> 同`indexOf()`,只是从后向前搜索

## String.prototype.localeCompare()
?> 返回一个数字来表示 参数字符串是否在原字符串前面或之后或相同。  

[详见:MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)

**语法**  
```js
str.localeCompare(compareString[,locales[,options]])
```
* `-1`表示参数字符在原字符之后
* `0`表示相同
* `1`表示参数字符在原字符之前

**示例**
```js
('a').localeCompare('b'); // -1
('a').localeCompare('a'); // 0 
('a').localeCompare('0'); // 1
```

## String.prototype.padEnd()
?> 用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充

**语法**
```js
/*
* @param {number} targetLength 目标长度
* @param {string} padString 要填充的字符
* @return {string} 新字符串 
*/
str.padEnd(targetLength[,padString])
```

* 不会改变原字符

**示例**
```js
let str1 = 'a';
str1.padEnd(10,'0'); // "a000000000"
```

## String.prototype.padStart()
?> 同上，只不过从最左边开始

* 从最左往右填 

**示例**
```js
let str1 = 'a';
str1.padStart(10,'zxcv');  //'zxcvzxcvza'
```

## String.prototype.repeat()
?> 返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

**语法**
```js
/*
* @param {number} count 重复的次数
* @return {string} 重复后的新字符串
*/
str.repeat(count)
```

**示例**
```js
let str1 = 'zpf';
str1.repeat(10); // 'zpfzpfzpfzpfzpfzpfzpfzpfzpfzpf'
```

## String.prototype.slice()
?> 提取字符串的一部分，并返回一个新的字符串，且不会改动原字符串。  

**语法**
```js
/*
* @param {number} beginIndex 起始索引（包含）
* @param {number} endIndex 中止索引（不包含）
* @return {string} 所提取的新字符串
*/
str.slice(beginIndex[,endIndex])
```

**示例**
```js
let str1 = 'zxcvbn';
str1.slice(2,4);// cv
```

## String.prototype.split()
?> 使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。 

**语法**
```js
/*
* @param {string} splitStr 分割点
* @param {number} limit  限制分割后的数组元素个数
* @return {Array} 由分割后的字符组成的数组
*/
str.split(splitStr[,limit])
```

**示例**
```js
let str1 = 'asdzxcsszfasszcsczxcs';
str1.split('s'); // ["a", "dzxc", "", "zfa", "", "zc", "czxc", ""]  
str1.split('',3); //  ["a", "s", "d"]
```


## String.prototype.substring()
?> 返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。

**语法**
```js
/*
* @param {number} startIndex 开始索引(包含)
* @param {number} endIndex 中止索引(不包含)
* @return {string} 从起始到终止的新字符串
*/
str.substring(startIndex[,endIndex])
```

**示例**
```js
let str1 = 'zxcvbnm';
str1.substring(-1,1000); // "zxcvbnm"
```

## String.prototype.toLocaleLowerCase()
?> 根据任何指定区域语言环境设置的大小写映射，返回调用字符串被转换为小写的格式。

**语法**
```js
/*
* @param locale 语言区域，默认是本机语言
* @return 转换为小写的新字符串
*/
str.toLocaleLowerCase(locale)
```

**示例**
```js
let str1 = 'AxVBn';
str1.toLocaleLowerCase(); // "axvbn"
```

## String.prototype.toLocalUpperCase()
?> 同上，转换为大写


## String.prototype.toLowerCase()
?> 将调用该方法的字符串值转为小写形式，并返回。

**语法**
```js
/*
* @return 小写的新字符串
*/
str.toLowerCase()
```

**示例**
```js
let str1 = 'AxVBn';
str1.toLowerCase(); //"axvbn"
```

## String.prototype.toUpperCase()
?> 同上，转换为大写

## String.prototype.toString()
?> 返回指定对象的字符串形式。

**语法**
```js
/*
* @return {string} 一个表示调用对象的字符串。
*/
str.toString()
```

* `String对象覆盖了Object的toString方法`

**示例**
```js
let a = 'Object';
a.toString();// "Object"
```

## String.prototype.trim()
?> 从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。

**语法**
```js
/*
* @return 去掉两边空白的新字符串
*/
str.trim()
```

**示例**
```js
let str1 = ' bc \n ';
str1.trim(); // "bc"
```

## String.prototype.trimRight() || trimEnd()
?> 去除字符串右边（末端）的空白
## String.prototype.trimLeft() || trimStart()
?> 去除字符串左边（开始）的空白


## String.prototype.valueOf()
?> 返回  String  对象的原始值

**语法**
```js
/*
* @return String对象的原始值 
*/
str.valueOf()
```

**示例**
```js
let str1 = new String('abc');
str1.valueOf(); // "abc"
```

## `String.prototype[@@iterator]()`

markdown会将`[]()`识别为链接，所以此处将其作为代码防止转换  

?> 返回一个新的Iterator对象，它遍历字符串的代码点，返回每一个代码点的字符串值。

**语法**
```js
/*
* @return 一个新的迭代器对象
*/
str[Symbol.iterator]
```

**示例**
```js
let str1 = 'zxcvbnm';
let eStr1 = str1[Symbol.iterator];
for(let i of eStr1){
    console.log(i);
}
// z x c v b n m
```


# 参数为正则的方法  
## String.prototype.match()
?> 检索返回一个字符串匹配正则表达式的的结果。  
## String.prototype.matchAll()
?> 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。  
## String.prototype.replace()
?> 返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果pattern是字符串，则仅替换第一个匹配项。  

* 不会改变原字符
## String.prototype.replaceAll()
?> 回一个新字符串，该字符串的所有满足;模式的匹配，都被用替换者;替换了。 模式 可以是一个字符串或者一个RegExp, 并且替代者可以是一个字符串，也可以是每次匹配都要调用的函数。  
 
## String.prototype.search()
?> 执行正则表达式和 String 对象之间的一个搜索匹配。

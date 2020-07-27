代码文件路径`/Code/js/Array/index.js`

[参考:MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

# 属性
 ## Array.length
?> 返回或设置一个数组中的元素个数。该值是一个无符号 32-bit 整数  
 ## Array.prototype[@@unscopables]
?> Symbol 属性 @@unscopable 包含了所有 ES2015 (ES6) 中新定义的、且并未被更早的 ECMAScript 标准收纳的属性名
```js
let arr = []
arr[Symbol.unscopables]
/*
copyWithin: true
entries: true
fill: true
find: true
findIndex: true
flat: true
flatMap: true
includes: true
keys: true
values: true
*/
```



# 方法

## Array.from()
?> Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
> 只要部署了Iterator接口的数据结构，都能将其转换为数组  

**属性**
```js
Array.from.length === 1 // true
```
**语法**
```js
/*
* @param(必须) arrayLike 类数组或可迭代对象
* @param(可选) {Function} mapFun 新数组中每个元素都会执行该回调函数
* @param(可选) {Object} thisArgs 执行 mapFun时的this对象
* @return   {Array} 一个新的数组实例
*/
Array.from(arrayLike[,mapFun[,thisArgs]])
```
**示例:**  
>1.和Set一起使用进行数组去重
```js
let arr= [1,1,2,3,4]
Array.from(new Set(arr))
// [1, 2, 3, 4]
```
> 2.生成指定长度的array并填充
```js
/*
* @param {number} len 长度
* @param {*} fillValue 填充的值
* @return {Array}
*/
function getArr(len,fillValue){
 return Array.from({length:len},() => fillValue)
}
getArr(5,0)
// [ 0, 0, 0, 0, 0 ]
```









## Array.isArray()
**语法**
```js
/*
* @param {*} e 待检测的值
* @return {boolean} 是否是Array
*/
Array.isArray(e)
```
!> `Array.isArray(new Uint8Array(4))`为`false`  

**示例**  
```js
Array.isArray()  //false
```




## Array.of()
?> 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型

**语法**
```js
/*
*  @param {*}  元素
*  @return {Array} 返回一个由 item0-itemN 组成的数组
*/
Array.of(item0[,item1[,...[,itemN]])
```
**示例**
> 可代替Array()使用
```js
Array.of([],1,true,{},Symbol())  // [[], 1, true, {}, Symbol()]
Array(3) //Node: [ <3 empty items> ]; Chrome:[empty × 3]
Array.of(3) //[3]
```
**思考**  
> Array.from() ,Arrar.isArray()和Array.of()是Array构造函数的方法
```js
Array.prototype
/*
constructor: ƒ Array()
arguments: (...)
caller: (...)
from: ƒ from()
isArray: ƒ isArray()
length: 1
name: "Array"
of: ƒ of()
prototype: [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
Symbol(Symbol.species): (...)
get Symbol(Symbol.species): ƒ [Symbol.species]()
__proto__: ƒ ()
[[Scopes]]: Scopes[0]
*/
```




## Array.prototype.concat()
?> 用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。 

!>属于浅拷贝，原始的数组元素为对象，复制的是对象的引用  

**语法** 
```js
/*
* @param可选 {*} arr1-arrN 要合并的数组或元素
* @return {Array} 返回一个合并了的新数组
*/
oldArray.concat(arr1[,arr2[,...[,arrN]]])
```
**示例**  
```js
let arr1 = [1,[2,[3]]]
let arr2 = [1,{a:1},2,4]
arr1.concat(1,2,3,4,arr2,'a')
// 不能保证顺序
/*
0: 1
1: (2) [2, Array(1)]
2: 1
3: 2
4: 3
5: 4
6: 1
7: {a: 1}
8: 2
9: 4
10: "a"
length: 11
*/
```


## Array.prototype.copyWithin()
?> 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。  

!> 该方法具有通用性  (可以call,apply,bind到类数组对象上调用)

**语法**
```js
/*
* @param(可选)  {number} target||0    目标处(目标起始索引)
* @param(可选) {number} startIndex||0  开始复制元素的起始索引
* 如果startIndex为负值，那么相当于 startIndex = arr.length  +  startIndex
* 如果还为负值,那么startIndex = 0
* endIndex 同理
* @param {number} endIndex||arr.length   终止索引
* 如果endIndex小于startIndex,那么不会发生复制
* @return {Array} 返回改变后的数组
*/
arr.copyWithin(target[,startIndex[,endIndex]])
```
**示例**  
```js
let arr = [1,2,3,4,5]
arr.copyWithin(-3)  // [1, 2, 1, 2, 3]
arr.copyWithin(1,-3) // [1, 3, 4, 5, 5]
arr.copyWithin(1,2,-1) // [1, 3, 4, 4, 5]
```


## Array.prototype.entries()  
?> 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。  

**语法**
```js 
/*
* @return {Object} Array迭代器对象,原型(__proto__)上有next方法,调用next遍历原数组的键值对
*/
arr.entries()
```
**示例**
```js
let x = [1,2,3,4].entries()
x.next() 
/*
done: false
value: (2) [0, 1]
*/
x.next().value // [1, 2]

for(let i of x){
    console.log(i);
}
/*
(2) [0, 1]
(2) [1, 2]
(2) [2, 3]
(2) [3, 4]
*/
```



## Array.prototype.every()
?> 试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。  

**语法**
```js
/*
* @param {Function} callback
* ----------------- @param {*} item 测试的当前值
* ----------------- @param(可选) {number} index 当前值的索引
* ----------------- @param(可选) {Array} array 调用every的数组
* ----------------- @return {boolean} item是否满足条件
* @param(可选) {Object} arg 执行callback的this值
* @return {boolean} 每次callback都返回truthy，则返回true，否则返回false
*/
arr.every(callback(item[,index[,array]])[,arg])
```
?> every 遍历的元素范围在第一次调用 callback 之前就已确定了。在调用 every 之后添加到数组中的元素不会被 callback 访问到  

**示例**  
```js
[1,2,3,4,5,6].every(x => x > 4) // false
```


## Array.prototype.fill()
?> 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。  

**语法**
```js
/*
* @param {*} value 要填充的值
* @param(可选) {number} start||0 起始索引
* start如果小于0 则start=arr.length+start
* @param(可选) {number} end||arr.length 中止索引
* @return {Array} 修改后的数组
*/
arr.fill(value[,start[,end]])
```
* 当一个对象被传递给 fill方法的时候, 填充数组的是这个对象的引用。  

**示例**
```js
[1,2,3].fill({})  //[{…}, {…}, {…}]
[1,2,3].fill('a',0,2) // ["a", "a", 3]
let obj = {
    a:1,
    b:2
}
let arr = Array(3).fill(obj)
arr[0].a ='a'
console.log(arr)
/*
* 0: {a: "a", b: 2}
* 1: {a: "a", b: 2}
* 2: {a: "a", b: 2}
* length: 3
* 填充的是对象的引用，修改值会改变原对象
*/
```



## Array.prototype.filter()
?>创建一个新数组, 数组内容为满足callback的所有元素  

**语法**
```js
/*
* @param {Function} callback 
* ----------------- @param {*} item 所处理的元素
* ----------------- @param(可选) {number} index 所处理的元素的索引
* ----------------- @param(可选){Array} array 调用filter的数组
* @param(可选) {Object}  thisArg 执行callback函数时用作this的对象
* @return {Array} 满足callback的所有元素
*/
arr.filter(callback(item[,index[,array]])[,thisArg])
```
**示例**
```js
let arr = [1,2,3,4,5]
let arr1 = arr.filter(item => item > 1)
arr // [1, 2, 3, 4, 5]
arr1 // [2, 3, 4, 5]
```

## Array.prototype.find()
?> 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。  

**语法**
```js
/*
* @param {Function} callback 
* ----------------- @param {*} item 所处理的元素
* ----------------- @param(可选) {number} index 所处理的元素的索引
* ----------------- @param(可选) {Array} array 调用filter的数组
* @param(可选) {Object}  thisArg 执行callback函数时用作this的对象
* @return {*} item 数组中满足callback的第一个元素的值  
*/
arr.find(callback(item[,index[,array]])[,thisArg])
```
**示例**
```js
[{name:'y'},{name:'y'}].find(item => item.name === 'y') //{name: "y"} 
```

## Array.prototype.findIndex()
?> 返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

**语法**
```js
/*
* @param {Function} callback 
* ----------------- @param {*} item 所处理的元素
* ----------------- @param(可选) {number} index 所处理的元素的索引
* ----------------- @param(可选) {Array} array 调用filter的数组
* @param(可选) {Object}  thisArg 执行callback函数时用作this的对象
* @return {*} item  数组中满足callback的第一个元素的索引,无满足的元素则返回 -1
*/
arr.findIndex(callback(item[,index[,array]])[,thisArg])
```

**示例**
```js
[1,2,3,4].findIndex(item => item%2===0) // 1
```


## Array.prototype.flat()
?> 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

**语法**
```js
/*
* @param(可选) {number} depth||1 嵌套数组的深度
* @return {Array} 包含数组与子数组中所有元素的新数组。
*/
arr.flat(depth)
```

**示例**
>depth为负值 则将原数组复制到新数组并返回(浅拷贝)
```js
 let arr1 = [{a:'a'},2,[3,4]]
 let arr2 = arr1.flat(-1)
 arr1 === arr2 // false
 arr2[0].a = 'b'
 arr1 // [{a:'b'}, 2, Array(2)]
 arr2 // [{a:'b'}, 2, Array(2)]
```
>flat()会自动跳过数组空项
```js
[1,2,null,,,3,false,4].flat() // [1, 2, null, 3, false, 4]
```
>depth = Infinity,则可展开任意深度的嵌套数组
```js
[1,[2,[3,[4,[5]]]]].flat(Infinity) // [1, 2, 3, 4, 5]
```
* 替代方案
```js
let a = [1,2,[3,[4,[5]]]]
const myFlat = (arr) => {
     let result = []
     const getItem = arr => {
          arr.forEach(item => {
             if(Array.isArray(item)){
                 getItem(item)
             }else{
                 result.push(item)
             }              
          })
     }
     getItem(arr)
     return result
}
myFlat(a) // [1, 2, 3, 4, 5]
```


## Array.prototype.flatMap()
?> 首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。

**语法**
```js
/*
* @param {Function} callback 
* ----------------- @param {*} item 所处理的元素
* ----------------- @param(可选) {number} index 所处理的元素的索引
* ----------------- @param(可选) {Array} array 调用的数组
* @param(可选) {Object}  thisArg 执行callback函数时用作this的对象
* @return {Array} 一个新数组
*/
  arr.flatMap(callback(item[,index[,array]])[,thisArg])
```

**示例**
```js
 let arr1 = [1,2,3]
 arr1.map(item => [item * 2]) //[[2],[4],[6]]
 arr1.flatMap(item => [item * 2]) // [ 2, 4, 6 ]
 // flatMap会callback的所有返回值合并为一个数组，深度为1,相当于(arr.flat(1))
```

> 分割字符串数组
```js
let arr1 = ["it's Sunny in", "", "California"]
arr1.map(item => item.split(' '))  
// [ [ "it's", 'Sunny', 'in' ], [ '' ], [ 'California' ] ]
arr1.flatMap(item => item.split(' '))
// [ "it's", 'Sunny', 'in', '', 'California' ]
```


## Array.prototype.forEach()
?> 数组的每个元素执行一次给定的函数 不会改变原数组

**语法**
```js
/*
* @param {Function} callback 
* ----------------- @param {*} item 所处理的元素
* ----------------- @param(可选) {number} index 所处理的元素的索引
* ----------------- @param(可选) {Array} array 调用的数组
* @param(可选) {Object}  thisArg 执行callback函数时用作this的对象
* @return {undefind} 无返回值
*/
arr.forEach(callback(item[,index[,array]])[,thisArg])
```

!> 除了抛出错误，没有办法中止forEach循环

**示例**
```js
 let arr = ['a','b','c','d']
 arr.forEach((item,index,array) => {
        console.log(index + ':' + item)
        if(index === 1){
           array.shift();
        }
 })
 /*
0:a
1:b
2:d
当运行到索引为1时，将数组第一个元素删除，删除后index===2 处的元素变为了'd'
 */
```


## Array.prototype.includes()
?> 判断一个数组是否包含一个指定的值,如果包含则返回 true，否则返回false。

**语法**
```js
/*
*  @param {*} value 要查找的值
*  @param(可选) {number} fromIndex||0 开始查找的索引
*  @return {boolean} 查找到了则返回true 
*/
arr.includes(value[,fromIndex])
```


**示例**
```js
 let obj = {key:100}
 let arr = [{a:1},{b:{c:'c'}},3,obj]
 arr.includes(3) // true
 arr.includes('3')  // false  使用的严格等于
 arr.includes({a:1}) // false  {a:1}是一个新对象了，所以为false
 arr.includes(obj)  // true  可以找到
```


## Array.prototype.indexOf()
?> 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

**语法**
```js
/*
*  @param {*} value 要查找的值
*  @param(可选) {number} fromIndex 开始查找的索引
*  @return {number} 首个被找到的元素的索引，没有找到则返回 -1
*/
arr.indexOf(value[,fromIndex])
```

**示例**
> 找出指定元素出现的所有位置
```js
 const findAllItem = (arr,item) => {
        let indexs = []
        let index = arr.indexOf(item)
        while(index !== -1){
            indexs.push(index)
            index = arr.indexOf(item,index + 1)
        }
        return indexs
 }
 let testArr = [1,3,4,5,6,1]
 findAllItem(testArr,1) // [ 0, 5 ]
```


## Array.prototype.join()
?> 一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个元素，那么将返回该元素

**语法**
```js
/*
* @param {string} str||','  指定str作为连接符连接数组所有元素,默认为','
* @return {string}  如果arr.length === 0 则返回空字符串 
*/
arr.join([str])
```

!> `null,undefind`会被转为空字符串  

**示例**
```js
function testFun(){}
let arr = [1,{a:1},()=>{},testFun,testFun(),null,true]
arr.join()
// '1,[object Object],()=>{},function testFun(){},,,true'
// 会调用对应的toString方法
```


## Array.prototype.keys()
?> 返回一个包含数组中每个索引键的`Array Iterator`对象

**语法**
```js
/*
 所有参数都会被忽略
 @return {Object} 一个新的Array迭代器对象
*/
arr.keys()
```

**示例**
```js
 
let arr1 = ['a',,'c',Symbol()]
[...arr1.keys()] // [0,1,2,3]
[...Object.keys(arr1)] // ['0','2','3']
/*
*  arr.keys()的返回会包含哪些没有对应元素的索引
*/
```

## Array.prototype.lastIndexOf()
?> 返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

**语法**
> 使用的是严格相等来判断是否相同
```js
/*
*  @param {*} item 要查找的元素
*  @param(可选) {number} fromIndex||arr.length-1 默认为最后一个元素,从fromIndex处逆向查找,如果大于数组长度，则查找整个数组，如果为负值，相当于fromIndex = fromIndex + arr.length,如果还小于等于0，则直接返回-1,不会进行查找
*/
arr.lastIndexOf(item[,fromIndex])
```

**示例**
```js
  let arr = [1,2,3,4,5]
  arr.lastIndexOf(2,5) // 1
  arr.lastIndexOf(2,-5) // -1
  arr.lastIndexOf(2,-4) // 1
  arr.lastIndexOf(2,0) // -1
```


## Array.prototype.map()
?> 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

**语法**
```js
/*
* @param {Function} callback
* ----------------- @param {*} item 当前元素
* ----------------- @param(可选) {number} index 当前元素索引
* ----------------- @param(可选) {Array} array 调用map的数组
* @param(可选) {Object} thisArg||undefind 执行callback时的this
* @return {Array} 由原数组每个元素执行callback的结果组成的新数组
*/
arr.map(callback(item[,index[,array]])[,thisArg])
```

**示例**

```js
let arr1 = [1,2,3,4,5];
arr1.map(item => item*2) // [2, 4, 6, 8, 10]
```


## Array.prototype.pop()
?> 数组中删除最后一个元素，并返回该元素的值。会改变原数组

!> 该方法具有通用性  


**语法**
```js
/*
* @return {*} 被删除的元素,数组为空时返回undefind
*/
arr.pop()
```

**示例**
```js
let arr1 = [0,'',,null]
arr1.pop(1111) // null
arr1 // [0, "", empty]
```

> 类数组对象只要部署了length,或length的值可以被转为number，并且length大于0,那么会将length减一，但不会删除类数组对象中的元素
```js
let obj1 = {
    a:'a',
    b:'b',
    length:'2'
}
Array.prototype.pop.call(obj1)
obj1 // {a: "a", b: "b", length: 1}
Array.prototype.pop.call(obj1)
obj1 // {a: "a", b: "b", length: 0}
Array.prototype.pop.call(obj1)
obj1 // {a: "a", b: "b", length: 0}
```


## Array.prototype.push()
?> 将一个或多个元素添加到数组的末尾，并返回该数组的新长度

!> 该方法具有通用性  

**语法**
```js
/*
* @param {*} item,...itemN 要添加到数组末尾的元素
* @return {number} 添加完成后数组的长度
*/
arr.push(item1,...,itemN)
```

**示例**

```js
let arr1 = []
arr1.push(Object,Array,null) // 3
arr1 
/*
0: ƒ Object()
1: ƒ Array()
2: null
length: 3
*/
```


## Array.prototype.reduce()
?> 对数组中的每个元素执行一个reducer函数(升序执行)，将其结果汇总为单个返回值。


**语法**
```js
/*
* @param {Function} callback
* ----------------- @param {*} sum 累加器，上一次回调函数的返回值
* ----------------- @param {*} nowItem 回调函数正在处理的元素
* ----------------- @param {number} index 处理的元素的索引
* ----------------- @param {Array} array 调用reduce的数组
* ----------------- @return {*} 返回一个值作为下一次执行函数的sum
* @param {*} firstItem||array[0] 第一次执行callback的sum值，如果没有提供，则默认为数组中第一个元素,然后进入第二次循环
* @return {*} 函数累计处理的结果
*/
arr.reduce(callback(sum,nowItem[,index[,array]])[,firstItem])
```

!> 每次都提供firstItem会更好一点

**示例**

>数组求和
```js
const sumFun = arr => {
    return arr.reduce((sum,nowItem) => sum + nowItem,0);
}
sumFun([]) //0
sumFun([1,2,3]) //6
```
> 计算每个元素在数组中出现的次数
```js
const arr1 = [1,1,2,3,44,44,1,1];
const itemNum = arr => {
        return arr.reduce((itemNumsObj, nowItem) => {
            if (nowItem in itemNumsObj) {
                itemNumsObj[nowItem]++;
            } else {
                itemNumsObj[nowItem] = 1;
            }
            return itemNumsObj
        }, {})
}
itemNum(arr1); // { '1': 4, '2': 1, '3': 1, '44': 2 }
```

<!-- 
2020-07-26 15:15
没有学习欲望啊
女朋友给我发性感照片，又撤回搞得我很难受
 -->


## Array.prototype.reduceRight()
?> 接收一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
> 和reduce同理，只不过reduceRight从数组最右边开始循环

## Array.prototype.reverse()
?> 将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

**语法**
```js
/*
* @return arr反转后的数组
*/
 arr.reverse()
```
!> 具有通用性

**示例**
> 是通过改变索引来颠倒元素的
```js
 const a = {2:2,1:1,'0':0,3:3,'a': 1, 'b': 2, 'c': 3, length: 7};
 Array.prototype.reverse.apply(a);
 a;//{ '3': 3, '4': 2, '5': 1, '6': 0, a: 1, b: 2, c: 3, length: 7 }

 /*
 * 可以看出只有索引能被转换为num的才会被颠倒
 * 且是通过改变索引来进行的
 /
```


## Array.prototype.shift()
?> 从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度

!> 具有通用性

**语法**
```js
/*
* @return 从数组中所删除的元素，也就是第一个元素，如果数组为空，返回undefind
*/
arr.shift()
```

**示例**
```js
let obj1 = {0:'a',1:'b',length:0};
Array.prototype.shift.call(obj1); // undefind
obj1;//{0: "a", 1: "b", length: 0}

let obj2 = {'0':'a',1:'b',length:1};
Array.prototype.shift.call(obj2); // "a"
obj2; //{1: "b", length: 0}

let obj3 = {'a':1,'b':2,length:1};
Array.prototype.shift.call(obj3); // undefind
obj3; // {a: 1, b: 2, length: 0}
```
* 可以看出是根据length来判断元素的  
* 且只能删除索引为number或可以转换为number的


## Array.prototype.slice()
?> 返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

**语法**
```js
/*
* @param {number} begin||0 开始的索引
* @param {number} end||arr.length-1 结束的索引
* @return 从begin到end（不包含end处）的新数组
*/
arr.slice(begin[,end])
```
!> 具有通用性
**示例**
```js
let arr1 = [1,2,3,4,5];
arr1.slice(2,4); //  [3, 4]
```

## Array.prototype.some()
?> 测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

**语法**
```js
/*
* @param {Function} callback 测试元素的函数
* ----------------- @param {*} item 正在处理的元素
* ----------------- @param {number} index 正在处理的元素的索引
* ----------------- @param {Array} array 调用callback的数组
* @param {Object} thisArg 调用callback时的this值
* @return {boolean} 有满足callback的元素就返回true，所有元素都不满足则返回false
*/
arr.some(callback(item[,index[,array]])[,thisArg])
```

**示例**
```js
let arr = [1,2,3,4,5];
arr.some(item => item >= 3); //true
```

## Array.prototype.sort()
?> 对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的  

**语法**
```js
/*
* @param {Function} callback 可选 指定按某种循序进行排列的函数
* ----------------- @param first 用于比较的第一个元素
* ----------------- @param second 用于比较的第二个元素
* ----------------- @return 如果小于零，则first排到second之前
* @return {Array} 排序好的原数组
*/
arr.sort([callback(first,second)])
```

**示例**

>偶然发现了个可以反转数字数组的新方法,玩玩而已，实际不能使用！
```js
let arr1 = [5,4,3,1,6,0];
arr1.sort((a,b) => {
   return -1;
}); // [0, 6, 1, 3, 4, 5]
```

## Array.prototype.splice()
?> 通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

**语法**
```js
/*
* @param {number} start||0 起始索引，默认为0，如果大于数组长度，则从末尾开始，如果(start + arr.length - 1)<0,那么从0开始。
* @param {number} deleteCount 要移除的元素的个数，如果省略，那么start后面的元素都会被删除
* @param {*} item1,item2,... 从start开始，添加到数组中
* @return {Array} 被删除的元素的集合
*/
arr.splice(start[,deleteCount[,item1[,item2[,...]]]])
```

**示例**
```js
let arr1 = [1,2,3,4];
arr1.splice(-2,1,'a'); //[3]
arr1; // [1, 2, "a", 4]
```


## Array.prototype.toLocaleString()
?> 一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串

**语法**
```js
/*
* @param {string,Array} locales 带有BCP 47语言标记的字符串或字符串数组。
* @param {Object} options 一个可配置属性的对象
*/
arr.toLocaleString([locales[,options]])
```

**示例**
> 数字转货币
```js
let arr1 = [100,1000,223444];
arr1.toLocaleString('zh-CN',{style:'currency',currency: 'CNY'})
// "¥100.00,¥1,000.00,¥223,444.00"
```
[了解更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)


## Array.prototype.toString()
?> 返回一个字符串，表示指定的数组及其元素。

**语法**
```js
/*
* @return {string} 
*/
arr.toString()
```
**示例** 
```js
let arr1 = [Object,Array,Function,1,true,null]
arr1.toString();
// function Object() { [native code] },function Array() { [native code] },function Function() { [native code] },1,true,"
```

## Array.prototype.unshift()
?> 将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法会修改原有数组)。

**语法**
```js
/*
* @param {*} item1,item2,...,itemN 要加到数组开头的元素
* @return {number} arr.length 返回添加后的arr的长度
*/
arr.unshift(item1,item2,...,itemN)
```

**示例**
```js
let arr1 = [1,2,3];
arr1.unshift('a',Object); //5
arr1; //  ["a", ƒ, 1, 2, 3]
```

## Array.prototype.values()
?> 返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值

**语法**
```js
/*
* @return 新的Array迭代器对象
*/
arr.values()
```
> `Array.prototype.values` 是 `Array.prototype[Symbol.iterator]` 的默认实现。
```js
Array.prototype.values === Array.prototype[Symbol.iterator]  // true 
```

> 

**示例**
```js
let arr1 = ['a','b','c'];
let eArr1 = arr1.values();
for(let i of eArr1){
    console.log(i);
}
// a b c
arr1[0] = 'aaa';
for(let i of eArr1){
      console.log(i);
}
// 无输出 迭代器是一次性的,遍历后就不能再访问了
let eArr2 = arr1.values();
arr1[0] = 'aaa';
for(let i of eArr2){
    console.log(i)
}
// aaa b c
// 先生成迭代器，再改变原数组的值，可以看到迭代器也随之改变，说明迭代器中存储的是指向原数组值的指针
```
* 迭代器是一次性的
* 迭代器中存储的是指向原数组的指针


## `Array.prototype[@@iterator]()`
markdown会将`[]()`识别为链接，所以此处将其作为代码防止转换  

?> @@iterator 属性和 Array.prototype.values() 属性的初始值是同一个函数对象。

**语法**
```js
/*
* @return 与values()的返回值相同，一个迭代器对象
*/
arr[Symbol.iterator]()
```

**示例**
```js
let arr1 = ['a','b','c'];
let eArr1 = arr1[Symbol.iterator]();
for(let i of eArr1){
    console.log(i);
}

```

## get Array[@@species]
?> Array[@@species]访问器属性返回 Array 的构造函数。

**语法**
```js
/*
*  @return Array的构造函数
*/
Array[Symbol.species]
```



          ┌─┐       ┌─┐
       ┌──┘ ┴───────┘ ┴──┐
       │                 │             Array
       │       ───       │             搞
       │  ─┬┘       └┬─  │             完
       │                 │             了！
       │       ─┴─       │             “牌坊:”
       │                 │             将这些方法
       └───┐         ┌───┘             自己实现下！！！
           │         │
           │         │
           │         │
           │         └──────────────┐
           │                        │
           │                        ├─┐
           │                        ┌─┘    
           │                        │
           └─┐  ┐  ┌───────┬──┐  ┌──┘         
             │ ─┤ ─┤       │ ─┤ ─┤         
             └──┴──┘       └──┴──┘  

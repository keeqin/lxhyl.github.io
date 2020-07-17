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

**语法**
```js
/*
* @param  {number} target||0    目标处(目标起始索引)
* @param {number} startIndex||0  开始复制元素的起始索引
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
* ----------------- @param {number} index 当前值的索引
* ----------------- @param {Array} array 调用every的数组
* ----------------- @param {boolean} item是否满足条件
* @param {Object} arg 执行callback的this值
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
* @param {number} start||0 起始索引
* start如果小于0 则start=arr.length+start
* @param {number} end||arr.length 中止索引
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
* ----------------- @param {number} index 所处理的元素的索引
* ----------------- @param {Array} array 调用filter的数组
* @param {Object}  thisArg 执行callback函数时用作this的对象
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
* ----------------- @param {number} index 所处理的元素的索引
* ----------------- @param {Array} array 调用filter的数组
* @param {Object}  thisArg 执行callback函数时用作this的对象
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
* ----------------- @param {number} index 所处理的元素的索引
* ----------------- @param {Array} array 调用filter的数组
* @param {Object}  thisArg 执行callback函数时用作this的对象
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
* @param {number} depth||1 嵌套数组的深度
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


代码文件路径`/Code/js/Array/index.js`
# 属性
 ## Array.length
?> 返回或设置一个数组中的元素个数。该值是一个无符号 32-bit 整数  
 ## Array.prototype[@@unscopables]
?> Symbol 属性 @@unscopable 包含了所有 ES2015 (ES6) 中新定义的、且并未被更早的 ECMAScript 标准收纳的属性名

```js
let arr = [];
arr[Symbol.unscopables];
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
Array.from(new Set(arr));
// [1, 2, 3, 4]
```
> 2.生成指定长度的array并填充
```js
/*
* @param {Number} len 长度
* @param {Any} fillValue 填充的值
* @return {Array}
*/
function getArr(len,fillValue){
 return Array.from({length:len},() => fillValue); 
}
getArr(5,0);
// [ 0, 0, 0, 0, 0 ]
```









## Array.isArray()

**语法**
```js
/*
* @param {Any} e 待检测的值
* @return {Boolean} 是否是Array
*/
Array.isArray(e)
```
!> `Array.isArray(new Uint8Array(4))`为`false`



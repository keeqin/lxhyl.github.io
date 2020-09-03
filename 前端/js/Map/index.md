
# Map
?> 与普通对象不同的是，Map的键可以为任何对象。并能记住插入顺序

* NaN 是等于NaN的，虽然`NaN !== NaN`  

|Map|Object|   
|---|---|   
|默认不包含任意键|可能继承原型上的键|
|键名可以为任意值|只能字符串或Symbol|
|Key是有序的，按插入时的顺序|无序|
|通过Size方法获取key的个数|手动计算|
|频繁增删时性能更好|未优化|

**例子**
> key可以为任意类型
```js
let a = function(){}
Function.prototype.toString = () => {
    return 'toString方法'
}
let obj = {};
obj[a] = 1;
console.log(obj); //{ 'toString方法': 1 }

let b = new Map()
b.set(a,1);
console.log(b); // Map { [Function: a] => 1 }
```
可以看到，Object的键名只能为字符串或Symbol,如果为其他类型，会调用toString方法转为字符串

# 属性

## Map.prototype.size
?> 返回 一个Map 对象的成员数量。

**示例**
```js
    let map = new Map()
    map.set(Object,{});
    map.set(Function,()=>{});
    console.log(map.size); // 2
```

# 方法

## Map.prototype.set()
?> 添加或更新一个指定了键（key）和值（value）的（新）键值对。

**语法**
```js
/*
* @param {*} key 键
* @param {*} value 值
* @return {Object} Map对象
*/
map.set(key,value)
```

**示例**

```js
    let map = new Map();
    map.set('a',1).set('b',2).set('c',3);
    console.log(map); // Map { 'a' => 1, 'b' => 2, 'c' => 3 }
```

## Map.prototype.delete()
?> 移除 Map 对象中指定的元素。

**语法**  
```js
/*
* @param {*} key 要删除的键
* @return {boolean} 如果存在则删除后返回true，否则返回false 
*/
map.delete(key)
```

**示例**
```js
    let map = new Map();
    map.set('a',1).set('b',2).set('c',3);
    map.delete('a');  // true
    console.log(map); // Map(2) {"b" => 2, "c" => 3}
```

## Map.prototype.clear()
?> 移除Map对象中的所有元素

## Map.prototype.entries()
?> 返回一个新的包含 [key, value] 对的 Iterator 对象，返回的迭代器的迭代顺序与 Map 对象的插入顺序相同。

**示例**
```js
    let map = new Map();
    map.set('a',1).set('b',2).set('c',3);
    let eMap = map.entries();
    eMap.next(); //{value: Array(2), done: false}
```

## Map.prototype.forEach()
?> 插入顺序对 Map 对象中的每一个键值对执行一次参数中提供的回调函数。

**语法**  
```js
/*
* @param {Function} callBack(value,key,map)
* ---------------- @param {*} value 当前遍历的元素的值
* ---------------- @param {*} key 键
* ---------------- @param {Map} map map对象
* @param {Object} thisArg 执行callBack时的this
* @return undefined
*/
map.forEach(callBack[,thisArg])
```

**示例**
```js
  let map = new Map();
  map.set('a',1).set('b',2).set('c',3);
  map.forEach((value,key,sourceMap) => {
      sourceMap.set(key,value * 2);
  })
  map; // Map(3) {"a" => 2, "b" => 4, "c" => 6}
```

## Map.prototype.get()
?> 返回某个 Map 对象中的一个指定元素。未找到则返回undefined

## Map.prototype.has()
?> 返回一个bool值，用来表明map 中是否存在指定元素.

## Map.prototype.keys()
?> 返回一个引用的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的key值。

**示例**
```js
  let map = new Map();
  map.set('a',1).set('b',2).set('c',3);
  for(let i of map.keys()){
      console.log(i);
  }
  /*
    a
    b
    c
  */
```

## Map.prototype.values()
?> 返回一个新的Iterator对象。它包含按顺序插入Map对象中每个元素的value值。

**示例**
```js
  let map = new Map();
  map.set('a',1).set('b',2).set('c',3);
  for(let i of map.values()){
      console.log(i);
  }
  /*
   1
   2
   3
  */
```
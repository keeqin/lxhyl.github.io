
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

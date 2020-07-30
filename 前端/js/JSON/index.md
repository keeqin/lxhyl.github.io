# JSON
?> 是一种语法，用来序列化对象、数组、数值、字符串、布尔值和null;

# 方法

## JSON.parse()
?> 解析JSON字符串并返回对应的值，可以额外传入一个转换函数，用来将生成的值和其属性, 在返回之前进行某些修改。

**语法**
```js
/*
* @param {string} test 要解析的字符串
* @param {Function} reviver 转换器, 可以用来修改解析生成的原始值，调用时机在 parse 函数返回之前。
* ---------------- @param key 当前键
* ---------------- @param value 当前值
* ---------------- @return 如果返回undefind，那么从当前对象删除此键值对，如果是其他值，则会把此值作为key的value
* @return {Object}
*/
JSON.parse(test[,reviver(key,value)])
```


**示例**
```js
let str = "{\"a\":1,\"b\":2}";
JSON.parse(str); // {a: 1, b: 2}
```
> 不允许逗号结尾
```js
let str1 = "{\"a\":1,\"b\":2,}";
JSON.parse(str1); // SyntaxError
```

> 提供reviver函数
```js
let str = "{\"a\":1,\"b\":2}";
let parseStr = JSON.parse(str,function(k,v){
    if(k === "a"){
        return v + 100;
    }
})
parseStr; // undefind;
```
此处为undefind的原因:  

!> parse方法会把`key:"",value:""`当作顶层对象，也就是说遍历到最外层的`{}`了，这时候`k != 'a'`，而此时函数没有返回值，所以就会删除掉这个键值对，也就是整个对象都被删除了，所以为undefind。

!> 所以提供reviver函数时一定得注意
> 下面做出改进
```js
let  str = "{\"a\":1,\"b\":2}";
let parseStr2 = JSON.parse(str,function(k,v){
    if(k === "a"){
        return v + 100;
    }else{
        return v;
    }
})
parseStr2; // { a: 101, b: 2 }
```
此时解析正常



## JSON.stringify()
?> 将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性。

**语法**
```js
/*
* @param {*} value 要转换为json字符串的值
* @param replacer 1.如果是一个函数，则在序列化的过程中，每个值都会经过这个函数的处理。
* 2.如果是一个数组,则只会处理这个数组中包含的键
* @param space 最多为10，用于美化输出 1.如果是一个数字，则代表着每个属性之间有多少个空格
* 2.如果是字符，则以字符作为分割（空格）
*/
JSON.stringify(value[,replacer[,space]])
```

* 要转换的值如果有`toJSON`方法，那么就将`toJSON`的返回值作为此对象序列化后的值
* `undefind,Function,Symbol`会被忽略、
* 循环引用会报错
* `NaN,Infinity,null`都会被转为null  

**示例**
```js
let obj = {
    a:null,
    b:undefined,
    c:function(){
        
    },
    d:{
        toJSON:function() {
            return "我是d的toJSON方法"
        }
    },
    e:[1,2,3],
    f:Symbol(),
    g:{
        h:'aaa'
    },
    i:true,
    j:NaN,
    k:+Infinity
};
JSON.stringify(obj);
//{"a":null,"d":"我是d的toJSON方法","e":[1,2,3],"g":{"h":"aaa"},"i":true,"j":null,"k":null}
```
> 提供replacer函数
```js
let obj = {
    a:null,
    b:undefined,
    c:function(){
        
    },
    d:{
        toJSON:function() {
            return "我是d的toJSON方法"
        }
    },
    e:[1,2,3],
    f:Symbol(),
    g:{
        h:'aaa'
    },
    i:true,
    j:NaN,
    k:+Infinity
}
/*
* @param {string} k 键
* @param {*} v 值
*/
const replacerFun = (k,v) => {
  if(typeof v === 'string'){
     return  v + '我是replacer方法加的字符'
  }
  return v;
}

JSON.stringify(obj,replacerFun);
// {"a":null,"d":"我是d的toJSON方法我是replacer方法加的字符","e":[1,2,3],"g":{"h":"aaa我是replacer方法加的字符"},"i":true,"j":null,"k":null}
```

> 提供replacer数组
```js
JSON.stringify(obj,['a','b','c']);
// {"a":null}
```
只会序列化`a,b,c`三个属性,a的结果为null;b的值是undefind会被忽略,c的值为函数会被忽略,所以结果为`{"a":null}`

> 可以加上第三个参数（space）来美化    

还是上面那个例子
```js
JSON.stringify(obj,replacerFun,5)
// 可以看到每个元素都被5个空格分隔了
{
     "a": null,
     "d": "我是d的toJSON方法我是replacer方法加的字符",
     "e": [
          1,
          2,
          3
     ],
     "g": {
          "h": "aaa我是replacer方法加的字符"
     },
     "i": true,
     "j": null,
     "k": null
}

JSON.stringify(obj,replacerFun,'$----$')
// 每个元素都被'$----$'分隔了，需要注意的是，分隔字符最大长度为10，超过按10计算
{
$----$"a": null,
$----$"d": "我是d的toJSON方法我是replacer方法加的字符",
$----$"e": [
$----$$----$1,
$----$$----$2,
$----$$----$3
$----$],
$----$"g": {
$----$$----$"h": "aaa我是replacer方法加的字符"
$----$},
$----$"i": true,
$----$"j": null,
$----$"k": null
}
```
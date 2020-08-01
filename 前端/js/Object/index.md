代码文件地址`/Code/js/Object/index.js`

# 属性描述符

## 数据属性

### configurable    
?>  是否可修改属性的特性，是否可删除该属性 默认为`true`  

### enumberable
?> 是否可遍历，默认为`true`

### writeable    
?> 是否可修改，默认为`true`

### value   
?> 这个对象的属性的值，修改键的值，就是修改键的value的值，默认为`undefined`

## 访问器属性

### configurable
?> 同数据属性  

### enumberable
?> 同数据属性

### get 
?> 读取属性时调用的函数,返回值将作为该属性的值,默认值为`undefined`

### set
?> 写入属性时(改变属性值)时调用的函数，返回值将作为该属性的值，默认为`undefined`

# Object

**语法**
```js
{} // 字面量
new Object(value) // 构造函数
```

几乎所有的对象都是Object构造函数的实例，都会从`object.prototype`继承属性和方法

* 如果给定值是`null`或`undefined`,将会返回一个空对象
* 如果是基本类型，则会构造其包装类型的对象
* 如果是引用类型，仍然会返回这个值，经他们复制的变量保有和源对象相同的引用地址



# 属性 
Object.length 的值为1,  

Object.prototype 可以为所有类型的对象添加属性

**示例**
> 给对象原型上添加`lxhyl`方法

当此对象没有`lxhyl`方法时，就会递归原型，找到就结束递归，否则一直到`Object.prototype`,如果Object的原型上也没有，就会报错 `TypeError`

```js
Object.prototype.lxhyl = function(e){
    return e;
}
[1,2,3].lxhyl('Array调用') // 'Array调用'
('string').lxhyl('String调用') // 'String调用'
(/a/).lxhyl('正则调用') // '正则调用'
Math.lxhyl('Math调用') // 'Math调用'
```


## Object.prototype.constructor
?> 返回创建实例对象的 Object 构造函数的引用,是函数的引用，而不是指向构造函数的指针

!> 所有对象都会从Objcet上继承一个constructor属性,这个属性就是构造实例的构造函数  

`({}).constructor === Object; // true`  

`[1,2,3].constructor === Array  // true`  

> 只有函数对象才会有prototype属性   

!> 箭头函数没有prototype
```js
   let obj1 = {
        a:1,
    };
    obj1.prototype; // undefined
    let fun1 = function (){

    }
    fun1.prototype; // fun1 {}
    let fun2 = () => {

    }
    fun2.prototype; // undefined
```


`Array.constructor === Object.constructor //true `
* 此处说明所有对象的constructor属性都是从Object继承来的

``




**示例**  
> 改变constructor的指向

* 基本类型无法改变
```js
   function NewConstructor (){

    }
    let arr1 = [111];
    arr1.constructor = NewConstructor;
    console.log(arr1.constructor); // [Function: NewConstructor]
    let str1 = 'test';
    str1.constructor = NewConstructor; 
    console.log(str1.constructor); // [Function: String]
```



# 方法

## Object.assign()
?> 将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

**语法**
```js
/*
* @param target 目标对象
* @param sources 源对象
*/
Object.assign(target,...sources)
```

* 如果目标对象和源对象有相同的键，那么目标对象的键会被覆盖
* 只会拷贝源对象自身的可枚举的属性
* 是浅拷贝
**示例**
```js
    let obj1 = {a:1};
    let obj2 = "str";
    let obj21 = "STR"
    let obj3 = true;
    let obj4 = Object.assign(obj1,obj2,obj21,obj3);
    obj4; // { '0': 'S', '1': 'T', '2': 'R', a: 1 }
    obj1;// {0: "S", 1: "T", 2: "R", a: 1}
```

* 可以看到，只要源对象可枚举，就会被复制
* 复制字符串时的规则（obj2）:`'0':'s','1':'t','2':'r'`
* 结果为`'0':'S','1':'T','2':'R'`的原因是相同键，目标对象的键会被覆盖



## Object.create()
?> 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 

**语法**
```js
/*
* @param proto 创建的新对象的原型对象，即newObj.__proto__ = proto
* @param propertiesObject 要添加进新对象的属性，以属性描述符的形式作为参数
* @return 一个新对象
*/
Object.create(proto[,propertiesObject])
```


**示例**
```js
   let testObj = {
       a:1,
       b:2
   }
   let obj11 = Object.create(testObj);
   let obj22 = Object.create(null);
obj11.toString; //[Function: toString]
obj22.toString; // undefined
```

!> 让指向null，可以创建真正的空对象

> 带prototiesObject参数
```js
 let obj1 = Object.create(Object.prototype,{
        a:{ 
             value:"我是a属性",
             writable:true,
             configurable:true,
         },
         aa:{
            enumerable:true,
            value:"我是aa属性",
            writable:true,
            configurable:true,
         },
         b:{
            enumerable:true,
            configurable:false,
            get:function(){
                return "我是b属性的get"
            },
            set:function(value){
               console.log('设置值'+ value)
            }
         }
    })
    obj1; // node环境 
    /*
    { 
        aa: '我是aa属性',
        b: [Getter/Setter]
    }
    */
    obj1; // chrome  
    /*
    {
    aa: "我是aa属性"
    b: "我是b属性的get"
    a: "我是a属性"
    get b: ƒ ()
    set b: ƒ (value)
    }
    */
```
* 不能保证插入顺序
* node环境好像默认enumberable为false
* chrome环境默认enumberable为true



## Object.defineProperties()
?> 直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

**语法**
```js
/*
* @param obj 要定义的对象
* @param  props 要定义或修改的描述符对象，详细见顶部
* @return 修改后的原对象
*/ 
Object.defineProperties(obj,props)
```

**示例**
```js
  let obj1 = {
        a:111
    };
    Object.defineProperties(obj1,{
        a:{
           writable:false,
           enumerable:true
        },
        b:{
            writable:true,
            value:1,
            enumerable:true,
        }
    })
    obj1.a = 222;
    obj1; // { a: 111, b: 1 }
```


## Object.defineProperty()
?> 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

**语法**
```js
/*
* @param obj 要定义的对象
* @param prop 要定义或修改的属性或Symbol
* @param des 要定义或修改的属性描述符
* @return 原对象
*/
Object.defineProperty(obj,prop,des)
```

用`Object.defineProperty`定义的属性  

* 默认`writeable,configurable,enumberable`都为false 

**示例**
> 添加或修改属性
```js
    let obj1 = {};
    let a = 1;
    Object.defineProperty(obj1,'a',{
        enumerable:true,
        get:function(){
          console.log("访问值");
          return a;
        },
        set:function(value){
            console.log("把修改值为"+value);
            return value;
        }
    })
    obj1.a; // 访问值  1
    obj1['a'] = 2; // 把修改值为2 
    obj1;
    /*
    a: 1
    get a: ƒ ()
    set a: ƒ (value)
    */
```
> 数组填加属性
```js
  let arr1 = [1,2,3];
    Object.defineProperty(arr1,5,{
        value:4,
        configurable:true,
        enumerable:false
    })
    arr1; // [1, 2, 3, empty × 2, 4]
```

> 实现个订阅函数，当对象中的值改变时打印
```js
 let  obj2 = {
        a:'aaa',
        arr1:[1,2,3,4],
        b:{
            b1:'b1',
            b2:'b2',
        }
    }
    const sub = obj => {
        let keys = Object.keys(obj);
        for(let i =0;i<keys.length;i++){
           if(typeof obj[keys[i]] === 'object'){
               sub(obj2[keys[i]]);
           }else{
               Object.defineProperty(obj,keys[i],{
                   set:function(value){
                     console.log(`${keys[i]}的值改变为${value}了`)
                     return value;
                    }
               })
           }
        }
    }
    sub(obj2)
    obj2.a = 1;// a的值改变为1了
    obj2.arr1[0] = 'a'; // 0的值改变为a了
    obj2.b.b1 = 'bbbb1'; // b1的值改变为bbbb1了
```

## Object.entries()
?> 返回一个给定对象自身可枚举属性的键值对数组，不包括原型

**语法** 
```js
/*
* @param {Object} obj 对象
* @return {Array} 键值对数组
*/
Object.entries(obj)
```

**示例**
```js
 let obj1 = {
        a:'1',
        b:2
     };
 Object.entries(obj1);  // [ [ 'a', '1' ], [ 'b', 2 ] ]
```

## Object.fromEntries()
?> 把键值对列表转换为一个对象。

* 与`Object.entries`互为逆操作

**语法**
```js
/*
*  @param iterable 可迭代对象
*  @return 真正的对象
*/
Object.fromEntries(iterable)
```

**示例**
```js
 let arr1 = [[0,'a'],[1,'b'],[2,'c']];
 let arr2obj = Object.fromEntries(arr1);
 arr2obj; // { '0': 'a', '1': 'b', '2': 'c' }
```




## Object.preventExtensions()
?> 让一个对象变的不可扩展，也就是永远不能再添加新的属性。

**语法**
```js
/*
*  @param obj 要变得不可扩展的对象
*  @param {Object} 不可扩展得对象
*/
Object.preventExtensions(obj)
```

**示例**
```js
let obj1 = {
    a:'1',
    b:2
}
Object.preventExtensions(obj1);
obj1.c = 'ccc';
obj1; // { a: '1', b: 2 }
```


## Object.seal()
?> 封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。  

* 不能添加新属性
* 不能重新配置属性描述符
* 不能删除现有属性
* 但可以修改属性值

**语法**
```js
/*
* @param  obj 要封闭的对象
* @return 已经封闭的对象
*/
Object.seal(obj)
```

**示例**
```js
    let obj1 = {
        a: '1',
        b: 2
    };
    Object.seal(obj1);

    Object.defineProperty(obj1,'a',{
        configurable:true,
        enumerable:false
    }) // TypeError  报错，不能重新配置
    delete obj1.a
    obj1;  // { a: '1', b: 2 } delete未能删除掉a属性
    obj1.b = 3; // {a: "1", b: 3} 可以改变属性值
```


## Object.freeze()
?> 冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

> 也就是说  先调用Object.seal()，然后将`writeable`标记为`false`，是最高级别的冻结对象

也就是说  

* 不可添加属性
* 不能删除属性
* 不可配置属性描述符
* 不可修改属性的值

!> 浅冻结，属性如果也为对象，则这个属性不受影响，可以使用递归来真正冻结所有属性

**语法**
```js
/*
* @param {Object} obj 要冻结的对象
* @return {Object} 被冻结的对象 
*/
Object.freeze(obj)
```

**示例**
```js
    let obj1 = {
        a: '1',
        b: {
            b1:222,
            b2:111
        }
    };
    Object.freeze(obj1);
    obj1.a = 'a';
    obj1.c = 'newC';
    delete obj1.a;
    delete obj1.b.b1;
    obj1; // { a: '1', b: { b2: 111 } }
```
可以看到不能修改值,不能添加属性，不能删除非对象属性，但可以删除属性类型为对象中的属性（此处的b只是指向另一个对象的指针，而b所☞的对象并没有被冻结）


## Object.getOwnPropertyDescriptor()
?> 指定对象上一个自有属性对应的属性描述符

**语法**
```js
/*
* @param {Object} obj 对象
* @param {*} prop 属性
* @return 如果属性存在在对象上，则返回其属性描述符，否则返回undefined
*/
Object.getOwnPropertyDescriptor(obj,prop)
```

**示例**
```js
   let obj1 = {
        a: '1',
        b: {
            b1:222,
            b2:111
        }
    };
    let desA = Object.getOwnPropertyDescriptor(obj1,'a');
    let desB = Object.getOwnPropertyDescriptor(obj1,'b');
    desA; 
    /*
    { 
        value: '1', 
        writable: true,
        enumerable: true, 
        configurable: true
    }
    */
    desB;
    /*
    {
       value: { b1: 222, b2: 111 },
       writable: true,
       enumerable: true,
       configurable: true
    }
    */
```


## Object.getOwnPropertyDescriptors()
?> 获取一个对象的所有自身属性的描述符。

**语法**
```js
/*
* @param obj 要获取描述符的对象
* @return 对象的所有自身属性的描述符，如果自身没有任何属性，则返回空对象。
*/
Object.getOwnPropertyDescriptors(obj)
```

**示例**
```js
let obj1 = {
    a: '1',
    b: {
        b1:222,
        b2:111
    }
};
let desA = Object.getOwnPropertyDescriptors(obj1);
desA;
/*
{
  a: { value: '1', writable: true, enumerable: true, configurable: true },
  b: {
    value: { b1: 222, b2: 111 },
    writable: true,
    enumerable: true,
    configurable: true
  }
} 
*/
```

## Object.getOwnPropertyNames()
?> 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

**语法**
```js
/*
* @param {Object} obj 对象
* @return {Array} 给定对象上找到的自身属性对应的字符串数组
*/
Object.getOwnPropertyNames(obj)
```

**示例**
```js
   let sym = Symbol()
    let obj1 = {
        a: '1',
        b: {
            b1:222,
            b2:111
        },
    };
    obj1[sym] = 'Symbol';
    obj1; // { a: '1', b: { b1: 222, b2: 111 }, [Symbol()]: 'Symbol' }
    let keys = Object.getOwnPropertyNames(obj1);
    keys; // [ 'a', 'b' ]
```

> 数组的键
```js

    let arr1 = ['a','b','c'];
    let arr1Keys = Object.getOwnPropertyNames(arr1);
    arr1Keys; // [ '0', '1', '2', 'length' ]
```
!> 别忘了数组还有`length`这个键！

## Object.getOwnPropertySymbols()
?> 返回一个给定对象自身的所有 Symbol 属性的数组

**语法**
```js
/*
* @param {Object} obj 
* @return {Array} obj上所有Symbol属性的集合的数组
*/
Object.getOwnPropertySymbols(obj)
```

**示例**
```js
    let sym = Symbol()
    let obj1 = {
        a: '1',
        b: {
            b1:222,
            b2:111
        },
    };
    obj1[sym] = 'Symbol';
    obj1; // { a: '1', b: { b1: 222, b2: 111 }, [Symbol()]: 'Symbol' }
    let keys = Object.getOwnPropertySymbols(obj1);
    keys; // [Symbol()]
```
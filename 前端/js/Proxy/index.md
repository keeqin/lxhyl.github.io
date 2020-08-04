代码目录`Code/js/Proxy/index.js`

# Proxy
?> 用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）,也就是代理对象的基本操作，相当于自定义`Object`的某些方法

## 语法
```js
/*
* @param {Object} target 要代理的目标对象
* @handler handler 对代理的行为进行控制
*/
new Proxy(target,handler)
```

## handler对象可定义的方法  

* `handler.getPrototypeOf()`  
* `handler.setPrototypeOf()`  
* `handler.isExtensible()`  
* `handler.preventExtensions()`  
* `handler.getOwnPropertyDescriptor()`  
* `handler.defineProperty()`     
* `handler.has()`   
* `handler.get()`   
* `handler.set()`   
* `handler.deleteProperty()`   
* `handler.ownKeys()`   
* `handler.apply()`   
* `handler.construct()`

## 示例

### 拦截set  (赋值操作）

**语法**
```js
/*
* @param obj 目标对象
* @param prop 属性
* @param value 属性值
* @param（可选） proxyObj  Proxy实例
*/
set:function(obj,prop,value,proxyObj){}
```

**示例**
> 设置年龄范围
```js
    let sourceObj = {};
    let obj2 = new Proxy(sourceObj, {
        set: function (obj, prop, value) {
            if (prop === 'age') {
                if (value <= 150 && value >= 0) {
                    obj[prop] = value
                } else {
                    throw new RangeError('年龄不合法')
                }
            }
            obj[prop] = value;
        }
    })
    obj2.name = 'zzz';
    obj2.age = 22;
    obj2; // { name: 'zzz', age: 22 }
    obj2.age = 160; // RangeError: 年龄不合法
```
> 简易响应式，对象值改变（新增）时打印，相比defineProperty,Proxy可以监听到新增的对象属性
```js
   let data = {
        a: 1,
        b: {
            b1: 2,
            b2: {
                b21: 'aaa'
            }
        }
    }
    /*
    * @param sourceObj 原对象
    * @return 经Proxy代理后的对象
    */
    const proxyObj = sourceObj => {
        for (let i in sourceObj) {
            if (typeof sourceObj[i] === 'object') {
                sourceObj[i] = proxyObj(sourceObj[i]);
            }
        }
        let result = new Proxy(sourceObj, {
            set: (obj, prop, value) => {
                 if (obj.hasOwnProperty(prop)) {
                    if (obj[prop] !== value) {
                        console.log(`[${prop}]的值变为了${value}`);
                    }
                 } else {
                    console.log(`设置了新属性${prop},值为${value}`)
                 }
                 obj[prop] = value;
            }
        })
        return result;
    }
    let resultObj = proxyObj(data);
    resultObj.a = 22; // [a]的值变为了22
    resultObj.a = 22;
    resultObj.c = 33; // 设置了新属性c,值为33
    resultObj.b.b1 = 'test'; // [b1]的值变为了test
    resultObj.b.b2.b21 = 'test'; // [b21]的值变为了test
    resultObj.b.b2.b22 = 'test222'; // 设置了新属性b22,值为test222
    resultObj.b.b2 = null; // [b2]的值变为了null
```
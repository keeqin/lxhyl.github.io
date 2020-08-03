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
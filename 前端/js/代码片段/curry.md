# 函数柯里化
## 利用bind实现
```js
function curry(fn) {
    const len = fn.length;
    return function bindfn() {
        if(arguments.length < len) {
            return bindfn.bind(null, ...arguments); 
        } else {
            return fn.call(null, ...arguments);
        }
    }
}
const add = (a,b,c) => {
    return a + b + c;
}
let curryAdd = curry(add);
console.log(curryAdd(1)(2)(3));
```


## 普通函数实现
?> 收集所有参数，参数不够就返回函数继续收集函数，直至实参大于等于形参，就执行原函数
```js
function curry(fn){
   let fnArgsLen = fn.length;
   // 收集所有实参，直至实参数量大于等于形参数量（fnArgs）
   return function fun(...args){
       // 如果第一次的参数就满足条件了
       //  直接调用fn   
       if(args.length  >= fnArgsLen){
           return fn(...args);
       }
       // 利用allArgs闭包存储参数   
       let allArgs = args;
       return function funChild(...argsChild){
          // 获取所有参数   
          allArgs = allArgs.concat(argsChild);
          // 如果参数够了就调用原函数
          // 否则返回一个函数  
          if(allArgs.length >= fnArgsLen){
            return fn(...allArgs);
          }else{
              return funChild;
          }
       }
   }
}

const add = (a,b,c,d) => {
    return a + b + c+d;
}
let curryAdd = curry(add); 
console.log(curryAdd(1)(3)(4)(6));
```
# 函数柯里化
> 代码文件路径`/Code/js/手写/curry.js`   
   
?>维基百科是这样定义的:  
   是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术
## 利用bind实现
```js
function curry(fn) {
   const len = fn.length;
    return function bindfn() {  
        if(arguments.length < len) {
            return bindfn.bind(null, ...arguments); 
        } else {
            return fn(...arguments);
        }
    }
}

// 测试
const add = (a,b,c) => {
    return a + b + c;
}
const curryAdd = curry(add);
curryAdd(1)(2)(3) === add(1,2,3);// true
```


## 普通函数实现
?> 收集所有参数，参数不够就返回函数继续收集参数，直至实参大于等于形参，就执行原函数
```js
function curry(fn){
    let fnArgsLen = fn.length;
   // 收集所有实参，直至实参数量大于等于形参数量（fnArgs）
   return function fun(...args){
       // 如果第一次的参数就满足条件了
       // 直接调用fn   
       if(args.length  >= fnArgsLen){
           return fn(...args);
       }
       // 利用闭包存储参数   
       let allArgs = args;
       return function funChild(...argsChild){
          // 获取所有参数   
          allArgs = allArgs.concat(argsChild);
          // 如果参数够了就调用原函数
          // 否则返回一个funChild函数  
          if(allArgs.length >= fnArgsLen){
            return fn(...allArgs);
          }else{
              return funChild;
          }
       }
   }
}


// 测试
const add = (a,b,c,d) => {
    return a + b + c + d;
}
const curryAdd = curry(add); 
curryAdd(1)(3)(4)(6) === add(1,3,4,6);  // true
```
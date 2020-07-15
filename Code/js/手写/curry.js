// 利用bind实现
/**
  bind函数返回一个新函数，
  其他的参数会作为新函数的参数
**/
function curry(fn) {
    // 获取fn函数形参个数
    const len = fn.length;
    // 返回一个函数
    return function bindfn() {
        console.log(arguments);
        //如果 fn 形参个数少于 bindfn 的形参个数
        // 就将bindfn
        if(arguments.length < len) {
            return bindfn.bind(null, ...arguments); 
        } else {
            return fn.call(null, ...arguments);
        }
    }
}

function curry1(fn){
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
let curryAdd = curry1(add); 
// curryAdd 返回的是一个函数
console.log(curryAdd(1)(3)(4)(6));

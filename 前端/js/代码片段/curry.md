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
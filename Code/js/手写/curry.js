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
const add = (a,b,c) => {
    return a + b + c;
}
let curryAdd = curry(add);
console.log(curryAdd(1)(2)(3));


let obj = {
    name:'aaa',
    age:10
}
function test(a,b,c){
  console.log(this.name);
  return this.age + a + b + c;
}
console.log(test.bind(obj));
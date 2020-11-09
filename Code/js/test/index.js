
const add = x => x + 10;
const double = x => x * 2;
const sub = x => x - 10;

const pipe = (...fns) => e => fns.reduce((r,f) => f(r),e);

let result = pipe(add,double,sub);
console.log(result(10))


const curry = fn => {
    const len = fn.length;
    return function helpFun(){
        if(arguments.length < len){
            return helpFun.bind(null,...arguments);
        }else{
            return fn(...arguments);
        }
    }
}
const add = (a,b,c) => a + b + c;

const curryAdd = curry(add);

curryAdd(1,2,3)
curryAdd(1,2)(3)
curryAdd(1)(2,3)

curryAdd()()()()()()()()()(1,2,3)

console.log(curryAdd(1,2,3))
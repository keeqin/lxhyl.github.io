# pipe函数

?> pipe函数将参数从左向右执行，并将上次执行的结果，作为下次执行的参数


```js
const add = x => x + 10;
const double = x => x * 2; 
const sub = x => x - 10; 
```
如上，要计算`(10+10)*2 - 10`可能会这样写
```js
sub(double(add(10))) // 30
```
如果调用的函数比较多，那么将很难读懂。  
所以使用pipe或conpose函数，增强代码的可读性

> pipe函数

```js
const pipe = (...fns) => e => fns.reduce((r,f) => f(r),e);
const pipeFns = pipe(add,double,sub);
pipeFns(10) // 30
```
可以看到，易读了很多  

# compose函数

?> conmpose和pipe的区别只是执行顺序不同，是从右往左执行
实现起来和pipe差不多  

```js
const compose = (...fns) => e => fns.reduceRight((r,f) => f(r),e)
const cpsFns = compose(sub,double,add)
cpsFns(10) // 30
```

# curry函数

维基百科定义如下  

?> 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术  

简单说，参数不够就返回新函数，去接收剩余参数，直至拿到全部参数，再去执行原函数并返回结果

```js
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

curryAdd()()(1)()(3)()(2) // 6
curryAdd(1,2,3) // 6
curryAdd(1)(2)(3) // 6
curryAdd(1,2)(3)  // 6
```

# Funtor函子

?> 实际编程中，肯定无法避免副作用，只能将副作用控制在可控范围之内。所有操作都通过函子去处理，而不变动原始值


?> 有点单向数据流的意思,vuex避免数据流混乱就是不能直接操作原始值，而通过commit方法去修改原始值  

**Box**  

```js
const Box = x => ({
    map:f => Box(f(x)),
    of:() => x,
})
let sourceValue = 1
Box(sourceValue).map(e => e + 1).map(e => e + 1).fold() // 3 执行两次加1操作
Box(sourceValue).of() // 1 什么操作也不执行
sourceValue // 1  原始值未变动
```

上例定义了返回一个对象的Box方法，此对象有map属性，用来对参数执行某种操作。返回的此操作结果作为参数的新的对象！

定义了flod函数，去返回此对象的值

再此基础上再增加applicative
```js
const Box = x => ({
    of:() => x,
    map:f => Box(f(x)),
    /*
    * ap 将函数应用与值。就相当于包装了一层map,
    * o.map() 本质就是 Box.map(),只不过参数是第一次执行Box的参数
    */
    ap:o => o.map(x)
})
// 以上面的curryAdd函数为例
Box(curryAdd).ap(Box(1)).ap(Box(2)).ap(Box(3)).of // 6 
```
可以看到，ap方法是将函数应用与值


实际写代码中，肯定会判断值是否存在再去执行后续操作，这时就改Maybe上场了
**Maybe** 
和Box一样，只不过是加上了isNothing方法，去判断值是否存在
```js
const Maybe = x => ({
    of:x,
    isNothing:function(){
       return this.of === undefined || this.of === null || this.of === ''
    },
    map:function(f){ 
      return  this.isNothing() ? Maybe(null) : Maybe(f(x))
    }
})
```

借助Maybe函数，来看个例子  

> 让三个可能是 null 的数值相加  

还是上面的curryAdd函数为例
```js
const add = (a,b,c) => Maybe(curryAdd).ap(Maybe(a)).ap(Maybe(b)).ap(Maybe(c)).of
log(add(null,1)) // null
log(add(2,1,3)) // 6
log(add(undefined,null,1)) // null
```
可以看到，如果数据合法，返回计算结果。有不合法的数据，也不用担心程序出错，返回值永远为null.


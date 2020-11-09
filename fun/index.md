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
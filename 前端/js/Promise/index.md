# Promise
?> 用于表示一个异步操作的最终完成 (或失败), 及其结果值.

* 状态不受外界改变，只由异步操作的结果决定  
* 一旦状态改变就不会再改变   

## 语法
```js
new Promise(function(resolve,reject){...})
```
**示例**
```js
 const fs = require('fs');
    const promise1 = new Promise((resolve, reject) => {

        fs.readFile(`d:\\clic\\lxhyl.github.io\\CNAME`, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.toString());
        })

    })
    promise1.then(res => {
        console.log(res); // lxhyl.cn
    })
    .catch(err => {
        // 更改文件名，使之发生error，报错就可以在这里捕获到
        console.log('error log:', err);
        /**
        error log: [Error: ENOENT: no such file or directory, open 'd:\clic\lxhyl.github.io\CNAME111'] {
        errno: -4058,
        code: 'ENOENT',
        syscall: 'open',
        path: 'd:\\clic\\lxhyl.github.io\\CNAME111'
       }
    **/
    })
  
```

## 方法

### Promise.prototype.then()
?> 返回一个 Promise。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。

**语法**
```js
/*
* @param callback resolve状态的回调函数，参数为resolve的值
* @param whyError reject状态的回调函数，参数为reject中的值
* @return 新的Promise实例
*/
p.then(callback[,whyError])
```
callback函数的返回值决定了新的Promise实例的状态   
* 返回非`null,undefined`的值，返回的Promise将变为resolve状态，返回值作为新Promise实例callback的参数值
* 返回`null,undefined`,返回的Promise将变为resolve状态，将undefind作为参数值
* 抛出错误，变为reject状态   
* 是Promise，那么返回的新的Promise的状态和参数根据此Promise决定

**示例**
> 可链式调用
```js
    let promiseFun = e => new Promise(resolve => resolve(e));
    let promise1 = promiseFun('第一个Promise');
    promise1.then(res => promiseFun(res + '\n第二个Promise'))
    .then(res => promiseFun(res + '\n第三个Promise'))
    .then(res => {
        console.log(res);
         /**
        第一个Promise
        第二个Promise
        第三个Promise
        **/
    })
```

### Promise.prototype.catch()
?> 返回一个Promise，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。   

内部调用`p.then(undefined,onRejected)`

### Promise.prototype.finally()
?> 返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。


### Promise.reject()
?> 返回一个带有拒绝原因的Promise对象。

### Promise.resolve()
?> 返回一个以给定值解析后的Promise 对象.如果这个值是一个 promise ，那么将返回这个 promise ；如果这个值是带有"then" 方法，那么会将其转换为promise对象，并立即执行该对象的then方法；如果都不是，那么返回新的promise对象，状态为resolved

>参数是Promise实例
```js
    let promise1 = new Promise((reslove) => {
        reslove('hello');
    })
    let promise2 = Promise.resolve(promise1);
    promise2.then( res => {
        console.log(res); // 'hello'
    })
    let promise3 = Promise.resolve(promise2);
    promise3.then( res => {
        console.log(res); // 'hello'
    })
```

>参数是thenable对象
```js
    let obj ={
        then:(resolve,reject) => {
            resolve('hello')
        }
    }
    let promise1 = Promise.resolve(obj);
    promise1.then( res => {
        console.log(res); // 'hello'
    })
```

> 其他情况
```js
    let promise1 = Promise.resolve('hello');
    promise1.then( res => {
        console.log(res); // 'hello'
    })
```


### Promise.all()
?> 返回一个Promise实例，在所有Promise参数都resolve时，返回的Promise状态改变，进入then方法。只要有一个rejected，返回的Promise状态变为rejected。

**示例**
> 全部都reslove
```js
    let promiseFun = (s,e) => new Promise((resolve,reject)=> {
        if(e){
            reject(e);
        }else{
            resolve(s);
        }
    });
    let p = Promise.all([promiseFun('成'),promiseFun('功'),promiseFun('了')]);

    p.then( res => {
        console.log(res);
    })
    .catch( err => {
        console.log(err);
    })
    // [ '成', '功', '了' ]
```
then方法的参数为所有Promise的resolve的值

> 其中一个reject
```js
    let promiseFun = (s,e) => new Promise((resolve,reject)=> {
        if(e){
            reject(e);
        }else{
            resolve(s);
        }
    });
    let p = Promise.all([promiseFun('成'),promiseFun('功'),promiseFun('了','失败'),promiseFun('了','失败了')]);

    p.then( res => {
        console.log(res);
    })
    .catch( err => {
        console.log(err);
    })
    // 失败
```
catch方法的参数为第一个reject的参数的值


### Promise.race()
?> 返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。


**语法**
```js
/*
* @param iterbaler 可迭代对象
* @return Promise
*/
Promise.race(iterable)
```

**示例**
还是上面的例子  
```js

```
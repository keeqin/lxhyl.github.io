### MDN上的描述
 new 关键字会进行如下的操作：
* 创建一个空的简单JavaScript对象（即{}）；
* 链接该对象（即设置该对象的构造函数）到另一个对象 ；
* 将步骤1新创建的对象作为this的上下文 ；
* 如果该函数没有返回对象,则返回this（所创建的新对象）


### 代码实现
```js
function Test(name) {
    this.name = name;
}
Test.prototype.age = 10


function myNew() {
    let tempName = Symbol();
    // 获取并删除第一个参数
    let fun = Array.prototype.shift.call(arguments);
    tempName = {
        __proto__: fun.prototype
    }
    //fun绑定到新创建的对象上
    let result =  fun.call(tempName,...arguments);
    return  result instanceof Object ? result : tempName;
}
let testNew = new Test('C');
let testMyNew = myNew(Test,'C');
```
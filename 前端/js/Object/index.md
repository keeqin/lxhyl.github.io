代码文件地址`/Code/js/Object/index.js`

# Object

**语法**
```js
{} // 字面量
new Object(value) // 构造函数
```

几乎所有的对象都是Object构造函数的实例，都会从`object.prototype`继承属性和方法

* 如果给定值是`null`或`undefind`,将会返回一个空对象
* 如果是基本类型，则会构造其包装类型的对象
* 如果是引用类型，仍然会返回这个值，经他们复制的变量保有和源对象相同的引用地址

# 属性 
Object.length 的值为1,  

Object.prototype 可以为所有类型的对象添加属性

**示例**
> 给对象原型上添加`lxhyl`方法

当此对象没有`lxhyl`方法时，就会递归原型，找到就结束递归，否则一直到`Object.prototype`,如果Object的原型上也没有，就会报错 `TypeError`

```js
Object.prototype.lxhyl = function(e){
    return e;
}
[1,2,3].lxhyl('Array调用') // 'Array调用'
('string').lxhyl('String调用') // 'String调用'
(/a/).lxhyl('正则调用') // '正则调用'
Math.lxhyl('Math调用') // 'Math调用'
```

## Object.prototype.constructor
?> 返回创建实例对象的 Object 构造函数的引用,是函数的引用，而不是指向构造函数的指针

!> 所有对象都会从他的原型链上继承一个constructor属性

`Object.prototype.constructor === Object; // true`  

`({}).constructor === Object; // true`



**示例**  




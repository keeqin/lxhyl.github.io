代码地址`/Code/python/learn/index.js`

# [range函数](https://docs.python.org/zh-cn/3/library/stdtypes.html#range)

?>  表示不可变的数字序列

```py
'''
@param end  从0迭代到end,不包括end
'''
range(end)
```

```py
'''
@param start 从start开始，包括start
@param end 
@param step 步长，
'''
range(start,end[,step])
```


# 元组


空元组:`a = ()`  
包含一个元素的元组：`a = 1,`。注意后面的逗号
多个元素：`a = 1,2,3,4,5`，称为元组打包

访问同list一致

也可*序列解包*（像js里的解构赋值，不同的是变量数必须与元组长度一致）
```py
a = 1,2,3
x,y,z = a
x # 1
y # 2
z # 3
```

# 集合  

> 集合是由不重复元素组成的无序的集。它的基本用法包括成员检测和消除重复元素。集合对象也支持像 联合，交集，差集，对称差分等数学运算。

使用花括号标识
`a = {1,2,3,4}`  
只包含一个元素时，必须使用`set()`创建.以与字典区分

* set函数参数只能是字符串  
* set函数只有一个参数
* set函数会将参数字符串解构


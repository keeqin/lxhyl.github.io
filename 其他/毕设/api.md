# 菜单
 
 * url `/menu`   
 * method `get`

# 登录

* url `/login`    

* method `post`

* body   
```js
{
   account  //账号
   encryInfo // 将账号密码拼接的字符串使用sha1加密 
}
```
* eg  
```js
{
    account:'zhangpengfan',
    encryInfo:'fcc6d0f3130d2434a0f66b9d3e0a2de80b297ad7'
}
```

# 日志  
* url `/log`   
* method `get`   
* params  
```js
{
    psd:'9cba38553598029d6ce73126a0682ec98e5a0496',   // 身份验证，写死
    logName:'年份-月份'
}
```

* eg.
```js
{
    psd:'9cba38553598029d6ce73126a0682ec98e5a0496', 
    logName:'2021-2'
}
```


# 账户管理   

## 获取所有账户   

* url `/accountList`   
* method `get`
* response 
```js
{
"code": 200,
"data": [
{
"name": "傅宇辉",  
"level": 100,   // 职位
"account": "fyh123",
"id": "d4h68i1p2-6gmpwhwiyffxlt1ds/k*j05e/z0hei9&4d80*em/", // 账号id
"password": "fyh123"
},
{
"name": "测试",
"level": 1,
"account": "test",
"id": "pk+c0hsgp4awtyz*i1tfr9&hia4@$j$a&kwo1lht9gay3f/1ii",
"password": "test"
},
{
"name": "张鹏帆",
"level": 100,
"account": "lxhyl",
"id": "ykj09lnh3a1d$cyh-*03hksrgocqvas2&grj8tyezzmx*w$c3r",
"password": "lxhyl"
}
],
"msg": "成功"
}
```



## 创建账号    

* url `/signup`  
* method `post`   
* data 
```js
{
account: "test"  //账号
level: 1      // 职位枚举值
name: "测试"  // 姓名
password: "test" // 密码
}
```
## 编辑账号信息
* url `/editAccount`  
* method `post`   
* data 
```js
{
account: "test"  
id: "pk+c0hsgp4awtyz*i1tfr9&hia4@$j$a&kwo1lht9gay3f/1ii"  // 账号id
level: 1
name: "测试"
password: "test"
}
```

## 删除账号
* url `/deleteAccount`  
* method `post`   
* data 
```js
{
 accountId: "q$oq/ppxcsphua9u/jm$&c0bfcbk*74wft897rtinauwmbd-p0" // 要删除的账号id
}
```


# 枚举值接口  
* url `enums`   
* method `get`
* params  
```js
{
    enmusKey: // 要获取的枚举值 所有值如下 
}
```

* enumsKey:level  职位



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
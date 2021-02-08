# 登录

* url 

`/login`      
* method     

`post`   


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

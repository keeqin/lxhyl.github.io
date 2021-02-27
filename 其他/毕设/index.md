后台地址
http://zhangpengfan.xyz/bsapi

web端地址
http://zhangpengfan.xyz/bsweb

日志地址
http://zhangpengfan.xyz/bsweb/#/log


[api](其他/毕设/api.md)


## 常用的返回code说明   

* 200 成功

* 401 账号或密码错误
* 403 未登录或无权限

* 500 服务端错误

## 登录规则（页面生命周期） 

第一次进入页面前，首先调用`menu`接口，如返回403说明未登录,则路由至登录页，否则进入主页.

登录接口返回头会set-cookie。需要把此值存入cookie，往后的每次请求，请求头必须携带cookie。   

服务端会通过cookie识别用户身份,如调用`menu`接口时请求头含有cookie，则直接返回菜单。

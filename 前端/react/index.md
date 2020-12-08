react学习

# 热更新  
用`react-create-app`创建项目，好像没有热更新，最后搜到必须在indx.js中添加下面的代码     

```js
if (module.hot) {
  module.hot.accept();
}
```

# 深拷贝

##  for-in 递归
?> 用for in 递归来复制所有属性  

!> 只能成功复制基本类型和Array,Object
```js
function deepCopy(obj){
   let result = Array.isArray(obj) ? [] : {};
   for(let i in obj){
       if(obj[i] === obj){
           
           continue;
       }
       result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
   }
   return result;
}
```

## 序列化
`JSON.parse(JSON.stringify(obj))`

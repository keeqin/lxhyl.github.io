# sort方法


```js
   let infoObj=[
      {
          name:"张三",
          age:30
      },
      {
          name:"李四",
          age:20
      },
      {
          name:"王五",
          age:40
      }
  ];
  infoObj.sort((prototype => (a,b) => a[prototype] - b[prototype])('age'))
  console.log(infoObj);

  [
  { name: '李四', age: 20 },
  { name: '张三', age: 30 },
  { name: '王五', age: 40 }
  ]
```
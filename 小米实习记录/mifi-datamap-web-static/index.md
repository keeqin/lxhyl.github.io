记录

# 2021-1-6  
账号存在`proxy/.debugrc`下，
cookie应该自动保存在`proxy/.session`下的，说是加了米盾，所以拿不到...，   
session过期时本地环境登不上去应该去stagin环境手动复制cookie保存到.session中...
# 2021-1-7   

熟悉ant-design-vue的使用

## 搜索栏的封装    
通过v-model可以将筛选组件的数据双向绑定。  

**父组件**   

```html
   <filter-table
      v-model="queryFilter"
      :field2chinese-map="field2chineseMap"
      :enums="NUMS"
    />
```
**子组件**  

然后filter-table组件中用model属性，自定义触发事件
```js
 model: {
    prop: 'value',
    event: 'onQueryFilterChange'
 },
```
将`onQueryFilterChange`设置为要触发的事件.
然后watch数据，当数据改变时将数据传递给父组件
```js
 watch: {
    filterData: {
      handler (newVal, oldVal) {
          this.$emit('onQueryFilterChange', newVal)
      },
      deep: true
    }
  },
```
# 2021-1-14   
ant-design-vue表格的title可以自定义渲染：

![ant-design-vue-title](https://raw.githubusercontent.com/lxhyl/lxhyl.github.io/master/files/img/ant-design-vue-title.jpg)
# 12-22   

做了tag组件。

# 12-23  

日期时间组件 

# 12-24  

select组件   
当组件选项值重复的时候，会抛出警告，虽然不影响使用，但看着难受，于是做了自定义指令，如果有重复值给用户一个提示，并且全局捕获这个警告。  

```js
directives: {
    listenValue: {
      // eslint-disable-next-line
      update: (el, binding, vnode, oldVnode) => {
        const that = oldVnode.context;
        // eslint-disable-next-line
        const options = that.selectedObj.options.filter((item, index) => index !== binding.arg);
        options.forEach((item) => {
          if (item.value === binding.value) {
            that.$message.closeAll();
            that.$message.warning('选项值不能重复!');
          }
        });
      },
    },
  },
```


# 12-25    

今天遇到radio标签一直点不中,以为又是radio字段没有getter,setter,检查了一下发下vue已经监听到了此字段了啊。    
最后发现原来是事件没有传播到input上，怪不得没反应。
遂写做了个测试当作学习。

[event.html](小米实习记录/tech-low-code-editor/event.html)

**冒泡的顺序(默认为冒泡)**  

`son=>me=>father`

**捕获的顺序**   

`father=>me=>son` 


**e.preventDefault()**  
事件仍然是可以继续传播的，但默认行为会被阻止，比如`a`标签无法跳转，`radio`无法选中。  

测试了下无法选中的有`input.radio`,`input.file`,`input.checkbox`,`input.date`,`input.color`,  

其他类型的输入框事件却可以触发,比如`input.range`,`input.button`或`input.text`等需要输入的
```js
    const fatherFn = function (e) {
      proxyResult.push('father')
    }
    const meFn = function (e) {
      proxyResult.push('me')
    }
    const sonFn = function (e) {
      proxyResult.push('son')
    }
    const stage = true;
    father.addEventListener('click', fatherFn, stage);
    me.addEventListener('click', meFn, stage)
    son.addEventListener('click', sonFn, stage)
```

**e.stopPropagation()**

阻止事件进一步传播，但不能阻止标签的默认事件。

**e.stopImmediatePropagation()**

如果添加了多个监听器，如果在其中一个事件监听器中执行`stopImmediatePropagation()` ，那么剩下的事件监听器都不会被调用。


# 12-29    
~**todo**~已解决，但`number`组件在项目中的位置不合理，后期再改进。  

表单项的`Number`类型输入框问题

**单位转换**   

我自己用链表搞的，结果很麻烦，然后请教陈哥，用数组实现简单清晰多了。  

```js
transitionUnit(oldUnit, newUnit, size) {
  const list = ['K', 'M', 'G'];
  const oldUnitIndex = list.indexOf(oldUnit);
  const newUnitIndex = list.indexOf(newUnit);
  return size * (1024 ** (oldUnitIndex - newUnitIndex));
},
```

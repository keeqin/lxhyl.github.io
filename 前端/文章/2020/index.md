
# 简易版vuex  

写一个很简单的项目时，不想用vuex来进行状态管理。所以就自己简单实现了下单向数据流。
顺便看了几篇为什么要使用单向数据流的文章。  

?> 还没体验过那种混乱的数据流，所以不知道有多可怕？ 


分析下项目要用的，构造函数里面的:`state`（存放数据）, `mutations`（存放同步改变state的函数）,`action`(异步改变)。 
原型上的方法`commit`(调用mutations中的函数)，`dispatch`(调用actions中的函数).

?> 为什么要这样设计呢？

```js
class Store {
    constructor(option){
        /*
        *  使用vue实例来实现和视图双向绑定
        *  让VUE来做监听数据并改变视图的脏活
        */
        this.state = new Vue({
            data:option.state
        }).$data
        this.mutations = option.mutations
        this.actions = option.actions
    }
    /*
    *  @param funName 要调用mutations中的函数
    *  @param args 其他参数
    *  vuex mutations中函数的第一个参数为state数据
    */
    commit(funName, ...args) {
        return this.mutations[funName](this.state, ...args)
    }
       /*
    *  @param funName 要调用mutations中的函数
    *  @param args 其他参数
    */
    dispatch(funName, ...args) {
        return this.actions[funName](this, ...args)
    }
}

```

!> 注意  


此时一些简单场景可能可以正常运行，但函数调用复杂的话，就会出现this指向不明的情况。所以需要在构造函数中重写原型方法以明确this指向。
```js
        // 将this一直绑定到实例上，避免调用时this指向错误
        const store = this;
        const { commit, dispatch } = this;
        this.commit = function (funName, ...args) {
            return commit.call(store, funName, ...args);
        }
        this.dispatch = function (funName, ...args) {
            return dispatch.call(store, funName, ...args)
        }
```


完整代码
```js
import Vue from 'vue'

class Store {
    constructor(option) {
        this.state = new Vue({
            data: option.state
        }).$data
        this.mutations = option.mutations
        this.actions = option.actions

        // 将this一直绑定到此对象上，避免调用时this指向错误
        const store = this;
        const { commit, dispatch } = this;
        this.commit = function (funName, ...args) {
            return commit.call(store, funName, ...args);
        }
        this.dispatch = function (funName, ...args) {
            return dispatch.call(store, funName, ...args)
        }
    }
    commit(funName, ...args) {
        return this.mutations[funName](this.state, ...args)
    }
    dispatch(funName, ...args) {
        return this.actions[funName](this, ...args)
    }
}

Store.install = _Vue => {
    _Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

export default Store

```


# 输入框千分位

项目有一个需求，要求鼠标离开输入框时，将输入内容转为千分位。聚焦输入时，内容为正常数字。

使用自定义指令实现了下，特别简单。

* `fmtnum.js`
```js
export const fmtnum = {
    bind(el) {
        // 将正常数字转为千分位的方法。
        const formatNum = num => num ? Number(num).toLocaleString() : ''
        // 聚焦时，将值变为正常状态
        el.addEventListener('focus', function (event) {
            // 去掉所有逗号
            event.target.value= event.target.value.replace(/,/g, '')
        }, true)
        // 移出时变为千分位
        el.addEventListener('blur', function (event) {
            event.target.value = formatNum(event.target.value);
        }, true) // 事件捕获触发
    }
}
```

* `main.js`中作为全局指令
```js
import {fmtnum} from "./utils/formatNum"
Vue.directive('fmtnum',fmtnum);
```

* 组件中使用
```js
 <el-input
          v-model="testvalue"
          v-fmtnum
          size="mini"
          placeholder="请输入"
        ></el-input>
```

?> 由于v-model监听的时Input事件，而数据格式转换是在focus，blur中完成的，所以并不影响model的值。使用的element的组件，此处采用事件捕获才能触发对应的处理函数（第三个参数为true）。
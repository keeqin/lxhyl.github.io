
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
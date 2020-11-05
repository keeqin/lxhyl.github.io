
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

**使用**
例子：
```js
import Store from './src/index'
import Vue from 'vue'

import { DB_getAll } from "../indexedDB/index"
import {formatTask} from "../utils/formatTask"
Vue.use(Store);


const option = {
    state: {
        allTask: null,
        typeTask:{},//分类好的任务
    },
    mutations: {
        changeState(state, key, newValue) {
            state[key] = newValue;
        },
        setAllTask(state, payload) {
            state.allTask = payload
        },
        setTypeTask(state,payload){
            state.typeTask = payload
        }
    },
    actions: {
        queryAllTask({commit}) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await DB_getAll();
                    commit('setAllTask', res);
                    commit('setTypeTask',formatTask(res));
                    resolve(res);
                }
                catch{
                    reject('读取数据出错')
                }
            })
        }
    }
}
export default new Store(option)
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



# IndexDB的简单使用

> ndexedDB 是一种可以让你在用户的浏览器内持久化存储数据的方法。IndexedDB 为生成 Web Application 提供了丰富的查询能力，使我们的应用在在线和离线时都可以正常工作。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)

* IndexDB的所有操作都是异步的
* 每次操作都建立在事务之上

**创建（打开）**
打开和创建是一个接口，如果未找到此数据库就会新建一个数据库

```js
/*
* @param name 数据库名
* @param version 数据库版本
*/
window.indexedDB.open(name,version);
```
之后会触发一系列事件  
`onerror`(失败)
`onsuccess`(成功)
`onupgradeneeded`(更新)

第一次打开数据库会触发更新事件，可以在这里建表,并建立索引。


* db.createObjectStore
```js
/*
* @param name 表名
* @param option 配置 
*/
db.createObjectStore(name,option)
```

* db.createIndex
```js
/*
* @param indexName 索引名称
* @param keyPath   关键路径
* @param objectParameters 配置对象
*/ 
db.createIndex(indexName,keyPath[,objectParameters ])
```

**创建的例子**  

```js
db = window.indexedDB.open('todo', 1);
db.onerror = event => {
    console.log('打开数据库失败', event)
}
db.onupgradeneeded = event => {
    // 更新
    db = event.target.result;
    // 建表 
    // 此处建立名为todo，数据路径为id的数据表
    // 建立索引为id,索引路径为id,并且id不可重复的索引
    db.createObjectStore('todo', { keyPath: 'id' }).createIndex('id', 'id', { unique: true })
}
db.onsuccess = event => {
    db = event.target.result;
}
```


每次操作都是建立在事务之上的,操作成功或失败，事务就会结束。所以每次操作都得建立新的事务。     

（建立事务）例：
`db.transaction(['todo'], 'readwrite').objectStore('todo')`  

**添加数据**
```js
// 将data添加进todo数据库todo数据表
// 'readwrite'代表可读可写
db.transaction(['todo'], 'readwrite').objectStore('todo').add(data)
```
**查找数据**
```js
db.transaction(['todo'], 'readwrite').objectStore('todo').get(id);
```

**更改数据**
```js
db.transaction(['todo'], 'readwrite').objectStore('todo').put(data);
```

**删除数据**

以定义的索引id，去删除数据
```js
db.transaction(['todo'], 'readwrite').objectStore('todo').delete(id);
```

**获取所有数据**稍有不同

通过游标遍历获取
```js
  let result = [];
    let objectStore = db.transaction("todo").objectStore("todo");
    return new Promise((resolve, reject) => {
        objectStore.openCursor().onsuccess = event => {
            let data = event.target.result;
            if (data) {
                result.push(data.value);
                data.continue();
            } else {
                resolve(result);
            }
        }
        objectStore.openCursor().onerror = event => {
            reject(event)
        }
    })
```

**完整代码**
```js
import createID from "../utils/createID"

let db;


db = window.indexedDB.open('todo', 1);
db.onerror = event => {
    console.log('打开数据库失败', event)

}
db.onupgradeneeded = event => {
    // 更新
    db = event.target.result;
    // 建表
    db.createObjectStore('todo', { keyPath: 'id' }).createIndex('id', 'id', { unique: true })
}
db.onsuccess = event => {
    db = event.target.result;
}



// 封装操作数据库的方法
// 由于都是异步，所以使用promise
// 操作开始必须开启一条事务，方法是建立在事务之上的。  

/*
*  添加
*/
const DB_add = data => {
    data = Object.assign({}, data, { id: createID(6) })
    const request = db.transaction(['todo'], 'readwrite').objectStore('todo').add(data)
    return new Promise((resolve, reject) => {
        request.onerror = event => {
            reject(event)
        }
        request.onsuccess = event => {
            resolve(data.id)
        }
    })
}

/*
* 获取某条数据
*/
const DB_get = id => {
    return new Promise((resolve, reject) => {
        const request = db.transaction(['todo'], 'readwrite').objectStore('todo').get(id);
        request.onerror = event => reject(event);
        request.onsuccess = event => {
            resolve(event.target.result);
        }
    })
}

/*
*  更改某条数据
*/
const DB_change = (id, data) => {
    return new Promise((resolve, reject) => {
        DB_get(id).then(res => {
            data = Object.assign(res, data);
            const uploadRequest = db.transaction(['todo'], 'readwrite').objectStore('todo').put(data);
            uploadRequest.onsuccess = event => resolve(res);
            uploadRequest.onerror = event => reject(event);
        })
        .catch(err => reject(err))
    })
}



/*
* 获取这张表所有的数据
*/
const DB_getAll = () => {
    let result = [];
    let objectStore = db.transaction("todo").objectStore("todo");
    return new Promise((resolve, reject) => {
        objectStore.openCursor().onsuccess = event => {
            let data = event.target.result;
            if (data) {
                result.push(data.value);
                data.continue();
            } else {
                resolve(result);
            }
        }
        objectStore.openCursor().onerror = event => {
            reject(event)
        }
    })
}
/*
*  删除某条数据
*/
const DB_delete = id => {
    return new Promise((resolve, reject) => {
        let request = db.transaction(['todo'], 'readwrite').objectStore('todo').delete(id);
        request.onsuccess = event => {
            resolve(event)
        }
        request.onerror = event => {
            reject(event)
        }
    })
}

// 判断是否打开着
const DB_isOpen = () => {
    return db ? true : false;
}



export { DB_add, DB_change, DB_getAll, DB_delete, DB_isOpen }

```





# 自定义message组件

**message.vue**  

很简单，先写好页面  

bgColor：背景颜色
type：messgae类型
message:消息主体
showClose:是否可主动关闭


```html
<template>
  <div class="fixed-top">
    <div
      class="message"
      :style="{ backgroundColor: bgColor ? bgColor : defaultColor }"
    >
      <div class="weui-flex">
        <div>
          <div class="placeholder">
            <!-- 提示 -->
            <i v-if="type == 'info'" class="weui-icon-info"></i>
            <!-- 错误 -->
            <i v-if="type == 'error'" class="weui-icon-warn"></i>
            <!-- 加载 -->
            <i v-if="type == 'load'" class="weui-icon-waiting"></i>
            <!-- 成功 -->
            <i v-if="type == 'success'" class="weui-icon-success"></i>
          </div>
        </div>
        <div class="weui-flex__item">
          <div class="placeholder">{{ message }}</div>
        </div>
        <div v-if="showClose">
          <div class="placeholder" @click="closeMessage">
            <svg
              t="1602832055257"
              viewBox="0 0 1075 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3194"
              width="30"
              height="30"
            >
              <path
                d="M822.125714 354.742857l-362.788571-256c2.925714-12.434286 2.925714-25.6 0-38.034286-10.971429-42.422857-54.125714-68.754286-96.548572-57.782857-42.422857 10.971429-68.754286 54.125714-57.782857 96.548572 3.657143 13.165714 10.24 25.6 19.748572 35.84L126.537143 529.554286c-4.388571 8.777143-0.731429 19.748571 8.045714 24.868571 2.925714 1.462857 5.12 2.194286 8.045714 2.194286 6.582857 0 13.165714-3.657143 16.091429-10.24l204.8-406.674286c4.388571-8.045714 1.462857-18.285714-5.851429-23.405714-8.777143-5.851429-14.628571-14.628571-17.554285-24.868572-5.851429-23.405714 8.045714-46.811429 31.451428-52.662857 23.405714-5.851429 46.811429 8.045714 51.931429 31.451429 2.194286 9.508571 1.462857 19.748571-2.925714 28.525714-3.657143 8.045714-1.462857 17.554286 5.851428 22.674286l374.491429 264.045714c8.045714 5.851429 19.748571 3.657143 25.6-4.388571 5.851429-8.777143 3.657143-20.48-4.388572-26.331429z"
                fill="#3973F4"
                p-id="3195"
              ></path>
              <path
                d="M380.511086 76.565943m-21.287814 5.321462a21.942857 21.942857 0 1 0 42.575627-10.642925 21.942857 21.942857 0 1 0-42.575627 10.642925Z"
                fill="#3973F4"
                p-id="3196"
              ></path>
              <path
                d="M1017.417143 810.422857L174.08 1021.074286c-36.571429 8.777143-73.142857-13.165714-82.651429-49.737143L5.12 626.102857c-8.777143-36.571429 13.165714-73.142857 49.737143-82.651428l843.337143-210.651429c36.571429-8.777143 73.142857 13.165714 82.651428 49.737143l86.308572 345.234286c8.777143 36.571429-13.165714 73.142857-49.737143 82.651428z"
                fill="#4988FD"
                p-id="3197"
              ></path>
              <path
                d="M236.251429 796.525714c21.211429-5.12 29.988571-24.137143 29.988571-24.137143l24.868571 16.822858s-10.971429 28.525714-47.542857 37.302857c-39.497143 8.777143-76.8-14.628571-84.845714-49.737143-8.045714-35.84 15.36-73.142857 54.125714-81.92 35.84-8.045714 58.514286 13.165714 58.514286 13.165714l-15.36 26.331429s-15.36-13.165714-35.84-8.777143c-20.48 4.388571-32.182857 23.405714-27.794286 43.885714 4.388571 20.48 23.405714 32.182857 43.885715 27.062857zM321.097143 799.451429L292.571429 674.377143l33.645714-8.045714 21.942857 94.354285 55.588571-12.434285 7.314286 29.988571zM491.52 758.491429c-39.497143 8.777143-76.8-14.628571-84.845714-49.737143-8.045714-35.84 15.36-73.142857 54.125714-81.92 39.497143-8.777143 76.8 14.628571 84.845714 49.737143 8.777143 35.84-14.628571 73.142857-54.125714 81.92z m-6.582857-29.988572c19.748571-4.388571 31.451429-23.405714 26.331428-43.885714-4.388571-20.48-23.405714-32.182857-43.154285-27.794286-19.748571 4.388571-31.451429 23.405714-26.331429 43.885714 4.388571 20.48 23.405714 32.182857 43.154286 27.794286zM554.422857 645.851429c-4.388571-19.748571 10.24-42.422857 38.765714-49.005715 29.988571-7.314286 47.542857 8.045714 47.542858 8.045715l-14.628572 24.868571s-10.24-8.045714-22.674286-5.12c-8.045714 2.194286-12.434286 8.777143-10.971428 13.897143 3.657143 16.822857 59.977143-5.12 69.485714 38.765714 5.12 21.942857-9.508571 45.348571-40.228571 52.662857-32.914286 7.314286-54.857143-10.24-54.857143-10.24l14.628571-24.868571s13.897143 10.971429 29.988572 7.314286c9.508571-2.194286 14.628571-10.24 13.165714-16.822858-4.388571-18.285714-59.977143 3.657143-70.217143-39.497142zM789.211429 650.971429l6.582857 28.525714L697.782857 702.171429l-28.525714-125.074286 96.548571-21.942857 6.582857 28.525714-62.171428 14.628571 4.388571 19.748572 48.274286-10.971429 5.851429 27.062857-48.274286 10.971429 5.12 21.211429zM844.068571 531.017143c38.034286-8.777143 72.411429 12.434286 80.457143 47.542857 8.045714 35.108571-13.165714 68.754286-51.931428 77.531429l-48.274286 10.971428-28.525714-125.074286 48.274285-10.971428z m-7.314285 33.645714l14.628571 64.365714 13.897143-2.925714c16.822857-3.657143 29.257143-20.48 24.868571-39.497143-4.388571-19.017143-20.48-29.257143-39.497142-24.868571l-13.897143 2.925714z"
                fill="#FFFFFF"
                p-id="3198"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```
```js
<script>
const DEFAULT_COLOR = {
  info: "#D7CCC8",
  error: "#fde2e2",
  load: "#e1f3d8",
  success: "#B2EBF2",
};
export default {
  computed: {
    defaultColor: function () {
      return DEFAULT_COLOR[this.type];
    },
  },
  methods: {
    // 关闭调用的是原型上的关闭方法
    closeMessage() {
      this.$message().close(this.MESSAGE_ID);
    },
  },
};
</script>
```

**inde.js**

1. 引入vue和message.vue
```js
import Vue from 'vue'
import Message from "./Message"
```
2. 定义消息默认类型  

```js
const DEFALUT_OPTION = {
    type: 'info',
    message: '这是一条信息',
    delay: 1500,  // 延迟多少ms关闭
    showClose: false, // 是否显示关闭按钮，
    bgColor: null,  // 背景颜色
}
```
3. 获得组件实例  

之后就可以像操作对象一样操作组件实例了
```js
let MessageNode = Vue.extend(Message);
```

4. 构造出一个弹框试试

```js
// 实例化组件对象
let message = new MessageNode({
    el:document.createElement('div'),
    // 必须以函数形式返回data，就像vue组件中一样
    data:() => DEFALUT_OPTION
})
// 现在将此组件插入至body中即可
let body = document.body;
body.appendChild(messageNode.$el) // 注意插入的是实例的$el（html标签）属性
```

5. 使用
`index.js`
```js
export default {
    install(Vue) {
        Vue.prototype.$message = message
    },
}
```
`main.js`  
```js
// Message组件
import Message from './components/Message/index'
Vue.use(Message)
```

`App.vue` 中以函数形式调用
```js
 this.$message()
```

然后就可以在页面上看到message弹框了！

当然这只是最简单的，所以在此基础上慢慢来丰满它！



## 完善

1. 打开时可配置data选项  

使用`Object.assign`将默认的与用户输入的参数合并
```js
option = Object.assign(DEFALUT_OPTION, option);
```


2. 定义关闭方法
```js
MessageNode.prototype.close = message => {
      message.$el.parentNode.removeChild(message.$el)
    }
}
```

3. 自动关闭
```js
    // 自动关闭
    if (!option.showClose) {
        let closeTimer = setTimeout(() => {
            messageNode.close(message);
            clearTimeout(closeTimer);
            closeTimer = null;
        }, option.delay);
    }
```

如果不显示关闭按钮，则为自动关闭。所以添加延时器以在指定时间后关闭。

但此时只能显示一个弹框，现在可以在此基础上再去完善！

## 可同时显示多个message

定义存储各个message的对象（对象形式方便查找）
```js
let allMessages = Object.create({});
```

定义工厂函数，以实例化组件
```js
const createMessage = config => {
    return new MessageNode({
        el: document.createElement('div'),
        data: () => config
    })
}
```


定义一个值存储message总数目,对象形式，是为了便于监听总个数改变，然后去更改页面上message的位置，如下，当value改变时，去改变顶部偏移量（还可加上动画）
```js
let messagesNum = {}
Object.defineProperty(messagesNum, 'value', {
    get: function () {
        return Object.keys(allMessages).length
    },
    // 值改变时，按顺序设置message对象的style.top
    set: function (value) {
        let num = 0
        for (let key in allMessages) {
          allMessages[key].$el.style.top = `${num * 60 + 10}px`
          num++
        }
        return value
    }
})
```


现在在创建message的时候，需要把创建的message对象存储于allMessages中，方便后续删除操作的查找
```js
const _Key = createID(7); // 创建唯一id
allMessages[_Key] = messageNode; // 将此id作为key,message实例作为value，存于allMessages对象中.
messagesNum.value++; //更改message的数量
```

重写删除方法
```js
MessageNode.prototype.close = key => {
    if (key && key in allMessages) {
        allMessages[key].$el.parentNode.removeChild(allMessages[key].$el)
        delete allMessages[key]
        messagesNum.value--
    }
}
```

还可像element-ui那样，增加一些方法
1. 关闭所有
```js
MessageNode.prototype.closeAll = () => {
    for (let i in allMessages) {
        allMessages[i].$el.parentNode.removeChild(allMessages[i].$el)
        delete allMessages[i]
    }
}
```
2. 方便调用
```js
['info', 'error', 'load', 'success'].forEach(type => {
    message[type] = options => {
        options.type = type;
        return message(options);
    }
})
```

## 完整代码
`index.js`
```js
import Vue from 'vue'
import Message from "./Message"
import createID from "../../../utils/createID"


const DEFALUT_OPTION = {
    type: 'info',
    message: '这是一条信息',
    delay: 1500,
    showClose: false,
    bgColor: null,
}


let MessageNode = Vue.extend(Message);

// 所有message对象
let allMessages = Object.create({});
// 实例的个数
//  对象形式便于监听改动
let messagesNum = {}
Object.defineProperty(messagesNum, 'value', {
    get: function () {

        return Object.keys(allMessages).length
    },
    // 值改变时，按顺序设置message对象的style.top
    set: function (value) {
        let num = 0;
        for (let key in allMessages) {
            if (num === 0) {
                allMessages[key].$el.style.top = '10px'
            } else {
                allMessages[key].$el.style.top = `${num * 60 + 10}px`
            }
            num++;
        }
        return value
    }
})

/* 
*  关闭message
*  @param key message的id
*/
MessageNode.prototype.close = key => {
    if (key && key in allMessages) {
        allMessages[key].$el.parentNode.removeChild(allMessages[key].$el)
        /*
        *  必须先删除，再改变值，以解决 监听message数量时key比value多的bug
        */
        delete allMessages[key]
        messagesNum.value--
    }
}

// 关闭所有
MessageNode.prototype.closeAll = () => {
    for (let i in allMessages) {

        allMessages[i].$el.parentNode.removeChild(allMessages[i].$el)
        delete allMessages[i]

    }
}

/*

*/

/*
*  工厂函数 实例化组件
*  @param {Object} config  会注入到message的data中
*  @return message组件 
*/

const createMessage = config => {
    return new MessageNode({
        el: document.createElement('div'),
        data: () => config
    })
}


/*
*  实例化组件，返回组件
*/
const message = option => {
    // 定义KEY方便查找
    const _Key = createID(7);
    // 判断是否是为了关闭
    let _isClose = option ? false : true;
    option = Object.assign(DEFALUT_OPTION, option);
    let messageNode = createMessage(option);

    // 是关闭则直接返回实例 不挂载
    if (_isClose) { return messageNode };
    // 递增实例的对象
    // 如果是为了关闭而创建的实例，messagesNum是不应该增加的。所以放到return之后
    messagesNum.value++;

    // 插入body
    let body = document.body;
    messageNode.$el.style.top = `${(messagesNum.value) * 60 + 10}px`
    console.log('messageNode',messageNode)
    body.appendChild(messageNode.$el)



    messageNode.MESSAGE_ID = _Key;
    allMessages[_Key] = messageNode;
    // 自动关闭
    if (!option.showClose) {
        let closeTimer = setTimeout(() => {
            messageNode.close(_Key);
            clearTimeout(closeTimer);
            closeTimer = null;
        }, option.delay);
    }
    return messageNode
}

['info', 'error', 'load', 'success'].forEach(type => {
    message[type] = options => {
        options.type = type;
        return message(options);
    }
})

export default message
```  

整理了一下前几天学到的，发现我写文章的逻辑好乱啊。
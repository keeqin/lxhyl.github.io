在[极客](https://time.geekbang.org/)上买了篇课程学学   

# 链表

## LRU缓存算法    

1. 如果此数据之前已经被缓存在链表中了，我们遍历得到这个数据对应的结点，并将其从原来的位置删除，然后再插入到链表的头部。  
2. 如果此数据没有在缓存链表中，又可以分为两种情况：  
   * 如果此时缓存未满，则将此结点直接插入到链表的头部；
   * 如果此时缓存已满，则链表尾结点删除，将新的数据结点插入链表的头部。


由于链表的查询等操作的时间复杂度是`n`,所以使用`Map`存储每条数据，可以把查询等操作的时间复杂度优化到`1`，以空间换时间
```js
// # LRU缓存算法
class LRU {
    constructor(size = 5) {
        // 默认缓存5条数据 
        this.size = size
        // 用map存数据
        const map = new Map()
        this.headNode = {
            prev: null,
            value: 'HEAD',
            next: 'FOOT_ID'
        }
        this.footNode = {
            prev: 'HEAD_ID',
            value: 'FOOT',
            next: null
        }
        map.set('HEAD_ID', this.headNode)
        map.set('FOOT_ID', this.footNode)
        this.cache = map
        // 双向链表  保证操作时间复杂度为1
        this.list = this.headNode
    }
    getCache() {
        return this.cache
    }
    getList() {
        return this.list
    }
    // 添加数据      
    addData(data) {
        const addInHead = () => {
            this.cache.set(data, {
                prev: 'HEAD_ID',
                value: null,
                next: this.headNode.next
            })
            const sourceNode = this.cache.get(this.headNode.next)
            sourceNode.prev = data
            // 写入链表头部
            this.headNode.next = data
        }
        const isInCache = this.cache.has(data)
        // 如果已经存在了，把原来位置的删除,并且此条数据插入头节点
        if (isInCache) {
            const sourceNode = this.cache.get(data)
            const prevNode = this.cache.get(sourceNode.prev)
            const nextNode = this.cache.get(sourceNode.next)
            prevNode.next = sourceNode.next
            nextNode.prev = sourceNode.prev
            addInHead()
        } else {
            // 插入至头部
           
            // 如果缓存未满，插入头部
            if (this.cache.size - 2 < this.size) {
                addInHead()
            }
            // 缓存满了 删除未节点，插入头部
            else {
                addInHead()
                // 获取最后一个节点
                const lastFootNode = this.cache.get(this.footNode.prev)
                this.cache.delete(this.footNode.prev)
                // 最后一个节点的父节点
                const fatherLastFootNode = this.cache.get(lastFootNode.prev)
                this.footNode.prev = lastFootNode.prev
                fatherLastFootNode.next = 'FOOT_ID'
            }
        }

    }
}
const lruCom = new LRU()
lruCom.addData(1)
lruCom.addData(2)
lruCom.addData(3)
lruCom.addData(4)
lruCom.addData(5)
lruCom.addData(6)
lruCom.addData(4)
console.log(lruCom.getCache())
console.log(lruCom.getList())

/**
Map {
  'HEAD_ID' => { prev: null, value: 'HEAD', next: 4 },
  'FOOT_ID' => { prev: 2, value: 'FOOT', next: null },
  2 => { prev: 3, value: null, next: 'FOOT_ID' },
  3 => { prev: 5, value: null, next: 2 },
  4 => { prev: 'HEAD_ID', value: null, next: 6 },
  5 => { prev: 6, value: null, next: 3 },
  6 => { prev: 4, value: null, next: 5 }
}
{ prev: null, value: 'HEAD', next: 4 }
* /
```
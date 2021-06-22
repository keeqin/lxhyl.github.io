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

{
    // #1337.矩阵中战斗力最弱的k行
    const kWeakestRows = (mat, k) => {
        const arr = Array(mat.length - 1)
        for (let row = 0; row < mat.length; row++) {
            let col = 0
            let n = 0
            while (col < mat[row].length && mat[row][col] === 1) {
                n++
                col++
            }
            arr[row] = { row, n }
        }
        return arr.sort((a, b) => a.n - b.n).map(item => item.row).slice(0, k)
    }
    const mat =
        [[1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1]]
    const k = 3
    console.log(kWeakestRows(mat, k))
}

{
    // #743.网络延迟时间
    const networkDelayTime = (times, n, k) => {
        const sideMap = {}
        times.forEach(item => {
            const [source, target, time] = item
            if (!sideMap[source]) {
                sideMap[source] = {}
            }
            sideMap[source][target] = time
        })
        // 标记节点，如果遍历过就移除
        const mark = new Set()
        for(let i=1;i<=n;i++){
            mark.add(i)
        }
        // 键为节点，值为k节点到此节点的最短时间
        const result = new Map()
        /**
         * 
         * @param node  当前节点
         * @param  t 到当前节点的时间
         * @returns 
         */
        const dfs = (node, t) => {
            // 遍历过了 移除此节点 
            mark.delete(node);
            // 找到到此节点的时间和最小值
            if(!result.has(node)){
                result.set(node,t)
            }else if(result.get(node) > t){
                result.set(node,t)
            }else{
                return
            }
            // 下一个节点不存在
            if (!sideMap[node]) return
            // 递归
            const keys = Object.keys(sideMap[node])
            keys.forEach(item => dfs(Number(item), t + sideMap[node][item]))
        }
        dfs(k, 0)
        if (mark.size > 0) return -1
        // 木桶理论，走完所有节点的最短时间为所有节点中的最大值
        return Math.max(...result.values())
    }
    const times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
    console.log(networkDelayTime(times, n, k))
}

{
    // #581.最短无序连续字数组
    const findUnsortedSubarray = nums => {
        const copyNums = [...nums].sort((a,b) => a - b)
        const len = nums.length
        let left = null
        let right = null
        for(let i = 0;i<len;i++){
            if(copyNums[i] !== nums[i]){
                left = i
                break
            }
        }
        for(let i = len - 1;i>=0;i--){
            if(copyNums[i] !== nums[i]){
                right = i
                break
            }
        }
        if(left === null){
            return 0
        }else{
            return right - left + 1
        }
    }
    const nums = [1]
    console.log(findUnsortedSubarray(nums))
}

{
    // #611.有效的三角形的个数
    const triangleNumber = nums => {
        nums.sort((a,b) => a - b)
        const len = nums.length
        if(len <= 2) return 0
        let result = 0
        for(let i = 0;i<len - 2;i++){
            for(let j = i + 1;j<len - 1;j++){
                const sideSum = nums[i] + nums[j]
                let left = j + 1
                let right = len -1
                let k = j
                while(left <= right){
                   const mid = Math.floor((right + left) / 2)
                   if(nums[mid] < sideSum){
                       k = mid
                       left = mid + 1
                   }else{
                       right = mid - 1
                   }
                }
                result += k - j
               
            }
        }
        return result
    }
    const nums = [2,2,3,4]
    console.log(triangleNumber(nums))
}

{
    // # 802.找到最终的安全状态
   const eventualSafeNodes = graph => {
       const len = graph.length
       const result = []
       // 标记节点
       const mark = Array(len).fill('init')
       const isSafeDfsHelper = index => {
         if(mark[index] === 'ing') return false
         if(mark[index] === 'safe') return true
          // 打标记
          mark[index] = 'ing'
          for(let i = 0;i<graph[index].length;i++){
            if(!isSafeDfsHelper(graph[index][i])){
               return false
            }
          }
          // 搜索完毕 是安全节点
          mark[index] = 'safe'
          return true
       }
       graph.forEach((_,index) => {
          if(isSafeDfsHelper(index)){
              result.push(index)
          }
       })
       return result
   }
   const graph  = [[1,2],[2,3],[5],[0],[5],[],[]]
   console.log(eventualSafeNodes(graph))
}
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
        for (let i = 1; i <= n; i++) {
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
            if (!result.has(node)) {
                result.set(node, t)
            } else if (result.get(node) > t) {
                result.set(node, t)
            } else {
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
    const times = [[2, 1, 1], [2, 3, 1], [3, 4, 1]], n = 4, k = 2
    console.log(networkDelayTime(times, n, k))
}

{
    // #581.最短无序连续字数组
    const findUnsortedSubarray = nums => {
        const copyNums = [...nums].sort((a, b) => a - b)
        const len = nums.length
        let left = null
        let right = null
        for (let i = 0; i < len; i++) {
            if (copyNums[i] !== nums[i]) {
                left = i
                break
            }
        }
        for (let i = len - 1; i >= 0; i--) {
            if (copyNums[i] !== nums[i]) {
                right = i
                break
            }
        }
        if (left === null) {
            return 0
        } else {
            return right - left + 1
        }
    }
    const nums = [1]
    console.log(findUnsortedSubarray(nums))
}

{
    // #611.有效的三角形的个数
    const triangleNumber = nums => {
        nums.sort((a, b) => a - b)
        const len = nums.length
        if (len <= 2) return 0
        let result = 0
        for (let i = 0; i < len - 2; i++) {
            for (let j = i + 1; j < len - 1; j++) {
                const sideSum = nums[i] + nums[j]
                let left = j + 1
                let right = len - 1
                let k = j
                while (left <= right) {
                    const mid = Math.floor((right + left) / 2)
                    if (nums[mid] < sideSum) {
                        k = mid
                        left = mid + 1
                    } else {
                        right = mid - 1
                    }
                }
                result += k - j

            }
        }
        return result
    }
    const nums = [2, 2, 3, 4]
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
            if (mark[index] === 'ing') return false
            if (mark[index] === 'safe') return true
            // 打标记
            mark[index] = 'ing'
            for (let i = 0; i < graph[index].length; i++) {
                if (!isSafeDfsHelper(graph[index][i])) {
                    return false
                }
            }
            // 搜索完毕 是安全节点
            mark[index] = 'safe'
            return true
        }
        graph.forEach((_, index) => {
            if (isSafeDfsHelper(index)) {
                result.push(index)
            }
        })
        return result
    }
    const graph = [[1, 2], [2, 3], [5], [0], [5], [], []]
    console.log(eventualSafeNodes(graph))
}

{
    // #457.环形数组是否存在循环

    // dfs
    const circularArrayLoop = nums => {
        const len = nums.length
        const getNext = index => ((index + nums[index]) % len + len) % len
        /**
         *  深度优先遍历 
         * @param {Number} index 当前节点
         * @param {Number} d 方向
         * @param {Set} set 已经遍历过的节点
         * @returns {Boolean} 
         */
        const dfs = (index, d, set) => {
            // 再次遍历到说明有循环
            if (set.has(index)) return true
            set.add(index)
            // 不同方向的相乘肯定为负数
            if (d * nums[index] < 0) return false
            const next = getNext(index)
            // 环的长度为1
            if (next === index) return false
            return dfs(next, d, set)
        }
        for (let i = 0; i < len; i++) {
            const result = dfs(i, nums[i], new Set())
            if (result) return true
        }
        return false
    }
    // 快慢指针
    const circularArrayLoop = nums => {
        const len = nums.length
        const getNext = index => ((index + nums[index]) % len + len) % len
        for (let i = 0; i < len; i++) {
            // 已经遍历过的跳过
            if (nums[i] === 0) continue
            let slow = i, fast = getNext(i)
            // 当方向相同，并且都不为0时
            // 注意：由于slow和fast是同步前进的，所以需要再错开相乘，才能保证方向相同。
            while (nums[slow] * nums[fast] > 0 && nums[slow] * nums[getNext(fast)] > 0) {
                // 遍历过的直接置0
                nums[slow] === 0
                nums[fast] === 0
                if (slow === fast) {
                    // 检查是否长度只有1
                    if (slow === getNext(fast)) break
                    return true
                }
                // 下一步
                slow = getNext(slow)
                fast = getNext(getNext(fast))
            }
        }
        return false
    }
    const nums = [-2, 1, -1, -2, -2]
    console.log(circularArrayLoop(nums))
}

{
    // #1137.第N个泰波那契数
    const tribonacci = n => {
        let a = 0, b = 1, c = 1
        if (n === 0) return a
        if (n === 1) return b
        if (n === 2) return c
        let i = 3
        while (i <= n) {
            const temp = a + b + c
            a = b
            b = c
            c = temp
            i++
        }
        return c
    }
    console.log(tribonacci(4))
}


{
    // #313.超级丑数
    const nthSuperUglyNumber = (n,primes) => {
        const dp = new Array(n + 1).fill(0)
        dp[1] = 1
        const len = primes.length
        const markPointers = new Array(len).fill(1)
        for(let i=2;i<=n; i++){
            let minNum = Number.MAX_SAFE_INTEGER
            for(let j = 0;j<len;j++){
                minNum = Math.min(dp[markPointers[j]] * primes[j],minNum)
            }
            dp[i] = minNum
            for(let j=0;j<len;j++){
                if(minNum === dp[markPointers[j]] * primes[j]){
                    markPointers[j]++
                }
            }
        }
        return dp[n]
    }
    const n = 12, primes = [2,7,13,19]
    console.log(nthSuperUglyNumber(n,primes))
}
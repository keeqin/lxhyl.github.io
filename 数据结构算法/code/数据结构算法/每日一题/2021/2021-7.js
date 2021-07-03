{
    // #LCP 07.传递信息
    const numWays = (n,relation,k) => {
        const allWaysMap = Array(n).fill(null).map(() => Array())
        for(let [start,next] of relation){
            allWaysMap[start].push(next)
        }
        let result = 0;
        const dfs = (index,step) => {
            if(step === k){
                if(index === n -1){
                   result++
                }
                return
            }else{
                allWaysMap[index].forEach(item => {
                    dfs(item,step + 1)
                })
            }
        }
        dfs(0,0)
        return result
    }
    const n = 5, relation = [[0,2],[2,1],[3,4],[2,3],[1,4],[2,0],[0,4]], k = 3
    console.log(numWays(n,relation,k))
}

{
    // #3.无重复字符的最长子串
    const lengthOfLongestSubstring = s => {
        const len = s.length
        if(len <= 1) return len
        let i = 0;
        let result = 0
        while(i < len - 1){
            let j = i + 1;
            const set = new Set()
            set.add(s[i])
            while(!set.has(s[j]) && j<len){
                set.add(s[j])
                j++
            }
            let childLen = set.size
            result = childLen > result ? childLen : result
            i++
        }
        return result
    }
    const s = "dvdf"
    console.log(lengthOfLongestSubstring(s))
}

{
    // #雪糕的最大数量
    const maxIceCream = (costs,coins) => {
        costs.sort((a,b) => a - b)
        let result = 0;
        for(let i=0; i<costs.length; i++){
            if(coins >= costs[i]){
                result += 1
                coins -= costs[i]
            }else{
                break
            }
        }
        return result
    }
    const costs = [1,3,2,4,1], coins = 7
    console.log(maxIceCream(costs,coins))
}

{
    // #451.根据字符出现的频率排序
    const frequencySort = s => {
        const len = s.length
        if(s.length <= 1) return s
        const strNumMap = {}
        for(let i=0;i<len;i++){
           strNumMap[s[i]] =  strNumMap[s[i]] ?  strNumMap[s[i]] + 1 : 1  
        }
        const strNumArr = []
        for(let key in strNumMap){
            strNumArr.push({
                s:key,
                n:strNumMap[key]
            })
        }
        strNumArr.sort((a,b) => b.n - a.n)
        return strNumArr.map(item => {
            let str = ''
            let i = 1
            while(i <= item.n){
                str += item.s
                i++
            }
            return str
        }).join('')
    }
    const s = 'tree'
    console.log(frequencySort(s))
}

{
    // # 509.斐波那契数列
    const fib = n => {
        const dp = []
        dp[0] = 0
        dp[1] = 1
        if(n <= 1) return dp[n]
        let i = 2
        while(i <= n){
            dp[i] = dp[i-1] + dp[i-2]
            i++
        }
        return dp[n]
    }
    console.log(fib(4))
}

{
    // #1137.第n个泰波那契数 
    const tribonacci = n => {
        const dp = [0,1,1]
        if(n <= 2) return dp[n]
        let i = 3
        while(i <= n){
            dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
            i++
        }
        return dp[n]
    }
    const n = 25
    console.log(tribonacci(n))
}


{
    // #645.错误的集合
    const findErrorNums = nums => {
       const numsMap = new Map()
       nums.forEach(item => {
           if(!numsMap.has(item)){
               numsMap.set(item,1)
           }else{
               numsMap.set(item,2)
           }
       })
       let miss,mult
       for(let i=1;i<=nums.length;i++){
           if(!numsMap.has(i)){
               miss = i
           }
           if(numsMap.get(i) === 2){
               mult = i
           }
       }
       return [mult,miss]
    }
    const nums = [3,2,3,4,6,5]
    console.log(findErrorNums(nums))
}

{
    // # 70.爬楼梯
    // 状态转移方程 f(x) = f(x-1) + f(x-2)
    // 每次爬楼梯向前一步或两部，所以爬到第x层的方法等于x-1层的方法加上x-2层
    const climbStairs = n => {
        const dp = []
        dp[1] = 1
        dp[2] = 2
        let i = 3
        while(i<=n){
            dp[i] = dp[i-1] + dp[i-2]
            i++
        }
        return dp[n]
    }
    const climbStairs = n => {
        let x1=0,x2=0
        let x = 1
        for(let i=1;i<=n;i++){
           x1 = x2
           x2 = x
           x = x1 + x2
        }
        return x
    }
    console.log(climbStairs(3))
}

{
    // # 746.使用最小话费爬楼梯

    const minCostClimbingStairs = cost => {
        const len = cost.length
        const dp = Array(len + 1)
        dp[0] = 0
        dp[1] = 0
        let i=2
        while(i <= len){
           dp[i] = Math.min(dp[i-1] + cost[i-1],dp[i-2] + cost[i-2])
           i++
        }
        return dp[len]
    }
    const cost =  [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
    console.log(minCostClimbingStairs(cost))
}
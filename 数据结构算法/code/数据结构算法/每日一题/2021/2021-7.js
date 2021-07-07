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

{
    // #198.大家劫舍
    const rob =  nums => {
        const len = nums.length
        if(len === 1) return nums[0]
        if(len === 2) return Math.max(nums[0],nums[1])
        const dp = Array(len)
        dp[0] = nums[0]
        dp[1] = Math.max(nums[0],nums[1])
        let i = 2;
        while(i<len){
            dp[i] = Math.max(dp[i-1],dp[i-2] + nums[i])
            i++
        }
        return dp[len-1]
    }
    const nums = [2,7,9,3,1]
    console.log(rob(nums))
}


{
    // #213.打家劫舍2
    const rob = nums => {
        const len = nums.length
        if(len === 1) return nums[0]
        if(len === 2) return Math.max(nums[0],nums[1])
        const steal = (start,end) => {
           let first = nums[start]
           let second = Math.max(nums[start],nums[start + 1])
           for(let i = start + 2; i<=end; i++){
              const  t = Math.max(first + nums[i],second)
              first = second
              second = t
           }
           return second
        }
        return Math.max(steal(0,len-2),steal(1,len-1))
    }
    const nums  = [1,3,1,3,100]
    console.log(rob(nums))
}


{
    // #740.删除并获得点数

    const deleteAndEarn = nums => {
        const len = nums.len
        if(len === 0) return 0
        if(len === 1) return nums[0]
        const numsCount = {}
        nums.forEach(n => {
            if(n in numsCount){
                numsCount[n] += 1
            }else{
                numsCount[n] = 1
            }
        })
        const numsSum = []
        for(let key in numsCount){
            numsSum[key] = Number(key) * numsCount[key]
        }
        const dp = Array(len)
        dp[0] = numsSum[0] || 0
        dp[1] = Math.max(numsSum[0] || 0,numsSum[1] || 0)
        let i = 2
        while(i < numsSum.length){

            dp[i] = Math.max(dp[i-1],dp[i-2] + numsSum[i] || 0)
            i++
        }
        return dp[numsSum.length - 1]
    }
    const nums  = [3,4,2]
    console.log(deleteAndEarn(nums))
}

{
    const displayTable = orders => {
        const tablesObj = {}
        const allProductSet = new Set()
        for(let i=0;i<orders.length;i++){
            [_,tableNum,product] = orders[i]
            allProductSet.add(product)
            if(!tablesObj[tableNum]){
                tablesObj[tableNum] = {}
            }
            if(!tablesObj[tableNum][product]){
               tablesObj[tableNum][product] = 1
            }else{
                tablesObj[tableNum][product]++
            }
        }
        const titles = Array.from(allProductSet).sort()
        titles.unshift('Table')
        const result = [titles]
        for(let table in tablesObj){
            const nums = [table]
            for(let i=1;i<titles.length;i++){
                if(!tablesObj[table][titles[i]]){
                    nums.push("0")
                }else{
                    nums.push(tablesObj[table][titles[i]].toString())
                }
            }
            result.push(nums)
        }
        return result
    }
    const orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]
    console.log(displayTable(orders))
}


{
    // #1711.大餐计数
    const countPairs = deliciousness => {
        let result = 0
        const mod = 10**9 + 7
        let len = deliciousness.length
        const max = Math.max(...deliciousness) * 2
        if(len <= 1) return 0
        if(len === 2) return 1
        const map = new Map()
        for(let i =0; i<len;i++){
           const val = deliciousness[i]
           for(let j=1;j <= max;j <<= 1){
              const count = map.get(j - val) || 0
              result = (result + count) % mod
           }
           map.set(val,(map.get(val) || 0) + 1)
        }
        return result
    }
    const deliciousness = [2160,1936,3,29,27,5,2503,1593,2,0,16,0,3860,28908,6,2,15,49,6246,1946,23,105,7996,196,0,2,55,457,5,3,924,7268,16,48,4,0,12,116,2628,1468]
    console.log(countPairs(deliciousness))
}

{
    // #930.和相同的二元子数组
    // 暴力
    const numSubarraysWithSum = (nums,goal) => {
        const len = nums.length
        let result = 0
        nums.forEach((n,index) => {
            let j = index
            let sum = 0
            while(j<len){
               sum += nums[j]
               if(sum < goal){
                   j++
                   continue
               }
               if(sum === goal){
                   result += 1
                   j++
                   continue
               }
               if(sum > goal){
                   return
               }
            }
        })
        return result
    }
    const nums = [0,0,0,0,0], goal = 0
    console.log(numSubarraysWithSum(nums,goal))
}

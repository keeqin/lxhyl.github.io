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
        costs = costs.sort((a,b) => a - b)
        let result = 0;
        for(let i=0; i<costs.length; i++){
            if(coins >= costs[i]){
                result += 1
                coins -=costs[i]
            }else{
                break
            }
        }
        return result
    }
    const costs = [1,3,2,4,1], coins = 7
    console.log(maxIceCream(costs,coins))
}
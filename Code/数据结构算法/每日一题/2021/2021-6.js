{   // 4的幂次方
    const fun = n => {
        const sqrt = Math.sqrt(n)
        return (Number.isInteger(sqrt) && sqrt > 0) ? (sqrt & sqrt - 1) === 0 : false
    }
    console.log(fun(16))
}

{
    // #160
    const getNode = (headA, headB) => {
        const mapObj = new Set()
        let tempNode = headA
        while (tempNode) {
            mapObj.add(tempNode)
            tempNode = tempNode.next
        }
        tempNode = headB
        while (tempNode) {
            if (mapObj.has(tempNode)) {
                return tempNode
            }
            tempNode = tempNode.next
        }
        return null
    }
}


{
    // #518
    const change = (amount, coins) => {
        const dp = new Array(amount + 1).fill(0);
        dp[0] = 1;
        for (const coin of coins) {
            for (let i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
                console.log('dp[i]:', dp[i])
            }
        }
        return dp[amount];
    }

    const amount = 5
    const coins = [1, 2, 5]
    console.log(change(amount, coins))
}

{
    // #852 
    const peakIndexInMountainArray = arr => {
        let i = 0
        while (i < arr.length - 1 && arr[i] < arr[i + 1]) {
            i++
        }
        return i
    }
    const arr = [24, 69, 100, 99, 79, 78, 67, 36, 26, 19]
    console.log(peakIndexInMountainArray(arr))
}

{
    // #94
    const inorderTraversal = root => {
        const result = []
        const helper = node => {
            if (!node) return
            helper(node.left)
            result.push(node.val)
            helper(node.right)
        }
        helper(root)
        return result;
    }
}



{   
    // #98
    const isValidBST = root => {
       const valArr = []
       const dfs = node => {
           if(!node) return
           dfs(node.left)
           valArr.push(node.val)
           dfs(node.right)
       }
       dfs(root)
       let i=0,j=1;
       if(valArr.length <= 1) return true
       while(i<j && j<valArr.length){
           if(valArr[i] < valArr[j]){
               i++
               j++
           }else{
               return false
           }
       }
       return true
    }
    console.log(isValidBST(tree))
}
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
            if (!node) return
            dfs(node.left)
            valArr.push(node.val)
            dfs(node.right)
        }
        dfs(root)
        let i = 0, j = 1;
        if (valArr.length <= 1) return true
        while (i < j && j < valArr.length) {
            if (valArr[i] < valArr[j]) {
                i++
                j++
            } else {
                return false
            }
        }
        return true
    }
    console.log(isValidBST(tree))
}

{
    //#102
    const levelOrder = root => {
        const result = []
        const lsfHelper = nodesArr => {
            if (nodesArr.length === 0) return
            const tempLevelArr = []
            const tempNodeArr = []
            nodesArr.forEach(itemNode => {
                if (!itemNode) return
                tempLevelArr.push(itemNode.val)
                tempNodeArr.push(itemNode.left)
                tempNodeArr.push(itemNode.right)
            });
            if (tempLevelArr.length > 0) {
                result.push([...tempLevelArr])
            }
            lsfHelper(tempNodeArr)
        }
        lsfHelper([root])
        return result
    }
}

{
    // #103
    const levelOrder = root => {
        const result = []
        const lsfHelper = (nodesArr,level) => {
            if (nodesArr.length === 0) return
            const tempLevelArr = []
            const tempNodeArr = []
            nodesArr.forEach(itemNode => {
                if (!itemNode) return
                tempLevelArr.push(itemNode.val)
                tempNodeArr.push(itemNode.left)
                tempNodeArr.push(itemNode.right)
            });
            if (tempLevelArr.length > 0) {
                if(level % 2 === 0){
                    result.push([...tempLevelArr].reverse())
                }else{
                    result.push([...tempLevelArr])
                }
            }
            lsfHelper(tempNodeArr,level + 1)
        }
        lsfHelper([root],1)
        return result
    }
}


{
    // #104
    const maxDepth = root => {
        const dfs = node => {
            if(!node) return 0
            return Math.max(dfs(node.left),dfs(node.right)) + 1
        }
        return dfs(root)
    }
}


{
    // #107
    const orderTree = root => {
        const result = []
        const lsfHelper = nodesArr => {
            if (nodesArr.length === 0) return
            const tempLevelArr = []
            const tempNodeArr = []
            nodesArr.forEach(itemNode => {
                if (!itemNode) return
                tempLevelArr.push(itemNode.val)
                tempNodeArr.push(itemNode.left)
                tempNodeArr.push(itemNode.right)
            });
            if (tempLevelArr.length > 0) {
                result.unshift([...tempLevelArr])
            }
            lsfHelper(tempNodeArr)
        }
        lsfHelper([root])
        return result
    }
}

{
    //#1333
    const filterRestaurants = function(restaurants, veganFriendly, maxPrice, maxDistance) {
       const filtersArr = restaurants.filter(rest => {
           return rest[3] <= maxPrice && rest[4] <= maxDistance
       }).filter(rest => {
           if(veganFriendly === 1){
               return rest[2] === 1
           }
           return true
       })
       filtersArr.sort((a,b) => {
           if(a[1] < b[1]){
               return 1
           }else if(a[1] === b[1]){
               return b[0] - a[0]
           }else{
               return -1
           }
       })
       return filtersArr.map(item => item[0])
    };
    const restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], 
    veganFriendly = 1, 
    maxPrice = 50, 
    maxDistance = 10;
    console.log(filterRestaurants(restaurants, veganFriendly, maxPrice, maxDistance))
}

{
    // #1
    const twoSum = (nums,target) => {
        const gapMap = new Map(nums.map((num,index) => [num,index]))
        for(let i=0;i<nums.length;i++){
            if(gapMap.has(target - nums[i])){
                return [i,gapMap.get(target - nums[i])]
            }
        }
        return []
    }
    let nums = [2,7,11,15], target = 9
    console.log(twoSum(nums,target))
    
    const twoSum = (nums,target) => {
      const gapMap = new Map()
      for(let i=0;i<nums.length;i++){
          if(gapMap.has(target - nums[i])){
              return [i,gapMap.get(target - nums[i])]
          }
          gapMap.set(nums[i],i)
      }
      return []
    }
   
}
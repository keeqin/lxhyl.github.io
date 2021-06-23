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
        const lsfHelper = (nodesArr, level) => {
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
                if (level % 2 === 0) {
                    result.push([...tempLevelArr].reverse())
                } else {
                    result.push([...tempLevelArr])
                }
            }
            lsfHelper(tempNodeArr, level + 1)
        }
        lsfHelper([root], 1)
        return result
    }
}


{
    // #104
    const maxDepth = root => {
        const dfs = node => {
            if (!node) return 0
            return Math.max(dfs(node.left), dfs(node.right)) + 1
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
    const filterRestaurants = function (restaurants, veganFriendly, maxPrice, maxDistance) {
        const filtersArr = restaurants.filter(rest => {
            return rest[3] <= maxPrice && rest[4] <= maxDistance
        }).filter(rest => {
            if (veganFriendly === 1) {
                return rest[2] === 1
            }
            return true
        })
        filtersArr.sort((a, b) => {
            if (a[1] < b[1]) {
                return 1
            } else if (a[1] === b[1]) {
                return b[0] - a[0]
            } else {
                return -1
            }
        })
        return filtersArr.map(item => item[0])
    };
    const restaurants = [[1, 4, 1, 40, 10], [2, 8, 0, 50, 5], [3, 8, 1, 30, 4], [4, 10, 0, 10, 3], [5, 1, 1, 15, 1]],
        veganFriendly = 1,
        maxPrice = 50,
        maxDistance = 10;
    console.log(filterRestaurants(restaurants, veganFriendly, maxPrice, maxDistance))
}

{
    // #1
    const twoSum = (nums, target) => {
        for (let i = 0; i < nums.length; i++) {
            for (let j = 0; i < nums.length; j++) {
                if (i !== j && (nums[i] + nums[j] === target)) {
                    return [i, j]
                }
            }
        }
        return []
    }
    let nums = [2, 7, 11, 15], target = 9
    console.log(twoSum(nums, target))


    const twoSum = (nums, target) => {
        const gapMap = new Map(nums.map((num, index) => [num, index]))
        for (let i = 0; i < nums.length; i++) {
            if (gapMap.has(target - nums[i])) {
                return [i, gapMap.get(target - nums[i])]
            }
        }
        return []
    }

    const twoSum = (nums, target) => {
        const gapMap = new Map()
        for (let i = 0; i < nums.length; i++) {
            if (gapMap.has(target - nums[i])) {
                return [i, gapMap.get(target - nums[i])]
            }
            gapMap.set(nums[i], i)
        }
        return []
    }

}


{
    // #剑指offer 38.
    const permutation = s => {
        const result = []
        const sArr = s.split('')
        // 递归函数，strs为排列中的字符串，使用数组（栈会更好）存储，indexs为已经排列了的字符串的索引
        const helper = (strs, indexs) => {
            // 排列完成
            if (strs.length === sArr.length) {
                result.push([...strs])
                return
            }
            // 选择一个字符串进行组合
            for (let i = 0; i < sArr.length; i++) {
                // 判断此字符是否排列过了
                if(!indexs.includes(i)){
                    // 未排列，则将此字符进行排列
                    strs.push(sArr[i])
                    // 标记索引
                    indexs.push(i)
                    helper(strs,indexs)
                    // 运行至此，则说明已经找到一个满足条件的排列组合了
                    // 进行回溯，由于函数参数是按值传递的，且为引用类型，所以直接pop移除栈顶元素即可
                    indexs.pop()
                    strs.pop()
                }
            }
        }
        for(let i=0;i<sArr.length;i++){
            helper([sArr[i]],[i])
        }
        return Array.from(new Set(result.map(item => item.join(''))))
    }
    const str = 'aab'
    console.log(permutation(str))
}

{
    // #剑指Offer.15.二进制中1的个数
    const hammingWeight = n => {
        let result = 0;
        for(let i = 0; i < 32; i++){
            if( (n & (1 << i)) !== 0){
                result++
            }
        }
        return result
    }
}
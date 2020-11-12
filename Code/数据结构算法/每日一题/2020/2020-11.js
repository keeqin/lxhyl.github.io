{
    // #349
    const intersection = (nums1, nums2) => {
        return Array.from(new Set(nums2.filter(item => new Set(nums1).has(item))))
    }

    let nums1 = [1, 2, 2, 1], nums2 = [2, 2]
    console.log(intersection(nums1, nums2))

}

{
    // #941
    // 双指针法
    const validMountainArray = a => {
        let len = a.length;
        if (len < 3) {
            return false
        }
        let left = 0, right = len - 1;
        while (a[left + 1] > a[left]) {
            left++;
        }
        while (a[right - 1] > a[right]) {
            right--;
        }
        return left > 0 && right < len - 1 && left == right
    }

    const testArr = [3, 6, 5, 5]
    console.log(validMountainArray(testArr))
}


{
    // #1356
    const sortByBits = arr => arr.sort((a, b) => {
        let have1num = num => {
            return num.toString(2).replace(/[^1]/g, '').length
        }
        if (have1num(a) < have1num(b)) {
            return -1
        }
        if (have1num(a) == have1num(b)) {
            return a - b
        }
        return 1
    })
}


{
    // #884
    const solution = (A, B) => {
        const str2Arr = s => s.split(' ')

        const getWordsNum = (arr, map = {}) => {
            arr.forEach(item => {
                map[item] = map[item] || 0;
                map[item]++;
            });
            return map
        }

        let all = getWordsNum([...str2Arr(A), ...str2Arr(B)])
        let result = [];
        for (let i in all) {
            if (all[i] === 1) {
                result.push(i)
            }
        }
        return result
    }
    let A = "apple apple", B = "banana"
    console.log(solution(A, B))
}


{
    // #205
    const isIsomorphic = (s, t) => {
        for (let i = 0; i < s.length; i++) {
            if (s.indexOf(s[i]) != t.indexOf(t[i])) {
                return false
            }
        }
        return true
    }

    let s = "paper", t = "title"
    console.log(isIsomorphic(s, t))
}


{
    // #17
    const solution = digits => {
        if (!digits) return []
        const map = {
            2: 'abc',
            3: 'def',
            4: 'ghi',
            5: 'jkl',
            6: 'mno',
            7: 'pqrs',
            8: 'tuv',
            9: 'wxyz'
        }
        let result = [];
        const dfs = (index, strArr) => {
            if (index == digits.length) {
                result.push(strArr.join(''));
                return
            }
            let mapStr = map[digits[index]]
            for (let i = 0; i < mapStr.length; i++) {
                strArr.push(mapStr[i]);
                dfs(index + 1, strArr);
                strArr.pop()
            }
        }
        dfs(0, [])
        return result;
    }
    console.log(solution('23'))
    /*
    *  [
    *   'ad', 'ae', 'af',
    *   'bd', 'be', 'bf',
    *   'cd', 'ce', 'cf'
    *  ]
    */
}


{
    // #922
    const sortArrayByParity = A => {
        let i = 0, j = 1;
        for (i; i < A.length; i += 2) {
            while (A[i] % 2 != 0) {
                [A[i], A[j]] = [A[j], A[i]]
                j += 2
            }
        }
        return A
    }
    const arr = [4, 2, 5, 7];
    console.log(sortArrayByParity(arr))
}


{
    // #35
    const searchIndex = (nums, target) => {
        let i = 0;
        while (nums[i] < target) {
            i++;
        }
        return i;
    }
    const nums = [1, 3, 5, 6], target = 0;
    console.log(searchIndex(nums, target))
}


{
    // #589
    const preorder = root => {
        let result = []
        const dfs = (node) => {
            if (!node) return;
            result.push(node.val)
            if (node.children) {
                for (let i = 0; i < node.children.length; i++) {
                    dfs(node.children[i]);
                }
            }
        }
        dfs(root)
        return result;
    }

}



{
    // #289
    const gameOfLife = board => {
        let needChange = [];
        const isExist = (i, j) => {
            return board[i] && board[i][j] ? true : false;
        }
        const compute = (num) => ({
            map: function (i, j) {
                if (isExist(i, j) && board[i][j]) {
                    num++;
                }
                return compute(num)
            },
            of: () => num
        })
        const compose = (i, j) => {
            const helpArr = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ]
            let f = compute(0);
            while (helpArr.length > 0) {
                f = f.map(i + helpArr[0][0], j + helpArr[0][1]);
                helpArr.shift();
            }
            return f.of()
        }

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                let num = compose(i, j)
                if ((board[i][j] && (num < 2 || num > 3)) || (!board[i][j] && num === 3)) {
                    needChange.push([i, j])
                }
            }
        }
        let dieLiveMap = {
            0: 1,
            1: 0
        }
        needChange.forEach(item => {
            let val = board[item[0]][item[1]]
            board[item[0]][item[1]] = dieLiveMap[val]
        })
        return board;
    }
    const testArr = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ]
    console.log(gameOfLife(testArr));
}


{
    // #231
    const isPowerOfTwo = n => {
        return n > 0 && ((n & (n - 1)) === 0)
    }
    console.log(isPowerOfTwo(16))
}


{
    // #1013
    const canThreePartsEqualSum = A => {
        let sumA = A.reduce((sum, item) => sum + item, 0);
        if (sumA % 3 != 0) return;
        let sum = 0;
        let index = 0;
        for (let i = 0; i < A.length; i++) {
            sum += A[i]
            if (sum == sumA / 3) {
                sum = 0;
                index++;
            }
        }
        return index > 2

    }
    let testArr = [10, -10, 10, -10, 10, -10, 10, -10]
    console.log(canThreePartsEqualSum(testArr))
}


{
    // # 1295
    const findNumbers = nums => {
        let result = 0;
        nums.forEach(item => {
            if (item.toString().length % 2 == 0) {
                result++;
            }
        })
        return result
    }
    let nums = [12, 345, 2, 6, 7896]
    console.log(findNumbers(nums))
}


{
    // #551
    const checkRecord = s => {
        let i = 0;
        let Anum = 0;
        while (i < s.length) {
            if (s[i] == 'A') {
                Anum++;
            }
            if (Anum > 1) {
                return false
            }
            if (s[i] == 'L' && s[i + 1] && s[i + 1] == 'L' && s[i + 2] && s[i + 2] == 'L') {
                return false;
            }
            i++;
        }
        return true;
    }
    let str = "PPALLL";
    console.log(checkRecord(str))
}
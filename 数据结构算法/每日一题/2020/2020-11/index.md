# 2020-11-2 

>给定两个数组，编写一个函数来计算它们的交集

着急下班...明天看下leetcode上的方法
```js
const intersection = (nums1,nums2) => {
    return Array.from(new Set(nums2.filter(item => new Set(nums1).has(item))))
}
let nums1 = [1,2,2,1], nums2 = [2,2]
console.log(intersection(nums1,nums2))
```

# 2020-11-3
> 有效的山脉数组
```js
  // #941
    // 双指针法
    const validMountainArray = a => {
        let len = a.length;
        if(len < 3){
            return false
        }
        let left=0,right=len-1;
        while(a[left+1]>a[left]){
            left++;
        }
        while(a[right-1]>a[right]){
            right--;
        }
        return left>0 && right < len-1 && left == right
    }

    const testArr = [3,6,5,5]
    console.log(validMountainArray(testArr))
```

# 1356. 根据数字二进制下 1 的数目排序
```js
var sortByBits = function(arr) {
   return arr.sort((a,b) => {
       let have1num = num => {
        return num.toString(2).replace(/[^1]/g, '').length
       }
       if(have1num(a) < have1num(b)){
           return -1
       }
       if(have1num(a) == have1num(b)){
           return a-b
       }
       return 1
    })
}
```

# 884. 两句话中的不常见单词  

```js
const solution = (A, B) => {
        const str2Arr = s => s.split(' ')
        const getWordsNum = arr => {
            let map = {};
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
```

# 205. 同构字符串

?>  leetcode上看到的方法，太妙了！
```js
const isIsomorphic = (s,t) => {
    for(let i=0;i<s.length;i++){
        if(s.indexOf(s[i]) != t.indexOf(t[i])){
              return false
        }
    }
    return true
}
```

# 17. 电话号码的字母组合
```js
 const solution = digits => {
        if(!digits) return []
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
            if (index === digits.length) {
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
```

因为不知道输入数字的长度，所以dfs用来递归处理  
`dfs`函数的第一个参数为*当前处理的数字的索引*，第二个参数为*存放字母的数组*
递归很简单：先从第一个元素走起，然后遍历下一个元素`dfs(index + 1,strArr)`    
递归终止条件为：输入的数字已经遍历完了,即`index === digits.length`。  
待递归函数return后，就进入了下一步。    
回溯：`strArr.pop()`：移除最后一个元素，进入下一次for循环


# 922. 按奇偶排序数组 II

```js
  const sortArrayByParity = A => {
        let i = 0, j = 1;
        for (i; i < A.length; i += 2) {
             while(A[i] % 2 != 0){
                 [A[i],A[j]] = [A[j],A[i]]
                 j += 2
             }
        }
        return A
  }
```


# 35.  
```js
  const searchIndex = (nums,target) => {
        let i = 0;
        while(nums[i] < target){
            i++;
        }
        return i;
    }
    const nums = [1,3,5,6],target = 0;
    console.log(searchIndex(nums,target))
```


# 589  
```js
  // #589
    const preorder = root => {
        let result = []
        const dfs = (node) => {
            if(!node) return;
            result.push(node.val)
            if(node.children){
                for(let i =0;i<node.children.length;i++){
                    dfs(node.children[i]);
                }
            }
        }
        dfs(root)
        return result;
    }

```


# 289.  
```js
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
       
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                // let num = compute(0).map(i - 1, j - 1).map(i - 1, j).map(i - 1, j + 1).map(i, j - 1).map(i, j + 1).map(i + 1, j - 1).map(i + 1, j).map(i + 1, j + 1).of()
                let num = compose(i,j);
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
```



# 231  

```js
const isPowerOfTwo = n =>{
        return n > 0 && ((n & (n - 1)) === 0)
}
```
原理: 2的幂次方表示为二进制一定为 `1000000...`只有一个1，并且1在最前面
减1后就变为了 0111111...。   
然后执行按位与，就变为了00000000。  


# 1013
```js
  const canThreePartsEqualSum = A => {
      let sumA = A.reduce((sum,item) => sum + item ,0);
      if(sumA % 3 != 0) return;
      let sum = 0;
      let index = 0;
      for(let i =0;i<A.length;i++){
          sum += A[i]
          if(sum == sumA/3){
              sum = 0;
              index++;
          }
      }
      return index > 2
     
  }
  let testArr =[10,-10,10,-10,10,-10,10,-10]
  console.log(canThreePartsEqualSum(testArr))
```

注意Index可能为4

# 1295
```js
 const findNumbers = nums => {
        let result = 0;
        nums.forEach(item => {
            if(item.toString().length % 2 == 0){
                result++;
            }
        })
        return result
 }
```


# 1122   
!> 需要注意映射一定要使用Map,因为对象无法保证插入顺序
```js
  const relativeSortArray = (arr1, arr2) => {
        let map = new Map()
        arr2.forEach(item => {
            map.set(item, []);
        });
        let surplus = [];
        arr1.forEach((item, index) => {
            if (map.has(item)) {
                let value = map.get(item);
                value.push(index);
                map.set(item, value)
            } else {
                surplus.push(item)
            }
        })
        surplus.sort((a, b) => a - b)
        let result = [];
        map.forEach((value, key) => {
            value = value.map(item => arr1[item]);
            result = [...result, ...value];
        })
        return [...result, ...surplus];
  }
```


# 47  

额外维护一个索引数组，方便判断元素是否push过了.   
数组是引用类型，所以找到满足条件的数组后，需要浅克隆下，再push进result。不然result中的元素引用的其实都是一个数组（第一次调用递归函数传进去的数组）
```js
    const permuteUnique = nums => {
        let len = nums.length;
        if (len === 0) {
           return []
        };
        let result = [];
        // arr结果数组,indexs索引数组
        const dfs = (arr, indexs) => {
            if (arr.length == len) {
                let cloneArr = arr.map(item => item);
                result.push(cloneArr)
                return
            }
            for (let i = 0; i < len; i++) {
                if (indexs.indexOf(i) == -1) {
                    arr.push(nums[i]);
                    indexs.push(i)
                    dfs(arr,indexs)
                    arr.pop()
                    indexs.pop()
                }
            }
        }
        const unique = arr2 => {
           let res ={};
           arr2.forEach(item => {
               res[item] = item;
           })
           return Object.values(res);
        }
        dfs([], [])
        return unique(result);
    }
```


# 136
```js
// #136
const singleNum = nums => {
    return nums.reduce((l, n) => l ^ n)
}
```

# 402   

需要注意，字符串可能很长，所以去掉开头的0时不能用`Number`  

```js
// 402
 const removeKdigits = (num, k) => {
    let stack = [];
    for (let i = 0; i < num.length; i++) {
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > num[i]) {
            stack.pop()
            k--;
        }
        stack.push(num[i]);
    }
    for (; k > 0; --k) {
        stack.pop()
    }
    let result = ''
    let flag = true;
    for (const i of stack) {
        if (i == '0' && flag) {
            continue;
        }
        flag = false
        result = `${result}${i}`
    }
    return result === '' ? '0' : result
}
```


# 406 

利用Array.splice进行插入操作

```js
  const reconstructQueue = people => {
        people.sort((a,b) =>{
          if(a[0] > b[0] || (a[0] == b[0] && a[1] < b[1])){
              return -1;
          }
          return 1
        })
        let result = [];
        for(let i =0;i<people.length;i++){
            result.splice(people[i][1],0,people[i])
        }
        return result
  }
```

# 力扣计算器类型的题    

主要中缀转后缀表达式的细节,  还有字符串中连续数字的处理

```js
  // 面试题 16.26.计算器
    const calculate = s => {
        s = s.replace(/\s/g, '').split('');
        s = s.reduce((arr, str) => {
            if (arr.length === 0) {
                arr.push(str)
                return arr;
            }
            let left = arr.pop()
            if (left && !isNaN(left) && !isNaN(str)) {
                arr.push(`${left}${str}`)
            } else {
                arr.push(left, str)
            }
            return arr;
        }, [])
        let priority = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '(': 0,
            ')': 0,
        }
        // s1：辅助栈, s2: 结果栈
        let s1 = [], s2 = [];
        const strHandle = index => {
            let char = s[index];
            if (!isNaN(+char)) {
                s2.push(char)
                return
            }
            if (s1.length === 0 || s1[s1.length - 1] === '(') {
                s1.push(char)
                return
            }
            if (char === '(') {
                s1.push(char)
                return
            }
            if (char === ')') {
                let s1TopStr = s1.pop();
                while (s1TopStr && s1TopStr != '(') {
                    s2.push(s1TopStr);
                    s1TopStr = s1.pop();
                }
                return
            }
            // 处理运算符
            let topStr = s1[s1.length - 1];
            let flag = true
            while (flag) {
                if (topStr && priority[char] > priority[topStr]) {
                    s1.push(char)
                    flag = false
                }
                if (topStr && priority[char] <= priority[topStr]) {
                    s2.push(s1.pop())
                    topStr = s1[s1.length - 1];
                }
                if (s1.length === 0 || s1[s1.length - 1] === '(') {
                    s1.push(char)
                    flag = false
                }
            }
        }
        for (let i = 0; i < s.length; i++) {
            strHandle(i)
        }
        const suffix = s2.concat(s1.reverse())
        const compute = sfx => {
            let stack = [];
            for (let i in sfx) {
                let value = sfx[i]
                if (!isNaN(value)) {
                    stack.push(value)
                } else {
                    let x = +stack.pop(),
                        y = +stack.pop()
                    switch (true) {
                        case value === '+':
                            stack.push(y + x)
                            break
                        case value === '-':
                            stack.push(y - x)
                            break
                        case value === '*':
                            stack.push(y * x)
                            break
                        case value === '/':
                            stack.push(y / x)
                            break
                    }
                }
            }
            return stack.pop()
        }
        return compute(suffix)
    }
    let s = "1*2-3/4+5*6-7*8+9/10"
    console.log(calculate(s))
```


# 242
```js
 // #242
    const isAnagram = (s,t) => {
        return s.length == t.length && [...s].sort().join('') === [...t].sort().join('')
    }
```
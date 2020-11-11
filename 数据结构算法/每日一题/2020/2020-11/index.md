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
        let dfs = (index, strArr) => {
            if (index >= digits.length) {
                result.push(strArr.join(''));
                return
            }
            for (let i = 0; i < map[digits[index]].length; i++) {
                strArr.push(map[digits[index]][i]);
                dfs(index + 1, strArr);
                strArr.pop()
            }
        }
        dfs(0, [])
        return result;
    }
    console.log(solution('23'))
```
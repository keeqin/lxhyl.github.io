# 2两数相加
 给出两个 非空 的链表用来表示两个非负的整数。
其中，它们各自的位数是按照 逆序 的方式存储的，
并且它们的每个节点只能存储一位数字。
如果我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
您可以假设除了数字 0 之外，这两个数都不会以 0 开头。  
例:  
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)  
输出：7 -> 0 -> 8  
原因：342 + 465 = 807  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
const addTwoNumbers = (l1, l2) => {
     const listToArr = (l) => {
          let next = l.next;
          let arr = [l.val];
          while(next !== null){
              arr.push(next.val);
              next = next.next;
          }
          return arr;
     }
     let arr1 = listToArr(l1);
     let arr2 = listToArr(l2);
     let arr3 = [];
     let maxLen = arr1.length < arr2.length ? arr2.length : arr1.length;
     for(let i=0;i<maxLen;i++){
         arr3[i] = (arr1[i] || 0) + (arr2[i] || 0) + (arr3[i] || 0);
         if(arr3[i] >=10){
            arr3[i] = arr3[i] - 10;
            arr3[i+1] = 1;
         }
     }
    
     arr3 = arr3.reverse();
     let list = {
         val:arr3[0],
         next:null
     }
     for(let j = 1;j<arr3.length;j++){
         let next = {
             val:arr3[j],
             next:null
         }
         next.next = list;
         list = next;
     }
     return list;
};




// 优化版
const addTwoNumbers2 = (l1,l2) => {
    let arr = [];
    let i = 0;
    while(l1 || l2){
         // 初始化arr[i];
         arr[i] = arr[i] ? arr[i] : 0;
         let add = (l1 && l1.val) + (l2 && l2.val) + arr[i];
       
         if(add < 10){
           arr[i] = add;
         }else{
             // 进位
             arr[i] = add - 10;
             arr[i+1] = 1;
         }
        //  console.log(arr[i],arr[i+1],l1 && l1.val,l2 && l2.val);
         i++;
         l1 =l1 && l1.next;
         l2 =l2 && l2.next;
    }
    arr = arr.reverse();

    let list = {
        val:arr[0],
        next:null
    }
    for(let j = 1;j<arr.length;j++){
        let next = {
            val:arr[j],
            next:null
        }
        next.next = list;
        list = next;
    }
    return list;
}

let l1 = {
    val: 2,
    next: {
        val: 4,
        next:{
            val:3,
            next:null,
        }
    }
}
let l2 = {
    val: 5,
    next: {
        val: 6,
        next:{
            val:4,
            next:null,
        }
    }
}
console.log(addTwoNumbers2(l1,l2))
```



# 4寻找两个正序数组的中位数  
给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
请你找出这两个正序数组的中位数，
并且要求算法的时间复杂度为 O(log(m + n))。
你可以假设 nums1 和 nums2 不会同时为空。

示例 1:
nums1 = [1, 3]
nums2 = [2]
则中位数是 2.0

示例 2:
nums1 = [1, 2]
nums2 = [3, 4]
则中位数是 (2 + 3)/2 = 2.5

log(m+n) = log(m) * log(n);

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```js
const findMedianSortedArrays = (nums1, nums2) =>  {
   let arr = [...nums1,...nums2].sort((a,b)=>{
       return a - b;
   })
   if(arr.length % 2 ==0){
       return (arr[Math.floor(arr.length/2)] + arr[Math.floor(arr.length)/2 - 1])/2;
   }else{
       return arr[Math.floor(arr.length/2)];
   }
};
let nums1 = [1,2];
let nums2 = [3,4];

console.log(findMedianSortedArrays(nums1,nums2));
```


# 5最长回文字串
给定一个字符串 s，找到 s 中最长的回文子串。
你可以假设 s 的最大长度为 1000。

示例 1：  
输入: "babad"  
输出: "bab"  
注意: "aba" 也是一个有效答案。  
示例 2：  

输入: "cbbd"  
输出: "bb"  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
// 暴力求解  (超出时间限制)
const longestPalindrome = (str) => {
    if (str.length < 2) {
        return str;
    }
    //判断是否是回文
    const isPalindrome = (str) => {
        let i = 0;
        let j = str.length - 1;
        while (i <= j) {
            if (str[i] === str[j]) {
                i++;
                j--;
            } else {
                return false;
            }
        }
        if (i >= j) {
            return true;
        }
    }
    let longestTemp = '';
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
            let s = str.substring(i, j + 1);
            // console.log(s);
            if (isPalindrome(s) && s.length > longestTemp.length) {
                longestTemp = s;
            }
        }

    }
    return longestTemp.length > 0 ? longestTemp : str[0];
}


// 优化  动态规划
const longestPalindrome2 = (str) => {
    let len = str.length;
    if (len < 2) {
        return str;
    }

    //状态转移方程 = isPalindrome(i,j) = isPalindrome(i+1,j-1);
    const isPalindrome = (left, right) => {

        if (left >= right) {
            return true
        } else {
            if (str[left] == str[right]) {
                return isPalindrome(++left, --right);
            } else {
                return false
            }
        }
    }

    let max = { i: 0, j: 0 };
    for (let i = 0; i < len; i++) {
        // 从最长的开始 找到就直接跳出循环
        // 从长到短循环的，所以找到的就是最长的 
        let longest = max.j - max.i;
        let j = len - 1;
        // 当循环的长度大于 最大回文长度时，再进入循环

        if (longest < j - i) {
            while (j > i) {
                //一旦长度小于现在的回文长，就跳出循环
                if (longest > j - i) {
                    break;
                }
                if (isPalindrome(i, j)) {
                    if (j - i > longest) {
                        max.j = j;
                        max.i = i;
                    }
                    break;
                } else {
                    j--;
                }
            }
        }

    }

    return str.substring(max.i, max.j + 1);
}

```


# 7整数反转 
给出一个 32 位的有符号整数,
你需要将这个整数中每位上的数字进行反转。

示例 1:
输入: 123
输出: 321

示例 2:
输入: -123
输出: -321

示例 3:
输入: 120
输出: 21
注意:

假设我们的环境只能存储得下 32 位的有符号整数，
则其数值范围为 [−2^31,  2^31 − 1]。
请根据这个假设，如果反转后整数溢出那么就返回 0。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-integer
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js

const reverse = (x) => {
    let arr = x.toString().split('');
    let result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    if (result[result.length - 1] == '-') {
        result.unshift(result.splice(result.length - 1, 1)[0]);
    }
    result = Number(result.join(''));
    if (result < (-Math.pow(2, 31)) || result > (Math.pow(2, 31) - 1)) {
        return 0;
    } else {
        return result;
    }
}
const reverse2 = (x) => {
    // 个位 =  x%10;
    // 剩余 = (x - x%10)/10;
    let result = 0;
    while (x !== 0) {
        result = result * 10 + x % 10;
        x = (x - x % 10) / 10
    }
    if (result < (-Math.pow(2, 31)) || result > (Math.pow(2, 31) - 1)) {
        return 0;
    } else {
        return result;
    }

}
let n = -15342;

console.log(reverse2(n));
```


# 8字符串转换整数
请你来实现一个 atoi 函数，使其能将字符串转换成整数。
首先，该函数会根据需要丢弃无用的开头空格字符，
直到寻找到第一个非空格的字符为止。接下来的转化规则如下：

如果第一个非空字符为正或者负号时，
则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
假如第一个非空字符是数字，
则直接将其与之后连续的数字字符组合起来，形成一个整数。
该字符串在有效的整数部分之后也可能会存在多余的字符，
那么这些字符可以被忽略，它们对函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、
字符串为空或字符串仅包含空白字符时，
则你的函数不需要进行转换，即无法进行有效转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0 。
提示：

本题中的空白字符只包括空格字符 ' ' 。
假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
 

示例 1:
输入: "42"
输出: 42

示例 2:
输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。

示例 3:
输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。

示例 4:
输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。

示例 5:
输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
     因此返回 INT_MIN (−231) 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/string-to-integer-atoi
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```js
//原生js
const atoi = (str) => {
    str = str.trim();
    let num = parseInt(str);
    if (isNaN(num)) {
        return 0;
    }
    if (num < -Math.pow(2, 31)) {
        return -2147483648;
    }
    if (num > (Math.pow(2, 31) - 1)) {
        return 2147483647;
    }
    return num;
}



let str = "-a";
console.log(atoi2(str));
```


# 9回文数
判断一个整数是否是回文数。
回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:
输入: 121
输出: true


```js
// 变为字符串处理
const isPalindrome = (x) => {
   let str = x.toString();
   let i =0;
   let j = str.length -1;
   while(i < j){
       if(str[i] == str[j]){
           i++;
           j--;
           if(i >= j){
               return true;
           }
       }else{
           return false;
       }
   }
   return true;
}


// 优化  纯数字处理
const isPalindrome2 = (x) => {
    //负数必不可能是回文数，
    // 如果个位是0,那么只有0才满足回文数的条件
    if (x < 0 || (x % 10 == 0 && x != 0)) {
        return false;
    }
    // 将数字的后半段反转
    let halfNum = 0;
    while(x>halfNum){
        //js相除会有精度问题
        halfNum = parseInt(halfNum * 10 + x%10);
        x = parseInt(x/10);
    }
    return x == halfNum || x == parseInt(halfNum/10);
}
let x = 121;
console.log(isPalindrome2(x));

```


# 11盛最多水的容器
给你 n 个非负整数 a1，a2，...，an，
每个数代表坐标中的一个点 (i, ai) 。
在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```js
const maxArea = (height) => {
    let i = 0;
    let j = height.length-1;
    let water = 0;
    while(i  < j){
         let temp = Math.min(height[i],height[j]) * (j-i);
         if(temp > water){
             water = temp;
         }
         height[i] > height[j] ? j-- : i++;
    }
    return water;
}

let arr = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(arr));
```


# 15三数之和
/**
给你一个包含 n 个整数的数组 nums，
判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
请你找出所有满足条件且不重复的三元组。
注意：答案中不可以包含重复的三元组。

示例：
给定数组 nums = [-1, 0, 1, 2, -1, -4]，  
满足要求的三元组集合为：  
[  
  [-1, 0, 1],  
  [-1, -1, 2]  
]  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
**/
```js
//双指针法
const threeSum = (nums) => {
    let sortNums = nums.sort((a, b) => { return a - b });
    let result = [];
    for (let index = 0; index < sortNums.length-1; index++) {
        if((sortNums[index] === sortNums[index-1]) && index >= 1){
            continue;
        }
        let i = index+1;
        let j = sortNums.length - 1;
        while (i < j) {
            let sum = sortNums[i] + sortNums[index] + sortNums[j];
            if(sum < 0){
                i++;
            }
            if(sum > 0){
                j--;
            }
            if(sum == 0){
                result.push([sortNums[i],sortNums[index],sortNums[j]]);
                i++;
                j--;
                while(sortNums[i] == sortNums[i-1] ){
                    i++;
                }
                while(sortNums[j] == sortNums[j+1]){
                    j--;
                }
            }
        }
      
    }
    return result;
}
const sortNums =[0,0,0,0];
console.log(threeSum(sortNums));
```

#  16最接近的三数之和

给定一个包括 n 个整数的数组 nums 和 一个目标值 target。
找出 nums 中的三个整数，使得它们的和与 target 最接近。
返回这三个数的和。假定每组输入只存在唯一答案。

 
示例：  
输入：nums = [-1,2,1,-4], target = 1  
输出：2  
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum-closest
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




```js
const threeSumClosest = (nums, target) => {
    let sortNums = nums.sort((a, b) => a - b);
    let best = 99999999;
    for (let index = 0; index < sortNums.length; index++) {
        let i = index + 1;
        let j = sortNums.length - 1;
        while (i < j) {
            let sum = sortNums[index] + sortNums[i] + sortNums[j];
            if (sum === target) {
                return target;
            }
            //如果新差小于 原来的差 就更新
            if (Math.abs(best - target) > Math.abs(sum - target)) {
                best = sum;
            }
            if(sum > target){
                j--;
                while(sortNums[j] === sortNums[j+1]){
                    j--;
                }
            }else{
                i++;
                while(sortNums[i] === sortNums[i-1]){
                    i++;
                }
            }
        }
    }
    return best;
}

let nums = [-1, 2, 1, -4];
let target = 1;
console.log(threeSumClosest(nums, target));
```

# 20有效的括号
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，
判断字符串是否有效。

有效字符串需满足：  
左括号必须用相同类型的右括号闭合。  
左括号必须以正确的顺序闭合。  
注意空字符串可被认为是有效字符串。  

示例 1:  
输入: "()"  
输出: true  

示例 2:   
输入: "()[]{}"   
输出: true   

示例 3:  
输入: "(]"  
输出: false  

示例 4:  
输入: "([)]"  
输出: false  

示例 5:  
输入: "{[]}"  
输出: true  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```js
const isValid = (s) => {
    let len = s.length;
    if(s === ''){
        return true;
    }
    if(len === 1){
        return false;
    }
    // 建立括号到数字的映射
    const ys = {
        "(":-1,
        ")":1,
        "[":-2,
        "]":2,
        "{":-3,
        "}":3
    }
    //初始化栈
    let arr = [ys[s[0]]];
    for(let i =1;i<len;i++){
      // 如果新的 和栈顶的之和为1，说明匹配
     //  反之，则入栈  
      if(ys[s[i]] + arr[arr.length-1] === 0){
          arr.pop()
      }else{
          arr.push(ys[s[i]]);
      }
    }
    //如果栈中没有元素 说明匹配完了
    if(arr.length === 0){
        return true;
    }else{
        return false;
    }

}
let s1 = "{[]}"
console.log(isValid(s1));
```

# 21合并两个有序链表

将两个升序链表合并为一个新的 升序 链表并返回。
新链表是通过拼接给定的两个链表的所有节点组成的。 

示例：  
输入：1->2->4, 1->3->4  
输出：1->1->2->3->4->4  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-two-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```js
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}


// 递归直至其中一个为空
const mergeTwoLists = (l1, l2) => {
    if (l1 === null) {
        return l2
    }
    if (l2 === null) {
        return l1
    }
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
}

let l1 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 4,
            next: null
        }
    }
}
let l2 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 4,
            next: null
        }
    }
}
console.log(mergeTwoLists(l1, l2))
```


# 23合并k个有序链表


合并 k 个排序链表，返回合并后的排序链表。
请分析和描述算法的复杂度。

示例:  
输入:  
[  
  1->4->5,  
  1->3->4,  
  2->6  
]    
输出: 1->1->2->3->4->4->5->6  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-k-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
// 暴力求解
const mergeKLists = (lists) => {
    if (lists.length == 0) {
        return null;
    }
    let arr = [];
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] === null) {
            continue;
        } else {
            arr.push(lists[i].val)
            let tempList = lists[i].next;
            while (tempList) {
                arr.push(tempList.val);
                tempList = tempList.next;
            }
        }
    }
    if (arr.length === 0) {
        return null;
    }
    arr = arr.sort((a, b) => a - b)
    let result = {
        val: arr[arr.length - 1],
        next: null
    }
    for (let i = arr.length - 2; i >= 0; i--) {
        let temp = {
            val: arr[i],
            next: result
        }
        result = temp;
    }
    return result;
}



let lists = [

    {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 4,
                next: null
            }
        }
    },
    {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 4,
                next: null
            }
        }
    },
    {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 4,
                next: null
            }
        }
    },
]
let lists2 = [[], []]
console.log(mergeKLists(lists2))
```


# 26删除排序数组中的重复项

给定一个排序数组，你需要在 原地 删除重复出现的元素，
使得每个元素只出现一次，返回移除后数组的新长度。
不要使用额外的数组空间，
你必须在 原地 修改输入数组并在使用 O(1)额外空间的条件下完成。

 

示例 1:  
给定数组 nums = [1,1,2],   
函数应该返回新的长度 2,   
并且原数组 nums 的前两个元素被修改为 1, 2。   
你不需要考虑数组中超出新长度后面的元素。  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
const removeDuplicates = (nums) => {
     if(nums.length === 0 ){
         return 0
     }
     let i = 0
     for(let j = 1;j<nums.length;j++){
         if(nums[j] != nums[i]){
             i++
             nums[i] = nums[j]
         }
     }
     return i+1
}
let nums = [0,0,1,1,1,2,2,3,3,4]
console.log(removeDuplicates(nums))
```

# 33搜索旋转排序数组

假设按照升序排序的数组在预先未知的某个点上进行了旋转。
( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。
你的算法时间复杂度必须是 O(log n) 级别。

示例 1:  
输入: nums = [4,5,6,7,0,1,2], target = 0  
输出: 4  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
// 二分法
const search = (nums, target) => {
    let len = nums.length;
    if (len === 0) {
        return -1;
    }
    if (len === 1) {
        nums[0] === target ? 0 : -1;
    }
    let left = 0, right = len - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        }

        /**
        相比于普通排序数组二分查找
        旋转排序数组多了一层判断
        即选取的中点和 arr[0] 的比较
        **/

        if (nums[mid] >= nums[0]) {
            // 如果在 0-mid 之间
            if (target < nums[mid] && target >= nums[0]) {
                // 改变边界
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (target > nums[mid] && target <= nums[len - 1]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

const nums = [3, 1], target = 1;
console.log(search(nums, target));
```

# 43.字符串相乘  
给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。  

示例 1:  

输入: num1 = "2", num2 = "3"  
输出: "6"  
示例 2:  
说明：

num1 和 num2 的长度小于110。  
num1 和 num2 只包含数字 0-9。  
num1 和 num2 均不以零开头，除非是数字 0 本身。  
不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/multiply-strings
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
    const multiply = (num1, num2) => {
    if(num1 == 0 || num2 ==0){
        return '0';
    }
    // 先生成一个存储所有位数的数组
    let arr = [];
    for (let i = 0; i < (num1.length + num2.length - 1); i++) {
        arr.push([]);
    }
    // 找到每一位的数字相乘  放入数组中
    //  i+j的含义是，乘法的每一轮相乘都会错位
    //  所以此轮相乘，最低位就为 i
    for (let i = 0; i < num1.length; i++) {
        for (let j = 0; j < num2.length; j++) {
            let temp = num1[i] * num2[j];
            arr[i + j].push(temp);
        }
    }
    console.log('包含每位的值的数组：',arr);
    // 包含每位的值的数组： [ [ 4 ], [ 5, 8 ], [ 10, 12 ], [ 15, 16 ], [ 20 ] ]


    let result = '';
    let add = 0;
    // 由低位到高位 倒序遍历所有位，模拟加法
    for (let i = arr.length - 1; i >= 0; i--) {
        // 计算此位所有值的和，上次的进位 + 每轮相乘此位的数字之和
        let sum = add + arr[i].reduce((lastSum, num) => {
            return lastSum + num;
        }, 0);
        add = 0;
        // 进位处理
        if (sum >= 10) {
            add = Math.floor(sum / 10);
            let num = sum - add * 10;
            result = `${num}${result}`;
        } else {
            result = `${sum}${result}`;
        }
    }
    // 判断还有没有进位数
    if(add === 0 ){
        return result;
    } else{
        return `${add}${result}`
    }
}
console.log(multiply('1234', '45')) // 55530
```

# 45.全排列
给定一个 没有重复 数字的序列，返回其所有可能的全排列。

```js
示例:

输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/permutations
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
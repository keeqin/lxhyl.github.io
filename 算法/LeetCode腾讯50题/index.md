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
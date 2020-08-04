代码文件目录`Code/数据结构算法/每日一题/2020/2020-8/index.js`

# 415.字符串相加
> 2020-08-03
给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。

注意：

num1 和num2 的长度都小于 5100.   
num1 和num2 都只包含数字 0-9.   
num1 和num2 都不包含任何前导零。   
你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-strings
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


 ```js
    /**
     * 两个字符串相加
     *
     * @param {string} num1 
     * @param {string} num2
     * @returns {string} num1 + num2
     */
    const addStrings = (num1, num2) => {
       // 维护两个分别指向字符串最后一位的指针
       let i = num1.length - 1;
       let j = num2.length - 1;
       // 维护一个进位器    
       let add = 0;
       let result = [];
       // 当任意一个字符串没遍历完的时候，或者进位器有值的时候
       // 进入循环   
       while(i>=0 || j >= 0 || add > 0){
          // 初始化加数，被加数，如果不存在就让其为0，
          //  转为数字防止变为字符串拼接   
          let x = parseInt(num1[i] ? num1[i] : 0);
          let y = parseInt(num2[j] ? num2[j] : 0);
          let sum = x + y + add;
          // 求完和，让进位器归零
          add = 0;
          if(sum >= 10){
             add = 1;
             result.push(sum - 10);
          }else{
            result.push(sum);
          }
          i--;
          j--;
       }
       return result.reverse().join('');
    }
 ```



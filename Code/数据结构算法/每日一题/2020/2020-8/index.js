{
   // #415

   /**
    * 两个字符串相加
    *
    * @param {string} num1 
    * @param {string} num2
    * @returns {string} 
    */
   const addStrings = (num1, num2) => {
      // 维护两个分别指向字符串最后一位的指针
      let i = num1.length - 1;
      let j = num2.length - 1;
      // 维护一个进位器    
      let add = 0;
      let result = '';
      // 当任意一个字符串没遍历完的时候，或者进位器有值的时候
      // 进入循环   
      while (i >= 0 || j >= 0 || add > 0) {
         // 初始化加数，被加数，如果不存在就让其为0，
         //  转为数字防止变为字符串拼接   
         let x = parseInt(num1[i] ? num1[i] : 0);
         let y = parseInt(num2[j] ? num2[j] : 0);
         let sum = x + y + add;
         // 求完和，让进位器归零
         add = 0;
         // 拼接字符串
         if (sum >= 10) {
            add = 1;
            result = `${sum - 10}${result}`;
         } else {
            result = `${sum}${result}`;
         }
         i--;
         j--;
      }
      return result;
   }
   console.log(addStrings('123', '12'))
}


{
   // #337
   const rob = root => {
      // 深度优先遍历
      const dfs = node => {
         if (node === null) {
            // 0为选择子节点，1为不选择子节点
            return [0, 0];
         }
         // 两个子节点的值
         const l = dfs(node.left);
         const r = dfs(node.right);
         // 当选择了当前节点
         let choosed = node.val + l[1] + r[1];
         // 没选择当前节点
         let notChoosed = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
         // 返回两个值
         return [choosed, notChoosed];
      }
      const rootValue = dfs(root);
      // 返回最大值
      return Math.max(rootValue[0], rootValue[1]);
   }

}

{
   // #336
   const allPlalindrome = words => {
      // 判断是不是回文
      const isPlalindrome = (word1, word2) => {
         let str = `${word1}${word2}`;
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
         return true
      }
      let result = [];
      // 找出所有回文
      for (let i = 0; i < words.length; i++) {
         for (let j = 0; j < words.length; j++) {
            if (i != j && isPlalindrome(words[i], words[j])) {
               result.push([i, j]);
            }
         }
      }
      return result;
   }
   let words = ["abcd", "dcba", "lls", "s", "sssll"];
   console.log(allPlalindrome(words));
}

{
   // #100
   const isSameTree = (p, q) => {
      let temp = true;
      let valFirst = (p, q) => {
         if (p && q) {
            if (p.val === q.val) {
               valFirst(p.left, q.left);
               valFirst(p.right, q.right);
            } else {
               temp = false;
               return false;
            }
         } else {
            if (p !== q) {
               temp = false;
               return false;
            }
         }
      }
      valFirst(p, q);
      return temp;
   }
}

{
   // #93
   const restoreIpAddresses = s => {
      const isTrue = num => {
         if (num.length === 0) return false;
         if (num.length === 1) return true;
         if (num[0] == 0) return false;
         if (num <= 255) {
            return true;
         } else {
            return false
         }
      }
      let result = [];
      // 第一个点的位置
      for (let i = 1; i <= 3 && i < s.length; i++) {
         //第二个点的位置
         for (let j = i; j <= i + 3 && j < s.length; j++) {
            //第三个点的位置
            for (let k = j; k <= j + 3 && k < s.length; k++) {
               let num1 = s.substring(0, i);
               let num2 = s.substring(i, j);
               let num3 = s.substring(j, k);
               let num4 = s.substring(k);
               if (isTrue(num1) && isTrue(num2) && isTrue(num3) && isTrue(num4)) {
                  let ip = `${num1}.${num2}.${num3}.${num4}`;
                  result.push(ip);
               }
            }
         }
      }
      return result;
   }

   let str = "25525511135"
   console.log(restoreIpAddresses(str));
}

{
   // #696
   const countBinarySubstrings = s => {
      let strCount = [];
      let index = 0;
      let num = 1;
      while(index < s.length){
          if(s[index] === s[index+1]){
             index++;
             num++;
          }else{
             strCount.push(num);
             num = 1;
             index++;
          }
      }
      let result = 0;
      for(let i =0;i<strCount.length - 1;i++){
            result += Math.min(strCount[i],strCount[i+1]);
      }
      return result;
   }
   console.log(countBinarySubstrings('00110011'))
}
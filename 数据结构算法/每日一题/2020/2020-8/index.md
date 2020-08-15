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


 # 337.打家劫舍3
 > 2020-8-5   

 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。   
   
计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。   

示例 1:   
 
输入: [3,2,3,null,3,null,1]   
```js
     3   
    / \   
   2   3   
    \   \    
     3   1   
```
输出: 7    
解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.   

来源：力扣(LeetCode)
链接：https://leetcode-cn.com/problems/house-robber-iii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
 const rob = root => {
      // 深度优先遍历
      const dfs = node => {
         if(node === null){
            // 0为选择子节点，1为不选择子节点
            return [0,0];
         }
         // 两个子节点的值
         const l = dfs(node.left);
         const r = dfs(node.right);
         // 当选择了当前节点
         let choosed = node.val + l[1] + r[1];
         // 没选择当前节点
         let notChoosed = Math.max(l[0],l[1]) + Math.max(r[0],r[1]);
         // 返回两个值
         return [choosed,notChoosed];
      }
      const rootValue = dfs(root);
      // 返回最大值
      return Math.max(rootValue[0],rootValue[1]);
   }

```

# 336.回文对
> 2020-08-06 

给定一组 互不相同 的单词， 找出所有不同 的索引对(i, j)，使得列表中的两个单词， words[i] + words[j] ，可拼接成回文串。  

 

示例 1：  

输入：["abcd","dcba","lls","s","sssll"]  
输出：[[0,1],[1,0],[3,2],[2,4]]   
解释：可拼接成的回文串为 ["dcbaabcd","abcddcba","slls","llssssll"]   

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/palindrome-pairs
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
   // 暴力法
   const allPlalindrome = words => {
      // 判断是不是回文
      const isPlalindrome = (word1,word2) => {
         let str = `${word1}${word2}`;
         let i = 0;
         let j = str.length - 1;
         while(i<=j){
            if(str[i] === str[j]){
               i++;
               j--;
            }else{
               return false;
            }
         }
         return true
      }
      let result = [];
      // 找出所有回文
      for(let i =0;i<words.length;i++){
       for(let j =0;j<words.length;j++){
          if(i != j && isPlalindrome(words[i],words[j])){
                result.push([i,j]);
          }
       }
      }
      return result;
   }
   let words = ["abcd","dcba","lls","s","sssll"];
   allPlalindrome(words);  // [ [ 0, 1 ], [ 1, 0 ], [ 2, 4 ], [ 3, 2 ] ]
```

# 100.相同的树
> 2020-08-07   
给定两个二叉树，编写一个函数来检验它们是否相同。     
如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。  

```js
输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true

```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/same-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
   const isSameTree = (p,q) => {
      let temp = true;
      let valFirst = (p,q) => {
        // 节点都存在
        if(p && q){
           if(p.val === q.val){
              valFirst(p.left,q.left);
              valFirst(p.right,q.right);
           }else{
              temp = false;
              return temp;
           }
        }else{ // 至少有一个节点不存在
           if(p !== q){
              temp = false;
              return temp;
           }
        }
      }
      valFirst(p,q);
      return temp;
   }
```

# 93.复原IP地址
> 2020-08-09  

给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。   

有效的 IP 地址正好由四个整数（每个整数位于 0 到 255 之间组成），整数之间用 '.' 分隔。   

示例:   

输入: "25525511135"   
输出: ["255.255.11.135", "255.255.111.35"]   

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/restore-ip-addresses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
    const restoreIpAddresses = s => {
      // 判断单个num值是否合法
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
      // 遍历ipv4中三个点的位置，找出所有合法的ip地址
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
   // [ '255.255.11.135', '255.255.111.35' ]

```

# 696.计数二进制子串
给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。   

重复出现的子串要计算它们出现的次数。   

示例 1 :   

输入: "00110011"   
输出: 6   
解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。   

请注意，一些重复出现的子串要计算它们出现的次数。   

另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起。   

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/count-binary-substrings
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


```js
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
   console.log(countBinarySubstrings('00110011')) // 6
```


# 130.被围绕的区域

给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。

找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
```js
示例:

X X X X
X O O X
X X O X
X O X X

运行你的函数后，矩阵变为：

X X X X
X X X X
X X X X
X O X X
```
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/surrounded-regions
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
   const solve = board => {
      let notChange = [];
      let h = board.length;
      let w;
      if (h > 1) {
         w = board[0].length;
      } else {
         return board;
      }
      // 深度优先遍历所有连接的‘O’并标记
      const dfs = (y, x) => {
         if (y >= 0 && y < h && x >= 0 && x < w) {
            if (board[y][x] === 'O') {
               let str = JSON.stringify([y, x])
               // 判断这个点是否已经遍历过，避免死循环
               if (notChange.indexOf(str) <= -1) {
                  notChange.push(str);
                  dfs(y, x + 1);
                  dfs(y, x - 1);
                  dfs(y + 1, x);
                  dfs(y - 1, x);
               }
            }
         }
      }
      // 从边界开始查找
      for (let i = 0; i < w; i++) {
         if (board[0][i] === 'O') dfs(0, i);
         if (board[h - 1][i] === 'O') dfs(h - 1, i);
      }
      for (let i = 0; i < h; i++) {
         if (board[i][0] === 'O') dfs(i, 0);
         if (board[i][w - 1] === 'O') dfs(i, w - 1);
      }
      // 遍历二维数组，改变没有被标记的点
      for (let i = 0; i < h; i++) {
         for (let j = 0; j < w; j++) {
            if (board[i][j] === 'O' && notChange.indexOf(JSON.stringify([i, j])) <= -1) {
               board[i][j] = 'X';
            }
         }
      }
      return board;
   }
```



# 133.克隆图
给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。  
  
图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）。    
  
class Node {  
    public int val;
    public List<Node> neighbors;
}  
 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/clone-graph
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
   const cloneGraph = node => {
      if(!node){
         return node;
      }
      // 创建HASH映射来存储 已经克隆过的节点
      let map = new Map();
      // 深度优先遍历
      const dfs = n => {
         // 如果已经克隆过了 直接返回
         if(map.has(n)){
            return map.get(n);
         }
         // 克隆节点
         let cloneNode = new Node(n.val,[])
         // 键为老节点，值为新节点
         map.set(n,cloneNode);
         // 遍历邻居，克隆邻居
         for(let i=0;i< n.neighbors.length;i++){
           let newN = dfs(n.neighbors[i]);
           cloneNode.neighbors.push(newN);
         }
         // 返回克隆节点
         return cloneNode;
      }
      return dfs(node);
   }
```

# 43.字符串相乘
?> 2020-08-13

[这道题做过](/数据结构算法/LeetCode腾讯50题/index?id=_43字符串相乘)



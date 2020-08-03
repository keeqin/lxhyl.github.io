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
       while(i>=0 || j >= 0 || add > 0){
          // 初始化加数，被加数，如果不存在就让其为0，
          //  转为数字防止变为字符串拼接   
          let x = parseInt(num1[i] ? num1[i] : 0);
          let y = parseInt(num2[j] ? num2[j] : 0);
          let sum = x + y + add;
          // 求完和，让进位器归零
          add = 0;
          // 拼接字符串
          if(sum >= 10){
             add = 1;
             result = `${sum - 10}${result}`;
          }else{
            result = `${sum}${result}`;
          }
          i--;
          j--;
       }
       return result;
    }
    console.log(addStrings('123','12'))
}
{
// 5464. 换酒问题
const numWaterBottles = (numBottles, numExchange) => {
    let result = numBottles;
    if(numBottles < numExchange){
        return  result;
    }
    //初始化空瓶
    let kong = numBottles;
    while(kong >= numExchange){
         let canChange = Math.floor(kong / numExchange);
         let nowKong = kong -  canChange*numExchange;
         result += canChange;
         kong = canChange + nowKong;
    }
    return result;
}

console.log(numWaterBottles(2,3));
}

{
   const maxNumOfSubstrings = s => {
      let result = [];
      const findSameStr = index =>{
          let left = index;      
          while(index < s.length-1){
             if(s[index] === s[index+1]){
                 index++;
             }else{
                 return {left,index}
             }
          }
          return {left,index}
      }
      let i = 0;
      while(i<s.length){
           if(findSameStr(i).left === findSameStr(i).index){
              if(!result.includes(s[i])){
                result.push(s[i])
              }
              i++;
           }else{
              result.push(s.substring(i,findSameStr(i).index + 1));
              i += findSameStr(i).index + 1;
           }
        }
       return result;
    }
    console.log(maxNumOfSubstrings('aaabcbd'))
}

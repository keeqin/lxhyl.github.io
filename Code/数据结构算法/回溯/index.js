// #39 
function comSum(arr,target){
    const result = []
    arr.sort((a,b) => a-b)
    const dfsHelp = (nowTarget,nowArr,index) => {
       
        if(index > arr.length) return
        if(nowTarget === 0){
            result.push([...nowArr])
        }
 
        if(nowTarget >= arr[index]){
            dfsHelp(nowTarget - arr[index],[...nowArr,arr[index]],index)
        }else{
            console.log(nowTarget,nowArr,index)
            const lastItem = nowArr.pop()
            
            dfsHelp(nowTarget + (lastItem || 0),nowArr,index + 1)
        } 
    }
    dfsHelp(target,[],0)
    return result
}

console.log(comSum([2,3,6,7],7))


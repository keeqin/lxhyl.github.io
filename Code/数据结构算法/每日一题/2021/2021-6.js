{   // 4的幂次方
    const fun = n => {
        const sqrt = Math.sqrt(n)
        return (Number.isInteger(sqrt) && sqrt > 0) ? (sqrt & sqrt - 1) === 0 : false 
    }  
    console.log(fun(16))
}

{
  // #160
  const getNode = (headA,headB) => {
      const mapObj = new Set()
      let tempNode = headA
      while(tempNode){
          mapObj.add(tempNode)
          tempNode = tempNode.next
      }
      tempNode = headB
      while(tempNode){
          if(mapObj.has(tempNode)){
              return tempNode
          }
          tempNode = tempNode.next
      }
      return null
  }
}
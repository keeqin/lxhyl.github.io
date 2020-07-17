{
let arr = [];
console.log(arr[Symbol.unscopables]);
}




{
// Array.from()
console.log(Array.from.length === 1);

Array.from({length:3},(item) => item || 1)
//  [1, 1, 1]

arr= [1,1,2,3,4]
Array.from(new Set(arr));
// [1, 2, 3, 4]

function getArr(len,fillValue){
 return Array.from({length:len},() => fillValue); 
}
console.log(getArr(5,0));
// [ 0, 0, 0, 0, 0 ]
}






{
// Array.isArray()
Array.isArray();
// false
Array.myisArray = e => Object.prototype.toString.call(e) === '[object Array]'
console.log(Array.myisArray(''))
}


{
// Array.of()
console.log(Array.of([],1,true,{},Symbol()))
console.log(Array(3)) //[ <3 empty items> ]
console.log(Array.of(3)) // [ 3 ]
console.log([].of(3)) //报错
}



{
    //Array.prototype.concat()
    console.log([1,2,3].concat());
}



{
//Array.prototype.copyWithin()
let arr = [0,1,2,3,4];
arr.copyWithin(3);
}

{
    //Array.prototype.entries()
    let arr = [1,2,3];
    let arrEntries = arr.entries();
    for(let i of arr){
        console.log(i);
    }

}

{
[{name:'x'},{name:'y'},{name:'y'},{name:'z'}].find(item => item.name === 'y')
}


{
   console.log([1,2,[3,4]].flat(-1))
// [ 1, 2, [ 3, 4 ] ]
   let a = [1,[2,3,[4,5]]]
   const myFlat = (arr) => {
     const result = []
     const getItem = arr => {
          arr.forEach(item => {
             if(Array.isArray(item)){
                 getItem(item)
             }else{
                 result.push(item)
             }              
          })
     }
     getItem(arr)
     return result;
   }
   console.log(myFlat(a));
 
}

let arr = [];

console.log(arr[Symbol.unscopables]);


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
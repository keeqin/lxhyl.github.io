{
// #349
const intersection = (nums1,nums2) => {
    return Array.from(new Set(nums2.filter(item => new Set(nums1).has(item))))
}

let nums1 = [1,2,2,1], nums2 = [2,2]
console.log(intersection(nums1,nums2))

}

{
    // #941
    // 双指针法
    const validMountainArray = a => {
        let len = a.length;
        if(len < 3){
            return false
        }
        let left=0,right=len-1;
        while(a[left+1]>a[left]){
            left++;
        }
        while(a[right-1]>a[right]){
            right--;
        }
        return left>0 && right < len-1 && left == right
    }

    const testArr = [3,6,5,5]
    console.log(validMountainArray(testArr))
}


{
    // #1356
    const sortByBits = arr => arr.sort((a,b) => {
       let have1num = num => {
        return num.toString(2).replace(/[^1]/g, '').length
       }
       if(have1num(a) < have1num(b)){
           return -1
       }
       if(have1num(a) == have1num(b)){
           return a-b
       }
       return 1
    })
}

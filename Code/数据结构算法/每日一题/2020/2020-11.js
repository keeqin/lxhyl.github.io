{
// #349
const intersection = (nums1,nums2) => {
    return Array.from(new Set(nums2.filter(item => new Set(nums1).has(item))))
}

let nums1 = [1,2,2,1], nums2 = [2,2]
console.log(intersection(nums1,nums2))

}



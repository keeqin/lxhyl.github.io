{
    // 第几个灯泡是开的
    const lightBulb = () => {
        const stdAndBulbNum = 1000
        const bulbs = Array(stdAndBulbNum).fill(false)
        for (let sdt = 1; sdt <= stdAndBulbNum; sdt++) {
            let index = sdt;
            while (index <= stdAndBulbNum) {
                bulbs[index - 1] = !bulbs[index - 1]
                index += sdt
            }
        }
        bulbs.forEach((status, index) => {
            if (status) {
                console.log(`第${index + 1}个灯泡是打开的`)
            }
        })
    }
    lightBulb()
}


{
    //   #153.
    // 双指针  时间复杂度O(N)
    const findMin = nums => {
        const len = nums.length
        if (len === 0) return
        if (len === 1) return nums[0]
        let i = 0,
            j = 1
        while (j < len && nums[i] <= nums[j]) {
            j++;
            i++
        }
        if (j >= len) {
            return nums[0]
        }
        return nums[j]
    }
    console.log(findMin([11, 13, 15, 17]))
       
}
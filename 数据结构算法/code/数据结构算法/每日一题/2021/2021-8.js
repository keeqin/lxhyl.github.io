{
    // #1337.矩阵中战斗力最弱的k行
    const kWeakestRows = (mat, k) => {
        const arr = Array(mat.length - 1)
        for (let row = 0; row < mat.length; row++) {
            let col = 0
            let n = 0
            while (col < mat[row].length && mat[row][col] === 1) {
                n++
                col++
            }
            arr[row] = {row,n}
        }
        return arr.sort((a,b) => a.n - b.n).map(item => item.row).slice(0,k)
    }
    const mat =
        [[1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1]]
    const k = 3
    console.log(kWeakestRows(mat,k))
}
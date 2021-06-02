
const fun = n => {
    const sqrt = Math.sqrt(n)
    return (Number.isInteger(sqrt) && sqrt > 0) ? (sqrt & sqrt - 1) === 0 : false 
}
console.log(fun(16))


Object.prototype.lxhyl = function(e){
    return e;
}
console.log([1,2,3].lxhyl('Array调用'))
console.log(('string').lxhyl('String调用'))
console.log((/a/).lxhyl('正则调用'))
console.log(Math.lxhyl('Math调用'))
console.log([].lxhyl2());
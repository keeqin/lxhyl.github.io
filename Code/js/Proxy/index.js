{
    // set
    let sourceObj = {};
    let obj2 = new Proxy(sourceObj, {
        set: function (obj, prop, value) {
            if (prop === 'age') {
                if (value <= 150 && value >= 0) {
                    obj[prop] = value
                } else {
                    throw new RangeError('年龄不合法')
                }
            }
            obj[prop] = value;
        }
    })
    obj2.name = 'zzz';
    obj2.age = 22;
    console.log(obj2); // { name: 'zzz', age: 22 }
    obj2.age = 160; // RangeError: 年龄不合法 


    let data = {
        a: 1,
        b: {
            b1: 2,
            b2: {
                b21: 'aaa'
            }
        }
    }
    const proxyObj = sourceObj => {
        for (let i in sourceObj) {
            if (typeof sourceObj[i] === 'object') {
                sourceObj[i] = proxyObj(sourceObj[i]);
            }
        }
        let result = new Proxy(sourceObj, {
            set: (obj, prop, value) => {
                if (obj.hasOwnProperty(prop)) {
                    if (obj[prop] !== value) {
                        console.log(`[${prop}]的值变为了${value}`);
                    }
                } else {
                    console.log(`设置了新属性${prop},值为${value}`)
                }
                obj[prop] = value;
            }
        })
        return result;
    }
    let resultObj = proxyObj(data);
    resultObj.a = 22;
    resultObj.a = 22;
    resultObj.c = 33;
    resultObj.b.b1 = 'test';
    resultObj.b.b2.b21 = 'test';
    resultObj.b.b2.b22 = 'test222';
    resultObj.b.b2 = null;
    console.log(resultObj.b);
}
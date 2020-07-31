Object.prototype.lxhyl = function(e){
    return e;
}
console.log([1,2,3].lxhyl('Array调用'))
console.log(('string').lxhyl('String调用'))
console.log((/a/).lxhyl('正则调用'))
console.log(Math.lxhyl('Math调用'))

{
    // Object.prototype.constructor
    function NewConstructor (){

    }
    let arr1 = [111,11,4,6];
    arr1.constructor = NewConstructor;
    console.log(arr1.constructor); // [Function: NewConstructor]
    let str1 = 'test';
    str1.constructor = NewConstructor; 
    console.log(str1.constructor); // [Function: String]
}

{
    let obj1 = {
        a:1,
    };
    console.log(obj1.prototype);
    let fun1 = function (){

    }
    console.log(fun1.prototype);
    let fun2 = () => {

    }
    console.log(fun2.prototype);
}

{
    //Object.assign()
    let obj1 = {a:1};
    let obj2 = "str";
    let obj21 = "STR"
    let obj3 = true;
    let obj4 = Object.assign(obj1,obj2,obj21,obj3);
    console.log(obj4);
}


{
    // Object.create()
   let testObj = {
       a:1,
       b:2
   }
   let obj11 = Object.create(testObj);
   let obj22 = Object.create(null);
   console.log(obj11.toString,obj22.toString);




    let obj1 = Object.create(Object.prototype,{
        a:{ 
             value:"我是a属性",
             writable:true,
             configurable:true,
         },
         aa:{
            enumerable:true,
            value:"我是aa属性",
            writable:true,
            configurable:true,
         },
         b:{
            enumerable:true,
            configurable:false,
            get:function(){
                return "我是b属性的get"
            },
            set:function(value){
               console.log('设置值'+ value)
            }
         }
    })
    console.log(obj1); // { aa: '我是aa属性', b: [Getter/Setter] }
}

{
    //Object.defineProperties()
    let obj1 = {
        a:111
    };
    Object.defineProperties(obj1,{
        a:{
           writable:false,
           enumerable:true
        },
        b:{
            writable:true,
            value:1,
            enumerable:true,
        }
    })
    obj1.a = 222;
    console.log(obj1);

}

{
    //Object.defineProperty()
    let obj1 = {
    };
    Object.defineProperty(obj1,'a',{
        enumerable:true,
        get:function(){
          console.log("访问值")
          return 1
        },
        set:function(value){
            console.log("把修改值为"+value);
            return value
        }
    })
    obj1.a
    obj1['a'] = 2
}


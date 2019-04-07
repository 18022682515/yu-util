const o = { name:'宇' };

o.getFnNames = (()=>{
    return function fn(obj){ 
        if(!obj) return;
        //打印对象(本身和原型链上)所有函数的名字，包括不可枚举的
        Object.getOwnPropertyNames(obj).forEach((key,index)=>{
            let type = Object.prototype.toString.call(obj[key]);
            if(type!=='[object Function]') return;
            let str = obj[key].toString();
            let result = str.match(/\(.*\)/);
            console.log(key+result[0]);
        });
        fn(obj.__proto__); 
    }
})();

o.getType = function(v){
    let type = Object.prototype.toString.call(v);
    let arr = type.split(" ");
    let str = arr[1].slice(0,-1);
    return str;
}

module.exports = Object.freeze(o);
  function each(obj,callback) {
    for(let key in obj){
        callback(key, obj[key]);
    }
}

  function asyncEach(obj,callback,interval=0) {
    let arr = Object.keys(obj);
    let index = 0;
    (function fn(){
        callback(arr[index],obj[arr[index]]);
        index++;
        if(index>arr.length-1) return;
        setTimeout(fn,interval);
    })();
}

 function getType(v) {
    let str = Object.prototype.toString.call(v);
    return str.replace(/\[object\s(.+)\]/,'$1');
}

 function copy(obj) {
    console.log(getType);
    let type = getType(obj);
    let result = type==='Object' ? {} : (type==='Array' ? [] : null);
    if(!result){
        return obj;
    };
    fn(result,obj);

    function fn(result, obj){
        let type = getType(obj);
        if(type === 'Object') {
            Object.keys(obj).forEach(key=>{
                let keyType = getType(obj[key]);
                if( keyType==='Object' ){
                    result[key] = {};
                    fn(result[key], obj[key]);
                }else if(keyType==='Array'){
                    result[key] = [];
                    obj[key].forEach((val,i)=>{
                        let indexType = getType(val);
                        if(indexType==='Object'){
                            result[key][i] = {};
                            fn(result[key][i], val);
                        }else if(indexType==='Array'){
                            result[key][i] = [];
                            fn(result[key][i], val);
                        }else{
                            result[key][i] = val;
                        }
                    });
                }else{
                    result[key] = obj[key];
                }
            });
        }else if(type === 'Array') {
            obj.forEach((val,i)=>{
                let indexType = getType(val);
                if(indexType==='Object'){
                    result[i] = {};
                    fn(result[i],val);
                }else if(indexType==='Array'){
                    result[i] = [];
                    fn(result[i],val);
                }else{
                    result[i] = val;
                }
            });
        }
    };

    return result;
}

 function getFnNames(obj){
    let result = {};
    (function fn(obj){ 
        if(!obj) return;
        //打印对象(本身和原型链上)所有函数的名字，包括不可枚举的
        Object.getOwnPropertyNames(obj).forEach((key,index)=>{
            let type = Object.prototype.toString.call(obj[key]);
            if(type!=='[object Function]') return;
            let str = obj[key].toString();
            let argStr = str.match(/\(.*\)/);
            // console.log(key+result[0]);
            result[key] = argStr;
        });
        fn(obj.__proto__); 
    })(obj);
    return result;
}
module.exports = { each,asyncEach,getType,copy,getFnNames };
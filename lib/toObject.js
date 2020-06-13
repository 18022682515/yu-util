Object.prototype.each = function(callback) {
	let arr = Object.keys(this);
	arr.forEach(key=>{
		callback(this[key],key);
	})
}

Object.prototype.asyncEach = function(callback,ms) {
	ms = getType(ms)==='Number'? ms: 20;
	
	let arr = Object.keys(this);
	arr.asyncEach(key=>{
		callback(this[key],key);
	},ms)
}

function getType(v,type){
	let str = Object.prototype.toString.call(v);
	str = str.replace(/^\[\w+\s(\w+)\]$/,'$1');
	if(typeof type==='string'){
		return new RegExp(type,'i').test(str);
	}else{
		return str;
	}
}

 function copy(obj) {
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

module.exports = { getType,copy };

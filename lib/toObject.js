function each(obj,callback) {
	let arr = Object.keys(obj);
	arr.forEach(key=>{
		callback(obj[key],key);
	})
}

function asyncEach(obj,callback,ms) {
	ms = getType(ms)==='Number'? ms: 20;
	
	let arr = Object.keys(obj);
	arr.asyncEach(key=>{
		callback(obj[key],key);
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
	let result = getType(obj,'Object')? {}: (getType(obj,'Array')? []: null);
	if(!result) return obj;
	fn(result,obj);

	function fn(result, obj){
		if( getType(obj,'Object') ) {
			Object.keys(obj).forEach(key=>{
				if( getType(obj[key],'Object') ){
					result[key] = {};
					fn(result[key], obj[key]);
				}else if( getType(obj[key],'Array') ){
					result[key] = [];
					fn(result[key], obj[key]);
				}else{
					result[key] = obj[key];
				}
			});
		}else if( getType(obj,'Array') ) {
			obj.forEach((val,i)=>{
				if( getType(val,'Object') ){
					result[i] = {};
					fn(result[i],val);
				}else if( getType(val,'Array') ){
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

module.exports = { each,asyncEach,getType,copy };

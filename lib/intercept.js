const { getType } = require('./toObject.js');

function createMark(obj){
	Reflect.defineProperty(obj,'_mark',{
		value:{},
		writable:true,
		enumerable:false,   //不可枚举
		configurable:false,   //不可配置或删除该属性
	});
}

function intercept(obj,attrs,callback,bool){
	obj = getType(obj,'Object')? obj: {};
	let d = Reflect.getOwnPropertyDescriptor(obj,'_mark')
	!d && createMark(obj);
	
	if(!bool){  //不覆盖上次定义的回调函数
		if(getType(attrs,'Array') && !obj._mark.any){
			attrs = attrs.filter(val=>{
				return !Object.keys(obj._mark).includes(val);
			})
			attrs.forEach(key=>{
				obj._mark[key] = callback;
			})
		}else if(attrs==='*'){
			obj._mark.any = true;
			obj._mark.callback = obj._mark.callback || callback;
		}
		
	}else{	//覆盖上次定义的回调函数
		if(getType(attrs,'Array')){
			attrs.forEach(key=>{
				obj._mark[key] = callback;
			})
		}else if(attrs==='*'){
			Object.keys(obj._mark).forEach(key=>{
				if(key==='callback') return;
				obj._mark[key] = callback;
			})
			obj._mark.any = true;
			obj._mark.callback = callback;
		}
	}
	
	if(d) return obj;
	
	return new Proxy(obj,{
		set(target, key, value, receiver){
			if(value===Reflect.get(target, key, receiver)) return true;
			if(obj._mark[key] || obj._mark.callback){
				obj._mark[key] = obj._mark[key] || obj._mark.callback;
			}
			let fn = obj._mark[key] || function(){};
			value = fn(key,value);
			return Reflect.set(target, key, value, receiver);
		}
	})
}

module.exports = intercept
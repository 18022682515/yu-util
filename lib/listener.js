const { getType } = require('./toObject.js');

function createMark(obj){
	Reflect.defineProperty(obj,'_event',{
		value:{ all:[] },
		writable:true,
		enumerable:false,   //不可枚举
		configurable:false,   //不可配置或删除该属性
	});
}

function every(obj,key,value){
	obj._event.all.forEach(fn=>{
		fn(key,value);
	})
	obj._event[key] && obj._event[key].forEach(fn=>{
		fn(key,value);
	})
}

function listener(obj,attrs,callback){
	obj = getType(obj,'Object')? obj: {};
	let d = Reflect.getOwnPropertyDescriptor(obj,'_event');
	!d && createMark(obj);
	
	if(attrs==='*'){
		obj._event.all.push(callback)
	}else if(getType(attrs,'Array')){
		attrs.forEach(key=>{
			obj._event[key] = getType(obj._event[key],'Array')? obj._event[key]: [];
			obj._event[key].push(callback);
		})
	}
	
	if(d) return obj;
	
	return new Proxy(obj,{
		set(target, key, value, receiver){
			if(value===Reflect.get(target, key, receiver)) return true;
			every(obj,key,value);
			return Reflect.set(target, key, value, receiver);
		}
	})
}

module.exports = listener
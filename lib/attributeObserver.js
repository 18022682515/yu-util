
function getType(v){
	let str = Object.prototype.toString.call(v);
	return str.replace(/^\[\w+\s(\w+)\]$/,'$1');
}

function createMark(obj){
	Object.defineProperty(obj,'_mark',{
		value:{},
		writable:true,
		enumerable:false,   //不可枚举
		configurable:false,   //不可配置或删除该属性
	});
}

let count = 0;
function attributeObserver(obj,attrs,callback,bool){
	obj = /Object/.test(getType(obj)) ? obj : {};
	
	let d = Object.getOwnPropertyDescriptor(obj,'_mark')
	!d && createMark(obj);
	let o = obj._mark;
	
	attrs.forEach((val,i)=>{
		if(!bool){
			if( getType(o[val])!=='Undefined' ) return;
		}
		o[val] = /Undefined/.test(getType(obj[val])) ? '' : obj[val];
		Object.defineProperty(obj,val,{
			set(v){
				if(o[val]===v) return;
				if(/Function/.test(getType(callback))){
					o[val] = callback(val,v) ||v
				}else{
					o[val] = v
				}
			},
			get(){
				return o[val];
			}
		})
	})
	return obj;
}

export default attributeObserver
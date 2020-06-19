const { getType,copy } = require('./toObject.js')

function merge(o1,o2,bool){
	if(!getType(o1,'Object') || !getType(o2,'Object')) return
	o1 = copy(o1);
	
	(function fn(o1,o2){
		let keys1 = Object.keys(o1);
		let keys2 = Object.keys(o2);
		let overlap = keys1.filter(key=>keys2.includes(key));
		
		keys2.forEach(key=>{		//添加不同属性
			if(overlap.includes(key)) return;
			if( /Object|Array/.test(getType(o2[key])) ){
				o1[key] = copy(o2[key])
			}else{
				o1[key] = o2[key];
			}
		})
		overlap.forEach(key=>{	//合并相同属性
			if(getType(o1[key],'Object') && getType(o2[key],'Object')){
				fn(o1[key],o2[key]);
			}else if(getType(o1[key],'Array') && getType(o2[key],'Array')){
				o1[key] = Array.from(new Set(o1[key].concat(o2[key])))
			}else if(bool){
				if( /Object|Array/.test(getType(o2[key])) ){
					o1[key] = copy(o2[key])
				}else{
					o1[key] = o2[key];
				}
			}
		})
	})(o1,o2)
	
	return o1;
}

export default merge
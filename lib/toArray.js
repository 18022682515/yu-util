const { copy,getType } = require('./toObject.js');

Array.prototype.each = function(...args){
	Array.prototype.forEach.call(copy(this),...args)
}

Array.prototype.asyncEach = function(callback,ms){
	ms = getType(ms)==='Number'? ms: 20;
	let arr = copy(this);
	let i = 0;
	
	(function fn(){
		/Function/.test(getType(callback)) && callback(arr[i],i,arr);
		i++;
		if(i<arr.length) setTimeout(fn,ms);
	})()
}
exports.toModules = function (names,str='') {
	let moduls = {};
	Object.keys(require.cache).forEach(key=>{
        let obj = require.cache[key];
        if(obj.exports){
            var modul = obj.exports.default? obj.exports.default: obj.exports;
        }
		if(modul && modul.name){
			let id = names.find(id=>{
				return id+str===modul.name;
            });
            
			id && (moduls[id] = modul);
		}
    });
	return moduls;
}

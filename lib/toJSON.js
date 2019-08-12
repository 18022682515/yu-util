exports.toJSON = function(str){
    try {
        return JSON.parse(str);
    } catch (error) {
        return str;
    }
}
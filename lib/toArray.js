Array.prototype.asyncForEach = function(callback, interval=0) {
    let index = 0;
    let _this = this;
    (function fn(){
        callback(_this[index],index);
        index++;
        if(index>_this.length-1) return;
        setTimeout(fn,interval);
    })();
}
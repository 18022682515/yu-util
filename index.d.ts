
declare function listener(obj:Object,attrs:string|string[],callback:Function): Object;
declare function intercept(obj:Object,attrs:string|string[],callback:Function,bool:Boolean): Object;
declare function merge(o1:Object, o2:Object, bool:Boolean): Object;
declare function copy(obj:any[]|Object): any[]|Object;
declare function getType(v:any): string;
declare function each(obj:Object,callback:Function): void;
declare function asyncEach(obj:Object,callback:Function,ms:Number): void;
declare function toJSON(str:string): string|Object;

export { listener, intercept, merge, copy, getType, each, asyncEach, toJSON };
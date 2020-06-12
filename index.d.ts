declare class Array{
    asyncForEach(callback:(val:any,index:number)=>void, interval?:number):void;
}

declare function copy(obj:any[]|Object): any[]|Object;
declare function getFnNames(obj:Object): Object;
declare function getType(v:any): string;
declare function each(obj:Object,callback:(key:string, val:any)=>void): void;
declare function asyncEach(obj:Object,callback:(key:string, val:any, interval?:number)=>void): void;
declare function toJSON(str:string): string|Object;
declare function attributeObserver(obj:Object,attrs:string[],callback:Function,bool:Boolean): Object;

export { copy, getFnNames, getType, each, asyncEach, toJSON,attributeObserver };
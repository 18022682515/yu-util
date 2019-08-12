declare class Array{
    asyncForEach(callback:(val:any,index:number)=>void, interval?:number):void;
}

declare function each(obj:Object,callback:(key:string, val:any)=>void): void;
declare function asyncEach(obj:Object,callback:(key:string, val:any, interval?:number)=>void): void;
declare function getType(v:any): string;
declare function copy(obj:any[]|Object): any[]|Object;
declare function toJSON(str:string): string|Object;
declare function getFnNames(obj:Object): Object;
declare function getModules(names:string[], str:string): Object;

export { each, asyncEach, getType, copy, toJSON, getFnNames, getModules };
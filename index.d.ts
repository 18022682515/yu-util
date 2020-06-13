
declare function attributeObserver(obj:Object,attrs:string[],callback:Function,bool:Boolean): Object;
declare function copy(obj:any[]|Object): any[]|Object;
declare function getType(v:any): string;
declare function toJSON(str:string): string|Object;

export { attributeObserver,copy, getType, toJSON };
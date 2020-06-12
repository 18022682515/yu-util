# yu-util
  *前后端通用的函数封装：用于web前端和node.js*
# 安装
```javascript
npm install yu-util --save
```


# 引入
```javascript
const { copy, getFnNames, getType, each, asyncEach, toJSON } = require('yu-util');
```  


### `attributeObserver(obj,attrs,callback,bool)`：对象属性监听
```javascript
//attributeObserver(对象{},指定对象的多个属性名[],给对象指定属性赋值时触发的函数,布尔值)

let obj = attributeObserver({},['id','name'],(key,val)=>{
	return val+1;
});
obj.id = 2;   //给obj的id或name赋值时，会触发(key,val)=>{ return val+1 }函数
console.log(obj.id);  //3


//第四个参数：bool
obj = attributeObserver(obj,['id'],(key,val)=>{
	return val+10;
},true);
//true则会覆盖上次给id赋值时触发的回调函数,false则只生效第一次的回调函数

obj.id = 2;
console.log(obj.id)  //12
```


### `copy(obj)`：深度复制对象或数组
```javascript
//深度复制对象：
let obj1 = {n:'a',arr:[1,2,{n:'b'}] };
let obj2 = copy(obj1);
console.log(obj1===obj2); //false
console.log(obj1.arr===obj2.arr); //false
console.log(obj1.arr[2]===obj2.arr[2]); //false

//深度复制数组：
let arr1 = [2,{n:'b'},3,[1,4,5,{n:'a',arr:[1,2,3]}]];
let arr2 = copy(arr1);
```

### `getFnNames(obj)`：返回对象和其原型链上的所有函数名，包括不可枚举的
```javascript
let obj = { fn:function(args){} };

let arr = getFnNames(obj);
```  

### `getType(variate)`：获取变量的类型
```javascript
getType([]);  //Array
getType({});  //Object
getType(new Date());  //Date
getType('');  //String
getType(11);  //Number
getType(null);  //Null
getType(undefined);  //Undefined
function fn(){};  getType(fn);  //Function
function fn(){ return getType(arguments); }  fn();  //Arguments
```

### `each(obj,callback)`：遍历对象，为对象的每一对key|value都执行一次callback函数
```javascript
let obj = {a:2,b:8};
each(obj, (key,val)=>{
    console.log(key+'-'+val);   //a-2  b-8
});
```

### `asyncEach(obj,callback,interval)`：异步遍历对象，为对象的每一对key|value都异步执行一次callback函数
```javascript
let obj = {a:2,b:8};
asyncEach(obj, (key,val)=>{
    console.log(key,val);
}, 2000);           //每2000毫秒异步执行一次回调函数
```

### 扩展数组原型对象的函数:`Array.prototype.asyncForEach(callback, interval)`：异步遍历数组，为数组的每一个元素都异步执行一次callback函数
```javascript
let arr = [1,2,3,4,5,6];
arr.asyncForEach((val,index)=>{
    console.log(val,index);
}, 2000);       //每隔2000毫秒异步执行一次回调函数
```

### `toJSON(str)`：将对象字符串转为js对象,如果转换失败则返回原字符串
```javascript
let obj = toJSON('{"name":"xiaoming"}'); //{ name:'xiaoming' }
```
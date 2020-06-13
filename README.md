# yu-util
  *前后端通用的函数封装：用于web前端和node.js*
# 安装
```javascript
npm install yu-util --save
```


# 引入
```javascript
const { attributeObserver, copy, getType, toJSON } = require('yu-util');
//或
import { attributeObserver, copy, getType, toJSON } from 'yu-util' 
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

### `getType(variate,type)`：获取变量的类型
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

//直接返回判断结果
getType([],'Array');  //true
getType({},'Object');  //true
getType(new Date(),'Date');  //true
getType('','String');  //true
getType(11,'Number');  //true
getType(null,'Null');  //true
getType(undefined,'Undefined');  //true
getType(()=>{},'Function');  //true
```

### 遍历对象：`Object.prototype.each(callback)`：
```javascript
let obj = {a:2,b:8};
obj.each((key,val)=>{
    console.log(key+'-'+val);   //a-2  b-8
});
```

### 异步遍历对象：`Object.prototype.asyncEach(callback,ms)`：
```javascript
let obj = {a:2,b:8};
obj.asyncEach((key,val)=>{
    console.log(key,val);
}, 2000);           //每2000毫秒异步执行一次回调函数
```

### 遍历数组：`Array.prototype.each(callback)`
```javascript
let arr = ['a','b','c'];

//each函数是深度复制本数组，用这个复制品做循环遍历
arr.each((val,i,array)=>{
	arr.shift();  //删除数组的元素，不会影响遍历
	console.log(array);   //array是arr的深度复制品
})
```

### 异步遍历数组：`Array.prototype.asyncEach(callback, ms)`：
```javascript
let arr = [1,2,3,4,5,6];

//asyncEach函数是深度复制本数组，用这个复制品做循环遍历
arr.asyncEach((val,i,array)=>{
    arr.shift();  //删除数组的元素，不会影响遍历
		console.log(array);   //array是arr的深度复制品
}, 2000);       //每隔2000毫秒异步执行一次回调函数
```

### `toJSON(str)`：将对象字符串转为js对象,如果转换失败则返回原字符串
```javascript
let obj = toJSON('{"name":"xiaoming"}'); //{ name:'xiaoming' }
```
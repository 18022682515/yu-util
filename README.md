# yu-util
  *前后端通用的函数封装：用于web前端和nodejs端*
# 安装
```javascript
npm install yu-util --save
```


# 引入
```javascript
const { throttle, listener, intercept, merge, copy, getType, toJSON } = require('yu-util');
//或
import { throttle, listener, intercept, merge, copy, getType, toJSON } from 'yu-util' 
```  

### `throttle(callback,ms)`防抖节流函数，给高频率事件触发设置的节流阀：
```javascript
//执行throttle会返回一个闭包函数
let fn = throttle(function () {
	console.log(1)
}, 1000)

//执行fn要间隔1000毫秒
//第一次执行fn：
fn();				//打印1
//第二次执行fn：因为和第一次执行的时间没有间隔1000毫秒，所以第二次无效。
fn();				//没有打印

//1、执行fn就是执行throttle的callback
//2、给fn传参数就是给throttle的callback传参数
//3、throttle的callback里的this指向fn的调用者
//比如：
let fn = throttle(function (obj) {
	console.log(obj)		//打印结果：{ id:1 }
}, 1000)

fn({ id:1 });
```



### `listener(obj,attrs,callback)`：对象属性监听
```javascript
//listener(对象, 需要监听的对象属性, 监听函数)
obj = listener({},['id'],(key,val)=>{
	console.log(1);
});

o = listener(obj,['id','name'],(key,val)=>{
	console.log(2);
});
o.id = 11; //触发两个监听函数，分别打印1，2
o.name = 'xiao'; //触发一个监听函数，打印2

//监听所有属性
obj = listener({},'*',(key,val)=>{
	console.log(1);
});
obj.age = 22;		//触发监听函数，打印1
```


### `intercept(obj,attrs,callback,bool)`：对象属性拦截
```javascript
//intercept(对象, 需要拦截的对象属性, 拦截函数, 是否覆盖之前的拦截函数)
obj = intercept({},['id','name'],(key,val)=>{
	//拦截函数
	return val+1;
});
obj.id = 2;   //给obj的id或name赋值时，触发拦截函数
console.log(obj.id);  //3

//拦截所有属性
obj = intercept({},'*',(key,val)=>{
	return val+1;
});
obj.age = 11;
console.log(obj.age);  //12


//第四个参数：bool 是否覆盖之前的拦截函数
o = intercept(obj,['id'],(key,val)=>{
	return val+10;
},true);
//true则会覆盖之前给id设置的拦截函数,false则不能覆盖

o.id = 2;
console.log(o.id)  //12
```


### `merge(o1,o2,bool)`：两个对象合并
```javascript
let o1 = { id:1,a:{name:'a1',arr:[1,2]},age:22 }
let o2 = { id:2,a:{name:'a2',arr:[2,3],n:11} }
let o = merge(o1,o2);
console.log(o);		//{ id:1,a:{name:'a1',arr:[1,2,3],n:11},age:22 }

//覆盖式合并
let o = merge(o1,o2,true);
console.log(o);		//{ id:2,a:{name:'a2',arr:[1,2,3],n:11},age:22 }
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

### 遍历对象：`each(obj,callback)`：
```javascript
let obj = {a:2,b:8};
each(obj,(key,val)=>{
    console.log(key+'-'+val);   //a-2  b-8
});
```

### 异步遍历对象：`asyncEach(obj,callback,ms)`：
```javascript
let obj = {a:2,b:8};
asyncEach(obj,(key,val)=>{
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
# yu-util
  *前后端通用的函数封装：用于web前端和node.js*
# 安装
```javascript
npm install yu-util --save
```


# 引入
```javascript
const { each, asyncEach, getType, copy, getFnNames, getModules } = require('yu-util');
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

### `getFnNames(obj)`：打印对象和其原型链上的所有函数名，包括不可枚举的
```javascript
let obj = { fn:function(args){} };

getFnNames(obj);
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

### `getModules(names, str)`：传入参数names数组，找到各个与之匹配的模块对象.name，并返回模块对象。require.cache中缓存了import引入的模块对象**
```javascript
//比如：有两个vue组件文件：
//app1.vue  
export default { name:'app1' };
//app2.vue  
export default { name:'app2' };
//index.js
import 'app1.vue';
import 'app2.vue';
const components = getModules(['app1', 'app2']);
//components === { app1:app1对象, app2:app2对象 }

//比如：两个vueRouter文件：
//app1Router.js
const router = new vueRouter({});
router.name = 'app1Router';
export default router;
//app2Router.js
const router = new vueRouter({});
router.name = 'app2Router';
export default router;
//index.js
import 'app1Router.js';
import 'app2Router.js';
const routers = getModules(['app1', 'app2'],'Router');
//routers === { app1:app1Router对象, app2:app2Router对象 }

//比如：两个vuex文件：
//app1Store.js
const store = new Vuex.Store({});
store.name = 'app1Store';
export default store;
//app2Store.js
const store = new Vuex.Store({});
store.name = 'app2Store';
export default store;
//index.js
import 'app1Store.js';
import 'app2Store.js';
const Stores = getModules(['app1', 'app2'],'Store'); 
//Stores === { app1:app1Store对象, app2:app2Store对象 }
```
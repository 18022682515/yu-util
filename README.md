# yu-util
  *前后端通用的函数封装：用于web前端和node.js*
# 安装
```javascript
npm install yu-util --save
```


# 引入
```javascript
const { getFnNames, getType } = require('yu-util');
```  

**`getFnNames(obj)`函数：打印对象和其原型链上的所有函数名，包括不可枚举的**
```javascript
let obj = { fn:function(args){} };

getFnNames(obj);
```  

**`getType(variate)`函数：获取变量的类型**
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


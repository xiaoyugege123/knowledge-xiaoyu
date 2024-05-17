# 数据代理 Proxy

## 简单的数据双向绑定
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
        <h1>Proxy实现的双向数据绑定</h1>
        <input type="text"  id="input">
        <p id="show"></p>
    </div>
    <script>
        let obj={}
        const input=document.getElementById('input')
        const show=document.getElementById('show')
        // 设置代理
        let newObj=new Proxy(obj,{
            get(target,key){
                return Reflect.get(target,key)
            },
            set(target,key,value){
                if(key==='text'){
                    input.value=value
                    show.innerHTML=value//这不实现了双向绑定
                }
                return Reflect.set(target,key,value)
            }
        })

        input.addEventListener('keyup',function(e){//'input'
            newObj.text=e.target.value
        })
    </script>
</body>
</html>
```

## Object.defineProperty
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Object.defineProperty方法</title>
</head>
<body>
    <script>
        let number=18
        let person={
            name:'张三',
            sex:'男',
            age:number
        }
/*
value和 get 是同一个作用，只能同时用一个。writable和set是同一个作用，用一个。
所以，set和get 一个阵营 ，而value和writable一个阵营，不能两个阵营同时存在
*/
        Object.defineProperty(person,'age',{
            //基本配置项
            // value:18,
            enumerable:true,//控制属性是否可以枚举，默认值为false
            // writable:true,//控制属性是否可以被修改，默认值为false
            configurable:true,//控制属性是否可以被删除，默认为false

            //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
            get:function(){
                console.log('有人读取了age属性');
                return number
            },
            //当有人修改person的age属性时，set函数(setter)就会被调用，且返回的值是更改后的值
            set(value){
                console.log('有人修改了age属性，且值是'+value);
                number=value
            }
        })
        console.log(person);
        console.log(Object.keys(person));
        console.log(String.fromCharCode(97));//OHohohohoho
    </script>
</body>
</html>
```
## Proxy
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        let obj={
            a:1
        }
        let newTarget=new Proxy(obj,{
            set(target,key,value,receiver){
                console.log('set',target,key,value,receiver);
            },
            get(target,key,receiver){
                console.log('get',target,key,receiver);
            }
        })

        newTarget.a
        newTarget.a=10
    </script>
</body>
</html>
```

## Proxy 和 Reflect
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Proxy和Reflect
    <script>
        let arr=[1,2,3,4]
        console.log(arr[-1]);//undefined?为什么？

        // 回到原来的问题
        function createArray(arr){
            let handle={
                get(target,index,receiver){
                    index=Number(index)
                    if(index<0){
                        index+=target.length
                    }
                    return Reflect.get(target,index,receiver)
                }
            }
            return new Proxy(arr,handle)
        }

        arr=createArray(arr)
        console.log(arr[-1]);
console.log("-------------------------");
        var star={
            name:'zhoujielun',
            age:18,
            phone:'13287950909'
        }
        //代理陷阱
        var proxy=new Proxy(star,{
            get:function(target,key,receiver){
                console.log(target,key,receiver);//代理对象、代理key值、Proxy代理对象
                if(key==='phone'){
                    return "经纪人电话:133333333333"
                }else{
                    // return target[key]
                    return Reflect.get(target,key,receiver)//一样
                }
            }
        })

 
        // proxy.name
        console.log(proxy.name);
        console.log(proxy.age);
        console.log(proxy.phone);//原来这里也很重要
    </script>
</body>
</html>
```
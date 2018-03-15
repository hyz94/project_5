const jwt = require('jsonwebtoken');
const db = require('../db');
const apiResult = require('../utils/apiResult')
const filter = require('../utils/filter.js')

module.exports = {
    register(app){
        //get方法获取商品信息
        app.get('/products', (req, res) => {
            db.mongodb.select('products').then((result) => {
                let qty = result.length;
                res.send({qty: qty,data: result})
            })
        });
        //post方法获取商品信息
        app.post('/products', filter,(req, res) => {
            let dbName;
            if(req.body.db){
                dbName = req.body.db;
            } else {
                dbName = 'products'
            }
            db.mongodb.select(dbName).then((result) => {
                if(req.body.page){
                    let parmas = req.body;
                    let page = parmas.page;
                    let limit = parmas.limit;
                    let qty = result.length;
                    //1: 1-10;2: 11-20 
                    //1: (page) - page*limit 
                    result = result.slice(((page-1)*limit),(page*limit));
                    res.send({qty: qty,data: result})
                } else {
                    let qty = result.length;
                    res.send({qty: qty,data: result})
                }
                
            })
        });
        //查询数据库的某个商品信息
        app.get('/insert1',(req,res) => {
            console.log('req',req.query)
            if(req.query.price){
                req.query.price = req.query.price*1;
            }
            db.mongodb.select('products',req.query).then((result) => {
                    let qty = result.length;
                    res.send({qty: qty,data: result})
            })
        });
        //查询数据库的某个商品信息
        app.post('/insert1',(req,res) => {
            console.log(req.body)
            let parmas1 = req.body.parmas1;
            let parmas2 = req.body.parmas2;
            if(parmas1 == "price"){
                parmas2 = parmas2*1;
            }
            let obj = {};
            obj[parmas1] = parmas2;
            console.log(obj)
            let parmas = req.body;
            let dbName;
            if(req.body.parmas0){
                dbName = req.body.parmas0;
            }else {
                dbName = 'products';
            }
            db.mongodb.select(dbName,obj).then((result) => {
                if(req.body.page){
                    let page = req.body.page;
                    let limit = req.body.limit;
                    let qty = result.length;
                    //1: 1-10;2: 11-20 
                    //1: (page) - page*limit 
                    result = result.slice(((page-1)*limit),(page*limit));
                    res.send({qty: qty,data: result})

                } else {
                    let qty = result.length;
                    res.send({qty: qty,data: result})
                }
            })
        });
        //添加商品
        app.post('/axiosAdd',(req,res) => {
            let parmas1 = req.body.parmas1;
            let parmas2 = req.body.parmas2;
            let parmas3 = req.body.parmas3;
            let parmas4 = req.body.parmas4;
            let parmas5 = req.body.parmas5;
            let parmas6 = req.body.parmas6;
            let parmas7 = req.body.parmas7;
            let parmas8 = req.body.parmas8;
            let parmas9 = req.body.parmas9;
            let dbName;
            if(req.body.parmas0){
                dbName = req.body.parmas0;
            } else {
                dbName = 'products';
            };
            if(dbName == 'products'){
                db.mongodb.insert(dbName,{id: parmas1,name: parmas2,price: parmas3,imgurl: parmas4,color: parmas5,size: parmas6,qty: parmas7,mainType: parmas8,smallType: parmas9}).then((result) => {
                    res.send(result);
                })
            }else if(dbName == 'vueUsers'){
                db.mongodb.insert(dbName,{username:req.body.parmas1,password:req.body.parmas2}).then((result) => {
                    res.send(result);
                })
            }
            
        });
        //删除商品
        app.post('/axiosDel',(req,res) => {
            if(req.body.db == 'products'){
                console.log(req.body.id);
                let obj = {};
                obj.id = req.body.id;
                console.log(obj);
                let dbName;
                if(req.body.db){
                    dbName = req.body.db;
                }else{
                    dbName = 'products';
                }
                db.mongodb.delete(dbName,obj).then((result) => {
                    res.send(result);
                })
            } else if(req.body.db == 'vueUsers'){
                //还没完成
                console.log('iii',req.body)
                let obj = {};
                obj.username = req.body.username;
                console.log(obj);
                let dbName;
                if(req.body.db){
                    dbName = req.body.db;
                }else{
                    dbName = 'products';
                }
                db.mongodb.delete(dbName,obj).then((result) => {
                    res.send(result);
                })
            }
            
        });
        //删除购物车的信息
        app.post('/axiosDelCar',(req,res) => {
            console.log('car',req.body);
            let str = '';
            //str=010+013+
            str = req.body.id;
            str = str.slice(0,-1);
            let array = str.split('+');
            console.log(array)

            let dbName;
            if(req.body.db){
                dbName = req.body.db;
            }else{
                dbName = 'products';
            }
            for(let i=0;i<array.length;i++){
                db.mongodb.delete(dbName,{id:array[i]}).then((result) => {
                    res.send(result);
                })
            };
        });
        //修改商品信息axiosUpdata
        app.post('/axiosUpdata',(req,res) => {
            console.log(req.body);
            let obj = {};
            obj.id = req.body.id;
            console.log(obj)
            //转化为数组               
            let array = [];
            let arrayName = [];
            for(var attr in req.body){
                array.push(req.body[attr])
                arrayName.push(attr);
            }
            console.log(array);
            console.log(arrayName);
            let objParmas = {};
            for(var i=2;i<array.length;i++){
                objParmas[arrayName[i]] = array[i];
            }
            console.log(objParmas);
            let dbName;
            if(req.body.db){
                dbName = req.body.db;
            }else {
                dbName = 'products';
            }
            db.mongodb.update(dbName,obj,objParmas).then((result) => {
                res.send(result);
            })
        });
        //将购物车数据写入数据库
        app.post('/carGoods',(req,res) => {
            db.mongodb.insert('carGoods',req.body).then((result) => {
                res.send(result);
            })
        });
        //读取购物车的数据
        app.get('/getCarGoods',(req,res) => {
            db.mongodb.select('carGoods').then((result) => {
                let qty = result.length;
                res.send({qty: qty,data: result})
            })
        });
        
        
    }
}
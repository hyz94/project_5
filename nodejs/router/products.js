const jwt = require('jsonwebtoken');
const db = require('../db');
const apiResult = require('../utils/apiResult')

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
        app.post('/products', (req, res) => {
            db.mongodb.select('products').then((result) => {
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
            db.mongodb.select('products',obj).then((result) => {
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
            db.mongodb.insert('products',{id: parmas1,name: parmas2,price: parmas3,imgurl: parmas4,color: parmas5,size: parmas6,qty: parmas7,mainType: parmas8,smallType: parmas9}).then((result) => {
                res.send(result);
            })
        });
        //删除商品
        app.post('/axiosDel',(req,res) => {
            console.log(req.body.id);
            let obj = {};
            obj.id = req.body.id;
            console.log(obj);
            db.mongodb.delete('products',obj).then((result) => {
                res.send(result);
            })
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
            for(var i=1;i<array.length;i++){
                objParmas[arrayName[i]] = array[i];
            }
            console.log(objParmas);
            db.mongodb.update('products',obj,objParmas).then((result) => {
                res.send(result);
            })
        })
    }
}
const jwt = require('jsonwebtoken');
const db = require('../db');
const apiResult = require('../utils/apiResult')

module.exports = {
    register(app){
        //前端注册
        app.post('/vueReg', (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            db.mongodb.select('vueUsers',req.body).then((result) => {
                if(result[0]){
                    res.send({status: false});
                } else {
                    db.mongodb.insert('vueUsers',{username,password}).then((result) => {
                        res.send(result);
                    })
                }
            })
            
        })
        //前端登录
        app.post('/vueLogin', (req, res) => {
            console.log(req.body)
            let username = req.body.username;
            let password = req.body.password;
            db.mongodb.select('vueUsers',{username,password}).then((result) => {
                let token = '';
                var user = {username}
                if(result.length > 0){
                    token = jwt.sign(user, 'secret', {
                        'expiresIn': 1440 // 设置过期时间
                    })
                }
                res.send(apiResult(result && result.length > 0, token));
            })
        }),
        //获取用户信息
        app.get('/getVueUsers', (req, res) => {
            db.mongodb.select('vueUsers').then((result) => {
                let qty = result.length;
                res.send({qty: qty,data: result})
            })
        });
    }
}
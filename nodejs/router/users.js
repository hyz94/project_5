const jwt = require('jsonwebtoken');
const db = require('../db');
const apiResult = require('../utils/apiResult')

module.exports = {
    register(app){
        app.post('/login', (req, res) => {
            console.log(req.body)
            let username = req.body.username;
            let password = req.body.password;
            db.mongodb.select('user',{username,password}).then((result) => {
                let token = '';
                var user = {username}
                if(result.length > 0){
                    token = jwt.sign(user, 'secret', {
                        'expiresIn': 1440 // 设置过期时间
                    })
                }
                res.send(apiResult(result && result.length > 0, token));
            })
        })
    }
}
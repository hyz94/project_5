const apiResult = require('./apiResult')
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    
    let token = req.headers['authorization'];console.log(token)
    if(token){
        jwt.verify(token, 'secret', (error, result) => {
            if(error){
                res.send(apiResult(false, null, null, 'unauthorized'))
            } else {
                next()
            }
        })
    } else {
        res.send(apiResult(false, null, null, 'unauthorized'))
    }
    // if(req.session.username){
    //     next();
    // } else {
    //     res.send(apiResult(false, null, null, 'unauthorized'))
    // }
}
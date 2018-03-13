import axios from 'axios';

const baseUrl = 'http://localhost:666';

function filterUrl(_url){
    if(_url.startsWith('http')){
        return _url;
    }else{
        return baseUrl + _url;
    }
}

export default {

    get(_url,_params){
        return new Promise((resolve,reject) => {
             axios({
                    url:filterUrl(_url),
                    method:'get',
                    data:_params || {},
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization:window.localStorage.getItem('sxtoken')
                    },
                    transformRequest:[function (data) {
                        let ret ='';
                        for( let it in data){
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                }).then((res)=>{
                    resolve(res)
                }).catch((error)=>{
                    reject(error);
                })


        })
    },
    post(_url,_params){
        return new Promise((resolve,reject) => {
        //     axios.post(filterUrl(_url),_params || {}).then((res)=>{
        //         resolve(res)
        //     }).catch((error)=>{
        //         reject(error);
        //     })
                axios({
                    url:filterUrl(_url),
                    method:'post',
                    data:_params || {},
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization:window.localStorage.getItem('sxtoken')
                    },
                    transformRequest:[function (data) {
                        let ret ='';
                        for( let it in data){
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                }).then((res)=>{
                    resolve(res)
                }).catch((error)=>{
                    reject(error);
                })
        })
          
    }
}
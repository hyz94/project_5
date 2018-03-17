<template>
    <div class="login">
        <header class="l_head">
            <router-link to="/index" id="b">&lt;</router-link>
            <p>登录</p>
        </header>
        <main class="l_main">
            <div class="container">
                <div class="btn">
                    <input type="button" value="普通登录"/>
                    <input type="button" value="快速登录"/>
                </div>
                <div class="user">
                    <input type="text" name="username" v-model="username" placeholder="请输入用户名/手机号"/>
                </div>
                <div class="mima">
                    <input type="password" name="pwd" v-model="pwd" placeholder="请输入密码"/>
                    
                </div>
                <div class="denglu">
                    <input type="button" id="btn_log" value="登     录" @click="login"/>
                </div>
                <div class="links">
                    <router-link to="/zhuce"><a href="#">免费注册></a></router-link>
                    <a href="#">手机账号取回密码></a>
                </div>
                <div class="else">
                    <p>使用其他账号登录</p>
                    <img src="./links.jpg" />
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import '../../common/common.css'
    import './log.css'
    import http from '../../common/httpclient.js'
    import router from '../../router/router.js'

    export default {
        data(){
            return {
                username: '',
                pwd: ''
            }
        },
        methods: {
            login(){
                http.post('http://10.3.136.9:8080/vueLogin', {username: this.username,password: this.pwd}).then((res) => {
                    console.log(res.data)
                    if(res.data.status){
                        // window.localStorage.setItem('token', res.data.data);
                        router.push({path:'mine'});
                        sessionStorage.setItem("username",this.username);
                    }else{
                        alert('用户名或者密码记错了，自己心里没点逼数嘛！');
                    }
                })
            }
        }
    }

</script>


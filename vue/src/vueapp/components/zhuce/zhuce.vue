<template>
    <div class="zhuce">
        <header class="z_head">
            <router-link to="/login" id="b">&lt;</router-link>
            <p>注册</p>
        </header>
        <main class="z_main">
            <div class="container">
                <div class="yanzheng">
                    <input type="text" name="code" id="code" v-model="code" placeholder="请输入验证码" @change="code_exp"  ref="codef"/>
                    <div class="yanzhengma" v-text="txt"></div>
                </div>
                <div class="phone">
                    <input type="text" name="phone" id="phone" v-model="phone" placeholder="请输入手机号" @change="phone_exp"  ref="phonef"/>
                    <div class="huoqu">获取验证码</div>
                </div>
                <div class="user">
                    <input type="text" name="username" id="username" v-model="username" placeholder="请输入用户名（3~16位，只能字母）" ref="username"/>
                </div>
                <div class="pwd">
                    <input type="password" name="pwd" id="pwd" v-model="pwd" placeholder="密码6~16位字母，数字，下划线"/>
                </div>
                <div class="agree">
                    <p>注册账号即表示同意遵守<a href="#">《VANCL服务条款》</a></p>
                </div>
                <div class="btn">
                    <button id="btn_reg" @click="reg">点击注册</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import '../../common/common.css'
    import './zhuce.css'
    import http from '../../common/httpclient.js'
    import router from '../../router/router.js'


    export default {
        data(){
            return {
                txt: null,
                code: '',
                phone: '',
                username: '',
                pwd: ''
            }
        },
        methods: {
            reg:function(){
                // console.log(this.username)
                var user_regExp = /^[a-z]{3,16}$/;
                var pwd_regExp = /^[\w]{6,16}$/;
                console.log(user_regExp.test(this.username),pwd_regExp.test(this.pwd))

                if(user_regExp.test(this.username) && pwd_regExp.test(this.pwd)){
                    http.post("http://10.3.136.9:8080/vueReg",{username:this.username, password:this.pwd}).then((res)=>{
                        console.log(res);
                        this.dataset = res.data.data;
                        router.push({path:'login'});
                    })
                }else {
                    alert('亲，用户名或者密码格式错误,请参照提示好嘛！');
                    this.username='';
                    this.pwd='';
                    this.$refs.username.focus();
                    return false;
                }
            },
            code_exp:function(){
                console.log(this.code);
                if(this.code!=this.txt){
                    alert('验证码错误');
                    this.code=null;
                    this.$refs.codef.focus();
                }
            },
            phone_exp:function(){
                console.log(this.phone);
                var tel_regExp = /^[1][3,4,5,7,8][\d]{9}$/;
                if(!tel_regExp.test(this.phone)){
                    alert('手机号格式错误');
                    this.phone=null;
                    this.$refs.phonef.focus();
                }
            }
        },
        mounted(){
            //随机验证码
            var res = '';
            for(var i=0;i<4;i++){
                res += parseInt(Math.random()*10);
            }
            this.txt=res;
        }
    }

</script>



<template>
	<div class="login-box">
		<div>
			<h3>登录</h3>
			<form role="form">
			    <div>
			        <label>用户名：</label>
			        <input type="text" v-model="username" class="username" name="username" placeholder="请输入用户名">
			    </div>
			    <div>
			        <label>密码：</label>
			        <input type="password" v-model="pwd" class="password" name="password" placeholder="请输入密码">
			    </div>
			    <div>
			    	<input type="button" value="登录" class="login" @click="login">
			    </div>
			</form>
		</div>
		<div class="copyright">2018 © the fifth group by www.fifth_group.com</div>
	</div>
</template>

<script>
    import './login.scss'
    import http from '../../utils/httpclient.js'
    import router from '../../router/router.js'

    export default {
        data(){
            return {
                username: '',
                pwd: '',
            }
        },
        methods: {
            login(){
                http.post('login', {username: this.username, password: this.pwd}).then((res) => {
                    console.log(res)
                    if(res.data.status){
                        window.localStorage.setItem('dktoken', res.data.data);
                        router.push({name: 'home'});
                    }
                })
            }
        }
        
    }    
</script>
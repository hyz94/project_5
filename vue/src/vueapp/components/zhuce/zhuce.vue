<template>
    <div class="zhuce">
        <header class="z_head">
            <b>&lt;</b>
            <p>注册</p>
        </header>
        <main class="z_main">
            <div class="container">
                <div class="yanzheng">
                    <input type="text" placeholder="请输入验证码"/>
                    <div class="yanzhengma">2343</div>
                </div>
                <div class="phone">
                    <input type="text" placeholder="请输入手机号"/>
                    <div class="huoqu">获取验证码</div>
                </div>
                <div class="user">
                    <input type="text" placeholder="请输入用户名"/>
                </div>
                <div class="pwd">
                    <input type="password" placeholder="密码6~16位字母，数字，特殊字符"/>
                </div>
                <div class="agree">
                    <p>注册账号即表示同意遵守<a href="#">《VANCL服务条款》</a></p>
                </div>
                <div class="btn">
                    <button id="btn_reg">点击注册</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import '../../common/common.css'
    import './zhuce.css'

    export default {}

</script>


<template>
    <div class="login">
        <header class="l_head">
            <b>&lt;</b>
            <p>登录</p>
        </header>
        <main class="l_main">
            <div class="container">
                <div class="btn">
                    <input type="button" value="普通登录"/>
                    <input type="button" value="快速登录"/>
                </div>
                <div class="user">
                    <input type="text" name="user" id="user" placeholder="请输入用户名/手机号"/>
                </div>
                <div class="mima">
                    <input type="password" name="pwd" id="pwd" placeholder="请输入密码"/>
                    
                </div>
                <div class="denglu">
                    <input type="button" id="btn_log" value="登     录"/>
                </div>
                <div class="links">
                    <a href="#">免费注册></a>
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

    export default {}

</script>


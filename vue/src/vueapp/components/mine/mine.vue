<template>
    <div class="mine">
        <header class="m_head">
            <router-link to="/index" id="b">&lt;</router-link>
            <p>个人中心</p>
        </header>
        <div class="xinxi">
            <i class="ico iconfont icon-shezhi" @click="out">退出登录</i>
            <img src="./img/pu.jpg"/>
            <p v-model="username" ref="username"></p>
            <div class="huiyuan">
                <p><i>N</i>普通会员</p>
            </div>
            <ul>
                <li>积分:0.0</li> 
                <li>余额:0.00</li> 
                <li>成长值:0</li> 
            </ul>
        </div>
        <main class="m_main">
            <div class="order"> 
                <p>
                    <span>全部订单</span>
                    <span>></span>
                </p> 
                <ul class="clear"> 
                    <li class="li">
                        <span class="icon">></span>
                        <span>进行中</span>
                    </li> 
                    <li class="li">
                        <span class="icon">&radic;</span>
                        <span>已完成</span>
                    </li> 
                    <li class="li">
                        <span class="icon ico iconfont icon-pingjia"></span>
                        <span>待评价</span>
                    </li> 
                    <li class="li">
                        <span class="icon">x</span>
                        <span>无效</span>
                    </li> 
                </ul> 
            </div>
            <div class="server">
                <ul> 
                    <li>
                        <span class="icon ico iconfont icon-chongzhi" style="color:#FFD100;"></span>

                        <span>充值返现</span>
                    </li> 
                    <li>
                        <span class="icon ico iconfont icon-yifutianjia" style="color:#5DDECC;"></span>

                        <span>私人定制</span>
                    </li> 
                    <li>
                        <span class="icon ico iconfont icon-wuliukuaidi" style="color:#7BD7A8;"></span>

                        <span>物流查询</span>
                    </li> 
                    <li>
                        <span class="icon ico iconfont icon-5" style="color:#D7B1C6;"></span>

                        <span>退货记录</span>
                    </li> 
                </ul>
                <ul>
                    <li>
                        <span class="icon ico iconfont icon-dizhi" style="color:#90B1D2;"></span>

                        <span>地址管理</span>
                    </li> 
                    <li>
                        <span class="icon ico iconfont icon-lipin" style="color:#FF995E;"></span>

                        <span>我的礼品卡</span>
                    </li> 
                    <li>
                        <span class="icon ico iconfont icon-youhuiquan" style="color:#FF5388;"></span>

                        <span>我的优惠券</span>
                    </li> 
                    <li>
                        <span class="icon ico iconfont icon-jifen" style="color:#FB7091;"></span>

                        <span>我的积分</span>
                    </li>
                </ul>
                <ul class="clear2">
                    <li>
                        <span class="icon ico iconfont icon-pinglun" style="color:#F3585C;"></span>

                        <span>我的评论</span>
                    </li> 
                    <li>
                        <span class="icon ico iconfont icon-90" style="color:#AD86D9;"></span>

                        <span>我的提问</span>
                    </li> 
                    <li>
                        <span class="icon ico iconfont icon-jianyi" style="color:#8FB7B7;"></span>

                        <span>投诉建议</span>
                    </li> 
                </ul>
            </div>
        </main>

        <nav>
        </nav>
    </div>
</template>

<script>
    import '../../common/common.css'
    import './mine.css'
    import router from '../../router/router.js'


    export default {
        data(){
            return {
                username: ''
            }
        },
        methods: {
            out(){
                alert('确定要退出登录吗?');
                router.push('login');
                sessionStorage.removeItem("username");
            }
        },
        mounted(){
            this.$refs.username.innerText=sessionStorage.getItem("username");
            if(sessionStorage.getItem("username")==undefined){
                router.push('login')
            }
        }
    }

</script>
<template>
    <div class="nnav">
        <ul>
            <li>
                <i class="fa fa-home"></i>
                <router-link to="/index">凡客</router-link>
            </li>
            <li>
                <i class="fa fa-th-large"></i>
                <router-link to="/classify">分类</router-link>
            </li>
            <li>
                <i class="fa fa-shopping-cart"></i>
                <div @click="gocar">购物车</div>
            </li>
            <li>
                <i class="fa fa-user-o"></i>
                <router-link to="/mine">我的</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import router from '../../../router/router.js'
    import './nav.css'
    export default{
        methods:{
            gocar(){
                if(window.sessionStorage.getItem('username')){
                    router.push({path:'/cart'});
                }else{
                    router.push({path:'/login'})
                }

            }
        }
    }
</script>
<template>
    <div class="box">
        <div class="home_cont">
            <router-view></router-view>
        </div>
        <div class="home_nav">
            <hnav></hnav>
        </div>
    </div>
</template>
<script>
    import './home.css'
    import hnav from './nav/nav.vue'
    export default{
        components:{
            hnav
        }
    }
</script>
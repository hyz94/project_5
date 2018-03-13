<template>
    <div class="cnav">
        <div class="lbox">
            <lnav></lnav>
        </div>
        <div class="rbox">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import './classify.css'
    import lnav from './cnav/cnav.vue'
    export default{
        components:{
            lnav
        }
    }
</script>
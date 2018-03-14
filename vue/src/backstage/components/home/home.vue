<template>
    <div class="guike">
        <div class="header">
            <yzheader></yzheader>
        </div>
        <div class="body">
            <div class="nav">
                <yznav></yznav>
            </div>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>
<script>
    import './home.css'
    import yzheader from './header/header.vue'
    import yznav from './nav/nav.vue'
    export default {
        components: {
            yzheader,
            yznav,
        }
    }
</script>
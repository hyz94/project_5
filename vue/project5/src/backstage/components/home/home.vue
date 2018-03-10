<template>
    <div>
        <div class="header">
            <Header></Header>
        </div>
        <div class="body">
            <div class="nav">
                <Nav></Nav>
            </div>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>
<script>
    import './home.css'
    import Header from './header/header.vue'
    import Nav from './nav/nav.vue'
    export default {
        components: {
            Header,
            Nav,
        }
    }
</script>
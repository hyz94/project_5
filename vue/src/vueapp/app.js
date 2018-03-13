import Vue from 'vue'

import './common/common.css'

import App from './components/app/app.vue'

import router from './router/router'

new Vue({
    el:'#app',
    render:h=>h(App),
    router
})
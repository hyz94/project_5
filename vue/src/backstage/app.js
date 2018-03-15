import bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.css'


import Vue from 'vue'
import AppComponent from './components/app/app.vue'
import store from './vuex/store.js'
import router from './router/router'
new Vue ({
    el: "#app",
    router,
    store,
    render: h => h(AppComponent)
})
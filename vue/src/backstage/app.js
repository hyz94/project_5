import bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.css'


import Vue from 'vue'
import AppComponent from './components/app/app.vue'
import router from './router/router'
jQuery($ => {
    console.log($)
})
new Vue ({
    el: "#app",
    router,
    render: h => h(AppComponent)
})
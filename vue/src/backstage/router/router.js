import Vue from 'vue';
import VueRouter from 'vue-router';


import LoginComponent from '../components/login/login.vue';
import HomeComponent from '../components/home/home.vue';

Vue.use(VueRouter);


const router = new VueRouter({
    routes: [
        {
            path: '/', 
            name: 'root',
            component: LoginComponent,
        },
        {
            path: '/home',
            name: 'home',
            component: HomeComponent,
        },
        

    ]
})

//
export default router;
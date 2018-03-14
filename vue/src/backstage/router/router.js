import Vue from 'vue';
import VueRouter from 'vue-router';


import LoginComponent from '../components/login/login.vue';
import HomeComponent from '../components/home/home.vue';
import ProductsComponent from '../components/products/products.vue'
import VueUsersComponent from '../components/vueUsers/vueUsers.vue'


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
            children: [
                {
                    path: '/products',
                    name: 'products',
                    components:{
                        default: ProductsComponent,

                    }
                },
                {
                    path: '/vueUsers',
                    name: 'vueUsers',
                    components:{
                        default: VueUsersComponent,

                    }
                }
            ]
        },

  
        

    ]
})

//
export default router;
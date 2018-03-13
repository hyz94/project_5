import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// import ClassifyComponent from '../components/classify/classify.vue'
// import OrderComponent from '../components/order/order.vue'

import App from '../components/app/app.vue'
import Home from '../components/home/home.vue'
import Class from '../components/classify/classify.vue'
import Cart from '../components/cart/cart.vue'
import Mind from '../components/mine/mine.vue'

import Req1 from '../components/classify/req/req1.vue'

import DetailComponent  from '../components/detailAll/detail/detail.vue'

import Login from '../components/login/log.vue'
import Zhuce from '../components/zhuce/zhuce.vue'


const router = new VueRouter({
    routes:[
        {path:'/',component:Home,children:[
            {path:'classify',component:Class,children:[
                {   path:'/bwear',
                    component:Req1,
                }
            ]},
            {path:'cart',component:Cart},
            {path:'mine',component:Mind},
            {
                path:'/detailPro',name:'detail',component:DetailComponent
            },
            {
                path:'/login',component:Login
            },
            {
                path:'/zhuce',component:Zhuce
            }
        ]}
    ]
})

export default router;
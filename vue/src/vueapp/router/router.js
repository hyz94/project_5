import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// import ClassifyComponent from '../components/classify/classify.vue'
// import OrderComponent from '../components/order/order.vue'

import App from '../components/app/app.vue'
import Home from '../components/home/home.vue'
import Class from '../components/classify/classify.vue'
import Cart from '../components/cart/config.vue'
import Mind from '../components/mine/mine.vue'
import list from '../components/list/list.vue'

import Req1 from '../components/classify/req/req1.vue'
import Req2 from '../components/classify/req/req2.vue'
import Req3 from '../components/classify/req/req3.vue'
import Req4 from '../components/classify/req/req4.vue'


import DetailComponent  from '../components/detailAll/detail/detail.vue'

import Login from '../components/login/log.vue'
import Zhuce from '../components/zhuce/zhuce.vue'
// import config from '../components/cart/config.vue'
import idx from '../components/index/index.vue'






const router = new VueRouter({
    routes:[
        {path:'/',component:Home,redirect:'index',children:[
            {path:'classify',component:Class,redirect:'/bwear',children:[
                {   path:'/bwear',
                    component:Req1
                },
                {
                    path:'/gwear',
                    component:Req2
                },
                {
                    path:'/bshoes',
                    component:Req3
                },
                {
                    path:'/gshoes',
                    component:Req4
                }
            ]},
            {path:'cart',name:'cart',component:Cart},
            {path:'mine',component:Mind},

            {path:'list',name:'list',component:list},


            {path:'index',component:idx},


            
        ]},
        {
            path:'/login',name:'login',component:Login
        },
        {
            path:'/zhuce',component:Zhuce
        },
        {
             path:'/detailPro',name:'detail',component:DetailComponent
        },
       
    ]
})


router.beforeEach((to, from, next) =>{
//     //进入个人页面时，先判断token存在与否，若不存在，则跳转到登陆页面
    if(to.path == '/cart'){
        if(window.sessionStorage.getItem('username')){
            next();
        }else{
            router.push({path: '/login'});
        }
    }else{
        next();
    }
    
})

export default router;

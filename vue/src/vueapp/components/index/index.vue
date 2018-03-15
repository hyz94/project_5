<template>
    <div class="vancl">
        <header id="v_header">
            <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="熊本熊"/>
                <a href="" class="msg">
                    <span>...</span>
                </a>
            </div>
        </header>
        <section id="carousel">
            <carousel></carousel>
        </section>
        <nav id="v_nav">
            <a class="v_nav_top">
                <img src="../../img/chongzhi.jpg" alt="" />
            </a>
            <div class="v_nav_bottom">
                <a href="" title="新品">
                    <img src="../../img/nav1.png" alt="" />
                    <span>新品</span>
                </a>
                <a href="" title="特惠">
                    <img src="../../img/nav2.png" alt="" />
                    <span>特惠</span>
                </a>
                <a href="" title="杂货">
                    <img src="../../img/nav3.png" alt="" />
                    <span>杂货</span>
                </a>
                <a href="" title="频道">
                    <img src="../../img/nav4.png" alt="" />
                    <span>频道</span>
                </a>
                <a href="" title="定制">
                    <img src="../../img/nav5.png" alt="" />
                    <span>定制</span>
                </a>
            </div>
        </nav>
        <main id="v_main">
            <div class="product man_wear">
                <div class="product_top man_wear_top">
                    <router-link to="/classify">
                        <img src="../../img/man_wear.jpg" alt="" />
                    </router-link>
                </div>
                <Area :config="configManC">
                </Area>
            </div>
            <div class="woman_wear product">
                <div class="product_top woman_wear_top">
                    <router-link to="/classify">
                        <img src="../../img/women_wear.jpg" alt="" />
                    </router-link>
                </div>
                <Area :config="configWomanC">
                </Area>
            </div>
            <div class="product man_shoes">
                <div class="product_top man_shoes_top">
                    <router-link to="/classify">
                        <img src="../../img/man_shoes.jpg" alt="" />
                    </router-link>
                </div>
                <Area :config="configManS">
                </Area>
            </div>
            <div class="product woman_shoes">
                <div class="product_top woman_shoes_top">
                    <router-link to="/classify">
                        <img src="../../img/man_shoes.jpg" alt="" />
                    </router-link>
                </div>
                <Area :config="configWomanS">
                </Area>
            </div>
        </main>
    </div>


</template>

<script>
    import './index.css'
    //import './base.css'
    import '../../common/jquery-3.2.1.js'
    import carousel from './carousel/carousel.vue'
    //import manClothes from './area/manClothes.vue'
    import Area from '../datagrid/area.vue'
    //import './index.js'
    //

    export default{
        components:{
            carousel,
            Area
        },
        data(){
            return{

                configManC:{
                    api:'http://10.3.136.9:8080/products',
                    params :{showNum:5},
                    cols:['manClothes']
                },
                configWomanC:{
                    api:'http://10.3.136.9:8080/products',
                    params : {showNum:5},
                    cols:['womenClothes']
                },
                configManS:{
                    api:'http://10.3.136.9:8080/products',
                    params : {showNum:5},
                    cols:['manShoes']
                },
                configWomanS:{
                    api:'http://10.3.136.9:8080/products',
                    params : {showNum:5},
                    cols:['womenShoes']
                }

            }
        },
        mounted(){
            $('.product_list')


        }
    }
</script>
<template>
    <div  class="wrap">

        <div class="topTitle">
            <span></span>
            <span class="curTitle">商品详情</span>
        </div>  

        <div class="detail_content">
            
            <div class="detail_slider">
                <img src="../../../img/dxcs1.jpg" width="256px" heigth="256px"    />
            </div>
            <div class="detail_info">
              
                    <p class="detail_info_tit">
                        <span>商品介绍</span>
                        <span class="detail_price">￥999元</span>

                    </p>
                    <p>充100送100，点击充值</p>
                    <p :class="{active:1}">充值购买更优惠</p>
                    

             
            </div>
            <div class="bianjie"></div>
            <div class="detail_size">
                <div class="detail_size_tit" @click="show = !show">选择&nbsp;颜色/尺码</div>
                <div v-if="show">
                    <div class="color_select">
                        <h6>选择颜色</h6>
                        <span v-for="(color,index) in colors" :class="{active_select:changeBorder == index}" @click="toggleBorder(index)">{{color}}</span>
                    </div> 

                    <div class="bianjie2"></div>

                    <div class="size_select">
                        <h6>尺码选择</h6>
                        <span v-for="(size,index) in sizes" :class="{active_select:changeSize == index}" @click="toggleSize(index)">{{size}}</span>
                        
                        
                    </div>

                    <div class="bianjie2"></div>

                    <div class="num_select">
                        <h6>购买数量</h6>
                        <span @click="qtyJian">-</span>
                        <span>{{qty}}</span>
                        <span @click="qty++">+</span>   
                    </div>
                </div>
                    <div class="bianjie2"></div>

                </div>
                <div class="saleWarning"></div>
                <ul class="detail_list">
                    <li v-for="(key,index) in detail_lists" :class="{active_li:changeLi == index}" @click="toggleLi(index)">{{key}}</li>
                </ul>
                <div class="bianjie3"></div>
                <curLast :is = "curLast"></curLast>

        </div>
        


        <div class="detail_nav">
            <button class="btnBuycar">
                <div class="pro_num">{{buycarQty}}</div>
            </button>
            <button class="btnAddbuycar" @click="buycarQty += qty" >加入购物车</button>
        </div>



    </div>
</template>


<script>
    import '../../../common/common.css';
    import './detail.css';
    import http from '../../../common/httpclient.js';
    import pro_xiangqing from '../pro_xiangqing/pro_xiangqing.vue';
    import pro_consult from '../pro_consult/pro_consult.vue';
    import pro_comment from '../pro_comment/pro_comment.vue';


    export default {
        data:function (){
            return {
                dataset:[],
                show: false,
                id:'',
                qty:1,
                buycarQty:0,
                changeBorder:0,
                changeSize:0,
                changeLi:0,
                curLast:'pro_xiangqing',
                colors:['蓝色','红色','绿色','橙色','天蓝色','你想要的颜色','天蓝色'],
                sizes:['M','L','XL','XXL','XXXL'],
                detail_lists:['商品详情','评论','咨询'],


            }
        },
        components:{pro_xiangqing,pro_consult,pro_comment},
        methods:{
           toggleBorder(index){
                this.changeBorder = index;
           },
           toggleSize(index){
                this.changeSize = index;
           },
           toggleLi(index,key){
                this.changeLi = index;
                switch(index){
                    case 0 :this.curLast ='pro_xiangqing';break;
                    case 1 :this.curLast ='pro_comment';break;
                    case 2 :this.curLast ='pro_consult';break;
                }
           },
           qtyJian(){
              if(this.qty<=1){return false;}else{this.qty--}
           },
         
           
        },
        mounted: function() {
            http.get("http://10.3.136.9:8080/products").then((res)=>{
                console.log(res);

                this.dataset = res.data;

                
            })


        }
    }

</script>
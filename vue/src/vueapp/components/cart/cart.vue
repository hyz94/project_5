<template>
        <div id='cart'>
            <div class='header'>购物车</div>
            <div class='edit'>
                <ul>
                <li>
                    <input type='checkbox' class='selectAll' @click='selectAll' v-if='trs.length==dataset.length' checked key="'a'"/>
                    <input type='checkbox' class='selectAll' @click='selectAll' v-else  key="'b'"/>
                    <i>在购</i>
                </li>
                    <li><a class='delGoods' @click='deletePro'>删除</a></li>
                </ul>
            </div>
            <div class='main'>
                <ul>
                    <li v-for='(obj,idx) in dataset'>
                        <div class='goods_select' >
                            <input type='checkbox' class='selectPro' @click='selectPro(idx)' v-if='trs.indexOf(idx)>-1' checked :key="'a'+idx">
                            <input type='checkbox' class='selectPro' @click='selectPro(idx)' v-else :key="'b'+idx">
                        </div>
                        <div class='goods_img'>
                            <img src='./img/clothes.jpg'>
                        </div>
                        <div class='goods_infor'>
                            <h4>{{obj.name}}</h4>
                            <span>颜色：{{obj.color}}</span>
                            <span>尺码：{{obj.size}}</span>
                            <p><i>特惠</i><span class='price'>￥{{obj.price}}</span></p>
                            <div class='qty_plus'>
                                <a href='#' class='minus' >-</a>
                                <span class='qty' >{{obj.qty}}</span>
                                <a href='#' class='plus' >+</a>
                            </div>
                        </div>
                    </li>
                   
                </ul> 
            </div>
            <div class='shop'>
                <ul>
                    <li>满199元免运费</li>
                    <li><a>去选购></a></li>
                </ul>
            </div>
            <div class='check'>
                <ul>
                    <li>
                        <span>需支付：￥</span>
                        <span>总额：￥</span>
                    </li>
                    <li><a>去结算</a></li>
                </ul>
            </div>
            
        </div>
    
</template>

<script>
    import '../../common/common.css'
    import './shoppingCart.scss'
    //import config from './config.vue'
    

    import http from 'axios'

    
    export default{ 
        data(){
            return{
                dataset:[],
                show:false,
                trs:[]
            }
        },
        props:['config'],
        mounted(){
            http.get(this.config.api,{params:this.config.params || {}}).then((res)=>{
                
                this.dataset = res.data.data;
                console.log(this.dataset);

                
            })
        },
        methods:{
            //increment:function(){
              // this.dataset.obj.qty +=1;

            //},
            //minus:function(){
                //this.dataset.obj.qty -=1;
                //if(this.dataset.obj.qty < 1 ){
                    //this.count =1;
                //}
            //},
            selectPro:function(idx){
                if(this.trs.indexOf(idx)>-1){
                    this.trs.splice(this.trs.indexOf(idx),1);
                }else{
                    this.trs.push(idx);
                }
            },
            selectAll:function(){
                if(this.trs.length == this.dataset.length){
                    this.trs = [];
                }else{
                    this.trs = [];
                    for(var i=0;i<this.dataset.length;i++){
                        this.trs.push(i);
                    }
                }
                console.log(this.config)
            },
          
            deletePro: function(){
                var arr = [];
                for(var i=0;i<this.dataset.length;i++){
                    if(this.trs.indexOf(i) <0){
                        arr.push(this.dataset[i]);
                    }                      
                } 
                this.dataset = arr;
                this.trs = [];   
            }

        }
    }

   
</script>
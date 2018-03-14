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
                            <img :src="obj.imgurl"/>
                        </div>
                        <div class='goods_infor'>
                            <h4>{{obj.name}}</h4>
                            颜色：<span>{{obj.color}}</span>
                            尺码：<span>{{obj.size}}</span>
                            <p><i>特惠</i><span class='price'>{{obj.price}}</span></p>
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
                dataset2:[],
                dataset3:[],
                show:false,
                trs:[]
            }
        },
        props:['config'],
        mounted(){
            http.get(this.config.api,{params:this.config.params || {}}).then((res)=>{
                
                this.dataset = res.data.data;
                console.log(this.dataset);

            });
            http.get('http://10.3.136.9:8080/products').then((res)=>{
                
                this.dataset2 = res.data.data;
                console.log(this.dataset2);
                var array = [];
                var array2 = [];
                console.log(this.dataset)
                for(var i=0;i<this.dataset.length;i++){
                    array.push(this.dataset[i].id);
                }
                console.log(array);
                for(var i=0;i<this.dataset2.length;i++){
                    for(var j=0;j<array.length;j++){
                        if(array[j] == this.dataset2[i].id){
                            array2.push(this.dataset2[i]);
                        }
                    }
                }
                console.log(array2)
                this.dataset3 = array2;
                console.log(this.dataset[0])
                this.dataset[0]['color'] = array2[0].color;
                for(var i=0;i<array2.length;i++){
                    this.dataset[i]['color'] = array2[i].color; 
                    this.dataset[i]['size'] = array2[i].size; 
                    this.dataset[i]['imgurl'] = array2[i].imgurl; 
                    this.dataset[i]['name'] = array2[i].name;

                }
                console.log(this.dataset)
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
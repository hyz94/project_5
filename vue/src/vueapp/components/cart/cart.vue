<template>
        <div id='cart'>
            <div class='header'>购物车</div>
            <div class='edit'>
                <ul>
                <li>
                    <input type='checkbox' class='selectAll' @click='selectAll' v-if='trs.length==curData3.length' checked key="'a'"/>
                    <input type='checkbox' class='selectAll' @click='selectAll' v-else  key="'b'"/>
                    <i>在购</i>
                </li>
                    <li><a class='delGoods' @click='deletePro'>删除</a></li>
                </ul>
            </div>
            <div class='main'>
                <ul>
                    <li v-for='(obj,idx) in curData3' >
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
                curData:[],
                allData:[],
                curData3:[],
                show:false,
                trs:[]
            }
        },
        props:['config'],
        mounted(){
            http.get(this.config.api,{params:this.config.params || {}}).then((res)=>{
                
                this.curData = res.data.data;
                // console.log(this.curData);
                http.get('http://10.3.136.9:8080/products').then((res)=>{
                
                    this.allData = res.data.data;
                    // console.log(this.allData);
                    var array = [];
                    var array2 = [];
                    // console.log(this.curData)
                    for(var i=0;i<this.curData.length;i++){
                        array.push(this.curData[i].id);
                    }

                    // console.log(array);
                    for(var i=0;i<this.allData.length;i++){
                        for(var j=0;j<array.length;j++){
                            if(array[j] == this.allData[i].id){
                                array2.push(this.allData[i]);
                            }
                        }
                    }
                    // curData当前id数量和集合，array2，curData3当前所有商品及属性
                    // console.log(array2);
                    // this.curData = array2;
                    // console.log(this.curData[0])
                    console.log(array2)
                    console.log(this.curData.length)
                    
                    this.curData[0]['color'] = array2[0].color;

                    for(var i=0;i<array2.length;i++){
                        // console.log(array2[i])
                        for(var j=0;j<this.curData.length;j++){
                             // console.log(this.curData[j])
                            if(array2[i]['id'] == this.curData[j]['id']){
                                this.curData[j]['color'] = array2[i].color; 
                                this.curData[j]['size'] = array2[i].size; 
                                this.curData[j]['imgurl'] = array2[i].imgurl; 
                                this.curData[j]['name'] = array2[i].name;
                            }
                        }
                    }
                    this.curData3 = this.curData;

                    
                })
                

            });
            
        },
        methods:{
            //increment:function(){
              // this.curData.obj.qty +=1;

            //},
            //minus:function(){
                //this.curData.obj.qty -=1;
                //if(this.curData.obj.qty < 1 ){
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
                if(this.trs.length == this.curData.length){
                    this.trs = [];
                }else{
                    this.trs = [];
                    for(var i=0;i<this.curData.length;i++){
                        this.trs.push(i);
                    }
                }
                // console.log(this.config)
            },
          
            deletePro: function(){
                var arr = [];
                for(var i=0;i<this.curData.length;i++){
                    if(this.trs.indexOf(i) <0){
                        arr.push(this.curData[i]);
                    }                      
                } 
                this.curData = arr;
                this.trs = [];   
            }

        }
    }

   
</script>
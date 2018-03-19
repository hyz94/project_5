<template>
        <div id='cart'>
            <div class='header'>购物车</div>
            <div class='edit'>
                <ul>
                <li>

                    <input type='checkbox' ref="all" class='selectAll' @click='selectAll' v-if='trs.length==curData3.length && !(trs.length==0)' checked key="'a'"/>
                    <input type='checkbox' ref="all" class='selectAll' @click='selectAll' v-else  key="'b'"/>
                    <i>在购</i>
                </li>
                    <li><a class='delGoods' @click='deletePro'>删除</a></li>
                </ul>
            </div>
            <div class='main'>
                <ul>
                    <li v-for='(obj,idx) in curData3' >
                        <div class='goods_select' >
                            <input type='checkbox' :id="idx" class='selectPro' @click='selectPro(idx)' v-if='trs.indexOf(idx)>-1' ref='radio' checked :key="'a'+idx">
                            <input type='checkbox' :id="idx" class='selectPro' ref='radio' @click='selectPro(idx)' v-else :key="'b'+idx">
                        </div>
                        <div class='goods_img'>
                            <img :src="obj.imgurl"/>
                        </div>
                        <div class='goods_infor'>
                            <h4>{{obj.name}}</h4>
                            颜色：<span>{{obj.color}}</span>
                            尺码：<span>{{obj.size}}</span>
                            <p><i>特惠</i><span class='price'>￥{{obj.price}}元</span></p>
                            <div class='qty_plus'>
                                <a href='#' class='minus' @click="minus(idx)">-</a>
                                <span class='qty' >{{obj.qty}}</span>
                                <a href='#' class='plus' @click="plus(idx)">+</a>
                            </div>
                        </div>
                    </li>
                   
                </ul> 
            </div>
            <div class='shop'>
                <ul>
                    <li>满199元免运费</li>
                    <li><a @click='back'>去选购></a></li>
                </ul>
            </div>
            <div class='check'>
                <ul>
                    <li>
                        <span>需支付：￥{{price}}元</span>
                        <span>总额：￥{{price}}元</span>
                    </li>
                    <li><a>去结算&ensp;({{totalQty}})</a></li>
                </ul>
            </div>
            
        </div>
    
</template>

<script>
    import '../../common/common.css'
    import './shoppingCart.scss'
    import router from '../../router/router'
    //import config from './config.vue'
    

    import http from 'axios'
    import http1 from '../../common/httpclient.js'
import index from 'axios';
    
    export default{ 
        data(){
            return{
                curData:[],
                allData:[],
                curData2:[],
                curData3:[],
                show:false,
                trs:[],
                price:0,
                totalQty:0,
                minus1:false,
                plus1:false
                
            }
        },
        props:['config'],
        mounted(){
            http.get(this.config.api,{params:this.config.params || {}}).then((res)=>{
                
                this.curData = res.data.data;   //存放购物车表数据的数组

                http.get('http://10.3.136.9:8080/products').then((res)=>{
                
                    this.allData = res.data.data;     //存放products全部商品的数组
                    // console.log(this.allData);
                    var array = [];    //存放购物车表id的数组
                    var array2 = [];    //
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
                    //console.log(array2)
                    //console.log(this.curData.length)
                    
                    for(var i=0;i<array2.length;i++){
                        // console.log(array2[i])
                        for(var j=0;j<this.curData.length;j++){
                             // console.log(this.curData[j])
                            if(array2[i]['id'] == this.curData[j]['id']){
                                this.curData[j]['color'] = array2[i].color; 
                                this.curData[j]['size'] = array2[i].size; 
                                this.curData[j]['imgurl'] = array2[i].imgurl; 
                                this.curData[j]['name'] = array2[i].name;
                                this.curData[j]['price'] = array2[i].price;
                            }
                        }
                    }

                    console.log(this.curData);

                    for(var i=0;i<this.curData.length;i++){
                        if((i+1)==this.curData.length){
                            break;
                        }else if(this.curData[i].id==this.curData[i+1].id){
                            this.curData[i].qty = (this.curData[i].qty*1) + (this.curData[i+1].qty*1);
                            this.curData.splice(i+1,1);
                            i--;
                        }
                    }
                    console.log(this.curData);
                    this.curData3 = this.curData;






                    
                    //计算总价、数量
                    // for(var i=0;i<this.curData3.length;i++){

                    //     this.price += this.curData3[i].price*this.curData3[i].qty;
                    //     this.totalQty += (this.curData3[i].qty)*1;

                    // }
                    //console.log(this.price)
                    //console.log(this.totalQty)
                    

                })
                

            });
            function shuibian(){
                console.log('shuibian',111);
            }
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
                console.log(idx)
                console.log(this.curData3[idx]);
                console.log('hhh',this.$refs.radio);

                
                // this.price = 0;
                this.minus1 = true;
                this.plus1 = true;
                // this.totalQty =0;
                // for(var i=0;i<this.$refs.radio.length;i++){
                //     console.log(this.$refs.radio[i].checked)
                    
                //     if(this.$refs.radio[i].checked ==true){
                        

                //         this.price+=this.curData3[i].price*this.curData3[i].qty;
                //         this.totalQty += this.curData3[i].qty*1;
                //         // console.log(this.minus1)
                //         // if(this.minus1=true){
                //         //     this.price =this.curData3[i].price*this.minusQty;
                //         // }
                         
                //     }
                // }
               let array = [];
                for(var i=0;i<this.$refs.radio.length;i++){
                    if(this.$refs.radio[i].checked == true){
                        console.log(this.$refs.radio[i].id)
                        array.push(this.$refs.radio[i].id)
                    }
                }
                console.log('array',array)
                if(this.minus1 == true){
                    
                    this.price = 0;
                    this.totalQty = 0;
                    for(var i=0;i<array.length;i++){
                        this.price+=this.curData3[array[i]].price*this.curData3[array[i]].qty;
                        this.totalQty += this.curData3[array[i]].qty*1;
                    }
                }
                console.log(this)


            },
            selectAll:function(){
                if(this.trs.length == this.curData3.length){
                    this.trs = [];
                }else{
                    this.trs = [];
                    for(var i=0;i<this.curData3.length;i++){
                        this.trs.push(i);
                    }
                }
                console.log(this.$refs.all.checked)
                this.minus1 = true;
                this.plus1 = true;
                if(this.$refs.all.checked == false){
                    this.price = 0;
                    this.totalQty = 0;
                } else if(this.$refs.all.checked == true){
                    this.totalQty = 0;
                    this.price = 0;
                    for(var i=0;i<this.curData3.length;i++){
                        
                        this.price+=this.curData3[i].price*this.curData3[i].qty;
                        this.totalQty += this.curData3[i].qty*1;
                    }
                }
                // let array = [];
                // for(var i=0;i<this.$refs.radio.length;i++){
                //     if(this.$refs.radio[i].checked == false){
                //         console.log(this.$refs.radio[i].id)
                //         array.push(this.$refs.radio[i].id)
                //     }
                // }
                // console.log('array',array)
                
                    
                //     this.price = 0;
                //     this.totalQty = 0;
                //     for(var i=0;i<array.length;i++){
                //         this.price+=this.curData3[array[i]].price*this.curData3[array[i]].qty;
                //         this.totalQty += this.curData3[array[i]].qty*1;
                //     }
                
            },
            back:function(){
                router.push("/index");
            },
            //qty减少
            minus:function(idx){
                var n=this.curData3[idx].qty;
                n--;
                if(n<1){
                    n=1;
                }
                this.curData3[idx].qty =n;
                if(n>1){
                    http1.post('http://10.3.136.9:8080/carGoodsUpdate',{db:'carGoods',id:this.curData3[idx].id,qty:this.curData3[idx].qty}).then((res) => {
                        console.log('this',this); 

                    })  
                }
                
                console.log('checked',this.$refs.radio[0].checked);
                console.log('checked',this.$refs.radio[1].checked);
                console.log(idx)
                let array = [];
                for(var i=0;i<this.$refs.radio.length;i++){
                    if(this.$refs.radio[i].checked == true){
                        console.log(this.$refs.radio[i].id)
                        array.push(this.$refs.radio[i].id)
                    }
                }
                console.log('array',array)
                if(this.minus1 == true){
                    
                    this.price = 0;
                    this.totalQty = 0;
                    for(var i=0;i<array.length;i++){
                        this.price+=this.curData3[array[i]].price*this.curData3[array[i]].qty;
                        this.totalQty += this.curData3[array[i]].qty*1;
                    }
                }
                console.log(88,this.minus1);
                

            },
            //qty增加
            plus:function(idx){     
                this.curData3[idx].qty = this.curData3[idx].qty*1 + 1;
                http1.post('http://10.3.136.9:8080/carGoodsUpdate',{db:'carGoods',id:this.curData3[idx].id,qty:this.curData3[idx].qty}).then((res) => {
                    console.log(res);
                });
                console.log(this.price);
                // this.price = 0;
                // for(var i=0;i<this.curData3.length;i++){
                    
                //     this.price+=this.curData3[i].price*this.curData3[i].qty;
                // }
                let array = [];
                for(var i=0;i<this.$refs.radio.length;i++){
                    if(this.$refs.radio[i].checked == true){
                        console.log(this.$refs.radio[i].id)
                        array.push(this.$refs.radio[i].id)
                    }
                }
                console.log('array',array)
                if(this.minus1 == true){
                    
                    this.price = 0;
                    this.totalQty = 0;
                    for(var i=0;i<array.length;i++){
                        this.price+=this.curData3[array[i]].price*this.curData3[array[i]].qty;
                        this.totalQty += this.curData3[array[i]].qty*1;
                    }
                }
            },
          
            deletePro: function(){
                console.log(this.trs);
                var array = [];
                var str = '';
                for(var i=0;i<this.curData3.length;i++){
                    if(this.trs.indexOf(i)>=0){
                        array.push({
                            id:this.curData3[i].id
                        });
                       
                    }      
                } 
                console.log(array);
                for(var i=0;i<array.length;i++){
                    str += array[i].id + '+';
                }
                console.log(str);
                http1.post("http://10.3.136.9:8080/axiosDelCar",{db:'carGoods',id:str}).then((res)=>{
                    console.log('删除成功!')
                    http1.get("http://10.3.136.9:8080/getCarGoods").then((res) => {
                        console.log(res);
                        this.curData = res.data.data;

                        http.get('http://10.3.136.9:8080/products').then((res)=>{
                
                                this.allData = res.data.data;     //存放products全部商品的数组
                                // console.log(this.allData);
                                var array = [];    //存放购物车表id的数组
                                var array2 = [];    //
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
                                //console.log(array2)
                                //console.log(this.curData.length)
                                
                              

                                for(var i=0;i<array2.length;i++){
                                    // console.log(array2[i])
                                    for(var j=0;j<this.curData.length;j++){
                                         // console.log(this.curData[j])
                                        if(array2[i]['id'] == this.curData[j]['id']){
                                            this.curData[j]['color'] = array2[i].color; 
                                            this.curData[j]['size'] = array2[i].size; 
                                            this.curData[j]['imgurl'] = array2[i].imgurl; 
                                            this.curData[j]['name'] = array2[i].name;
                                            this.curData[j]['price'] = array2[i].price;
                                        }
                                    }
                                }

                                this.curData3 = this.curData;
                                
                                // //计算总价、数量
                                // for(var i=0;i<this.curData3.length;i++){
                                //     this.price = 0;
                                //     this.price += this.curData3[i].price*this.curData3[i].qty;
                                //     this.totalQty += (this.curData3[i].qty)*1;
                                // }
                                // //console.log(this.price)
                                // //console.log(this.totalQty)
                                
                                // if(this.curData3.length==0){
                                //     this.price=0;
                                //     this.totalQty=0;
                                // }

                            })
                    })

                })

                this.trs = [];
                this.totalQty = 0;
                this.price = 0;
              
            }

        }
    }

   
</script>
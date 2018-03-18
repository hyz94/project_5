<template>
    <div id='list' style="height:100%">
        <div class='header'>
            <span class="fa fa-chevron-left" @click='back'></span>
            <span>{{type}}</span>
            <span class="fa fa-navicon"></span>
        </div>
        <div class='nav'>
            <span>新品</span>
            <span>销量</span>
            <span>价格<i class='fa fa-unsorted sort'></i></span>
            <span>好评</span>
        </div>
        <div class='main'>
            <ul class='goods_detail'>
                <li v-for="(obj,idx) in dataset" @click="getCommon(obj.id)">
                    <img :src='obj.imgurl'/>
                    <p class='goods_name'>{{obj.name}}</p>
                    <p class='goods_price'>{{obj.price}}</p>
                </li>
                
            </ul>
        </div>
    </div>
</template>

<script>
    import './list.scss'
    import http from "axios"
    import  router from '../../router/router'  
    export default{
        data(){
            return{ 
                type:this.$route.params.type,
                dataset:[]
            }
        },
        methods:{
            back(){
                router.push("/classify");
            },
            getCommon:function(id){
                this.$router.push({name:'detail',params:{proId:id}});
                window.sessionStorage.setItem('proId',id);
            }
        },
        mounted: function() {
            // console.log(this.type);
            var type  =  window.sessionStorage.getItem('smallType');
            let url = 'http://10.3.136.9:8080/insert1?smallType='+ type;
            // console.log(url);
            http.get(url).then((res)=>{
              this.dataset = res.data.data;
              console.log(this.dataset)
                
            })
        }
    }
</script>
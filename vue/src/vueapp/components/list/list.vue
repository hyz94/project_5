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
                <li v-for="(obj,idx) in dataset" @click="getCommon(obj.id)" >
                    <img :src='obj.imgurl'/>
                    <p class='goods_name'>{{obj.name}}</p>
                    <p class='goods_price'>{{obj.price}}</p>
                </li>
                
            </ul>
            <div class="pageWrap">
                <div class="pages">
                    <a href="javascript:void(0);" class="prev" @click="pageJian">上一页</a>
                    <a href="javascript:void(0);" v-for="idx in num" class="pageNumber" :class= "{activePage:idx == page}"  @click="changePage(idx)">{{idx}}</a>


                    <a href="javascript:void(0);" class="next" @click="pageJia">下一页</a>
                </div>
            </div>
        </div>

       
    </div>
</template>

<script>
    import './list.scss'
    import http from "../../common/httpclient.js"
    import router from '../../router/router'  
    export default{
        data(){
            return{ 
                type:this.$route.params.type,
                dataset:[],
                page:1,
                limit:10,
                num:'',
            }
        },
        methods:{
            ajaxPage(){
                var type  =  window.sessionStorage.getItem('smallType');
                var params = "smallType="+type+'&page='+this.page+'&limit='+this.limit;

                http.get('http://10.3.136.9:8080/insert1?'+ params).then((res)=>{
               
                      
                    this.dataset = res.data.data;
                     
                    
                })
            },
            back(){
                router.push("/classify");
            },
            getCommon:function(id){
                this.$router.push({name:'detail',params:{proId:id}});
                window.sessionStorage.setItem('proId',id);
            },
            changePage:function(idx){
                this.page = idx;
                this.ajaxPage();

            },
            pageJian(){
                console.log(666);
                if(this.page<=1){return false;}else{this.page--}
                 this.ajaxPage();
            },
            pageJia(){
                console.log(777);
                if(this.page>=this.num){return false;}else{this.page++}
                 this.ajaxPage();
            }
        },
        mounted: function() {
            // console.log(this.type);
            var type  =  window.sessionStorage.getItem('smallType');
            var page = this.page;
            var limit = this.limit;
            var params = "smallType="+type+'&page='+page+'&limit='+limit;

            let url = 'http://10.3.136.9:8080/insert1?';
            // console.log(url);
            http.get('http://10.3.136.9:8080/insert1?'+ params).then((res)=>{
               
                console.log(res.data.qty)
              this.num = Number(res.data.qty)/Number(this.limit);
              
              this.dataset = res.data.data;
             
                
            })
        }
    }
</script>
<template>
    <div>
        <ul class="plub">
            <li v-for="(obj,idx) in dataset" @click="getCommon(obj.smallType)">
                <img :src="obj.imgurl"/>
                <span>{{obj.smallType}}</span>
            </li>
        </ul>
        <spinner v-if="show"></spinner>
    </div>
</template>
<script>
    import './plub.css'
    import axios from 'axios'
    import spinner from '../spinner/spinner.vue'
    export default{
        data(){
            return{
                arr:[],
                dataset:[],
                show:false
            }
        },
        components:{
            spinner
        },
        props:['config'],
        methods:{
            getCommon:function(smallType){
                this.$router.push({name:'list',params:{type:smallType}});
                window.sessionStorage.setItem('smallType',smallType);
            }
        },
        mounted(){
            this.show = true;
            axios.get(this.config.api,{params:this.config.params || {}}).then((res)=>{
                for(var i=0;i<res.data.data.length;i++){
                    if(res.data.data[i].mainType == this.config.cols){
                        this.arr.push(res.data.data[i]);
                    }
                }
                /*for(var i=0;i<this.arr.length;i++){
                    if(i==this.arr.length-1){
                        break;
                    }
                    if(this.arr[i].smallType != this.arr[i+1].smallType){
                        this.dataset.push(this.arr[i])
                    }
                }
                console.log(this.dataset);*/
                function arrayUnique2(arr, name) {
                    var hash = {};
                    return arr.reduce(function (item, next) {
                    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
                    return item;
                  }, []);
                }          
                this.dataset = arrayUnique2(this.arr, "smallType");
                console.log(this.dataset);
                this.show = false;

            })
        }
    }
</script>
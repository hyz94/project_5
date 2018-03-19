
<template>
    <div class="product_bottom" 
    ref="main"
    >
        <ul class="product_list" ref="mainUl" :style="{width:ulWidth + 'px',left:ulLeft+'px', transition:transitionX}" >
            <li v-for="(obj,idx) in dataset" ref="mainLi"
            @touchstart='touchStart'
            @touchmove='touchMove' 
            @touchend='touchEnd(obj.id)'
            >
                <img :src="obj.imgurl" alt="" />
                <p class="product-name inaline">{{obj.name}}</p>
                <div class="product-price"> 
                    <span>
                        售价：￥ {{obj.price}}
                    </span> 
                    <span>
                        充值相当于：
                        <i>￥ {{obj.price}}</i>
                    </span>
                </div>
            </li>
            <li>
                <router-link to="/classify" class="view-more">
                    <span class="view-more-text">查看更多</span> 
                    <span>View More</span> 
                    <span class="view-more-arrow">&gt;</span>
                </router-link>
            </li>
        </ul>
        <spinner v-if="show"></spinner>
    </div>
</template>
<script>
    //import './plub.css'
    import './area.css'
    import axios from '../../common/httpclient'
    import spinner from '../spinner/spinner.vue'
    
    export default{
        data(){
            return{
                arr:[],
                dataset:[],
                show:false,
                startPoX:0,
                startX:0,//开始触摸的位置
                moveX:0,//滑动时的位置
                endX:0,//结束触摸的位置
                disX:0,//移动距离
                slideEffect:'',//滑动时的效果,使用v-bind:style="deleteSlider"
                ulWidth:0,
                ulLeft:20,
                liWidth:0,
                len:0,
                transitionX:'',
            }
        },
        components:{
            spinner
        },
        props:['config'],
        methods:{
            showDetail:function(id){
                this.$router.push({name:'detail',params:{proId:id}});
                window.sessionStorage.setItem('proId',id);

            },
            touchStart:function(ev){
                ev.preventDefault();
                if(ev.touches.length == 1) {    
                    this.startX = ev.touches[0].clientX; // 记录开始位置
                        }//记录ul当前相对父级的偏移量
                    this.startPoX = this.$refs.mainUl.offsetLeft;
            },
            touchMove:function(ev){
                if(ev.touches.length == 1) {
                    this.moveX = ev.touches[0].clientX;
                    this.disX = this.moveX - this.startX;
                    this.ulLeft = this.startPoX + this.disX;
                    this.transitionX='';
                }
            },

            // touchEnd:function(ev){
            //     ev.preventDefault();
            //     console.log(this.endX);
            //     let currNum = Math.round(-this.ulLeft/this.liWidth);
            //     let mainWidth = this.$refs.main.offsetWidth;
            //     if(currNum<=0){
            //         this.ulLeft = 20;



            touchEnd:function(id){
                let end = event.changedTouches[0].clientX;
                if(Math.abs(end-this.startX)<1){
                    this.showDetail(id);



                }else{
                    let currNum = Math.round(-this.ulLeft/this.liWidth);
                    let mainWidth = this.$refs.main.offsetWidth;
                    if(currNum<=0){
                    this.ulLeft = 20;
                    }else{
                        this.ulLeft = -currNum * this.liWidth + 10;
                    }
                    if(currNum>=this.len-2){
                        this.ulLeft = -this.liWidth *this.len + mainWidth;
                    }
                    this.transitionX='all 0.3s';
                }
                
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
                this.dataset = arrayUnique2(this.arr, "smallType").slice(0,this.config.params.showNum);
                this.show = false;

                this.$nextTick(()=>{
                    this.len = this.$refs.mainLi.length+1;
                    this.liWidth = this.$refs.mainLi[0].offsetWidth+20;
                    this.ulWidth = this.liWidth*this.len;
                    this.startPoX = this.$refs.mainUl.offsetLeft;
                })
            });
        },
    }
</script>

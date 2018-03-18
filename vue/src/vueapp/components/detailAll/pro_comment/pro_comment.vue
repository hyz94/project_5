<template>
    <div>
        <ul class="comments">
            <li v-for='(obj,idx) in comts' v-if='idx<=num'>
                <p class="nameTime">
                    <span>来自:{{obj.name}}</span><span>{{obj.time}}</span> 
                </p>
                <p>{{obj.comt}}</p>
            </li>
           
        </ul>

        <div class="btnWrap">
            <button class="btnMore" @click="btnMore" v-if="show">查看更多</button>
            <div class="showLast"  v-if="showLast">没有更多评论了~~~</div>
        </div>
        
    </div>
</template>

<script>

import './pro_comment.scss'

export default{
    data(){
        return{
            comts:[{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'},{name:'巴拉拉小魔仙',comt:'衣服很好，下次再买',time:'2018-2-2'}],
            num:2,
            show:true,
            showLast:false,

        }
    },
    methods:{
        btnMore(){
            if(this.num <= this.comts.length ){
                this.num += 3;
            }else{
                this.show = false;
                this.showLast = true;
            }
        }
    }
}
</script>
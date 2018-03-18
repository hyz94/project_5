<template>
    <div class="consult">
        <div class="consultForm">
            <h6>我要咨询</h6>
            <div class="cont">
                <textarea class="contBox" cols="30" rows="10" placeholder="您输入的字数不要超过60字" v-model="cont"></textarea>
            </div>
            <div class="sub">
                <a class="subButton" @click="subButton">提交</a>
            </div>
        </div>

        <ul class="consultList">
            <li v-for='(obj,idx) in Ques'>
                <div class="consultQue">问：{{obj.que}}</div>
                <p class="nameTime">
                    <span>来自：{{obj.name}}</span><span>{{obj.time}}</span> 
                </p>
              
            </li>
        </ul>
        

    </div>

</template>

<script>

import './pro_consult.scss'
import router from '../../../router/router.js'
export default{
    data(){
        return{
            cont:'',
            Ques:[{que:'请问身高180cm，体重100kg，该选什么尺码',name:'金刚狼',time:'2018-1-2'},{que:'请问身高160cm，体重70kg，该选什么尺码',name:'小狼人',time:'2018-1-2'}],
        }
        
    },
    methods:{
        subButton(){
            if(window.sessionStorage.getItem('username')){
            var name = window.sessionStorage.getItem('username');
            var que = this.cont;
            var time = function(){
                var time = new Date();
                var year = time.getFullYear();
                var month = time.getMonth()+1;
                var date = time.getDate();
              
                return year+"-"+month+"-"+date;

            }();
            this.Ques.push({que:que,name:name,time:time})
        }else{
            router.push('login');
        }
        }
    }
}
</script>
<template>
	<div class="search">
		<div class="search-top">
	        <i class="fa fa-search"></i>
	        <input type="text" :placeholder="sPaceholder" @focus='showSearch' @keyup.13='startSearch()' v-model='sValue'/>
	        <router-link to="/login" class="msg">
	            <span>...</span>
	        </router-link>
	    </div>
	    <div class="search-index" v-show="searchIndex" >
	        <div class="search-hot">
	        	<div class="search-hot-top">
	        		<p class="search-hot-tit">热搜</p>
	        		<span class="search-hot-close" @click='closeSearch'>取消</span>
	        	</div>
	            <ul class="search-hot-list">
	                <li>T恤</li>
	                <li>帆布鞋</li>
	                <li>休闲裤</li>
	                <li>帆布鞋</li>
	                <li>牛仔裤</li>
	            </ul>
	        </div>
	        <div class="search-history">
	        	<span class="search-history-tit">历史搜索</span>
	        	<ul class="search-history-list">
	        		<li>熊本熊</li>
	        		<li>休闲</li>
	        	</ul>
	        </div>
	        <div class="clearBtn">
	        	清除历史
	        </div>
	    </div>
	</div>
</template>
<script>
	import './search.css'
	import http from 'axios'
	export default{
		data(){
			return {
				searchIndex:false,
				sValue:'',
				api:'',
				sPaceholder:'羽绒',
			}
		},
		methods:{
			showSearch:function(){
				this.searchIndex=true
			},
			closeSearch:function(){
				this.searchIndex=false
			},
			startSearch:function(){
				if(this.sValue){
					this.api = 'http://10.3.136.9:8080/dimInsert?'+this.sValue;
				}else{
					this.api = 'http://10.3.136.9:8080/dimInsert?'+this.sPaceholder;
				}
				var type;
				http.get(this.api,{}).then((res)=>{
					console.log(res);
					type = res.data.data[0].smallType;
					console.log(type);
					 window.sessionStorage.setItem('smallType',type);	
					this.$router.push({name:'list',params:{type:type}});
	            });
	            console.log(type);
			}
		},


	}
</script>
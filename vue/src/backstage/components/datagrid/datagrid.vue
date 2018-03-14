<template>
    <div>
        <div class="operate">
            <input type="button" class="btn btn-primary" value="查找" @click="insert" id="insert">
            <input type="button" class="btn btn-success" value="添加" @click="add" id="add">
        </div>
        <div v-if="insertShow" class="toOperate">
            <input type="text" class="form-control" placeholder="请输入相应参数名" v-model="insert1">
            <input type="text" class="form-control" placeholder="请输入相应参数" v-model="insert2">
            <input type="button" class="btn btn-primary" value="查找" @click="axiosInsert">
        </div>
        <div v-if="addShow" class="toOperate">
            <label for="id">id: </label>
            <input type="text" class="form-control" placeholder="请输入商品id" id="id" v-model="id">
            <label for="name">name: </label>
            <input type="text" class="form-control" placeholder="请输入商品名" id="name" v-model="name">
            <label for="price">price: </label>
            <input type="text" class="form-control" placeholder="请输入商品价格" id="price" v-model="price"><br>
            <label for="imgurl">imgurl: </label>
            <input type="text" class="form-control" placeholder="请输入商品图片路径" id="imgurl" v-model="imgurl">
            <label for="color">color: </label>
            <input type="text" class="form-control" placeholder="请输入商品颜色" id="color" v-model="color">
            <label for="size">size: </label>
            <input type="text" class="form-control" placeholder="请输入商品大小" id="size" v-model="size"><br>
            <label for="qty">qty: </label>
            <input type="text" class="form-control" placeholder="请输入商品个数" id="qty" v-model="qty">
            <label for="mainType">mainType: </label>
            <input type="text" class="form-control" placeholder="请输入商品大的类别" id="mainType" v-model="mainType">
            <label for="smallType">smallType: </label>
            <input type="text" class="form-control" placeholder="请输入商品小的类别" id="smallType" v-model="smallType">
            <input type="button" class="btn btn-success" value="添加" @click="axiosAdd">
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th v-for="(val, key) in dataset[0]"  v-if="config.cols.indexOf(key) > -1">
                        {{dictionary[$store.state.header.lanType][key] || key}}
                    </th>
                    <th>
                        {{$store.state.header.lanType == 'en' ? 'Compile' : '编辑'}}                       
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj, idx) in dataset">
                    <td v-for="(val, key) in obj"  v-if="config.cols.indexOf(key) > -1">{{val}}</td>
                    <td><input type="button" value="编辑" class="compileBtn" @click="compile(idx,obj.id)"><input type="button" class="delBtn" value="删除" @click="axiosDel({id: obj.id})"></td>
                </tr>
            </tbody>
        </table>
        <div class="qtylist">
            <ul class="pagination">
                <li class="page-item">
                    <span class="page-link">Previous</span>
                </li>
                <li class="page-item" v-for="val in pageAll">
                    <input type="button"  :value="val" class="page-link" @click="paging(val)">
                </li>             
                <li class="page-item">
                    <span class="page-link">Next</span>
                </li>
            </ul>
        </div>
        <div class="compile" v-if="compileShow">
            <h5>编辑商品信息</h5>
            <div v-for="(val, key) in dataset[compileIdx]">
                <label  :for="key" v-if="config.cols.indexOf(key) > -1">{{key}}</label>
                <input type="text" :id="key"  v-if="config.cols.indexOf(key) > -1" :value="val" ref="compileRef"/>
            </div>
            <input type="button" class="btn btn-success ml-5 mr-5 mt-2" style="line-height:1.0" value="确认" @click="compileConfirm">
            <input type="button" class="btn btn-info ml-4 mt-2" value="退出" @click="compileClose" >
            <span class="compileDel" @click="compileClose">&times;</span>
        </div>
        <spinner v-if="spinnerShow"></spinner> 
        <div class="zhe" v-if="zhe"></div>
    </div>
</template>
<script>
    import spinner from '../spinner/spinner.vue'
    import './datagrid.css'
    import './datagrid.js'
    import http from '../../utils/httpclient'
    import common from '../../common/common.js'
    export default {
        data(){
            return {
                dataset: [],
                insertShow: false,
                addShow: false,
                insert1: '',
                insert2: '',
                show: false,
                id: '',
                name: '',
                price: '',
                imgurl: '',
                color: '',
                size: '',
                qty: '',
                mainType: '',
                smallType: '',
                objIdx: '',
                limit: 10,
                pageAll: '',
                compileShow: false,
                compileIdx: '',
                spinnerShow: false,
                productsPading: '',
                insertPading: '',
                idxCompile: '',
                dictionary: {},
                zhe:false,
            }
            
        },
        props: ['config'],
        components: {
            spinner
        },
        mounted(){
            //http://10.3.136.9:8080/products
            this.spinnerShow = true;
            http.post(this.config.api,{page:1,limit:10}).then((res) => {
                this.dataset = res.data.data;
                this.pageAll = Math.ceil(res.data.qty/this.limit);
                //判断进行哪个请求下的分页
                this.insertPading = '',
                this.productsPading = 'productsPading',
                this.spinnerShow = false;
            });
            http.get('http://localhost:88/src/backstage/dictionary/common.json').then((res) => {
                this.dictionary = res.data;
            })
        },
        methods: {
            //显示隐藏查找框
            insert(){
                this.addShow = false;
                this.insertShow = !this.insertShow;
            },
            //显示隐藏添加框
            add(){
                this.insertShow = false;
                this.addShow = !this.addShow;
            },
            //查找数据库的某个商品
            axiosInsert(){
                this.spinnerShow = true;
                let parmas1 = this.insert1;
                let parmas2 = this.insert2;                
                http.post('http://10.3.136.9:8080/insert1',{parmas1: parmas1,parmas2: parmas2,page:1,limit:10}).then((res) => {
                    this.dataset = res.data.data;
                    this.pageAll = Math.ceil(res.data.qty/this.limit);
                    //判断进行哪个请求下的分页
                    this.productsPading = '',
                    this.insertPading = 'insertPading',
                    this.spinnerShow = false;
                })
            },
            //往数据库添加商品
            axiosAdd(){
                this.spinnerShow = true;
                http.post('http://10.3.136.9:8080/axiosAdd',{parmas1: this.id,parmas2: this.name,parmas3: this.price,parmas4: this.imgurl,parmas5: this.color,parmas6: this.size,parmas7: this.qty,parmas8: this.mainType,parmas9: this.smallType}).then((res) => {
                    http.post(this.config.api,{page:1,limit:10}).then((res) => {
                        this.dataset = res.data.data;
                        this.pageAll = Math.ceil(res.data.qty/this.limit);
                        this.spinnerShow = false;
                    })
                })
            },
            //删除数据库的某个商品
            axiosDel({id: objIdx}){
                if(confirm('确认删除已选择数据吗?')){
                    this.spinnerShow = true;
                    http.post('http://10.3.136.9:8080/axiosDel',{id: objIdx}).then((res) => {
                        let page = objIdx;
                        if(page%10 == 1){
                            page = Math.floor(objIdx/10);
                        } else {
                            page = Math.ceil(objIdx/10);
                        }
                        http.post(this.config.api,{page:page,limit:10}).then((res) => {
                            this.dataset = res.data.data;
                            this.pageAll = Math.ceil(res.data.qty/this.limit);
                            this.spinnerShow = false;
                        })
                    })
                }
                
            },
            //实现分页功能
            paging(val){
                this.spinnerShow = true;
                let page = val;
                if(this.productsPading){
                    http.post(this.config.api,{page:page,limit:this.limit}).then((res) => {
                        this.dataset = res.data.data;
                        this.spinnerShow = false;
                    });
                } else if(this.insertPading){
                    http.post('http://10.3.136.9:8080/insert1',{parmas1: this.insert1,parmas2: this.insert2,page:page,limit:this.limit}).then((res) => {
                        this.dataset = res.data.data;
                        this.spinnerShow = false;
                    });
                }
                
            },
            //商品编辑功能
            compile(idx,objIdx){
                this.compileShow = true;
                this.zhe = true;
                this.compileIdx = idx;
                this.idxCompile = objIdx;
            },
            //关闭商品编辑框
            compileClose(){
                this.compileShow = false;
                this.zhe = false;
            },
            //关闭商品编辑框，并修改商品信息
            compileConfirm(){
                if(confirm('确认编辑此商品信息吗?')){
                    this.compileShow = false;
                    this.zhe = false;
                    //获取原数据
                    console.log(this.dataset[this.compileIdx])
                    //转化为数组               
                    let array = [];
                    for(var attr in this.dataset[this.compileIdx]){
                        array.push(this.dataset[this.compileIdx][attr])
                    }
                    //获取新数据
                    let arrayRefName = [];
                    let arrayRef = [];
                    for(var i=0;i<array.length-1;i++){
                        let j = i + 1;
                        if(array[j] != this.$refs.compileRef[i].value){
                            arrayRef.push(this.$refs.compileRef[i].value);
                            arrayRefName.push(this.$refs.compileRef[i].id);

                        }
                        
                    }
                    let objRef = {};
                    objRef.id = this.dataset[this.compileIdx]["id"];
                    for(var i=0;i<arrayRef.length;i++){
                        objRef[arrayRefName[i]] = arrayRef[i];
                        this.dataset[this.compileIdx][arrayRefName[i]] = arrayRef[i];
                    }
                    http.post('http://10.3.136.9:8080/axiosUpdata',objRef).then((res) => {
                        console.log('res',res)
                        // this.dataset = res.data.data;
                        // this.spinnerShow = false;
                    });
                }
            }
        }
    }
    
</script>

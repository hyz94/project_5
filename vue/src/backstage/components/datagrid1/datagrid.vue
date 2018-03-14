<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th v-for="(val, key) in dataset[0]"  v-if="config.cols.indexOf(key) > -1">
                        {{dictionary[$store.state.header.lanType][key] || key}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj, idx) in dataset">
                    <td v-for="(val, key) in obj"  v-if="config.cols.indexOf(key) > -1">{{val}}</td>
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
        <spinner v-if="spinnerShow"></spinner> 
    </div>
</template>
<script>
    import spinner from '../spinner/spinner.vue'
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
            http.get(this.config.api,{page:1,limit:10}).then((res) => {
                console.log('res',res)
                this.dataset = res.data.data;
                this.pageAll = Math.ceil(res.data.qty/this.limit);
                this.spinnerShow = false;
            });
            http.get('http://localhost:88/src/backstage/dictionary/common.json').then((res) => {
                console.log('http',res.data);
                this.dictionary = res.data;
                console.log(this.dictionary)
            })
        },
    }
    
</script>

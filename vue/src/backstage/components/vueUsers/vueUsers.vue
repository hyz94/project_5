<template>
    <div>
        <datagrid :config="config"></datagrid>
    </div>
</template>

<script>
    import datagrid from '../datagrid/datagrid.vue'

    export default {
        components: {
            datagrid
        },
        data(){
            return {
                config: {
                    api: "http://10.3.136.9:8080",
                    apiName: "/getVueUsers",
                    db: 'vueUsers',
                    cols: ['username','password'],
                    // params: {page:1, pageitems: 10}
                }
            }
        }        
    }

    //过滤掉不要的字段
    //默认没有 cols 为全部
    //中英文切换
    //翻页
</script>
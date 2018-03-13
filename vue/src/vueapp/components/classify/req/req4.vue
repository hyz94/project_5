<template>
    <div>
        <plub :config="config"></plub>
    </div>
</template>
<script>
    import plub from '../../datagrid/plub.vue'
    export default{
        components:{
            plub
        },
        data(){
            return{
                config:{
                    api:'http://10.3.136.9:8080/products',
                    params:{},
                    cols:['womenShoes']
                }
            }
        }
    }
</script>
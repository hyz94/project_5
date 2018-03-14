<template>
    <div style='height:100%'>
        <Cart :config='config'></Cart>
    </div>
</template>

<script>
    import Cart from './cart.vue'

    export default{
        components:{
           Cart
        },
        data(){
            return{
                config:{
                    api:"http://10.3.136.9:8080/products",
                    params:{page:1,limit:5},
                    cols:['id','name','price','imgurl','color','size','qty']
                }
            }
        }
    }
</script>
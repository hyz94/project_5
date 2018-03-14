 <template>
  <div class="mote_bianjie">

    <img src="../../../img/mote-biejian.jpg" width="640px" />
    <img :src="dataset.imgurl"  width="640px"  />
    <img :src="dataset.imgurl"  width="640px"  />
    <img :src="dataset.imgurl"  width="640px"  />
 
 
</div>
</template>

<script>
    
export default{
    data:function(){
        return{
            

        }
    },
    props:['dataset'],
}
</script>
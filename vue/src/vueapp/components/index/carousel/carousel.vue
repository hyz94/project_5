<template>
    <figure id="full_feature" class="swipslider">
        <ul class="sw-slides">
            <li class="sw-slide">
                <img src="../../../img/banner1.jpg" alt="Summer beach concept">
            </li>
            <li class="sw-slide">
                <img src="../../../img/banner2.jpg" alt="Lang from Yie Ar Kung Fu">
            </li>
            <li class="sw-slide">
                <img src="../../../img/banner3.jpg" alt="Tiny Tina">
            </li>
            <li class="sw-slide">
                <img src="../../../img/banner4.jpg" alt="Tiny Tina from Borderlands 2">
            </li>
            <li class="sw-slide">
                <img src="../../../img/banner5.jpg" alt="Redhead girl">
            </li>
        </ul>
    </figure>
</template>

<script>
    import './swipeslider.css'
    import './swipeslider.js'
    import '../../../common/jquery-3.2.1.js'
    export default {
        mounted(){
          $('#full_feature').swipeslider();
        }
    }
</script>
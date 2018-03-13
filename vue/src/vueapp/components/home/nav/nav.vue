<template>
    <div class="nnav">
        <ul>
            <li>
                <i class="fa fa-home"></i>
                <router-link to="/">凡客</router-link>
            </li>
            <li>
                <i class="fa fa-th-large"></i>
                <router-link to="/classify">分类</router-link>
            </li>
            <li>
                <i class="fa fa-shopping-cart"></i>
                <router-link to="/cart">购物车</router-link>
            </li>
            <li>
                <i class="fa fa-user-o"></i>
                <router-link to="/mine">我的</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import './nav.css'
    export default{}
</script>
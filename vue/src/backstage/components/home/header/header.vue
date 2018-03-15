<template>
    <div class="header">
        <h1>贵客后台管理系统</h1>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">中英文切换</label>
            </div>
            <select class="custom-select" id="inputGroupSelect01" v-model="$store.state.header.lanType">
                <!-- <option selected>Choose...</option> -->
                <option value="en">en</option>
                <option value="cn">cn</option>
            </select>
            
        </div>
    </div>
</template>
<script>
    import './header.css'
    import common from '../../../common/common.js'
    export default {}
</script>
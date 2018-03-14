import Vue from 'vue'
import Vuex from 'vuex'

import header from '../components/home/header/header.js'
import common from '../common/common.js'

Vue.use(Vuex)

// {common: {state: {lanType: 'ce'}}, header:{state: {lanType: 'ce'}}}
const store = new Vuex.Store({
    modules:{
        header,
        common
    }
})
export default store;
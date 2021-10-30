import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import getters from "./getters"
import state from "./state"
import mutations from "./mutations"


const store = new Vuex.Store({
    state,
    mutations,
    getters
})
export default store
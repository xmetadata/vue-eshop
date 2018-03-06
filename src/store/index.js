import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import product from './modules/product'
import standard from './modules/standard'
import order from './modules/order'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    product,
    standard,
    order
  },
  strict: debug
})

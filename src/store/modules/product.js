import { INIT_PRODUCT } from '../types'

const state = {
  product: null
}

const mutations = {
  [INIT_PRODUCT] (state, product) {
    state.product = product
  }
}

export default {
  state,
  mutations
}

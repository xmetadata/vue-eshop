import { INIT_ORDER } from '../types'

const state = {
  order: null
}

const mutations = {
  [INIT_ORDER] (state, order) {
    state.order = order
  }
}

export default {
  state,
  mutations
}

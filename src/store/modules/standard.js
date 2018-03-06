import { INIT_STANDARD } from '../types'

const state = {
  standard: null
}

const mutations = {
  [INIT_STANDARD] (state, standard) {
    state.standard = standard
  }
}

export default {
  state,
  mutations
}

import api from '../api'
import { INIT_PRODUCT } from './types'

export const InitProduct = ({ commit }, data) => {
  api.getProduct(data).then(function (response) {
    commit(INIT_PRODUCT, response.data.result)
  })
    .catch(function (error) {
      console.log(error.response.data)
      console.log(error.response.status)
    })
}

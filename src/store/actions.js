import api from '../api'
import { INIT_PRODUCT, INIT_ORDER } from './types'

export const InitProduct = ({ commit }, data) => {
  api.getProduct(data).then(function (response) {
    commit(INIT_PRODUCT, response.data.result)
  })
    .catch(function (error) {
      console.log(error.response.data)
      console.log(error.response.status)
    })
}

export const InitOrder = ({ commit }, data) => {
  api.createOrder(data).then(function (response) {
    let ret = response.data.result[0]
    console.log(ret)
    if (ret.rtnStr === 'ok') {
      data['rtnInfo'] = ret.rtnInfo
      commit(INIT_ORDER, data)
      window.location = '/#/confirm'
    } else {
      window.location = '/#/order'
    }
  })
    .catch(function (error) {
      console.log(error.response.data)
      console.log(error.response.status)
    })
}

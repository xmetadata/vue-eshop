import api from '../api'
import { INIT_PRODUCT, INIT_STANDARD, INIT_ORDER } from './types'

export const InitProduct = ({ commit }, data) => {
  api.getProduct(data).then(function (response) {
    commit(INIT_PRODUCT, response.data.result)
    let stdData = {
      'goodsId': response.data.result.Goods.goods_id
    }
    api.getProductStandard(stdData).then(function (response) {
      commit(INIT_STANDARD, response.data.result)
    })
      .catch(function (error) {
        console.log(error.response.data)
        console.log(error.response.status)
      })
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
      console.log('order false')
      window.location = '/#/order'
    }
  })
    .catch(function (error) {
      console.log(error.response.data)
      console.log(error.response.status)
    })
}

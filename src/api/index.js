import axios from 'axios'

export default {
  getProduct: function () {
    let host = process.env.NODE_ENV === 'production' ? window.location.host : process.env.HOST
    let data = {
      urlName: host.match(/(\w+)\.(\w+\.\w+)/)[1],
      domainName: host.match(/(\w+)\.(\w+\.\w+)/)[2]
    }
    return axios({
      url: '/apis/BestShop/goods/getGoodsInfo.do',
      method: 'post',
      data,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': '*/*'
      }
    })
  },
  createOrder: function (data) {
    return axios({
      url: '/apis/BestShop/goods/order.do',
      method: 'post',
      data,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': '*/*'
      }
    })
  },
  getComment: function () {
    let host = process.env.NODE_ENV === 'production' ? window.location.host : process.env.HOST
    let data = {
      urlName: host.match(/(\w+)\.(\w+\.\w+)/)[1],
      domainName: host.match(/(\w+)\.(\w+\.\w+)/)[2]
    }
    return axios({
      url: '/apis/BestShop/goods/getGoodsComment.do',
      method: 'post',
      data,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': '*/*'
      }
    })
  }
}

import axios from 'axios'

// var host = window.location.host
var host = 'iphonexshell.etlobby.com'

const data = {
  urlName: host.match(/(\w+)\.(\w+\.\w+)/)[1],
  domainName: host.match(/(\w+)\.(\w+\.\w+)/)[2]
}

export default {
  getProduct: function () {
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
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
  }
}

<template>
  <div class="home">
    <!-- header -->
    <mt-header title="确认订单">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="orderBox">
      <div class="orderBoxGoods">
        <div class="i-img">
          <p><img :src="image + productInfo.Slide[productInfo.Slide.length-1].goods_slide_url" /></p>
        </div>
        <div class="orderInfo">
          <h5>{{ productInfo.Goods.goods_name }}</h5>
          <p>{{ productInfo.Goods.goods_name }}</p>
        </div>
        <div class="orderNum">
          <span class="price" id="111"> <span>{{ productInfo.Goods.discount_price }}</span>{{ $t("index.productTaxM") }}
          </span> <span id="goodsNum">× 1</span>
        </div>
      </div>
    </div>

    <mt-field :label="$t('buy.trueName')" v-model="trueName" name="trueName" v-validate="'required'"></mt-field>
    <span v-show="errors.has('trueName')">{{ errors.first('trueName') }}</span>

    <mt-field :label="$t('buy.zipCode')" v-model="zipCode" name="zipCode" v-validate="'required'"></mt-field>
    <span v-show="errors.has('zipCode')">{{ errors.first('zipCode') }}</span>

    <mt-field :label="$t('buy.cityId')" v-model="cityId" name="cityId" v-validate="'required'"></mt-field>
    <span v-show="errors.has('cityId')">{{ errors.first('cityId') }}</span>

    <mt-field :label="$t('buy.address')" v-model="address" name="address" v-validate="'required'"></mt-field>
    <span v-show="errors.has('address')">{{ errors.first('address') }}</span>

    <mt-field :label="$t('buy.telPhone')" v-model="telPhone" name="telPhone" v-validate="'required'"></mt-field>
    <span v-show="errors.has('telPhone')">{{ errors.first('telPhone') }}</span>

    <mt-field :label="$t('buy.email')" v-model="email" name="email" v-validate="'required|email'"></mt-field>
    <span v-show="errors.has('email')">{{ errors.first('email') }}</span>

    <mt-field :label="$t('buy.orderMessage')" v-model="orderMessage" name="orderMessage" v-validate="'required'" :placeholder="$t('buy.orderMessage_placeholder')"></mt-field>
    <span v-show="errors.has('orderMessage')">{{ errors.first('orderMessage') }}</span>

    <mt-button type="danger" size="large" @click.native="doBuy">点击触发 handleClick</mt-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, Field, Header, Button } from 'mint-ui'
import { Validator } from 'vee-validate'

Vue.component(Field.name, Field)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)

const dictionary = {
  ja: {
    attributes: {
      trueName: 'trueName',
      zipCode: 'trueName',
      provinceId: 'trueName',
      cityId: '',
      areaId: '',
      address: '',
      telPhone: '',
      email: '',
      orderMessage: ''
    }
  }
}

Validator.localize(dictionary)

export default {
  name: 'Buy',
  data () {
    return {
      productInfo: '',
      api: process.env.API_SERVER,
      image: process.env.IMG_SERVER,
      countryId: '',
      goodsId: '',
      sdGroupId: '',
      sdInfo: '',
      goodsNum: '',
      goodsAmount: '',
      OrderAmount: '',
      trueName: '',
      zipCode: '',
      provinceId: '',
      cityId: '',
      areaId: '',
      address: '',
      telPhone: '',
      email: '',
      orderMessage: ''
    }
  },
  computed: {
    urlName: function () {
      var host = ''
      if (Vue.config.productionTip) {
        host = window.location.host
      } else {
        host = 'iphonexshell.etlobby.com'
      }
      return host.match(/(\w+)\.(\w+\.\w+)/)[1]
    },
    domainName: function () {
      var host = ''
      if (Vue.config.productionTip) {
        host = window.location.host
      } else {
        host = 'iphonexshell.etlobby.com'
      }
      return host.match(/(\w+)\.(\w+\.\w+)/)[2]
    }
  },
  created: function () {
    var self = this
    this.$axios({
      url: self.api + '/BestShop/goods/getGoodsInfo.do',
      method: 'post',
      data: {
        urlName: self.urlName,
        domainName: self.domainName
      },
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
      .then(function (response) {
        self.productInfo = response.data.result
        console.log(self.productInfo)
        self.fromatSd(self.productInfo.Standard)
      })
      .catch(function (error) {
        console.log(error.response.data)
        console.log(error.response.status)
      })
  },
  methods: {
    doBuy: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          var self = this
          this.$axios({
            url: self.api + '/BestShop/goods/order.do',
            method: 'post',
            data: self.inputText,
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
            .then(function (response) {
              self.productInfo = response.data.result
            })
            .catch(function (error) {
              console.log(error.response.data)
              console.log(error.response.status)
            })
        } else {
          console.log('Invalide')
        }
      })
    },
    fromatSd: function (orgSd) {
      var sd_temp = []
      outer:
      while (true) {
        var sd_item = orgSd.pop()
        if (sd_item === undefined) {
          break outer // finish
        }
        for (var i=0; i<sd_temp.length; i++){
          if (sd_temp[i].sd_id === sd_item.sd_id) {
            sd_temp[i].sd_value_group.push({"sd_value_id" : sd_item.sd_value_id,
              "sd_value_image" : sd_item.sd_value_image,
              "sd_value_name" : sd_item.sd_value_name,
              "sd_value_sort" : sd_item.sd_value_sort})
            break outer
          }
        }
        // Add new one
        sd_temp.push({"sd_id" : sd_item.sd_id,
          "sd_name" : sd_item.sd_name,
          "sd_view_name" : sd_item.sd_view_name,
          "sd_format" : sd_item.sd_format,
          "sd_value_group": [{"sd_value_id" : sd_item.sd_value_id,
          "sd_value_image" : sd_item.sd_value_image,
          "sd_value_name" : sd_item.sd_value_name,
          "sd_value_sort" : sd_item.sd_value_sort}
          ]})
      }
      return sd_temp
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{border:none;}
img{max-width:100%;}
p{font-size:14px;margin-top:0;margin-bottom:10px;color:#8f8f94;}
.orderBox{background:white;width:100%;padding:0px;font-size:14px;overflow:auto;}
.orderBox .orderBoxGoods{overflow:auto;padding:10px;background:#f5f5f5;}
.orderBox .orderBoxGoods .i-img{float:left;width:20%;}    
.orderBox .orderInfo{float:left;width:60%;padding:0px 0 0 2%;}
.orderBox .orderInfo h5{color:#444;font-size:14px;text-align:left;font-weight:normal;line-height:21px;}
.orderBox .orderInfo p{color:#999;font-size:12px;text-align:left;line-height:21px;}
.orderBox .orderNum{float:left;width:10%;font-size:15px;text-align:right;}
.orderBox .orderNum span{display:block;}
.orderBox .orderNum .btnDel{padding:2px 15px;margin-top:20px;}    
.price {color:#be0000;}
</style>

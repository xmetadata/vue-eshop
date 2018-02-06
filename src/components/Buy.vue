<template>
  <div class="home" v-if="productInfo !== null">
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

  <div id="goodsStandard">
    <ul class="productImg" v-for="sd in sdGroup" :key="sd.sd_id">
      <label class="label-top" style="display: block;">{{ sd.sd_view_name }}:</label>
      <li v-for="value_group in sd.sd_value_group"  @click="onSelectSd(sd.sd_id, value_group.sd_value_id)" :key="value_group.sd_value_id" :class="{ selected: value_group.sd_value_id === selectedSd[sd.sd_id] }">
        <a v-if="value_group.sd_value_image" href="javascript:;" title="">
          <img :src="image + value_group.sd_value_image">
        </a>
        <span>{{ value_group.sd_value_name }}</span>
      </li>
    </ul>
  </div>

  <mt-field :label="$t('buy.trueName')" :state="errors.has('trueName') ? 'error' : ''" v-model="trueName" name="trueName" v-validate="'required'"></mt-field>
  <span v-show="errors.has('trueName')">{{ errors.first('trueName') }}</span>

  <mt-field :label="$t('buy.zipCode')" :state="errors.has('zipCode') ? 'error' : ''" v-model="zipCode" name="zipCode" v-validate="'required'"></mt-field>
  <span v-show="errors.has('zipCode')">{{ errors.first('zipCode') }}</span>

  <mt-field :label="$t('buy.provinceId')" :state="errors.has('provinceId') ? 'error' : ''" v-model="provinceId" name="provinceId" v-validate="'required'" @click.native="popupVisible = true"></mt-field>
  <span v-show="errors.has('provinceId')">{{ errors.first('provinceId') }}</span>
  <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
    <mt-picker :slots="provinceGroup" @change="onProvinceChange"  :visible-item-count="3"></mt-picker>
  </mt-popup>

  <mt-field :label="$t('buy.cityId')" :state="errors.has('cityId') ? 'error' : ''" v-model="cityId" name="cityId" v-validate="'required'"></mt-field>
  <span v-show="errors.has('cityId')">{{ errors.first('cityId') }}</span>

  <mt-field :label="$t('buy.address')" :state="errors.has('address') ? 'error' : ''" v-model="address" name="address" v-validate="'required'"></mt-field>
  <span v-show="errors.has('address')">{{ errors.first('address') }}</span>

  <mt-field :label="$t('buy.telPhone')" :state="errors.has('telPhone') ? 'error' : ''" v-model="telPhone" name="telPhone" v-validate="'required'"></mt-field>
  <span v-show="errors.has('telPhone')">{{ errors.first('telPhone') }}</span>

  <mt-field :label="$t('buy.email')" :state="errors.has('email') ? 'error' : ''" v-model="email" name="email" v-validate="'required|email'"></mt-field>
  <span v-show="errors.has('email')">{{ errors.first('email') }}</span>

  <mt-field :label="$t('buy.orderMessage')" :state="errors.has('orderMessage') ? 'error' : ''" v-model="orderMessage" name="orderMessage" v-validate="'required'" :placeholder="$t('buy.orderMessage_placeholder')"></mt-field>
  <span v-show="errors.has('orderMessage')">{{ errors.first('orderMessage') }}</span>

  <mt-button type="danger" size="large" @click.native="doBuy">点击触发 handleClick</mt-button>
</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Field, Header, Button, Popup, Picker } from 'mint-ui'
import { Validator } from 'vee-validate'

Vue.component(Field.name, Field)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Popup.name, Popup)
Vue.component(Picker.name, Picker)

const dictionary = {
  ja: {
    attributes: {
      trueName: '名字',
      zipCode: 'trueName',
      provinceId: '',
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
      popupVisible: false,
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
      orderMessage: '',
      selectedSd: {}
    }
  },
  computed: {
    ...mapGetters({
      Product: 'Product'
    }),
    ...mapActions({
      InitProduct: 'InitProduct'
    }),
    productInfo () {
      return this.Product
    },
    sdGroup () {
      var productInfo = this.Product
      var temp = []
      for (var j = 0; j < productInfo.Standard.length; j++) {
        var outer = false
        var sdItem = productInfo.Standard[j]
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].sd_id === sdItem.sd_id) {
            temp[i].sd_value_group.push({'sd_value_id': sdItem.sd_value_id,
              'sd_value_image': sdItem.sd_value_image,
              'sd_value_name': sdItem.sd_value_name,
              'sd_value_sort': sdItem.sd_value_sort})
            outer = true
            break
          }
        }
        if (outer) {
          continue
        }
        temp.push({'sd_id': sdItem.sd_id,
          'sd_name': sdItem.sd_name,
          'sd_view_name': sdItem.sd_view_name,
          'sd_format': sdItem.sd_format,
          'sd_value_group': [{'sd_value_id': sdItem.sd_value_id,
            'sd_value_image': sdItem.sd_value_image,
            'sd_value_name': sdItem.sd_value_name,
            'sd_value_sort': sdItem.sd_value_sort}
          ]})
      }
      console.log(temp)
      return temp
    },
    provinceGroup () {
      return [{
        flex: 1,
        values: ['1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995'],
        className: 'slot1'
      }]
    }
  },
  created: function () {
    this.$store.dispatch('InitProduct')
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
    onProvinceChange: function (picker, values) {
      this.provinceId = values[0]
    },
    onSelectSd: function (sdId, sdValueId) {
      this.$set(this.selectedSd, sdId, sdValueId)
      console.log(this.selectedSd)
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
.mint-popup-4 {width: 100%;}
.productImg{width:100%;height:auto;margin:0;padding:0;overflow:hidden;}
.productImg li{width:33%;float:left;height:120px;position:relative;margin:0 auto;text-align:center;list-style:none;}
.productImg li span{padding:5px;display:block;word-wrap:break-word;white-space:pre-wrap;white-space:-moz-pre-wrap}
.productImg li a{width:80px;padding:1px;border:1px solid #ccc;display:block;margin:0 auto;}
.productImg li a img{display:flex;justify-content:center;align-items:center;margin:0 auto;}
.productImg li a:hover{border:2px solid #be0000;padding:0;text-decoration:none;color:#be0000}
.productImg li.selected a{border:2px solid #be0000;padding:0;color:#be0000}
.productImg li.selected i{display:block;}
</style>

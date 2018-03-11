<template>
<div class="order" v-if="productInfo !== null">
  <!-- header -->
  <mt-header :title="$t('buy.confirmOrder')" style="font-size: 22px;">
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
        <p>{{ productInfo.Goods.promotions }}</p>
      </div>
      <div class="orderNum">
        <span class="price" id="111">
          <div v-if="selectedStandard">
            <span>{{ selectedStandard.sd_sequence_price }}</span>
          </div>
          {{ $t("index.productTaxM") }}
        </span>
        <span id="goodsNum">× {{ goodsNum }}</span>
      </div>
    </div>
  </div>

  <div v-if="sdGroup">
    <div id="goodsStandard">
      <ul class="productImg" v-for="sd in sdGroup.Standard" :key="sd.sd_id">
        <label class="label-top" style="display:block;margin:0 10px;">{{ sd.sd_view_name }}:</label>
        <li v-for="value_group in sd.sd_values"  @click="onSelectSd(sd.sd_id, value_group.sd_value_id)" :key="value_group.sd_value_id" :class="{ selected: value_group.sd_value_id === selectedSd[sd.sd_id] }">
          <div v-if="value_group.sd_value_image" >
            <a href="javascript:;" :title="value_group.sd_value_id">
              <img :src="image + value_group.sd_value_image">
            </a>
            <span>{{ value_group.sd_value_name }}</span>
          </div>
          <div v-else>
            <a href="javascript:;" :title="value_group.sd_value_id">
              <span>{{ value_group.sd_value_name }}</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="numberRight"> {{ $t("buy.buyNotice") }} </div>

  <div class="numberRight">
    <div class="numberBox">
      <button class="mui-numbox-btn-minus" type="button" v-on:click="goodsNum > 1 ? goodsNum -= 1 : 1">-</button>
      <input class="mui-numbox-input" type="number" v-model="goodsNum" readonly>
      <button class="mui-numbox-btn-plus" type="button" v-on:click="goodsNum < 99 ? goodsNum += 1 : 99">+</button>
    </div>
    <label class="numberLable"><span class="require">*</span>{{ $t("buy.goodsNum") }} : </label>
  </div>

  <mt-field :label="$t('buy.trueName')" :placeholder="$t('buy.trueName')" :state="errors.has('trueName') ? 'error' : ''" v-model="trueName" name="trueName" v-validate="'required'"></mt-field>
  <span class="errors" v-show="errors.has('trueName')">{{ errors.first('trueName') }}</span>

  <mt-field :label="$t('buy.zipCode')" :placeholder="$t('buy.zipCode')" :state="errors.has('zipCode') ? 'error' : ''" v-model="zipCode" name="zipCode" v-validate="'required'"></mt-field>
  <span class="errors" v-show="errors.has('zipCode')">{{ errors.first('zipCode') }}</span>

  <div style="height:1px;border-bottom: 1px solid #efeff4;margin-left:20px;margin-right:10px;"></div>
  <div class="tableBox">
    <div class="tableTd"> {{ $t("buy.provinceId") }} </div>
    <div class="tableCell">
      <select name="provinceId" v-model="provinceId">
        <option value="" > {{ $t("buy.pleaseChoose") }} </option>
        <option v-for="province_name in provinceGroup[0].values" :value="province_name" :key="province_name">
          {{ province_name }}
        </option>
      </select>
    </div>
  </div>
  <div class="clear"></div>

  <mt-field v-if="countryId == 'JP' " :label="$t('buy.cityId')" :placeholder="$t('buy.cityId')" :state="errors.has('cityId') ? 'error' : ''" v-model="cityId" name="cityId" v-validate="'required'"></mt-field>

  <span class="errors" v-show="errors.has('cityId')">{{ errors.first('cityId') }}</span>

  <mt-field :label="$t('buy.address')" :placeholder="$t('buy.address')" :state="errors.has('address') ? 'error' : ''" v-model="address" name="address" v-validate="'required'"></mt-field>
  <span class="errors" v-show="errors.has('address')">{{ errors.first('address') }}</span>

  <mt-field :label="$t('buy.telPhone')" :placeholder="$t('buy.telPhone')" :state="errors.has('telPhone') ? 'error' : ''" v-model="telPhone" name="telPhone" v-validate="'required'"></mt-field>
  <span class="errors" v-show="errors.has('telPhone')">{{ errors.first('telPhone') }}</span>

  <mt-field :label="$t('buy.email')" :placeholder="$t('buy.email')" :state="errors.has('email') ? 'error' : ''" v-model="email" name="email" v-validate="'required|email'"></mt-field>
  <span class="errors" v-show="errors.has('email')">{{ errors.first('email') }}</span>

  <mt-field :label="$t('buy.orderMessage')" name="orderMessage" :placeholder="$t('buy.orderMessage_placeholder')"></mt-field>
  <div style="height:2px;border-bottom: 1px solid #efeff4;margin-left:20px;margin-right:10px;"></div>

  <div class="tableBox">
    <div class="tableTd"> {{ $t("buy.pay") }} </div>
    <div class="tableCell" v-if="countryId == 'JP' ">
      <span class="visabox01">
        <label style="color:#be0000; font-weight:bold;">{{ $t("buy.payType") }}
          <span>{{ productInfo.Goods.extend_fee_value }} {{ $t("buy.payTypeR") }}</span>
        </label>
      </span>
    </div>
    <div class="tableCell" v-else-if="countryId == 'TW' ">
      <img src="../assets/image/payTypeZH.png" style="width:auto;padding-top:14px;">
    </div>
    <div class="tableCell" v-else>
      <img src="../assets/image/payTypeEN.png" style="width:auto;padding-top:14px;">
    </div>
  </div>

  <div class="clear"></div>
  <div style="height:2px;border-bottom: 1px solid #efeff4;margin-left:20px;margin-right:10px;"></div>

  <div class="line">
    <span>{{ $t("buy.line1") }}</span>
    <span class="mun" id="totalNum"> {{ goodsNum }} </span>
    <span>{{ $t("buy.line2") }}</span>

    <span>{{ $t("buy.line3") }}:</span>
    <span class="price">
      <span class="buyinfo_table_red">
        <span id="totalMoney"> {{ orderAmount }} </span>{{ $t("index.productTaxM") }}
      </span>
    </span>
  </div>
  <br />

  <mt-button type="danger" size="large" @click.native="doBuy">{{ $t("buy.buyNow") }}</mt-button>
  <br />
  <div v-html="$t('buy.bottomTipNote')"></div>
  <br />
</div>
</template>

<script>
import Vue from 'vue'
import location from '../assets/js/location'
import { mapGetters, mapActions } from 'vuex'
import { Field, Header, Button, MessageBox } from 'mint-ui'
import { Validator } from 'vee-validate'

Vue.component(Field.name, Field)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)

const dictionary = {
  ja: {
    attributes: {
      trueName: 'お名前',
      zipCode: '郵便番号',
      provinceId: '都道府県',
      cityId: '市区町村',
      address: '建物名',
      telPhone: '電話番号',
      email: 'Email',
      orderMessage: 'メッセージ'
    }
  },
  en: {
    attributes: {
      trueName: 'Full name',
      zipCode: 'Postal Code',
      provinceId: 'District',
      cityId: 'Municipalities',
      address: 'Address Details',
      telPhone: 'Phone Number',
      email: 'Email',
      orderMessage: 'Comments'
    }
  },
  ms_MY: {
    attributes: {
      trueName: 'Full name',
      zipCode: 'Postal Code',
      provinceId: 'State',
      cityId: 'Municipalities',
      address: 'Address Details',
      telPhone: 'Phone Number',
      email: 'Email',
      orderMessage: 'Comments'
    }
  },
  zh_TW: {
    attributes: {
      trueName: '姓名',
      zipCode: '郵遞區號',
      provinceId: '縣市',
      cityId: '詳細地址',
      address: '詳細地址',
      telPhone: '電話號碼',
      email: 'Email',
      orderMessage: '留言'
    }
  }
}
Validator.localize(dictionary)

export default {
  name: 'Order',
  data () {
    return {
      api: process.env.API_SERVER,
      image: process.env.IMG_SERVER,
      popupVisible: false,
      goodsNum: 1,
      trueName: '',
      zipCode: '',
      provinceId: '',
      cityId: '',
      address: '',
      telPhone: '',
      email: '',
      orderMessage: '',
      selectedSd: {}
    }
  },
  computed: {
    ...mapGetters({
      Product: 'Product',
      Standard: 'Standard',
      Order: 'Order'
    }),
    ...mapActions({
      InitProduct: 'InitProduct',
      InitOrder: 'InitOrder'
    }),
    productInfo () {
      return this.Product
    },
    sdGroup () {
      return this.Standard
    },
    countryId: function () {
      let countryMap = {
        'xmetadata.com': 'zh_CN',
        'etlobby.com': 'JP',
        'fitanow.com': 'HK',
        'hiqushop.com': 'TW',
        'couposhop.com': 'MY'
      }
      let host = process.env.NODE_ENV === 'production' ? window.location.host : process.env.HOST
      return countryMap[host.match(/(\w+)\.(\w+\.\w+)/)[2]]
    },
    orderAmount () {
      if (this.selectedStandard === undefined) {
        return 0
      }
      return Number(this.selectedStandard.sd_sequence_price * this.goodsNum) + Number(this.productInfo.Goods.extend_fee_value)
    },
    selectedStandard () {
      if (this.sdGroup !== null) {
        if (this.selectedSd !== {}) {
          let standardSequence = this.sdGroup.StandardSequence
          for (let i = 0; i < standardSequence.length; i++) {
            for (let j = 0; j < standardSequence[i].sd_sequence_values.length; j++) {
              if (this.selectedSd[standardSequence[i].sd_sequence_values[j].sd_id] !== standardSequence[i].sd_sequence_values[j].sd_value_id) {
                break
              } else if (j === standardSequence[i].sd_sequence_values.length - 1) {
                return this.sdGroup.StandardSequence[i]
              }
            }
          }
          return this.sdGroup.StandardSequence[0]
        } else {
          return this.sdGroup.StandardSequence[0]
        }
      }
    },
    provinceGroup () {
      let locationMap = {
        'xmetadata.com': location.JP,
        'etlobby.com': location.JP,
        'fitanow.com': location.HK,
        'hiqushop.com': location.TW,
        'couposhop.com': location.MY
      }
      let host = process.env.NODE_ENV === 'production' ? window.location.host : process.env.HOST
      return locationMap[host.match(/(\w+)\.(\w+\.\w+)/)[2]]
    }
  },
  created: function () {
    this.$store.dispatch('InitProduct')
  },
  methods: {
    doBuy: function () {
      for (let i = 0; i < this.sdGroup.Standard.length; i++) {
        if (this.selectedSd[this.sdGroup.Standard[i].sd_id] === undefined) {
          MessageBox({
            title: this.$i18n.t('buy.buyMessageTitle'),
            message: this.$i18n.t('buy.buyMessage'),
            confirmButtonText: this.$i18n.t('index.sure')
          })
          return false
        }
      }
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.Order !== null) {
            MessageBox({
              title: this.$i18n.t('buy.buyMessageTitle'),
              message: this.$i18n.t('buy.buyDuplicate'),
              confirmButtonText: this.$i18n.t('index.sure')
            })
          } else {
            let data = {
              sourceId: 'FB',
              countryId: this.countryId,
              goodsId: this.productInfo.Goods.goods_id,
              sdGroupId: this.selectedStandard.sd_sequence_id,
              goodsNum: this.goodsNum.toString(),
              goodsAmount: this.selectedStandard.sd_sequence_price,
              orderAmount: this.orderAmount.toString(),
              trueName: this.trueName,
              zipCode: this.zipCode,
              provinceId: this.provinceId,
              cityId: this.cityId,
              address: this.address,
              telPhone: this.telPhone,
              email: this.email,
              orderMessage: this.orderMessage
            }
            this.$ga.ecommerce.addItem({
              id: this.productInfo.Goods.goods_id,
              name: this.productInfo.Goods.goods_name,
              sku: this.selectedStandard.sd_sequence_id,
              category: 'goods',
              price: this.orderAmount,
              quantity: '1'
            })
            this.$store.dispatch('InitOrder', data)
          }
        }
      })
    },
    onProvinceChange: function (picker, values) {
      this.provinceId = values[0]
    },
    onSelectSd: function (sdId, sdValueId) {
      this.$set(this.selectedSd, sdId, sdValueId)
    }
  }
}
</script>

<style>
  .mint-popup-4 {width: 100%; }
  .picker-slot-wrapper, .picker-item {backface-visibility: hidden;}
</style>

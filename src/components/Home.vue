<template>
  <div class="home" v-if="productInfo !== null">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="slide in productInfo.Slide" :key="slide.slide_id">
        <img :src="image + slide.goods_slide_url">
      </mt-swipe-item>
    </mt-swipe>
    <div class="productTitle">
      <h3>{{ productInfo.Goods.goods_name }}</h3>
    </div>
    <div class="productNumber">
      <span class="productNumberLeft">{{ $t("index.productNumberLeft") }}<span>
        <strong style="color:#be0000;">{{ productInfo.Goods.sd_group_salenum }}</strong>
      </span>{{ $t("index.productNumberRight") }}</span>
      <span class="productNumberRight">
        <span class="productNumberSpan"></span>
      </span>
      <span>97%</span>
    </div>
    <div class="productTax">
      <div>
        <div>
          {{ $t("index.productTaxLeft") }}:<span style="font-size: 20px;color:#be0000;"><strong>{{ productInfo.Goods.discount_price }}</strong>{{ $t("index.productTaxM") }}</span>{{ $t("index.productTaxR") }}
        </div>
        <div>
          {{ $t("index.productTax") }}:{{ productInfo.Goods.market_price }}{{ $t("index.productTaxM") }}
          <span style="background-color: #be0000;color: white;">{{ Math.round((productInfo.Goods.market_price - productInfo.Goods.discount_price) / productInfo.Goods.market_price * 100) }} % OFF</span>
        </div>
      </div>
      <div class="productTimeWrap">{{ $t("index.flashSale") }}
        <span style="color:#be0000;">
          <span id="timer" style="display:none;"></span>
          <strong id="hour_show" style="">00</strong>:
          <strong id="minute_show" style="">00</strong>:
          <strong id="second_show" style="">00</strong>
        </span>
        <!-- time -->
      </div>
    </div>
    <div class="productProfile">
      <span>{{ $t("index.productProfile1") }}</span>
      <span>{{ $t("index.productProfile2") }}</span>
      <span>{{ $t("index.productProfile3") }}</span>
    </div>

    <div class="prodBar" id="prodBar">
      <ul class="productBars" :class="prodBarFixed == true ? 'isFixed' :''">
        <li><a href="#detialContext" class="scrollBar" scroll-y="0">{{ $t("index.detialContext") }}</a></li>
        <li><a href="#detialParams" class="scrollBar" scroll-y="50">{{ $t("index.detialParams") }}</a></li>
        <li><a href="#detialAppraise" class="scrollBar" scroll-y="50">{{ $t("index.detial") }}</a></li>
        <li><a href="#infoMation" class="scrollBar" scroll-y="40">{{ $t("index.infoMation") }}</a></li>
      </ul>
    </div>

    <div class="detailBlock" id="detialContext" style="padding-top:10px">
      <div v-html="productInfo.Goods.goods_desc"></div>
    </div>

    <div class="detailBlock" id="detialParams">
      <div v-html="productInfo.Goods.goods_info"></div>
    </div>

    <comment></comment>

    <div id="infoMation">
      <div v-html="$t('index.infoTable')"></div>
    </div>
    <!--footBar-->
    <div class="footBar" style="box-shadow: 0px -2px 1px #dad8d8;">
      <span class="purchase" id="btnPay">
        <a href="/#/order">
          <img src="../assets/image/buyq1.png" />
          <span style="line-height:20px;margin-top:5%">{{ $t("index.go_to_buy") }}</span>
        </a>
      </span>
      <span class="service" id="btnOnline">
        <img src="../assets/image/service.png" />
        <a id="btnOnline" onclick="chatOnline();" >
            <span style="line-height:14px"> {{ $t("index.online") }}</span>
        </a>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Comment from './Comment'
import { mapGetters, mapActions } from 'vuex'
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  name: 'Home',
  data () {
    return {
      api: process.env.API_SERVER,
      image: process.env.IMG_SERVER,
      goodsComment: '',
      prodBarFixed: false
    }
  },
  components: {
    'comment': Comment
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
    }
  },
  created: function () {
    this.$store.dispatch('InitProduct')
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = document.querySelector('#prodBar').offsetTop
      if (scrollTop > offsetTop) {
        this.prodBarFixed = true
      } else {
        this.prodBarFixed = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-swipe {width: 100%;height: 380px;}
.img {max-width: 100%;}
.prodBar .isFixed{
  position:fixed;
  background-color:#Fff;
  top:0;
  z-index:999;
}
</style>

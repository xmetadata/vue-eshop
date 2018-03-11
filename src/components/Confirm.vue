<template>
  <div class="confirm">
    <div class="mui-content" id="container">
      <div class="trackFixed">
        <h4>
      <a href="javascript:history.go(-1);"></a>{{ $t("dopay.title") }}
    </h4>
      </div>
      <header class="mui-bar mui-bar-nav">
        <h1 class="mui-title">{{ $t("dopay.mui_title") }}</h1>
      </header>
      <div class="pay_content">
        <div class="pay_image"><img src="../assets/image/pay_image.png" style="width:100%;"></div>
        <div class="pay_success">
          <h2 style="padding:40px 15px 0px; color:#be0000">{{ $t("dopay.pay_success") }}</h2>
          <div style="padding:15px">
            {{ $t("dopay.payNumber") }}：
            <font color="#be0000"> {{ OrderInfo.rtnInfo }}</font>
            <br>
            {{ $t("dopay.payAmount") }}：
            <font color="#be0000">  {{ $t("index.productCoinBefor") }} {{ OrderInfo.orderAmount }}  {{ $t("index.productCoinAfter") }}  </font>
          </div>
          <div style="text-align:left;padding:10px 15px 20px">{{ $t("dopay.notice") }}</div>
          <div align="center" style="padding:0px 15px">
            <button type="button" class="succuss_center_a" onclick="jjavascript:window.location.href='/'">{{ $t("dopay.succuss_center") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Confirm',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapGetters({
      Order: 'Order'
    }),
    OrderInfo () {
      return this.Order
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*订单结果*/
.pay_content {width:100%;height:auto;overflow:auto;background:#fefefe;margin-top:30px;margin-bottom:20px;}
.pay_image {width:20%;height:auto;float:left;padding-top:6%;margin-left:3%;}
.pay_success {width:75%;float:right;height:auto;}
.succuss_center_a {display:inline-block;width:140px;height:40px;text-align:center;color:#fff;border:0;margin-right:10px;text-decoration:none;background:#be0000;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;}
.succuss_center_b {display:inline-block;width:140px;height:40px;text-align:center;color:#EFF804;border:0;text-decoration:none;background:#be0000;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;}
.mui-bar{margin:0 auto;min-width:320px;max-width:640px;}
</style>

<template>
  <div class="comment">
    <div class="detailBlock" id="detialAppraise" style="position:relative;padding-bottom:5px;">
      <h4>{{ $t("index.detialAppraise") }}</h4>
      <!--for comment-->
      <div id="mq">
        <div id="FontScroll" class="wrapper" ref="wrapper">
          <ul class="line">
            <li v-for="comment in goodsComment" :key="comment.comment_id">
              <div id="mq1">
                <div class="reviewTitle">
                  <span class="reviewTitleLeft" style="color:#be0000;">{{ comment.name }}</span>
                  <span class="reviewTitleLeft">
                    {{ $t("index.satisfactions") }}：
                    <font color="#be0000">★★★★★</font></span>
                  <span class="reviewTitleLeft">{{ comment.comment_time }}</span>
                </div>
                <div class="reviewMain">
                  <p>{{ comment.content }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div id="mq2"></div>
      </div>
      <!--for comment-->
      <div class="go-appraise" id="detail-shopping">
        <a class="btnAppr" style="" @click="postComment">{{ $t("index.go_appraise") }}</a>
      </div>
    </div>

    <!--pop  begin-->
    <div :class="hiddenDia ? 'happrbg' : 'apprbg'"></div>
    <div class="appframe">
      <div :class="hiddenDia ? 'happdialog' : 'appdialog'">
        <div class=commentTable>
          <div class="closeBtn" @click="doSubmit"><img src="../assets/image/close.png"></div>
          <div class="commentHd">{{ $t("index.commentHd") }}</div>
          <hr class="seperator">
          <div class="commentTableBox">
            <table>
              <tr>
                <td class="commentTableTd"><span class="require">*</span>{{ $t("index.name") }}:</td>
                <td class="commentTableCell">
                  <input type="text" :placeholder="$t('index.name_placeholder')" class="mui-input-clear input01" name="name" v-model="inputText.name" v-validate="'required'">
                </td>
              </tr>
              <tr>
                <td class="commentTableTd">{{ $t("index.phone") }}:</td>
                <td class="commentTableCell">
                  <input type="text" :placeholder="$t('index.phone_placeholder')" class="input01" name="tel" v-model="inputText.tel" v-validate="'required'">
                </td>
                <tr>
                  <td class="commentTableTd">{{ $t("index.satisfactions") }}:</td>
                  <td class="commentTableCell">
                    <div class="star" id="stars">
                      <span class="star-item" data-id="1"> ★ </span>
                      <span class="star-item" data-id="2"> ★ </span>
                      <span class="star-item" data-id="3"> ★ </span>
                      <span class="star-item" data-id="4"> ★ </span>
                      <span class="star-item" data-id="5"> ★ </span>
                    </div>
                    <input type="hidden" name="star" value="5" v-model="inputText.star" v-validate="'required'">
                  </td>
                </tr>
                <tr>
                  <td class="commentTableTd">{{ $t("index.commentContent") }}:</td>
                  <td class="commentTableCell">
                    <textarea class="textareaStyles" :placeholder="$t('index.comment_placeholder')" name="content" v-model="inputText.content"></textarea>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="tc">
                    <button id="btnAppraise" type="button" @click="doSubmit" class="input_btn01" style="color:white;">
                        {{ $t("index.submit_comment") }}
                      </button>
                  </td>
                </tr>
            </table>
          </div>
        </div>

      </div>
    </div>
    <!--pop  end-->
  </div>
</template>

<script>
import api from '../api'
import BScroll from 'better-scroll'
import { mapGetters } from 'vuex'

export default {
  name: 'Comment',
  data () {
    return {
      hiddenDia: true,
      inputText: {},
      goodsComment: ''
    }
  },
  created: function () {
    let self = this
    api.getComment().then(function (response) {
      self.goodsComment = response.data.result
    })
      .catch(function (error) {
        console.log(error.response.data)
        console.log(error.response.status)
      })
  },
  computed: {
    ...mapGetters({
      Product: 'Product'
    }),
    productInfo () {
      return this.Product
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll('.wrapper')
    })
  },
  methods: {
    doSubmit: function () {
      this.hiddenDia = true
    },
    postComment: function () {
      this.hiddenDia = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.apprbg {position:fixed;z-index:99998; width:100%; height:100%; background:black; padding:0px; bottom:0px; margin:0px; opacity:0.7; max-width: 640px;}
.happrbg {display:none;position:fixed;z-index:99998; width:100%; height:100%; background:black; padding:0px; bottom:0px; margin:0px; opacity:0.7; max-width: 640px;}
.appframe {width: 100%;max-width:640px;clear: both;position: relative;}
.appdialog {position: fixed; z-index: 99999; width:100%; height: 500px; padding:0 5%; top: 16%; max-width: 640px;}
.happdialog {display:none;position: fixed; z-index: 99999; width:100%; height: 500px; padding:0 5%; top: 16%; max-width: 640px;}
</style>

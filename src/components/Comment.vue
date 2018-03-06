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
  </div>
</template>

<script>
import api from '../api'
import BScroll from 'better-scroll'
import { MessageBox } from 'mint-ui'
import { mapGetters } from 'vuex'

export default {
  name: 'Comment',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
    postComment: function () {
      MessageBox({
        title: this.$i18n.t('index.commentHd'),
        message: this.$i18n.t('index.commentHd'),
        showCancelButton: true,
        showInput: true,
        confirmButtonText: this.$i18n.t('index.submit_comment'),
        cancelButtonText: this.$i18n.t('index.cancel')
      }).then(({ value, action }) => {
        let data = {
          goodsId: this.productInfo.Goods.goods_id,
          name: '',
          tel: '',
          star: '5',
          content: value,
          commentPhoto: ''
        }
        api.addComment(data).then(function (response) {
          MessageBox({
            title: this.$i18n.t('index.diolog'),
            message: this.$i18n.t('index.sure')
          })
        })
          .catch(function (error) {
            console.log(error.response.data)
            console.log(error.response.status)
          })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

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
        <a class="btnAppr" style="">{{ $t("index.go_appraise") }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import BScroll from 'better-scroll'

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
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll('.wrapper')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

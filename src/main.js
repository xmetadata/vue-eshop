// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { i18n, loadLanguageAsync } from './assets/i18n-setup'
import VeeValidate, { Validator } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja'
import zhHK from 'vee-validate/dist/locale/en'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import msMY from 'vee-validate/dist/locale/ms_MY'
import store from './store/index'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.prototype.$axios = axios
Vue.use(VeeValidate)

if (Vue.config.productionTip) {
  var lang = ''
  var host = window.location.host
  var domainName = host.match(/(\w+)\.(\w+\.\w+)/)[2]
  switch (domainName) {
    case 'etlobby.com':
      lang = 'ja'
      Validator.localize(lang, ja)
      break
    case 'fitanow.com':
      lang = 'zh_HK'
      Validator.localize(lang, zhHK)
      break
    case 'hiqushop.com':
      lang = 'zh_TW'
      Validator.localize(lang, zhTW)
      break
    case 'couposhop.com':
      lang = 'ms_MY'
      Validator.localize(lang, msMY)
      break
    default:
      lang = 'ja'
      Validator.localize(lang, ja)
  }
  router.beforeEach((to, from, next) => {
    loadLanguageAsync(lang).then(() => next())
  })
} else {
  // default language ja
  lang = 'ja'
  Validator.localize(lang, ja)
  router.beforeEach((to, from, next) => {
    loadLanguageAsync(lang).then(() => next())
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Comment from '@/components/Comment'
import Buy from '@/components/Buy'
import Confirm from '@/components/Confirm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          component: Comment
        }
      ]
    }, {
      path: '/buy',
      name: 'Buy',
      component: Buy
    }, {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Order from '@/components/Order'
import Confirm from '@/components/Confirm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/order',
      name: 'Order',
      component: Order
    }, {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm
    }
  ]
})

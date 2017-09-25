import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Goods from '../components/goods/goods'
import Ratings from '../components/ratings/ratings'
import Seller from '../components/seller/seller'

Vue.use(Router)

export default new Router({
  // 设置链接激活时使用的 CSS 类名
  linkActiveClass:"active",
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ]
})

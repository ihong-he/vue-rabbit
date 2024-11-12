import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/subCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [{
        path: '',
        name: 'Home',
        component: Home,
      },
      // 一级分类路由，携带动态参数params
      {
        path: '/category/:id',
        name: 'Category',
        component: Category,
      },
      // 二级分类路由，携带动态参数params
      {
        path: '/category/sub/:id',
        name: 'SubCategory',
        component: SubCategory,
      },
      // 商品详情路由，携带动态参数params
      {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail,
      },
      // 购物车列表路由
      {
        path: '/cartlist',
        name: 'CartList',
        component: CartList,
      },
      // 订单路由
      {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
      },
      // 支付路由
      {
        path: '/pay',
        name: 'Pay',
        component: Pay,
      },
      // 支付结果路由
      {
        path: '/paycalback',
        name: 'PayBack',
        component: PayBack,
      },
      // 个人中心路由
      {
        path: '/member',
        name: 'Member',
        redirect: '/member/user', // 默认跳转我的信息
        component: Member,
        children: [
          // 个人中心-我的信息路由
          {
            path: 'user',
            name: 'UserInfo',
            component: UserInfo,
          },
          // 个人中心-我的订单路由
          {
            path: 'order',
            name: 'UserOrder',
            component: UserOrder,
          },
        ]
      },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  // 更新路由自动滚动到顶部
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router

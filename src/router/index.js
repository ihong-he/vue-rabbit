import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/subCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'

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

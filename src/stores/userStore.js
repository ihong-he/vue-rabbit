import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
// 引入路由器实例
import router from '@/router/index'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

// 获取用户信息store
export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref({})
  // 获取购物车store
  const cartStore = useCartStore()
  // 获取用户信息方法
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    if (res.code == 1) {
      // 1. 给userInfo赋值
      userInfo.value = res.result
      // 合并购物车数据
      await mergeCartAPI(cartStore.cartList.map(item => {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count
        }
      }))
      // 刷新购物车数据
      cartStore.getCartList()
      // 2. 提示用户
      ElMessage({ type: 'success', message: '登录成功' })
      console.log('router:', router.currentRoute._value.query.redirect);
      // 获取当前页面query参数
      const query = router.currentRoute._value.query.redirect
      // 3. 跳转页面
      router.replace({ path: query || '/' })
    }

  }

  // 清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 清除购物车数据
    cartStore.clearCart()
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true,
})

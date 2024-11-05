import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
// 引入路由器实例
import router from '@/router/index'

// 获取用户信息store
export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref({})
  // 获取用户信息方法
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    if (res.code == 1) {
      // 1. 给userInfo赋值
      userInfo.value = res.result
      // 2. 提示用户
      ElMessage({ type: 'success', message: '登录成功' })
      // 3. 跳转首页
      router.replace({ path: '/' })
    }

  }

  // 清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true,
})

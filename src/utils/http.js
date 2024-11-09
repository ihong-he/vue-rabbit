import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
instance.interceptors.request.use(config => {
  const userStore = useUserStore()
  // 在请求头中配置token
  config.headers.Authorization = `Bearer ${userStore.userInfo.token}`
  return config
}, err => Promise.reject(err))

// axios响应式拦截器
instance.interceptors.response.use(res => res.data,
  err => {
    // 统一错误提示
    ElMessage({ type: 'error', message: err.response.data.message })
    console.log('err:', err);
    if(err.response.status === 401) {
      // 清空用户信息
      const userStore = useUserStore()
      userStore.clearUserInfo()
      // 跳转到登录页
      router.push('/login')
    }
    return Promise.reject(err)
  })

// 默认导出instance
export default instance


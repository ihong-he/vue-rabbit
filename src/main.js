import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// 引入初始化样式文件
import "@/styles/common.scss"
// 引入自定义指令
import { lazyPlugin } from '@/directives'
// 引入全局组件
import { componentPlugin } from '@/components/index.js'
// 引入Pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
// 注册pinia插件
pinia.use(piniaPluginPersistedstate)
app.use(router)
// 注册指令
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')

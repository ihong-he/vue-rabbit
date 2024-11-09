<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted } from 'vue'
// 引入store实例
const categoryStore  = useCategoryStore()

onMounted(() => {
  // 执行action方法
  categoryStore.getCategoryList()
})

</script>

<template>
  <!-- 吸顶导航组件 -->
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 主体内容区域 -->
   <!-- 添加key，破坏路由缓存机制 -->
  <!-- <RouterView :key="$route.fullPath"/> -->
  <RouterView />
  <LayoutFooter />
</template>

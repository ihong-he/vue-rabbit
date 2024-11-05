import { getCategory } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  // 业务逻辑
  const categoryData = ref({})
  const route = useRoute()
  // id = route.params.id: 给id设置一个默认值，调用不传参时生效
  const getCategoryData = (id = route.params.id) => {
    getCategory(id).then(res => {
      console.log(res);
      categoryData.value = res.result
    }).catch(err => {
      console.log(err);
    })
  }

  // 添加一个导航守卫，路由被更新会触发
  onBeforeRouteUpdate((to) => {
    // console.log('路由更新了', to.params.id);

    // 调用分类接口
    getCategoryData(to.params.id)
  })

  onMounted(() => {
    getCategoryData()
  })

  // 返回需要的值
  return {
    categoryData
  }
}


import { getBanner } from '@/apis/home'
import { ref, onMounted } from 'vue'

export function useBanner() {
  // 业务逻辑
  const bannerList = ref([])
  const getBannerList = () => {
    getBanner({ distributionSite: '2' }).then(res => {
      console.log(res);
      bannerList.value = res.result
    }).catch(err => {
      console.log(err);

    })
  }

  onMounted(() => {
    getBannerList()
  })
  // 返回需要的值
  return {
    bannerList
  }
}

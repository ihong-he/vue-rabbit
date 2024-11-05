import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  let categoryList = ref([])

  const getCategoryList = () => {
    getCategoryAPI().then(res => {
      console.log(res);
      categoryList.value = res.result
    }).catch(err => {
      console.log(err);

    })
  }

  return { categoryList, getCategoryList }
})

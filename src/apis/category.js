import http from '@/utils/http'

/**
 * @description: 获取一级分类列表
 * @param {*}
 * @return {*}
 */
export function getCategory(id) {
  return http({
    url: '/category',
    method: 'get', // get请求可不写
    params: { id }
  })
}

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return http({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

/**
 * @description: 获取商品数据
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */
   export const getSubCategoryAPI = (data) => {
    return http({
      url:'/category/goods/temporary',
      method:'POST',
      data
    })
  }

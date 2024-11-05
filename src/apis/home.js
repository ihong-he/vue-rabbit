import http from '@/utils/http'

/**
 * @description: 获取首页banner图
 * @param {*}
 * @return {*}
 */
export function getBanner(params = {}) {
  // 解构赋值，并且设置默认值
  const { distributionSite = '1' } = params
  return http({
    url: '/home/banner',
    methods: 'get',
    params: {
      distributionSite
    }
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return http({
    url: '/home/new'
  })
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const findHotAPI = () => {
  return http({
    url: '/home/hot'
  })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return http({
    url: '/home/goods'
  })
}

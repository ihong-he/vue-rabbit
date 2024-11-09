import http from '@/utils/http'

// 加入购物车
export const addCartAPI = (data) => {
  return http({
    url:'/member/cart',
    method:'post',
    data
  })
}

// 获取购物车列表
export const getCartListAPI = () => {
  return http({
    url:'/member/cart'
  })
}

// 删除购物车数据
export const delCartAPI = (ids) => {
  return http({
    url:'/member/cart',
    method:'delete',
    data:ids
  })
}

// 合并本地购物车到服务器
export const mergeCartAPI = (data) => {
  return http({
    url:'/member/cart/merge',
    method:'post',
    data
  })
}
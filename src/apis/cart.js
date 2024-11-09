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
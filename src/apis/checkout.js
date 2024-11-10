import http from '@/utils/http'

// 获取订单信息
export const getOrderInfoAPI = () => {
  return http({
    url:'/member/order/pre'
  })
}
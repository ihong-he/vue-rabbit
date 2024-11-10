import http from '@/utils/http'

// 获取订单信息
export const getOrderInfoAPI = () => {
  return http({
    url:'/member/order/pre'
  })
}

// 提交订单
export const submitOrderAPI = (data) => {
  return http({
    url:'/member/order',
    method:'post',
    data
  })
}
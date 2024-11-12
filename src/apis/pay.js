import http from '@/utils/http'

// 获取支付订单信息
export function getPayOrderInfoAPI (id) {
  return http({
    url: `/member/order/${id}`,
    method: 'get'
  })
}
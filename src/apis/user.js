import http from '@/utils/http'

/**
 * @description: 获取登录用户名密码方式
 * @param {*}
 * @return {*}
 */
export function loginAPI({ account, password }) {
  return http({
    url: '/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

// 获取喜欢数据
export const getLikeListAPI = ({ limit = 4 }) => {
  return http({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}

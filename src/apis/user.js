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

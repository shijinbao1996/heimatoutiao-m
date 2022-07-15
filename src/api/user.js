import request from '@/utils/request'

/**
 * 登录     /** 快捷键 便于留出基本信息
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: { mobile, code }
  })
}

/**
 *
 * @param {String} mobile 手机号
 * @returns promise
 */
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

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

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}

/**
 *
 * @param {String} target 关注用户的id
 * @returns Promise
 */
export const getUserFollowings = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *
 * @param {String} target 取关用户的id
 * @returns Promise
 */
export const getUserUnFollowings = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'delete'
  })
}

/**
 *
 * @param {*}  获取用户个人资料
 * @returns
 */
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

export const editUserProfile = (name, gender, birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      gender,
      birthday
    }
  })
}

export const editUserPhoto = (photo) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH', // patch通过data传参
    data: photo // photo文件 不用花括号包裹
  })
}

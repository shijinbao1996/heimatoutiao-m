import request from '@/utils/request'

/**
 *
 * @param {String} type 文章类型
 * @param {Number} source 文章或评论id
 * @returns Promise
 */
export const getComments = (type, source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset
    }
  })
}

/**
 *
 * @param {String} target 评论的目标id
 * @param {String} content 评论内容
 * @param {String} id 文章id
 * @returns
 */
export const addComments = (target, content, id) => {
  return request({
    url: '/v1_0/comments',
    data: { target, content, art_id: id },
    method: 'post'
  })
}

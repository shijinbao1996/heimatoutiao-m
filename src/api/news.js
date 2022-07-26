import request from '@/utils/request'

/**
 *
 * @param {*} id channelId 频道的id
 * @param {*} timestamp 获取第一页的文章的时间戳
 * @returns Promise
 */
export const getMyArticleList = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}

/**
 *
 * @param {Number} id 文章id
 * @returns Promise
 */
export const getMyNewsDetail = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

/**
 * POST
 * @param {String} target 收藏的目标文章id
 * @returns Promise
 */
export const addCollections = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'post',
    data: {
      target
    }
  })
}

/**
 *
 * @param {String} target 取消收藏的文章的id
 * @returns
 */
export const removeCollections = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {Number} target 点赞的文章id
 * @returns
 */
export const addLiking = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *
 * @param {Number} target 取消点赞的文章id
 * @returns
 */
export const removeLiking = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {String} target 点赞的评论id
 * @returns
 */
export const addCommLiking = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *
 * @param {String} target 取消点赞的评论id
 * @returns
 */
export const removeCommLiking = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

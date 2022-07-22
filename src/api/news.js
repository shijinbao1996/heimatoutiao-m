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

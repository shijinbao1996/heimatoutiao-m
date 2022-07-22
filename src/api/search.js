import request from '@/utils/request'
import storage from '@/utils/storage'

// 获取搜素建议
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 *
 * @param {String} q 搜索关键词
 * @returns Promise
 */
// 获取搜索结果
export const getSearchResult = (q, page) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}

// 在本地存储中存和取我的搜索历史的数据
const HEIMA_TOUTIAO_SEARCHHISTORY = 'HEIMA_TOUTIAO_SEARCHHISTORY'

export const getMySearchHistoryByLocal = () =>
  storage.get(HEIMA_TOUTIAO_SEARCHHISTORY)

export const setMySearchHistoryToLocal = (history) =>
  storage.set(HEIMA_TOUTIAO_SEARCHHISTORY, history)

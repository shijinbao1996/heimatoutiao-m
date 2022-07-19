import Vue from 'vue'
import Vuex from 'vuex'

import { getToken, setToken } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  // user: [token)
  // user.token
  // null. token 报错
  // {}.token undifined
  state: {
    // 声明token
    user: getToken() || {}
  },
  getters: {},
  // 修改数据的地方
  mutations: {
    setUser(state, payload) {
      state.user = payload
      //  为了防止刷新丢失，我们需要把token数据备份到木地存储
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})

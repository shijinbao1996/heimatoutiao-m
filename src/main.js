import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入iconfont
import '@/assets/fonts/iconfont.css'
// 引入 vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'

import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

// 直接引入会默认去 node_modules 中找文件
import 'amfe-flexible/index.min.js'

// 代码高亮
Vue.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

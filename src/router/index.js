import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login') // 路由懒加载
  }
]

const router = new VueRouter({
  routes
})

export default router

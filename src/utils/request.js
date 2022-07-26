// 引入axios
import axios from 'axios'
import store from '@/store'
// 配置axios的默认配置
// 创建一个全新的axios的对象,克隆

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 拦截器
// -请求拦截器
// -每一次请求都会执行的函数
// -响应拦截器
// -每一个请求响应回来时,都会执行的函数
request.interceptors.request.use(
  // 想在发送请求前做什么
  // config 本次请求的配置
  // 必须要返回出去
  (config) => {
    const token = store.state.user.token
    if (token) {
      // 配置请求头
      config.headers.Authorization = `Bearer ${token}` // 封装获取用户信息请求 注意加Bearer, Bearer后有空格
    }
    // console.log(config)
    return config
  },
  // 请求错误的时候,处理的方法
  (error) => {
    return Promise.reject(error)
  }
)

export default request

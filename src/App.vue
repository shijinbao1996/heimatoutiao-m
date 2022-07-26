<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    // 查看请求相关配置信息 default里面的baseURL和timeout
  }
}
</script>

<style lang="less">
// 动态设置的 rootValue 要写在外联样式表里，写成行内样式不生效
</style>

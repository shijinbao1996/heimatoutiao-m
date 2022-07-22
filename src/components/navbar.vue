<template>
  <div>
    <van-nav-bar
      :title="title"
      class="navBar"
      left-arrow
      @click-left="$router.go(-1)"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.navBar {
  background-color: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
}
</style>

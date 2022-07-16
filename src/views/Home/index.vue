<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round>
          <van-icon name="search"></van-icon>
          搜索
        </van-button>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
</style>

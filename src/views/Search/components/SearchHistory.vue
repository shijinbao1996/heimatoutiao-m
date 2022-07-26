<template>
  <div class="searchHistory">
    <van-cell>
      <template #title>
        <span>搜索历史</span>
      </template>
      <template #right-icon>
        <van-icon name="delete-o" @click="iconBtn" v-if="isShow" />
        <div v-else>
          <span @click.stop="delAll">全部删除</span>
          <span @click.stop="isShow = true">完成</span>
        </div>
      </template>
    </van-cell>

    <van-cell
      v-for="(item, index) in searchHistoryLs"
      :key="index"
      @click="findMore(item)"
    >
      <template #title>
        <span>{{ item }}</span>
      </template>
      <template #right-icon>
        <van-icon name="close" v-if="!isShow" @click.stop="delBtn(item)" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getMySearchHistoryByLocal } from '@/api'

export default {
  data() {
    return {
      searchHistoryLs: [],
      isShow: true
    }
  },
  methods: {
    async getMySearchHistoryByLocal() {
      const res = await getMySearchHistoryByLocal()
      this.searchHistoryLs = res
    },
    iconBtn() {
      this.isShow = false
    },
    // 删除单项搜索历史
    delBtn(item) {
      this.$parent.offSearch(item)
    },
    // 删除全部搜索历史
    delAll() {
      this.$parent.clearAll()
    },
    // 点击搜索历史，发现文章
    findMore(item) {
      console.log(item)
      this.$parent.keywords = item
      this.$parent.onSearch()
    }
  },
  created() {
    this.getMySearchHistoryByLocal()
  }
}
</script>

<style lang="less" scoped></style>

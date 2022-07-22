<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="出错了,请重新加载"
      >
        <!-- 文章每一项 -->
        <van-cell
          v-for="(item, index) in searchRes"
          :key="index"
          :title="item.title"
        >
          <template #title>
            <span v-html="item.title"></span>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchRes: [],
      isFinished: false,
      page: 1,
      loading: false,
      refreshing: false,
      error: false
    }
  },
  methods: {
    // 获取搜索结果
    async getSearchResult() {
      try {
        const { data } = await getSearchResult(this.keywords)
        // console.log(data)
        this.searchRes = data.data.results
        this.page = data.data.page
        console.log(this.page)
        console.log(this.searchRes)
      } catch (error) {
        console.log(error)
      }
    },
    // 加载下一页搜索结果
    async loadNextPage() {
      try {
        const { data } = await getSearchResult(this.keywords, ++this.page)
        if (data.data.results.length === 0) {
          this.isFinished = true
        }
        console.log(data)
        this.searchRes.push(...data.data.results)
        console.log(this.searchRes)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  },
  created() {
    this.getSearchResult()
  }
}
</script>

<style></style>

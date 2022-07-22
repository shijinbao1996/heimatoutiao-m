<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="visibleSearchSuggestion"
        background="#3296fa"
        class="search"
      />
    </form>
    <!-- 搜索结果/历史/建议 -->
    <!-- <searchHistory />
    <searchResult />
    <searchSuggestion /> -->

    <!-- 动态组件 -->
    <component :is="componentName" :keywords="keywords" :bbs="searchHistoryLs">
    </component>
  </div>
</template>

<script>
import searchHistory from './components/SearchHistory.vue'
import searchResult from './components/SearchResult.vue'
import searchSuggestion from './components/SearchSuggestion.vue'
import { getMySearchHistoryByLocal, setMySearchHistoryToLocal } from '@/api'
export default {
  data() {
    return {
      keywords: '',
      isShowSearchResult: false,
      arr: [],
      searchHistoryLs: []
    }
  },
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  methods: {
    // 获取本地存储的搜索历史列表
    async getMySearchHistoryByLocal() {
      const res = await getMySearchHistoryByLocal()
      this.searchHistoryLs = res
    },
    // 事件在点击键盘上的搜索/回车按钮后触发
    // 输入关键词后回车：返回搜索到的文章，并在搜索历史记录
    onSearch() {
      console.log('onsearch')
      // if (this.searchHistoryLs) {
      //   this.arr = this.searchHistoryLs
      // }
      this.searchHistoryLs.unshift(this.keywords)
      const res = Array.from(new Set(this.searchHistoryLs))
      setMySearchHistoryToLocal(res)

      this.isShowSearchResult = true
    },
    // 删除单项搜索历史
    offSearch(item) {
      this.arr.splice(this.arr.indexOf(item), 1)
      setMySearchHistoryToLocal(this.arr)
      this.getMySearchHistoryByLocal()
    },
    // 清空搜索历史
    clearAll() {
      this.arr = []
      setMySearchHistoryToLocal(this.arr)
    },
    // 事件在点击搜索框右侧取消按钮时触发。
    onCancel() {
      this.$router.go(-1)
    },
    // 显示搜索建议
    visibleSearchSuggestion() {
      this.isShowSearchResult = false
    }
  },
  computed: {
    componentName() {
      if (this.keywords.trim() === '') {
        return 'searchHistory'
      }
      if (this.isShowSearchResult) {
        return 'searchResult'
      }
      return 'searchSuggestion'
    }
  },
  created() {
    this.getMySearchHistoryByLocal()
  }
}
</script>

<style scoped lang="less">
.van-search__action {
  color: #fff;
}
</style>

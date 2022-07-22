<template>
  <div>
    <van-cell
      :title="item"
      v-for="(item, index) in highlightData"
      :key="index"
      @click="searchSuggestionBtn(index)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
export default {
  data() {
    return {
      suggestions: [],
      searchHistoryLs: [],
      arr: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    // 监视属性绑定的函数，如果是methods里面的话，支持字符串写法
    keywords: {
      // 立即监视
      immediate: true,
      handler() {
        // keywords变化就会执行
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    // 获取本地存储的搜索历史列表
    // 获取搜索建议，并处理数据
    async getSearchSuggestion() {
      try {
        const res = await getSearchSuggestion(this.keywords)
        this.suggestions = res.data.data.options.filter(Boolean) // 避免控制台报错，方法一，判断并返回数组内的真值，
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 鼠标点击历史记录
    searchSuggestionBtn(index) {
      this.$parent.isShowSearchResult = true
      this.$parent.keywords = this.suggestions[index]
      this.$parent.onSearch()
    }
  },
  computed: {
    highlightData() {
      // 常规正则 无法动态绑定数据
      // 动态正则 一参：数据，二参：正则
      const reg = new RegExp(this.keywords, 'ig')
      // map映射 将每一项str处理
      return this.suggestions.map(
        (str) =>
          str?.replace(
            reg,
            (match) => `<span style="color:red">${match}</span>`
          ) // replace方法 第一个参数可传正则，  避免控制台报错，方法二，str？可选链操作符，若str为假值，后续链条不再执行，
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>

<template>
  <div>
    <!-- 每一篇文章的结构 -->
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
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
          :artId="item.art_id"
          :articles="articles"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 引入接口
import { getMyArticleList } from '@/api'
// 引入组件
import ArticleItem from './ArticleItem.vue'
export default {
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshing: false
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    // 获取频道的文章并且处理文章数据
    async getMyArticleList() {
      // 页面一开始,加载第一页数据
      try {
        const { data } = await getMyArticleList(this.id, Date.now())
        this.pre_timestamp = data.data.pre_timestamp
        console.log(data)
        this.articles = data.data.results
      } catch (err) {
        const status = err.response.status
        if (status === 400) {
          // 抛出捕获到的错误
          throw new Error(err.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败,请重新刷新')
        }
      }
    },
    async loadNextPage() {
      // 加载下一页数据
      try {
        // 模拟错误
        if (Math.random() < 0.7) {
          throw new Error('错误了')
        }
        // 滚动条触底,加载下一页数据
        const { data } = await getMyArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        console.log(data.data.pre_timestamp)
        // 判断上拉刷新还是下拉刷新
        if (this.refreshing) {
          // 下拉刷新
          this.articles.unshift(...data.data.results)
        } else {
          // 上拉刷新 将第n页的数据，放在articles
          this.articles.push(...data.data.results)
        }
        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally语句一定会执行
        this.loading = false
        this.refreshing = false
      }
    }
  },
  props: {
    id: {
      type: [String, Number],
      requires: true
    }
  },
  created() {
    this.getMyArticleList()
  }
}
</script>

<style></style>

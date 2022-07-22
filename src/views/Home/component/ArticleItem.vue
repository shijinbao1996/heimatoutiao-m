<template>
  <!-- 封装的复用组件 -->
  <div @click="moreDetail">
    <!-- 渲染0图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />

    <!-- 渲染1图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>

    <!-- 渲染3图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <template #label>
        <div>
          <van-image
            v-for="item in articleInfo.cover.images"
            :key="item"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <!-- 文章描述 -->
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    },
    artId: {
      type: String,
      required: true
    }
  },
  methods: {
    moreDetail() {
      this.$router.push({
        path: '/detail',
        query: {
          article_id: this.artId
        }
      })
    }
  },
  computed: {
    articleDesc() {
      const art = this.articleInfo
      const relativeTime = dayjs(art.pubdate).fromNow() // dayjs npm包
      return `${art.aut_name} ${art.comm_count}评论 ${relativeTime}`
    }
  }
}
</script>

<style scoped lang="less"></style>

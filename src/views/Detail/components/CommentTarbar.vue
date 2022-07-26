<template>
  <div>
    <!-- 底部tarBar -->
    <van-tabbar>
      <!-- 底部弹出层 -->

      <!-- 未触发状态 -->
      <van-button round>
        <van-cell @click="showPopup">
          <span>写评论</span>
        </van-cell>
      </van-button>
      <!-- 触发状态 -->
      <van-popup v-model="show" position="bottom">
        <div class="comment-post">
          <div class="post-field">
            <van-cell-group>
              <van-field
                v-model="value"
                class="van-field__control"
                placeholder="请输入用户名"
                type="textarea"
                maxlength="50"
                :border="false"
                @input="countNum"
              />
              <div class="word-limit">
                <span class="word-num">{{ stringNum }}</span
                >/50
              </div>
            </van-cell-group>
          </div>

          <van-button size="mini" class="pubBtn" color="#fff" @click="pubBtn">
            <span>发布</span>
          </van-button>
        </div>
      </van-popup>

      <!-- 底部功能图标 -->
      <van-tabbar-item :badge="commCount">
        <template #icon>
          <van-icon name="comment-o" color="#777777" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <van-icon
            :name="isCollected ? 'star' : 'star-o'"
            :color="isCollected ? '#3296fa' : ''"
            @click="isCollection"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <van-icon
            :name="attitudess === 1 ? 'good-job' : 'good-job-o'"
            :color="attitudess === 1 ? '#3296fa' : ''"
            @click="isLiking"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <template #icon>
          <van-icon name="share-o" color="#777777" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {
  addComments,
  addLiking,
  removeLiking,
  addCollections,
  removeCollections
} from '@/api'

export default {
  data() {
    return {
      show: false,
      value: '',
      stringNum: '0',
      collectionsLs: [],
      attitudess: '',
      isCollected: ''
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    countNum() {
      this.stringNum = this.value.length
    },
    // 发布按钮
    async pubBtn() {
      if (this.value.trim().length === 0) {
        return this.$toast.fail('请输入内容')
      }
      const {
        data: { data }
      } = await addComments(this.articleId, this.value)
      console.log(data)
      this.value = ''
      this.show = false
      this.$emit('getCommentInfo', data)
    },
    // 点赞按钮
    async isLiking() {
      console.log(this.attitudess)
      if (this.attitudess === 1) {
        // 初始状态已点赞
        try {
          const res = await removeLiking(this.articleId)
          // this.attitudess = !this.attitude
          console.log(res)
          console.log(this.attitudess)
          this.$toast.success('取消点赞成功')
          this.attitudess = 0
        } catch (error) {
          console.log(error)
        }
      } else {
        // 初始状态未点赞
        try {
          await addLiking(this.articleId)
          this.$toast.success('点赞成功')
          this.attitudess = 1
        } catch (error) {
          console.log(error)
        }
      }
    },
    // 收藏按钮
    async isCollection() {
      console.log(this.isCollected)
      if (this.isCollected) {
        // 已收藏状态
        const res = await removeCollections(this.articleId)
        console.log(res)
        this.$toast.success('取消收藏成功')
        this.isCollected = !this.isCollected
      } else {
        // 未收藏状态
        const res = await addCollections(this.articleId)
        console.log(res)
        this.$toast.success('收藏成功')
        this.isCollected = !this.isCollected
      }
    }
  },
  props: {
    articleId: {
      required: true,
      type: String
    },
    commCount: {
      required: true,
      type: Number
    },
    attitude: {
      required: true,
      type: Number
    },
    is_collected: {
      required: true,
      type: Boolean
    }
  },
  created() {
    this.attitudess = this.attitude
    this.isCollected = this.is_collected
    console.log(this.isCollected)
  }
}
</script>

<style lang="less" scoped>
// 底部tabbar
.van-tabbar {
  display: flex;
  align-items: center;
  /deep/.van-button {
    width: 3.76rem;
    height: 0.64333rem;
    border: 0.02667rem solid #eee;
    font-size: 0.4rem;
    line-height: 0.61333rem;
    margin-bottom: 5px;
    margin-left: 15px;
    padding: 0 0.21333rem;
    // 写评论按钮
    .van-cell__value {
      span {
        color: #a7a7a7;
      }
    }
  }
}
// .star_color {
//   background: #3296fa;
// }
// 弹出层触发状态
.van-popup {
  .comment-post {
    display: flex;
    align-items: center;
    padding: 0.42667rem 0 0.42667rem 0.42667rem;

    .post-field {
      background: #f5f7f9;
      flex: 1;
      padding: 0.42667rem 0 0.42667rem 0.42667rem;
      .van-cell-group {
        background: #f5f7f9;
        .van-field__control {
          font-size: 16px;
        }
      }
      .word-limit {
        color: #646566;
        font-size: 0.32rem;
        line-height: 0.42667rem;
        text-align: right;
        margin-right: 25px;
      }
    }
    /deep/.pubBtn {
      width: 1.46rem;
      span {
        color: #b5d1ec;
      }
    }
  }
}
</style>

<template>
  <div>
    <!-- 头部 -->
    <navbar :title="title"></navbar>

    <!-- 点击一级回复触发的 弹出层 -->
    <van-popup
      closeable
      v-model="firstShow"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 弹出层的头部 -->
      <van-nav-bar
        :title="
          dataItem.reply_count ? `${dataItem.reply_count}条回复` : '暂无回复'
        "
        class="navbarColor"
      />
      <!-- 点击一级回复后 层主的评论 -->
      <van-cell class="comment-item">
        <div class="img-wrap">
          <van-image
            class="van-image__img"
            round
            cover
            width="1rem"
            height="1rem"
            :src="dataItem.aut_photo"
          />
        </div>
        <div class="van-cell__title">
          <div class="title-wrap">
            <div class="user-name">{{ dataItem.aut_name }}</div>
            <van-button type="default" size="mini" class="like-btn">
              <van-icon name="good-job-o" />
              <p>{{ dataItem.like_count ? dataItem.like_count : '赞' }}</p>
            </van-button>
          </div>
          <div class="van-cell__label">
            <p class="comment-content">{{ dataItem.content }}</p>
            <div class="bottom-info">
              <span>{{ dataItem.pubdate | filterTime }}</span>
              <van-button type="default" size="small" round
                >回复 {{ dataItem.reply_count }}</van-button
              >
            </div>
          </div>
        </div>
      </van-cell>
      <van-cell title="全部回复" size="large" />
      <!-- 二级评论（评论层主的评论） -->
      <van-list
        v-model="loading"
        loading-text="加载中，请稍候"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadNextPage"
        :error.sync="error"
        error-text="出错了,请重新加载"
        :immediate-check="immediateCheck"
      >
        <van-cell
          v-for="(item, index) in secCommArr"
          :key="index"
          class="comment-item"
        >
          <div class="img-wrap">
            <van-image
              class="van-image__img"
              round
              cover
              width="1rem"
              height="1rem"
              :src="item.aut_photo"
            />
          </div>
          <div class="van-cell__title">
            <div class="title-wrap">
              <div class="user-name">{{ item.aut_name }}</div>
              <van-button type="default" size="mini" class="like-btn">
                <van-icon name="good-job-o" />
                <p>{{ item.like_count ? item.like_count : '赞' }}</p>
              </van-button>
            </div>
            <div class="van-cell__label">
              <p class="comment-content">{{ item.content }}</p>
              <div class="bottom-info">
                <span>{{ item.pubdate | filterTime }}</span>
                <van-button type="default" size="small" round
                  >回复 {{ item.reply_count }}</van-button
                >
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
      <!-- 二级评论按钮 可写评论-->
      <div class="post-warp">
        <van-button round class="secCommBtn" @click="showPopup">
          <van-cell>
            <span>评论</span>
          </van-cell>
        </van-button>
      </div>
      <!-- 触发状态 -->
      <van-popup v-model="secCommShow" position="bottom">
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
    </van-popup>
    <div class="main-wrap">
      <!-- 文章标题 -->
      <h1 class="article-title">{{ newsDetailObj.title }}</h1>
      <!-- 用户信息 -->
      <van-cell class="user-info">
        <div class="avatar">
          <van-image
            class="van-image__img"
            round
            cover
            width="1rem"
            height="1rem"
            :src="newsDetailObj.aut_photo"
          />
        </div>
        <div class="title-left">
          <div class="user-name">{{ newsDetailObj.aut_name }}</div>
          <div class="user-label">{{ newsDetailObj.pubdate | filterTime }}</div>
        </div>
        <div class="value-right">
          <van-button
            type="info"
            round
            size="small"
            class="btn-right"
            @click="followBtn"
            v-if="!is_followed"
            >+ 关注</van-button
          >
          <van-button
            type="default"
            round
            size="small"
            class="btn-right1 btn-right"
            @click="unFollowBtn"
            v-else
            >已关注</van-button
          >
        </div>
      </van-cell>
      <!-- 文章内容 -->
      <article
        v-html="newsDetailObj.content"
        v-highlight
        class="markdown-body article-content"
      ></article>
      <!-- 分割线 -->
      <van-divider>正文结束</van-divider>
      <!-- 一级评论 -->
      <van-list
        v-model="loading"
        loading-text="加载中，请稍候"
        :finished="finished"
        finished-text="没有更多了"
        @load="loadNextPage"
        :error.sync="error"
        error-text="出错了,请重新加载"
        :immediate-check="immediateCheck"
      >
        <van-cell
          v-for="(item, index) in resultsLs"
          :key="index"
          class="comment-item"
        >
          <div class="img-wrap">
            <van-image
              class="van-image__img"
              round
              cover
              width="1rem"
              height="1rem"
              :src="item.aut_photo"
            />
          </div>
          <div class="van-cell__title">
            <div class="title-wrap">
              <div class="user-name">{{ item.aut_name }}</div>
              <van-button
                type="default"
                size="mini"
                class="like-btn"
                @click="goodBtn(item.com_id, index)"
              >
                <van-icon name="good-job-o" />
                <p>{{ item.like_count ? item.like_count : '赞' }}</p>
              </van-button>
            </div>
            <div class="van-cell__label">
              <p class="comment-content">{{ item.content }}</p>
              <div class="bottom-info">
                <span>{{ item.pubdate | filterTime }}</span>
                <van-button
                  type="default"
                  size="small"
                  round
                  @click="getResComments(item)"
                  >回复 {{ item.reply_count }}</van-button
                >
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
    <CommentTarbar
      v-if="attitude === 1 || attitude === 0 || attitude === -1"
      :articleId="art_id"
      :commCount="comm_count"
      :attitude="attitude"
      :is_collected="is_collected"
      @getCommentInfo="commentInfo"
    ></CommentTarbar>
  </div>
</template>

<script>
import navbar from '../../components/navbar.vue'
import CommentTarbar from './components/CommentTarbar.vue'
import {
  getMyNewsDetail,
  getComments,
  getUserFollowings,
  getUserUnFollowings,
  addComments,
  addCommLiking,
  removeCommLiking
} from '@/api'
import 'github-markdown-css/github-markdown.css' // 文章渲染插件
import dayjs from '@/utils/dayjs' // 处理时间插件
import { setFollows, getFollows } from '@/utils'
export default {
  data() {
    return {
      title: '黑马头条',
      newsDetailObj: {},
      resultsLs: [],
      loading: false,
      finished: false,
      lastId: '',
      error: false,
      immediateCheck: false,
      aut_id: '',
      art_id: '',
      com_id: '', // 评论的id
      comm_count: 0,
      autIdArr: [],
      is_collected: '',
      attitude: '',
      is_followed: '',
      show: false,
      firstShow: false, // 一级回复触发的弹层
      secCommShow: false,
      navbarShow: true,
      dataItem: '',
      secCommArr: [],
      value: '', // 回复评论
      stringNum: '0', // 字符数
      ifLikings: ''
    }
  },
  components: {
    navbar,
    CommentTarbar
  },
  methods: {
    // 获取文章详情
    async getMyNewsDetail() {
      try {
        const {
          data: { data }
        } = await getMyNewsDetail(this.$route.query.article_id)
        console.log(data)
        this.newsDetailObj = data
        this.aut_id = data.aut_id
        this.art_id = data.art_id
        this.comm_count = data.comm_count
        this.is_collected = data.is_collected
        this.attitude = data.attitude
        this.is_followed = data.is_followed
      } catch (error) {
        console.log(error)
      }
    },
    // 关注按钮
    async followBtn() {
      this.is_followed = !this.is_followed
      const res = await getUserFollowings(this.aut_id)
      console.log(res, 1)
      this.autIdArr.unshift(this.aut_id)
      this.autIdArr = Array.from(new Set(this.autIdArr))
      setFollows(this.autIdArr)
    },
    // 取关按钮
    async unFollowBtn() {
      this.is_followed = !this.is_followed
      const res = await getUserUnFollowings(this.aut_id)
      console.log(res, 2)
      const resFollow = getFollows()
      this.autIdArr = resFollow
      const newAutIdArr = this.autIdArr.filter((item) => {
        return item !== this.aut_id
      })
      setFollows(newAutIdArr)
    },
    getFollows() {
      getFollows()
    },
    // 获取评论
    async getComments() {
      const {
        data: { data }
      } = await getComments('a', this.$route.query.article_id)
      console.log(data)
      console.log(data.results)
      this.resultsLs = data.results
      this.lastId = data.last_id
    },
    // 获取评论回复 点击回复按钮触发
    async getResComments(item) {
      // item 通过 resultsLs 传递
      // 弹出层
      const {
        data: { data }
      } = await getComments('c', item.com_id)
      console.log(data) // 二级评论信息
      this.secCommArr = data.results
      this.firstShow = true
      this.navbarShow = false
      this.dataItem = item // 一级评论信息
      console.log(item)
    },
    // 加载下一页
    async loadNextPage() {
      try {
        const { data } = await getComments(
          'a',
          this.$route.query.article_id,
          this.lastId
        )

        if (data.data.total_count === this.resultsLs.length) {
          this.finished = true
        }

        this.lastId = data.data.last_id
        this.resultsLs.unshift(...data.data.results)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    // 新增评论
    commentInfo(val) {
      this.resultsLs.unshift(val.new_obj)
      this.comm_count++
      this.$toast.success('评论成功')
    },
    async showPopup() {
      // 写二级评论
      this.secCommShow = true
    },
    countNum() {
      // 文本框字符数
      this.stringNum = this.value.length
    },
    // 二级评论发布按钮
    async pubBtn() {
      console.log(11)
      if (this.value.trim().length === 0) {
        return this.$toast.fail('请输入内容')
      }
      const {
        data: { data }
      } = await addComments(this.dataItem.com_id, this.value, this.art_id)
      console.log(data)
      this.secCommArr.unshift(data.new_obj)
      this.value = ''
      this.secCommShow = false
      this.dataItem.reply_count++

      console.log(this.dataItem)
      // this.$emit('getCommentInfo', data)
    },

    async goodBtn(commId, index) {
      if (this.ifLikings === '') {
        this.ifLikings = this.resultsLs[index].is_liking
        console.log(this.resultsLs[index].is_liking)
      }
      // 点赞按钮
      if (!this.ifLikings) {
        const {
          data: { data }
        } = await addCommLiking(commId)
        console.log(this.resultsLs)
        console.log(data)
        this.ifLikings = !this.ifLikings
        this.resultsLs[index].like_count++
      } else {
        // 取消点赞按钮
        console.log('-')
        const res = await removeCommLiking(commId)
        console.log(this.resultsLs)
        console.log(res)
        this.isLikings = !this.isLikings
        this.resultsLs[index].like_count--
      }
    }
  },
  filters: {
    filterTime: (val) => {
      return dayjs(val).fromNow()
    }
  },
  created() {
    this.getMyNewsDetail()
    this.getComments()
    this.getFollows()
  }
}
</script>

<style lang="less" scoped>
// 外面大盒子
.main-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 1.22667rem;
  bottom: 1.17333rem;
  overflow-y: scroll;
  background-color: #fff;

  // 文章标题
  .article-title {
    font-size: 0.53333rem;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
  }

  // 用户信息
  .user-info {
    padding: 0 0.42667rem;

    position: relative;
    width: 100%;
    .van-cell__value {
      display: flex;
      align-items: center;
    }
    .avatar {
      width: 0.93333rem;
      height: 0.93333rem;
      margin-right: 0.22667rem;
      display: inline-block;

      .van-image__img {
        width: 100%;
        height: 100%;
      }
    }
    .title-left {
      flex: 1;
      margin-left: 10px;
      margin-right: 60px;
      .user-name {
        font-size: 0.32rem;
        color: #3a3a3a;
      }
      .user-label {
        font-size: 0.30667rem;
        color: #b7b7b7;
      }
    }
    .value-right {
      flex: 1;
      text-align: right;
      .btn-right {
        width: 2.26667rem;
        height: 0.77333rem;
      }
      /deep/.btn-right1 {
        background: #fff;
        color: #333;
        z-index: 1;
      }
    }
  }
  // 文章详情
  .article-content {
    padding: 0.73333rem 0.42667rem;
    line-height: 1.5;
  }
}
// 评论
.comment-item {
  position: relative;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  justify-content: center;
  /deep/.van-cell__value {
    display: flex;
    .img-wrap {
      .van-image__img {
        width: 0.96rem;
        height: 0.96rem;
        margin-right: 0.33333rem;
      }
    }
    .van-cell__title {
      flex: 1;
      .title-wrap {
        display: flex;
        justify-content: space-between;
        .user-name {
          color: #406599;
          font-size: 0.34667rem;
        }
        .like-btn {
          height: 0.4rem;
          padding: 0;
          border: none;
          font-size: 0.25333rem;
          line-height: 0.4rem;
          margin-right: 0.09333rem;
          .van-button__text {
            display: flex;
            align-items: center;
          }
        }
      }
      .van-cell__label {
        .comment-content {
          font-size: 0.42667rem;
          color: #222;
          word-break: break-all;
          text-align: justify;
        }
        .bottom-info {
          display: flex;
          align-items: center;
          color: #969799;
          font-size: 0.32rem;
          line-height: 0.48rem;
        }
      }
    }
  }
}
// 二级评论弹出层 触发状态
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
// 二级评论按钮
.post-warp {
  width: 100%;
  height: 1.33333rem;
  position: fixed;
  bottom: 0;
  border-top: 0.01333rem solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff69b4;
  .secCommBtn {
    width: 8.53333rem;
    height: 1.06667rem;
    .van-cell {
      line-height: 0.5rem;
    }
  }
}
</style>

<template>
  <div class="my">
    <header>
      <div v-if="isLogin" class="user-info banner">
        <van-row></van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button round size="mini" class="code-btn">
                编辑资料
              </van-button>
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon> {{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> {{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div v-else class="login-register banner">
        <div class="wrap" @click="goLogin">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>

    <!-- 主体 -->
    <main>
      <!-- 历史/搜索 -->
      <div>
        <van-grid column-num="2" class="grid" clickable>
          <van-grid-item icon="photo-o" text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!--消息通知/小智同学-->
      <div class="link">
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="小智同学" is-link></van-cell>
      </div>
    </main>
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  name: 'my',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号?'
        })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {})
    },
    goLogin() {
      this.$router.push('/login')
    },
    // 获取用户信息,并处理数据
    async getUserInfo() {
      // 如果用户登录了 再去获取用户信息
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await getUserInfo()
          console.log(data)
          this.userInfo = data
        } catch (error) {
          this.$toast.fail('请重新登录')
        }
      }
      // const res = await getUserInfo()
      // console.log(res)
    }
  },
  computed: {
    isLogin() {
      // 双感叹号 将表达式转化为布尔值
      return !!this.$store.state.user.token
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px); //一个视口的高减去底部的高
  .login-register {
    display: flex;
    justify-content: center;
    align-items: center;
    .wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      img {
        margin-bottom: 10px;
        width: 1.76rem;
        height: 1.76rem;
      }
      span {
        font-size: 0.37333rem;
        color: #fff;
        margin-top: 0.13333rem;
      }
    }
  }
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover; // cover background-size=cover 简写在background里
  // 0 0 是position定位
}
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }

  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}

// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    padding: 5px 0;
  }
}
.login-btn {
  /deep/.van-button__text {
    color: red;
  }
}
</style>

<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navbar"
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    >
      <template v-slot:left=""> <van-icon name="cross" /> </template>
    </van-nav-bar>
    <!-- 表单 -->
    <!--手机号/验证码表单 -->
    <!-- <van-field></van-field>:输入框 包括各种type类型的输入, text, password..
    textarea -->
    <!-- form里input 必须给name,用于标识 name会记录用户输入的内容并在触发submit事件时将name键值对携带在values形参上 -->
    <van-form ref="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template v-slot:left-icon>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="password"
        name="code1"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isShowCountdown"
            :time="3 * 1000"
            @finish="isShowCountdown = false"
          />
          <van-button
            v-else
            round
            size="mini"
            class="code-btn"
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// form表单域里,任意的button点击都可以触发submit
// 提交表单,需要给input绑定name

// 引入api
import { login, sendCode } from '@/api/user'
// 引入正则
import { mobileRules, codeRules } from './rules'

export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountdown: false
    }
  },
  // created() {
  //   console.log(this)
  // },
  methods: {
    onClickLeft() {
      // $router 原型上有个back()，可返回至跳转前的页面
      this.$router.back()
      console.log(this.$router.back())
      console.log(this)
    },
    async login(values) {
      // console.log('submit', values)
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        // vant组件是全局注册的 直接在vc实例上拿 toast
        this.$toast.success('登录成功')
        // console.log(this)
        console.log(res)
        this.$router.push('/profile')
      } catch (err) {
        console.log(err)
        const status = err.response.status
        let message = '登陆失败,请刷新'
        if (status === 400) {
          message = err.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(err.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登陆失败,请刷新')
        //     break
        //   default:
        //     this.$toast.fail('登陆失败,请刷新')
        //     break
        // }
      }
    },
    async sendCode() {
      try {
        // 验证手机号  validate用来验证表单，支持传入 name 来验证单个或部分表单项，返回的是一个promise对象
        await this.$refs.form.validate('mobile')
        // 发送请求 获取验证码
        await sendCode(this.mobile)
        // 显示倒计时
        this.isShowCountdown = true
      } catch (err) {
        console.log(err)
        if (!err.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// 编译语言 less  scoped 仅限该页面使用样式，可防止样式污染
.navbar {
  background-color: #3396fc;
  :deep(.van-nav-bar__title) {
    color: #fff;
    //:deep()  /deep/  穿透scoped样式 vue提供,仅限vue使用
  }
  .van-icon {
    color: #fff;
  }
}

//表单域样式
.van-form {
  /deep/.van-field__left-icon {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .van-cell {
    margin-top: 20px;
  }
  .code-btn {
    color: #666;
    background-color: #eee;
    padding: 0 10px;
  }
}
</style>

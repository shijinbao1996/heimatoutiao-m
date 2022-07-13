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
    <!-- form里input 必须给name,用于标识 name会记录用户输入的内容用于提交 -->
    <van-form class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template v-slot:left-icon>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button round size="mini" class="code-btn">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// form表单域里,任意的button点击都可以触发submit
// 提交表单,需要给input绑定name

// 引入api
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onClickLeft() {
      // $router 原型上有个back()，可返回至跳转前的页面
      this.$router.back()
      console.log(this)
    },
    async login() {
      // console.log('submit', values)
      const res = await login(this.mobile, this.code)
      console.log(res)
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
    //:deep() 穿透scoped样式  vue提供的
  }
  .van-icon {
    color: #fff;
  }
}

//表单域样式
.form {
  :deep(.van-field__left-icon) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    color: #666;
    background-color: #eee;
    padding: 0 10px;
  }
}
</style>

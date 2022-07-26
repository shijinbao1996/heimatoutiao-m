<template>
  <div>
    <navbar title="个人信息"></navbar>
    <van-cell-group>
      <!-- 上传文件单元格 -->
      <input type="file" hidden accept=".png,.jpg" ref="file" />
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <van-image width="30" height="30" round :src="userProfiles.photo" />
      </van-cell>
      <!-- 上传头像弹出层 -->
      <van-popup v-model="imgShow">
        <UpdatePhoto :photo="photo"></UpdatePhoto>
      </van-popup>
      <!-- 昵称单元格 -->
      <van-cell
        title="昵称"
        is-link
        :value="userProfiles.name"
        @click="showNamePopup"
      />
      <!-- 昵称弹出层 -->
      <van-popup
        v-model="nameShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <van-nav-bar
          title="更新昵称"
          left-text="取消"
          right-text="保存"
          @click-left="nameShow = false"
          @click-right="editUserName"
        />
        <van-field
          v-model="message"
          rows="1"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入新的昵称"
          show-word-limit
        />
      </van-popup>
      <!-- 性别单元格 -->
      <van-cell
        title="性别"
        is-link
        :value="userProfiles.gender ? '女' : '男'"
        @click="showGenderPopup"
      />
      <!-- 性别弹出层 -->
      <van-popup
        v-model="genderShow"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-picker
          title="更新性别"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
        />
      </van-popup>

      <!-- 生日单元格 -->
      <van-cell
        title="生日"
        is-link
        :value="userProfiles.birthday"
        @click="showBirthdayPopup"
      />
      <!-- 生日弹出层 -->
      <van-popup
        v-model="birthdayShow"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="editUserBirthday"
          @cancel="birthdayShow = false"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import UpdatePhoto from './components/UpdatePhoto.vue'
import navbar from '@/components/navbar.vue'
import { editUserProfile, getUserProfile } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  data() {
    return {
      userProfiles: {},
      imgShow: false,
      nameShow: false,
      birthdayShow: false,
      genderShow: false,
      message: '',
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2021, 10, 1),
      currentDate: new Date(2021, 0, 17),
      columns: ['男', '女'],
      photo: '' // 头像
    }
  },
  methods: {
    // 展示用户名弹出层
    showNamePopup() {
      this.nameShow = true
      this.message = this.userProfiles.name
    },
    // 展示生日弹出层
    showBirthdayPopup() {
      this.birthdayShow = true
    },
    // 展示性别弹出层
    showGenderPopup() {
      this.genderShow = true
    },
    // 编辑用户名
    async editUserName() {
      try {
        const res = await editUserProfile(this.message)
        console.log(res)
        this.$toast.success('更新成功')
        this.nameShow = false
        this.checkProfile()
      } catch (error) {
        console.log(error)
      }
    },
    // 点击确认生日按钮
    async editUserBirthday() {
      console.log(this.currentDate)
      const formatTime = dayjs(this.currentDate).format('YYYY-MM-DD')
      console.log(formatTime)
      const res = await editUserProfile('', '', formatTime)
      console.log(res)
      this.$toast.success('更新成功')
      this.birthdayShow = false
      this.checkProfile()
    },

    // 性别信息更新
    async onConfirm(value) {
      if (value === '男') {
        value = '0'
      } else {
        value = '1'
      }
      const res = await editUserProfile('', value)
      console.log(res)
      this.genderShow = false
      this.checkProfile()
    },
    onCancel() {
      this.genderShow = false
    },
    // 获取个人信息
    async checkProfile() {
      const {
        data: { data }
      } = await getUserProfile()
      console.log(data)
      this.userProfiles = data
    }
  },
  components: { navbar, UpdatePhoto },
  mounted() {
    // 借助 cropper包 截取图片
    // 如何拿到用户选择的图片?
    // - 监听input的change事件
    this.$refs.file.addEventListener('change', (e) => {
      // e.target 触发事件的元素
      // 图片的srcs属性能识别什么?
      //  - 图片相对/绝对路径
      //  - base64 DateUrl
      //  - file,blob对象的url
      console.log(e.target.files)
      const file = e.target.files[0] // files 伪数组，支持多图选择，拿到的是二进制图片
      // file = URL.createObjectURL(file) // 方法一(使用简单，但存在内存泄漏) URL是window上的内置类 createObjectURL方法将file对象转换成图片可识别的url
      //   并赋值给this.photo

      // 方法二 FileReader-一个类
      const fr = new FileReader()
      // readAsDataURL 将文件读成base64 读的过程是异步
      fr.readAsDataURL(file)
      //   onload回调函数 读取文件成功时触发
      fr.onload = (e) => {
        console.log(e)
        this.photo = e.target.result
        this.imgShow = true
      }
    })
  },
  created() {
    this.checkProfile()
  }
}
</script>

<style></style>

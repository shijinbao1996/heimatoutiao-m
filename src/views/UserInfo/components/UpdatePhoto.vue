<template>
  <div>
    <img :src="photo" alt="" ref="img" />
    <button class="btn" @click="confirm">完成</button>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { editUserPhoto } from '@/api'
export default {
  props: ['photo'],
  mounted() {
    // 被裁减的对象
    const img = this.$refs.img
    // 放入被裁减的对象
    this.myCropper = new Cropper(img, {})
  },
  methods: {
    /*
      multipart/form-data
    */
    confirm() {
      const fm = new FormData()
      this.myCropper.getCroppedCanvas().toBlob(function (blob) {
        fm.append('photo', blob)

        const res = editUserPhoto(fm)
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>

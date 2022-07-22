<template>
  <div>
    <navbar :title="title"></navbar>
  </div>
</template>

<script>
import navbar from '../../components/navbar.vue'
import { getMyNewsDetail } from '@/api'
export default {
  data() {
    return {
      title: '黑马头条'
    }
  },
  components: {
    navbar
  },
  methods: {
    async getMyNewsDetail() {
      const res = await getMyNewsDetail(this.$route.query.article_id)
      console.log(res)
    }
  },
  created() {
    this.getMyNewsDetail()
  }
}
</script>

<style></style>

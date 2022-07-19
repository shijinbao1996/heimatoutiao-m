<template>
  <van-popup
    v-model="isShow"
    closeable
    position="bottom"
    :style="{ height: '80%' }"
    close-icon-position:top-left
  >
    <div class="popupMain">
      <!-- 我的频道 -->
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button size="small" @click="isEdit = !isEdit" class="edit-btn">{{
            isEdit ? '完成' : '编辑'
          }}</van-button>
        </van-cell>

        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in getChannels"
            :key="index"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="onClickMyChannel(item, index)"
          >
            <template #icon>
              <van-icon
                name="cross"
                v-show="isEdit && item.name !== '推荐'"
              ></van-icon>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <van-cell title="推荐频道"> </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="addMyChannel(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  data() {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onClickMyChannel(channel, index) {
      // 边缘情况判断
      if (this.isEdit && channel.name !== '推荐') {
        // 删除
        this.$emit('del-mychannel', channel.id)
      }
      if (!this.isEdit) {
        // 切换
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    addMyChannel(myChannel) {
      // { ...myChannel } 复制出的，避免高度耦合性
      this.$emit('add-mychannel', { ...myChannel })
    }
  },
  props: {
    getChannels: {
      type: Array,
      require: true
    }
  },
  created() {
    this.getAllChannels()
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        const result = this.getChannels.find((i) => i.id === item.id)
        if (result) {
          return false
        } else {
          return true
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
// 高亮频道
.active-channel {
  /deep/.van-grid-item__text {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
  :deep(.van-grid-item__content) {
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
  }
  .my-channel {
    .van-cell {
      align-items: center;
    }
  }

  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 00.02667rem solid red;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: -20px;
          right: -15px;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          //   line-height: 0.32rem;
          transform: scale(0.6, 0.6);
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.3rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>

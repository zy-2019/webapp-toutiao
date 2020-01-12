<template>
    <div class="channel-edit">
        <van-cell title="我的频道" :border='false'>
            <van-button size="mini" type="warning" @click="isEditShow = !isEditShow">{{isEditShow ? '完成' : '编辑'}}</van-button>
        </van-cell>

        <van-grid :gutter="10">
            <van-grid-item @click="handelChannel(index)" v-for="(item,index) in myChannels" :key="item.id" :text="item.name">
                <van-icon v-show="isEditShow && index !== 0" name="close" size="20"  slot="icon"/>
            </van-grid-item>
        </van-grid>

        <van-cell title="推荐频道" :border='false'/>
        <van-grid :gutter="10">
            <van-grid-item @click="ChannelAdd(item)"  v-for="item in ResidueChannels" :key="item.id" :text="item.name"/>
        </van-grid>
    </div>

    <!--
        所有频道列表 - 我的频道 = 剩余推荐的频道  没有减法 所有要用数组方法

        实现过程所以一共分为两大步：

        获取所有频道
        基于所有频道和我的频道计算获取剩余的推荐频道 -->
</template>

<script>
import { ChannelListAll } from '../../../api/channel'
export default {

  data () {
    return {
      allChannels: [], // 所有频道
      isEditShow: false
    }
  },
  //   遍历所有频道
  // 对每一个频道都判断：该频道是否存在我的频道中
  // 如果有，则不要
  // 直到遍历结束，剩下来就是那些剩余的推荐频道
  // 封装一个计算属性用来获取剩余频道
  computed: {
    // 剩余频道 = 所有-----我的
    ResidueChannels () {
      const { allChannels, myChannels } = this

      const channel = []

      allChannels.forEach(item => {
        //   如果我的频道中不包含当前遍历的频道，则要push到空数组里面
        if (!myChannels.find(a => a.id === item.id)) {
          channel.push(item)
        }
      })
      return channel
    }
  },
  methods: {

    // 点击编辑判断是删除还是切换
    handelChannel (index) {
      // 如果是编辑状态,则删除频道
      if (this.isEditShow && index !== 0) {
        this.myChannels.splice(index, 1)
      } else {
        // 如果是非编辑状态 则切换频道
        this.$emit('input', index) // 修改激活的标签

        this.$emit('close')
      }
    }, // 点击推荐频道追加到我的频道中
    ChannelAdd (channel) {
      this.myChannels.push(channel)
    },

    // 全部频道列表
    async getAllChannels () {
      let res = await ChannelListAll()
      this.allChannels = res.data.data.channels
    }
  },
  created () {
    this.getAllChannels()
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang='less'>
    .channel-edit {
        padding:40px 0;
        .van-icon{
            margin-top: 20px
        }
       /deep/ .van-grid-item__icon-wrapper{
           position: absolute;
            top: -25px;
            right: -7px;
       }
    }
</style>

<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed />
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <!-- 面包菜单图标 -->
      <van-icon @click="isChannelEditShow = true" name="wap-nav" slot="nav-right" class="wap-nav"/>
          <!-- 频道列表 -->
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">

        <!-- 文章列表的组件就要在对应的频道下面 -->
        <ArticleList :channel='item'></ArticleList>

      </van-tab>
    </van-tabs>
    <!-- 频道编辑 -->

    <!-- 频道弹层组件 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      round
      closeable
      close-icon-position="top-right"
      :style="{ height: '95%' }"
    >
      <!-- 频道列表组件 -->
        <ChannelEdit v-model="active" @close = 'isChannelEditShow = false' :myChannels='channels'></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './components/ArticleList'
import ChannelEdit from './components/ChannelEdit'
import { getItem } from '../../utils/storage'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0, // 控制标签页的激活项
      channels: [],
      isChannelEditShow: false
    }
  },
  methods: {

    // 获取主页上的频道列表   进行判断  如果本地存储有则用本地存储的  反之请求线上的
    async UserChannels () {
      // 1.定义一个数组存放本地频道
      let list = []

      // 2.获取本地频道列表

      const loacalUserChannel = getItem('user-channel')

      // 3.判断本地储存有没有

      if (loacalUserChannel) {
        // 本地储存有 就用本地的
        list = loacalUserChannel
      } else {
        let res = await getUserChannels()
        list = res.data.data.channels
      }

      // 4.把数据赋值给 data中定义接收频道的channels
      this.channels = list
      // let res = await getUserChannels()
      // this.channels = res.data.data.channels
    }
  },

  created () {
    this.UserChannels()
  }
}
</script>

<style lang='less' scoped>
.home-container{
  padding: 90px 0 50px 0;
  /deep/ .van-tabs__wrap{
    position: fixed;
    top:46px;
    left:0;
    right: 0;
    .wap-nav{
      line-height: 44px;
      position: fixed;
      right: 0;
      background: #fff
    }
  }
}

</style>

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
    // 下拉刷新
    // onRefresh () {
    //   setTimeout(() => {
    //     this.$toast('刷新成功')
    //     this.isLoading = false
    //   }, 500)
    // },

    // // 上拉加载更多数据
    // onLoad () {
    //   // 1.请求获取数据
    //   // 异步更新数据
    //   setTimeout(() => {
    //     // 2.把请求获取到的数据添加到数组列表中
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 500)
    // },
    async UserChannels () {
      let res = await getUserChannels()
      // console.log(res)
      this.channels = res.data.data.channels
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

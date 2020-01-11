<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">

          <!-- 列表 -->
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
          <ArticleList :channel='item'></ArticleList>
          <!-- list 列表组件
          v-model="loading" 控制上拉加载更多的 loading 状态
          :finished="finished" 控制是否加载结束，如果没有数据 则不会继续加载更多
          finished-text="没有更多了" 配置结束结果的提示文本
          @load="onLoad" 当快要触底的时候 他会自动触发执行该方法
          在onload函数中请求 获取数据-->
          <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
          <van-cell
            v-for="item in list"
            :key="item"
            :title="item"
          />
        </van-list>
      </van-pull-refresh> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './components/ArticleList'
export default {
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0, // 控制标签页的激活项
      channels: []
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
      console.log(res)
      this.channels = res.data.data.channels
    }
  },

  created () {
    this.UserChannels()
  }
}
</script>

<style>

</style>

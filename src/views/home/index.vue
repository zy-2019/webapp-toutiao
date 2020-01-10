<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">

          <!-- 列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
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
      </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 文章列表 -->

  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
export default {
  data () {
    return {
      isLoading: false,
      active: 0, // 控制标签页的激活项
      list: [],
      loading: false,
      finished: false,
      channels: []
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },

    // 上拉加载更多数据
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
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

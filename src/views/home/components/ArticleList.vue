<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <!-- list 列表组件
          v-model="loading" 控制上拉加载更多的 loading 状态
          :finished="finished" 控制是否加载结束，如果没有数据 则不会继续加载更多
          finished-text="没有更多了" 配置结束结果的提示文本
          @load="onLoad" 当快要触底的时候 他会自动触发执行该方法
          在onload函数中请求 获取数据-->
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
          <van-cell
            v-for="(item,index) in list"
            :key="index"
            :title="item.title"
          />
        </van-list>
    </van-pull-refresh>
</template>

<script>
import { getArticles } from '../../../api/article'
export default {
  data () {
    return {
      isLoading: false,
      list: [], // 列表数据
      loading: false, // 上拉加载更多的loading状态
      finished: false, // 数据是否加载完毕
      timestamp: null // 用于获取下一页的时间戳
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {

    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },

    async onLoad () {
      // 1.获取数据
      let res = await getArticles({

        channel_id: this.channel.id,
        // 第1次使用 Date.now() 获取最新数据
        // 下一页的数据使用本次返回的数据中的 timestamp
        // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      // console.log(res)

      // 2.把请求获取到的数据添加到数组列表中
      const results = res.data.data.results
      this.list.push(...results)

      // 3.加载状态结束
      this.loading = false

      // 4.数据全部加载完成
      if (results.length) {
        this.timestamp = res.data.data.pre_timestamp
      } else {
        this.finished = true
      }
    }
    // 上拉加载更多数据
    // onLoad () {
    //   // 1.请求获取数据

    //   setTimeout(() => {
    //     // 2.把请求获取到的数据添加到数组列表中
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 3.加载状态结束
    //     this.loading = false

    //     // 4.数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 500)
    // }
  }
}
</script>

<style>

</style>

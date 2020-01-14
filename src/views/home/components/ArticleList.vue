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
            @click="$router.push('/detail/' + item.art_id)"
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

    async onRefresh () {
      // 和下拉加载思路一样  就是把新数据通过unshift追加到新数组的顶端
      // 1.获取数据
      let res = await getArticles({
        channel_id: this.channel.id,
        // 第1次使用 Date.now() 获取最新数据
        // 下一页的数据使用本次返回的数据中的 timestamp
        // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        timestamp: Date.now(),
        with_top: 1
      })
      // console.log(res)
      // 2.把请求获到的数据添加到数组列表中  放到列表的顶部
      const { results } = res.data.data
      this.list.unshift(...results)

      // 3.数据加载完毕 关闭loading加载
      this.isLoading = false

      // 4.提示刷新成功消息
      this.$toast(`已更新${results.length}条数据`)
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
  }
}
</script>

<style>

</style>

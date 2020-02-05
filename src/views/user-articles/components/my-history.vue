<template>
  <div class="myHistory">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { MyHistory } from '../../../api/user'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      // 请求数据
      const { data } = await MyHistory({
        page: this.page,
        per_page: this.per_page
      })
      // 放到列表中
      const { results } = data.data
      this.list.push(...results)
      // 关闭loading加载
      this.loading = false
      // 判断数据是否加载完毕
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>

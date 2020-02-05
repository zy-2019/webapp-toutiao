<template>
  <div class="myCollect">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { MyCollect } from '../../../api/user'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 0,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      await MyCollect({
        page: this.page,
        per_page: this.per_page
      })
      // 请求数据
      // 放到列表中
      // 关闭loading加载
      // 判断数据是否加载完毕
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
      }, 1000)
    }
  }
}
</script>

<style>

</style>

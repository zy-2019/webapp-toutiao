<template>
    <div class="searchResult">
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
    </div>
</template>

<script>
import { getSearchResult } from '../../../api/search'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  props: {
    query: {
      type: String,
      require: true
    }
  },
  methods: {
    async onLoad () {
    //   1.请求获取数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.query
      })
      // 2.把请求的数据赋值给定义的list数组中
      const { results } = data.data
      this.list.push(...results)

      //   3.加载状态结束
      this.loading = false

      //   4.判断数据是否加载完毕
      if (results.length) {
        this.page++ // 还有数据就继续加载下一页的数据
      } else {
        this.finished = true // 否则关闭加载状态
      }
    }
  }
}
</script>

<style>

</style>

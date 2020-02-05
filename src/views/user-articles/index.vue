<template>
  <div class="user-articles">
    <van-nav-bar
        title="收藏/历史/作品"
        left-arrow
        @click-left="$router.back()"
    />
    <van-tabs v-model="active">
        <van-tab title="我的收藏">
            <myCollect/>
        </van-tab>
        <van-tab title="我的历史">
            <myHistory/>
        </van-tab>
        <van-tab title="我的作品">
            <myArticles/>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import myCollect from './components/my-collect'
import myHistory from './components/my-history'
import myArticles from './components/my-articles'

export default {
  data () {
    return {
      active: 0
    }
  },
  components: {
    myCollect,
    myHistory,
    myArticles
  },
  methods: {

  }

}
</script>

<style lang='less' scoped>

</style>

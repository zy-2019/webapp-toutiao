<template>
  <div class="user-articles">
    <van-nav-bar
        title="收藏/历史/作品"
        left-arrow
        @click-left="$router.push('/my')"
        fixed
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
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2 // 我的作品
    }
    return {
      active// 控制激活标签选项
    }
  },
  props: {
    type: {
      type: String
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
  .user-articles{
    padding: 90px 0 50px 0;
    /deep/ .van-tabs__wrap{
    position: fixed;
    top:46px;
    left:0;
    right: 0;
    z-index: 1
    }

  }
</style>

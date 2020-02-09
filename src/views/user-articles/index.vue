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
  name: 'UserArticles',

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

  },
  // 当前页面路由跳转的时候会触发这个路由的钩子函数
  // to 要去哪儿的信息
  // from 来自于哪里的信息
  // next 放行的方法
  //  next()  允许通过
  // next(false) 不允许通过
  beforeRouteLeave (to, from, next) {
    // 如果跳转的是文章详情页 则把当前的页面缓存起来 否则不缓存 则删掉
    if (to.name === 'article') {
      this.$store.commit('addCaChePage', 'UserArticles')
    } else {
      this.$store.commit('removeCaChePage', 'UserArticles')
    }
    // 不是详情页就放行通过
    next()
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

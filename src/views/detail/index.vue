<template>
  <div class="article-detail">
      <van-nav-bar
        title="文章详情"
        left-text="返回"
        left-arrow='isLeftArrow'
        fixed
        @click-left='$router.back()'
        />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLeftArrow: true
    }
  }
}
</script>

<style lang='less' scoped>
    .article-detail{
        .van-nav-bar{
            .van-nav-bar__text{
                color: white
            }
            .van-icon{
                color: white
            }
        }
    }
</style>

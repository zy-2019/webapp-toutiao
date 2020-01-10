<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
    <!-- 文章列表 -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0 // 控制标签页的激活项
    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style>

</style>

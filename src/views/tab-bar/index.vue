<template>
  <div id="TabBar">
      <!-- 子路由出口 -->
      <keep-alive>
        <router-view />
      </keep-alive>
      <!-- 子路由出口 -->
    <van-tabbar route>
        <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
        <van-tabbar-item icon="tv-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/my">{{$store.state.user ? '我的' : '未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>

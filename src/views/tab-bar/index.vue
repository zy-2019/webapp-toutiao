<template>
  <div>
      <!-- 子路由出口 -->
        <router-view></router-view>
      <!-- 子路由出口 -->
    <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search">问答</van-tabbar-item>
        <van-tabbar-item icon="tv-o">视频</van-tabbar-item>
        <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

<template>
  <div id="app">
    <!-- 根路由出口 -->
    <!-- 动态组件 -->
    <!--
      include 可以配置哪些组件缓存
      exclude 配置那些组件不要缓存
    -->
    <keep-alive :include='catchPages'>
      <router-view />
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      catchPages: ['TabBar']
    }
  }
}
</script>

<style>

</style>

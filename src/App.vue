<template>
  <div id="app">
    <!-- 根路由出口 -->
    <!-- 动态组件 -->
    <!--
      keep-alive 是vue本身内置的组件 专门用来缓存组件的
      include 可以配置哪些组件缓存
      exclude 配置那些组件不要缓存
    -->
    <keep-alive :include='$store.state.cachePages'>
      <router-view />
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      cachePages: ['TabBar']
    }
  }
}
</script>

<style>

</style>

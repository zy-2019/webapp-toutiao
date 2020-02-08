<template>
  <div id="app">
    <!-- 根路由出口 -->
    <!-- 动态组件 -->

    <keep-alive>
      <router-view />
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>

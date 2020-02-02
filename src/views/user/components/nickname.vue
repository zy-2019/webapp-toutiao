<template>
  <div class="nickname">
    <van-nav-bar
      class="top"
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="$emit('confirm',message)"
    />

    <van-field
      class="bottom"
      :value="name"
      @input="message = $event"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
  .top {
    background: white;
    .van-nav-bar__title{
      color: black
    }
  }
  .bottom{
    background: #f5f5f5;
    padding: 10px 10px
  }
</style>

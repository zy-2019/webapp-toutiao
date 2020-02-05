<template>
  <div class="post-comment">
        <div class="writeComment">
          <van-field
            v-model="message"
            class="rightField"
            rows="2"
            autosize
            :value="value"
            @input="$emit('input',$event)"
            type="textarea"
            maxlength="50"
            placeholder="请输入评论"
            show-word-limit
          />
          <van-button
            size="small"
            type="primary"
            @click="$emit('click-post')"
            :disabled="!value"
          >
          发布
          </van-button>
        </div>
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
    value: {
      type: String,
      required: true
    }
  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
    .writeComment{
        display: flex;
        padding: 15px;
        align-items: flex-end;
        .rightField{
        margin-right: 10px
        }
    }
</style>

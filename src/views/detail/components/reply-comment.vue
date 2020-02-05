<template>
    <div class="replyNav">
        <!-- 导航栏 -->
        <van-nav-bar :title="`${comment.reply_count}条回复`">
            <van-icon
                slot="left"
                name="cross"
                @click="$emit('click-close')"
            />
        </van-nav-bar>
        <!-- 导航栏 -->

        <!-- 当前评论项 -->

        <CommentItem :comment="comment"/>
        <!-- /当前评论项 -->

        <!-- <van-cell title="所有回复" /> -->

        <!-- 评论的回复列表 -->

        <!-- /评论的回复列表 -->

        <!-- 底部 -->
        <!-- /底部 -->
    </div>
</template>

<script>
import CommentItem from './comment-item'
export default {
  data () {
    return {

    }
  },
  components: {
    CommentItem
  },
  methods: {

  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">

</style>

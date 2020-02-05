<template>
    <div class="reply-comment">
        <!-- 导航栏 -->
        <van-nav-bar
        class="replyNav"
        title="标题"
        >
            <van-icon
            slot="left"
            name="cross"
            @click="$emit('click-close')"/>
        </van-nav-bar>
        <!-- 导航栏 -->

         <!-- 当前评论项 -->
        <!-- /当前评论项 -->

        <van-cell title="所有回复" />

        <!-- 评论的回复列表 -->
        <!-- /评论的回复列表 -->

        <!-- 底部 -->
        <!-- /底部 -->
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>

</style>

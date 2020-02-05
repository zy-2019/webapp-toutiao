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

            <van-cell title="所有回复" />

            <!-- 评论的回复列表 -->
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <CommentItem
                v-for="(comment, index) in list"
                :key="index"
                :comment="comment"
                />
            </van-list>
            <!-- /评论的回复列表 -->

            <!-- 底部 -->
            <div class="footer">
                <van-button
                    class="write-btn"
                    type="default"
                    round
                    size="small"
                    @click="isPostShow = true"
                >写评论</van-button>
                <van-icon color="#e5645f" name="good-job" />
            </div>
            <!-- /底部 -->

            <!-- 发布回复 -->
            <van-popup
                v-model="isPostShow"
                position="bottom"
            >
                <PostComment
                v-model="postMessage"
                @click-post='onPost'
                />
            </van-popup>
            <!-- 发布回复 -->

        </div>
    </template>

<script>
import CommentItem from './comment-item'
import PostComment from './post-comment'
import { getComments, addComment } from '../../../api/comment'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      isPostShow: false, // 发布回复弹层显示状态
      postMessage: ''// 二级评论文本框文字
    }
  },
  components: {
    CommentItem,
    PostComment
  },
  methods: {
    // 回复评论方法

    async onPost () {
      // 拿到输入框数据
      // 请求提交
      // 清空输入框
      // 关闭弹层
      const postMessage = this.postMessage

      // 非空校验
      if (!postMessage) {
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addComment({
          target: this.comment.com_id.toString(), // 大数字  回变成对象
          content: postMessage, // 评论内容
          art_id: this.articleId.toString()
        })
        // 关闭发布评论的弹层
        this.isPostShow = false
        // 将最新发布的评论展示到列表的顶部
        this.list.unshift(data.data.new_obj)
        // 更新文字评论的总数量
        this.comment.reply_count++
        // 清空文本框
        this.postMessage = ''

        // 提示消息
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    },

    //
    async  onLoad () {
      // 1.请求获取数据
      const { data } = await getComments({
        // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 每页的大小
      })
      // 2.将数据加载到列表中

      const { results } = data.data // 直接解构赋值

      this.list.push(...results)

      // 3.将加载更多关闭
      this.loading = false

      // 4.判断数据是否全部加载完成   没有数据就关闭加载更多
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true // 没有数据了 关闭加载更多
      }
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  }
}
</script>

    <style scoped lang="less">
        .footer {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 44px;
            border-top: 1px solid #d8d8d8;
            background-color: #fff;
            .write-btn {
                width: 160px;
            }
            .van-icon {
                font-size: 20px;
            }
        }

    </style>

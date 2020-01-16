<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
      class="loading"
      color="#1989fa"
      vertical
      v-if="loading"
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="articles.title">
      <h3 class="title">{{articles.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="articles.aut_photo"
          />
          <div class="text">
            <p class="name">{{articles.aut_name}}</p>
            <p class="time">{{articles.pubdate | relativeTime}}</p>
          </div>
        </div>

        <!-- 如果用户没有登录 或者 当前文章的作者不是当前登录用户 才展示关注按钮 -->

        <!-- v-if用来处理关注文章作者按钮的展示状态 -->
        <van-button
        v-if="!$store.state.user || articles.aut_id !== $store.state.user.id "
        class="follow-btn"
        :type="articles.is_followed ? 'default' : 'info'"
        size="small"
        round
        @click="onFollow">
        {{articles.is_followed ? '已关注' : '+ 关注'}}

        </van-button>
      </div>

      <!-- 文章内容加载 -->
      <div class="markdown-body" v-html="articles.content"></div>

      <!-- 文章评论 -->
        <van-list
          v-model="articleComment.loading"
          :finished="articleComment.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in articleComment.list"
            :key="item"
            :title="item"
          />
        </van-list>
    </div>
    <!-- /文章详情组件 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        info="9"
      />
      <van-icon
        color="orange"
        :name="articles.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="articles.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLikings"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById,
  addCollect,
  delCollect,
  delLikings,
  addLikings
} from '../../api/article'

import { delFollowing, addFollowing } from '../../api/user'
export default {
  name: 'ArticlePage',
  components: {},
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      articles: {},
      loading: true,

      // 文章评论
      articleComment: {
        list: [], // 评论列表
        loading: false, // 评论加载loading
        finished: false // 评论是否加载结束
      }

    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle() // 加载文章
  },
  mounted () {},
  methods: {

    // 加载评论列表
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.articleComment.list.push(this.articleComment.list.length + 1)
        }
        // 加载状态结束
        this.articleComment.loading = false

        // 数据全部加载完成
        if (this.articleComment.list.length >= 40) {
          this.articleComment.finished = true
        }
      }, 500)
    },
    // 加载文章详情的方法
    async loadArticle () {
      try {
        this.loading = true
        const { data } = await getArticleById(this.articleId)
        this.articles = data.data
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },

    // 点击收藏或取消收藏
    async onCollect () {
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        //   如果已收藏 则取消收藏
        if (this.articles.is_collected) {
          await delCollect(this.articleId)
          this.articles.is_collected = false
          this.$toast.success('取消收藏')
        } else {
          // 添加收藏
          await addCollect(this.articleId)
          this.articles.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },

    // 点赞功能
    async onLikings () {
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        //   如果已点赞,则取消点赞
        if (this.articles.attitude === 1) {
          await delLikings(this.articleId)
          this.articles.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          // 添加点赞
          await addLikings(this.articleId)
          this.articles.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 如果已关注点击 则取消  否则关注
    async  onFollow () {
      this.loading = true
      try {
        const authorId = this.articles.aut_id
        if (this.articles.is_followed) {
          await delFollowing(authorId)
          this.$toast.success('取消成功')
        } else {
          // 添加关注
          await addFollowing(authorId)
          this.$toast.success('关注成功')
        }
        // 更新视图  取反即可  不是加关注  就是已关注
        this.articles.is_followed = !this.articles.is_followed
      } catch (err) {
        this.$toast.fail('关注失败')
      }
      this.loading = false
    }
  }
}
</script>

<style lang='less' scoped>
@import "./github-markdown.css";
.article-container {
  padding: 46px 20px 150px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
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
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>

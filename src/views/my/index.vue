<template>
  <div class="my-container">
    <!-- 已登录：用户信息 -->
    <div v-if="$store.state.user"
     class="user-info-wrap">
      <div class="base-info-wrap">
        <div class="avatar-title-wrap">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="list.photo"
          />
          <div class="title">{{list.name}}</div>
        </div>
        <van-button round size="mini" @click="$router.push('/user')">编辑资料</van-button>
      </div>
      <van-grid class="data-info" :border="false">
        <van-grid-item>
          <span class="count">123</span>
          <span class="text">{{list.art_count}}</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">123</span>
          <span class="text">{{list.follow_count}}</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">123</span>
          <span class="text">{{list.fans_count}}</span>
        </van-grid-item>
        <van-grid-item>
          <span class="count">123</span>
          <span class="text">{{list.like_count}}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /已登录：用户信息 -->

    <!-- 未登录 -->
    <div v-else class="not-login"  @click="$router.push('/login')">
      <div class="mobile"></div>
      <div class="text">点击登录</div>
    </div>
    <!-- /未登录 -->

    <!-- 其它 -->
    <van-grid clickable :column-num="3">
      <van-grid-item text="我的收藏" to="/my-article/collect">
        <van-icon slot="icon" name="star-o" color="#eb5253" />
      </van-grid-item>
      <van-grid-item text="浏览历史" to="/my-article/history">
        <van-icon slot="icon" name="browsing-history-o" color="#ffa023" />
      </van-grid-item>
      <van-grid-item text="作品" to="/my-article">
        <van-icon slot="icon" name="edit" color="#678eff" />
      </van-grid-item>
    </van-grid>

    <van-cell-group :border="false">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link @click="$router.push('/chat')" />
    </van-cell-group>

    <van-cell-group v-if="$store.state.user" @click="logOut">
      <van-cell
        style="text-align: center;"
        title="退出登录"
        clickable
      />
    </van-cell-group>
  </div>
</template>

<script>
// import { Dialog } from 'vant'
import { getUserInfo } from '../../api/user'
export default {
  name: 'MyPage',
  components: {},
  props: {},
  data () {
    return {
      list: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    // 此处判断 用户登录了才可以获取用户的信息
    if (this.$store.state.user) {
      this.userInfo()
    }
  },
  mounted () {},
  methods: {

    // 退出登录
    logOut () {
      this.$dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      }).then(() => {
        // 清除登录信息
        this.$store.commit('setUser', null)
      }).catch(() => {
        this.$toast('取消')
      })
    },

    // 请求用户信息
    async userInfo () {
      let res = await getUserInfo() // 此处可以直接解构赋值  少写一个data
      console.log(res)
      this.list = res.data.data
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .user-info-wrap {
    background: url("./banner.png") no-repeat;
    height: 182px;
    box-sizing: border-box;
    background-size: cover;
    padding: 40px 20px;
    font-size: 15px;
    color: #fff;
    .base-info-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar-title-wrap {
        display: flex;
        align-items: center;
        .avatar {
          margin-right: 15px;
          width: 66px;
          height: 66px;
          padding: 2px;
          background: #fff;
        }
      }
    }
    .data-info {
      ::v-deep .van-grid-item__content {
        background: none;
      }
    }
  }

  .not-login {
    background: url("./banner.png") no-repeat;
    height: 182px;
    box-sizing: border-box;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile {
      background: url("./mobile.png") no-repeat;
      background-size: cover;
      width: 66px;
      height: 66px;
      margin-bottom: 10px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  > .van-cell-group {
    margin-top: 10px;
  }
}
</style>

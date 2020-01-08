<template>
  <div class="login">

    <van-nav-bar
        title="标题"
    />
<!-- ---------------------------------------------------------------------------- -->
    <van-cell-group>
        <van-field
            v-model="user.mobile"
            required
            label="手机号"
            placeholder="请输入手机号"
        />
<!-- ------------------------------------------------------------------------------- -->
          <van-field
            v-model="user.code"
            label="验证码"
            placeholder="请输入验证码"
            required
        >
          <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="6000 * 10"
          format="ss s"
          @finish='isCountDownShow = false'/>
          <van-button v-else slot="button" size="small" type="primary" round @click="openCountDown">发送验证码</van-button>
        </van-field>

    </van-cell-group>

    <!-- ----------------------------------------------------------------------------- -->
    <div class="btn-container">
        <van-button type="info" class="login-btn" @click="submitMsg">登录</van-button>
    </div>

  </div>
</template>

<script>
import { login } from '../../api/user'
export default {
  data () {
    return {
      isCountDownShow: false,
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {

    // 点击发送验证码显示倒计时
    openCountDown () {
      this.isCountDownShow = true
    },
    async submitMsg () {
      const user = this.user // 获取表单数据
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
      try {
        let res = await login(user) // 请求提交
        console.log('登录成功', res)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('提交失败', err)
        this.$toast.success('登录失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
    .btn-container {
        padding: 20px;
        .login-btn {
            width: 100%;
            background: skyblue;
            border: none;
        }
    }
</style>

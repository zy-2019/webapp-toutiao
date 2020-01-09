<template>
  <div class="login">

    <van-nav-bar
        title="标题"
    />
<!-- ---------------------------------------------------------------------------- -->
    <ValidationObserver ref="myForm">
      <ValidationProvider name='手机号' rules='required' >
        <van-field
            v-model="user.mobile"
            required
            label="手机号"
            placeholder="请输入手机号"
        />
        <!-- <span>{{ errors[0] }}</span> -->
      </ValidationProvider>
<!-- ------------------------------------------------------------------------------- -->
      <ValidationProvider name='验证码' rules='required'>
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
      </ValidationProvider>
    </ValidationObserver>

    <!-- ----------------------------------------------------------------------------- -->
    <div class="btn-container">
        <van-button type="info" class="login-btn" @click="submitMsg">登录</van-button>
    </div>

  </div>
</template>

<script>
import { login, getSmsCode } from '../../api/user'
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
    async  openCountDown () {
      // 1.获取手机号
      const { mobile } = this.user // 解构赋值
      // let mobile = this.user.mobile // 普通方法
      try {
        this.isCountDownShow = true // 显示倒计时
        await getSmsCode(mobile) // 发送
      } catch (err) {
        console.log(err)
        this.isCountDownShow = false // 发送失败 关闭倒计时

        // 频繁发送会报429所以要判断一下   其他的直接提示
        if (err.response.status === 429) {
          this.$toast('请务频繁操作')
          return
        }
        this.$toast('发送失败')
      }
    },
    async submitMsg () {
      const user = this.user // 获取表单数据

      // 表单验证
      const success = await this.$refs.myForm.validate()

      if (!success) {
        setTimeout(() => {
          const errors = this.$refs.myForm.errors

          const item = Object.values(errors).find(item => {
            return item[0]
          })
          this.$toast(item[0])
        }, 100)
      }

      // 表单验证通过 开始转loading加载
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

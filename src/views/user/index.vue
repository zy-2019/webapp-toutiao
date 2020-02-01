<template>
  <div class="user-info">
      <van-nav-bar
        title="编辑个人信息"
        left-arrow
        @click-left='$router.back()'
      />

      <!-- 用户信息编辑 -->
      <van-cell-group>
        <van-cell title="头像" is-link >
            <van-image
            width="30"
            height="30"
            round
            :src="Info.photo"
          />
        </van-cell>
        <van-cell title="昵称" is-link :value="Info.name" @click="IsNicknameShow = true" />
        <van-cell title="手机号" is-link :value="Info.mobile" />
        <van-cell title="性别" is-link :value="Info.gender === 0  ? '男' : '女'" />
        <van-cell title="生日" is-link :value="Info.birthday" />
      </van-cell-group>

      <!-- 修改昵称弹层组件 -->
      <van-popup v-model="IsNicknameShow" position="bottom">
        <!-- 修改昵称的Nickname组件 -->
        <nickName/>
      </van-popup>
  </div>

</template>

<script>
import { UpdateUserInfo } from '../../api/user'
import nickName from './components/nickname'
export default {
  data () {
    return {
      Info: {}, // 接收返回的用户信息
      IsNicknameShow: false // 控制弹层显示隐藏
    }
  },
  components: {
    nickName
  },
  methods: {
    // 请求数据信息
    async LoadUserInfo () {
      try {
        let res = await UpdateUserInfo()
        this.Info = res.data.data
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
    }
  },
  created () {
    this.LoadUserInfo()
  }
}
</script>

<style>

</style>

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
        <van-cell title="性别" @click="IsGenderShow = true" is-link :value="Info.gender === 0  ? '男' : '女'" />
        <van-cell title="生日" is-link :value="Info.birthday" />
      </van-cell-group>

      <!-- 修改昵称弹层组件 -->
      <van-popup v-model="IsNicknameShow" position="bottom">
        <!-- 修改昵称的Nickname组件 -->
        <nickName
        :name='Info.name'
        @close='IsNicknameShow = false'
        @confirm='onSave'
        />
      </van-popup>

      <!-- 修改用户性别弹层组件 -->
      <van-action-sheet
        :actions="actions"
        v-model="IsGenderShow"
        @select="onSelect"
        cancel-text="取消"
        @cancel="IsGenderShow = false"
        position="bottom">
      </van-action-sheet>

  </div>

</template>

<script>
import { UpdateUserInfo, PutNickName } from '../../api/user'
import nickName from './components/nickname'

export default {
  data () {
    return {
      Info: {}, // 接收返回的用户信息
      IsNicknameShow: false, // 控制弹层显示隐藏
      IsGenderShow: false,
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ]
    }
  },
  components: {
    nickName
  },
  methods: {

    // 选择更新事件
    async onSelect (item) {
      // 提交更新
      await this.saveProfile('gender', item.value)
      // 更新视图
      this.Info.gender = item.value
      // 关闭弹层
      this.IsGenderShow = false
    },

    // 子组件点击确定父组件发请求修改昵称
    async onSave (name) {
      // 提交更新
      await this.saveProfile('name', name)

      // 更新视图
      this.Info.name = name

      // 关闭弹层
      this.IsNicknameShow = false
    },
    // -----------------------------------------------------------------------------------
    // 为啥可以封装方法 ？？因为用的是同一个接口呀
    async saveProfile (field, value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await PutNickName({
          [field]: value
        })
        this.$toast.success('保存成功')
      } catch (err) {
        this.$toast.fail('保存失败')
      }
    },
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

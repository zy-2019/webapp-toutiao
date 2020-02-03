<template>
  <div class="user-info">
      <van-nav-bar
        title="编辑个人信息"
        left-arrow
        @click-left='$router.back()'
      />

      <!-- 用户信息编辑 -->
      <van-cell-group>
        <van-cell title="头像" is-link @click="onFile" >
            <van-image
            width="30"
            height="30"
            round
            :src="Info.photo"
          />
        </van-cell>

        <!-- 文件头像上传 -->
        <input type="file" hidden ref="file" @change="onFileChange">

        <van-cell title="昵称" is-link :value="Info.name" @click="IsNicknameShow = true" />
        <van-cell title="手机号" is-link :value="Info.mobile" />
        <van-cell title="性别" @click="IsGenderShow = true" is-link :value="Info.gender === 0  ? '男' : '女'" />
        <van-cell title="生日" @click="IsBirthdayShow = true" is-link :value="Info.birthday" />
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

      <!-- 修改用户生日弹层组件 -->
      <van-popup v-model="IsBirthdayShow" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel='IsBirthdayShow = false'
          @confirm='UpdateBirthday'
        />
      </van-popup>

      <!-- 上传用户头像 -->
      <van-image-preview v-model="PreviewShow" :images="images" @close='file.value=""'>
        <van-nav-bar
        slot="cover"
        left-text='取消'
        right-text='确定'
        @click-left="PreviewShow = false"
        @click-right='onSaveImage'/>
      </van-image-preview>
  </div>

</template>

<script>
import { UpdateUserInfo, PutNickName, PutUserPhoto } from '../../api/user'
import nickName from './components/nickname'
import moment from 'moment'
export default {
  data () {
    return {
      Info: {}, // 接收返回的用户信息
      IsNicknameShow: false, // 控制弹层显示隐藏
      IsGenderShow: false,
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],

      IsBirthdayShow: false,
      minDate: new Date(1999, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),

      PreviewShow: false,
      images: []
    }
  },
  components: {
    nickName
  },
  computed: {
    file () {
      return this.$refs['file']
    }
  },
  methods: {
    // 更新用户头像
    async onSaveImage () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const fd = new FormData()
        fd.append('photo', this.file.files[0])
        const { data } = await PutUserPhoto(fd)
        // 更新视图
        this.Info.photo = data.data.photo
        this.$toast.success('保存成功')
        // 关闭头像预览
        this.PreviewShow = false
      } catch (err) {
        this.$toast.fail('保存失败')
      }
    },

    onFileChange () {
      // 文件对象
      const fileObj = this.file.files[0]

      // 获取文件数据
      const fileData = URL.createObjectURL(fileObj)

      // 将预览的图片放到数组中
      this.images = [fileData]

      // 显示图片预览
      this.PreviewShow = true
    },
    // 上传用户头像
    onFile () {
      // 手动触发dom节点的click事件
      this.file.click()
    },
    // 选择更新生日时间事件
    async UpdateBirthday (value) {
      // 提交更新
      value = moment(value).format('YYYY-MM-DD') // 处理格式

      await this.saveProfile('birthday', value)
      // 更新视图
      this.Info.birthday = value
      // 关闭弹层
      this.IsBirthdayShow = false
    },

    // 选择更新性别事件
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
        let { data } = await UpdateUserInfo()
        this.Info = data.data
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

<style lang='less' scoped>
 /deep/ .van-image-preview__cover{
   top: unset;
   bottom:0;
   right: 0;
   left: 0;
   .van-nav-bar{
     background:rgb(0, 0,0);
     .van-nav-bar__left{
       .van-nav-bar__text{
      color: white
    }
     }
     .van-nav-bar__right{
        .van-nav-bar__text{
      color: red
    }
     }

   }
  }
</style>

<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div
        class="message-item"
        :class="{ reverse: item.isMe  }"
        v-for="(item,index) in messages"
        :key="index"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          width="30"
          height="30"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="title">
          <span>{{ item.msg }}</span>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model="message" center clearable>
        <van-button slot="button" size="small" type="primary" @click="onSendMessage">发送</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data () {
    return {
      message: '',
      socket: null, // WebSocket 通信对象
      messages: [] // 存储所有的消息列表
    }
  },

  mounted () {
    window.list = this.$refs['message-list']
  },
  created () {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn')

    // 把 socket 存储到 data 中，然后就可以在 methods 中访问到了
    this.socket = socket
    // 当客户端与服务器建立连接成功，触发 connect 事件
    socket.on('connect', () => {
      // 建立连接成功
    })

    // 接收消息
    socket.on('message', data => {
      this.messages.push(data)
    })
  },
  methods: {
    onSendMessage () {
      const message = this.message.trim()
      if (!message) {
        return
      }

      // 发送消息  包括消息类型 和 数据格式
      const data = {
        msg: message,
        timestamp: Date.now(),
        isMe: true // 表示是我发的消息
      }
      // 发送消息
      this.socket.emit('message', data)

      // 把消息存储到列表中
      this.messages.push(data)
      // 清空文本框
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
  .chat-container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 46px 0 50px 0;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background: #f5f5f6;
    .message-list {
      height: 100%;
      overflow-y: scroll;
      .message-item {
        display: flex;
        align-items: center;
        padding: 10px;
        .title {
          background: #fff;
          padding: 5px;
          border-radius: 6px;
        }
        .avatar {
          margin-right: 5px;
        }
      }
      .reverse {
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
        }
      }
    }
    .send-message {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5f5f6 !important;
    }
  }
</style>

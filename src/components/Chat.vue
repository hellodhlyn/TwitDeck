<template>
  <div>
    <div class="header-area">
      <h3>Channel #{{ channelId }}</h3>
      <a :href="'https://twitch.tv/' + channelId" target="_blank"><button>채널보기</button></a>
      <button @click="$emit('delete-pannel')">패널삭제</button>
    </div>
    <div class="chat-area">
      <div class="message" v-for="message in messages" v-bind:key="message.id">
        <p class="chat-message" v-if="message.type === 'chat'">
          <span :style="{ color: message.color }" class="username">{{ message.displayName }}</span> : {{ message.text }}
        </p>
        <p class="info-message" v-else-if="message.type === 'info'">{{ message.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import tmi from 'tmi.js';

export default {
  name: 'Chat',
  props: {
    channelId: String,
  },
  data() {
    return {
      client: null,
      messages: [],
    };
  },
  mounted() {
    this.client = new tmi.client({
      channels: [this.channelId],
      connection: { secure: true },
    });
    this.client.on('connected', () => {
      this.messages.push({
        type: 'info',
        text: '채팅에 연결되었습니다.',
      });
    });
    this.client.on('chat', (channel, userstate, message) => {
      this.messages.push({
        type: 'chat',
        displayName: userstate['display-name'],
        color: userstate.color,
        text: message,
      });
    });
    this.client.connect();
  },
  updated() {
    const container = this.$el.querySelector('.chat-area');
    container.scrollTop = container.scrollHeight;
  },
};
</script>

<style lang="scss" scoped>
.header-area {
  padding: 8px 0;
  border-bottom: rgb(57, 46, 92) solid 1px;

   h3 {
    margin: 0;
    font-weight: normal;
  }

  button {
    border: 0;
    padding: 0 6px 0 0;
    height: 12px;
    font-size: 12px;
    background: transparent;
    color: rgb(177, 157, 216);
  }

  button:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

.chat-area {
  height: calc(100vh - 106px);
  overflow: scroll;
  word-wrap: break-all;

  .message {
    p {
      font-size: 14px;
      margin: 12px 0;
    }

    .info-message {
      text-align: center;
    }
  }
}
</style>

<template>
  <div>
    <div class="chat-pannel" v-if="channelId">
      <div class="header-area">
        <h3>Channel #{{ channelId }}</h3>
        <button @click="deletePannel()">채널 삭제</button>
      </div>
      <div class="body-area">
        <div class="message" v-for="message in messages" v-bind:key="message.id">
          <p><span :style="{ color: message.color }" class="username">{{ message.displayName }}</span> : {{ message.message }}</p>
        </div>
      </div>
    </div>

    <div class="add-pannel" v-else>
      <div class="header-area">
        <h3>채널 추가</h3>
        <button></button>
      </div>
      <div class="body-area">
        <p><input type="text" placeholder="추가할 채널 ID를 입력" v-model="channelIdToUpdate"></p>
        <button @click="updatePannel()">추가</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import tmi from 'tmi.js';

export default Vue.extend({
  name: 'Chat',
  data() {
    return {
      client: null,
      channelId: '',
      channelIdToUpdate: '',
      messages: [],
    };
  },
  methods: {
    deletePannel() {
      this.$emit('delete-pannel');
    },
    updatePannel() {
      this.$emit('add-pannel');

      this.channelId = this.channelIdToUpdate;
      this.connectClient();
    },
    connectClient() {
      this.client = new tmi.client({ channels: [this.channelId] });
      this.client.on('chat', (channel, userstate, message) => {
        this.messages.push({
          type: 'chat',
          displayName: userstate['display-name'],
          color: userstate.color,
          message,
        });
      });
      this.client.connect();
    },
  },
  mounted() {
    this.connectClient();
  },
  updated() {
    const container = this.$el.querySelector('.body-area');
    container.scrollTop = container.scrollHeight;
  },
});
</script>

<style scoped>
.header-area {
  padding: 8px 0;
  border-bottom: rgb(57, 46, 92) solid 1px;
}

.header-area h3 {
  margin: 0;
  font-weight: normal;
}

.header-area button {
  border: 0;
  padding: 0 6px 0 0;
  height: 12px;
  font-size: 12px;
  background: transparent;
  color: rgb(177, 157, 216);
}

.header-area button:hover {
  text-decoration: underline;
  cursor: pointer;
}

.body-area {
  height: calc(100vh - 105px);
  overflow: hidden scroll;
  word-wrap: break-all;
}

.body-area .message p {
  font-size: 14px;
  margin: 12px 0;
}

.body-area .message p .username {
  font-weight: bold;
}

.add-pannel .body-area input {
  background: transparent;
  width: calc(100% - 4px);
  font-size: 16px;
  line-height: 32px;
  color: rgb(218, 216, 222);
  border: 0;
  border-bottom: rgb(57, 46, 92) 1px solid;
}

.add-pannel .body-area button {
  background: #7d5bbe;
  color: #ffffff;
  width: 100%;
  height: 28px;
  font-size: 14px;
  border: 0;
}

.add-pannel .body-area button:hover {
  cursor: pointer;
}
</style>

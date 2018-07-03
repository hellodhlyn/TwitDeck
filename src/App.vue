<template>
  <div id="app">
    <div class="pannel" v-for="(channelId, index) in channelIds" v-bind:key="channelId">
      <chat :channelId="channelId" v-on:delete-pannel="deleteChatPannel(index)" v-on:add-pannel="addChatPannel()" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Chat from './components/Chat';

export default Vue.extend({
  name: 'App',
  components: {
    Chat,
  },
  data() {
    return {
      channelIds: [null],
    };
  },
  methods: {
    addChatPannel() {
      this.channelIds.push(null);
    },
    deleteChatPannel(index) {
      this.channelIds.splice(index, 1);
    },
  },
});
</script>


<style>
body {
  font-family: 'Spoqa Han Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: rgb(25, 23, 28);
  margin: 0;
}

#app {
  color: #2c3e50;

  height: 100vh;
  min-width: 100%;
  white-space: nowrap;
}

.pannel {
  height: calc(100vh - 48px);
  width: 360px;
  display: inline-block;
  margin: 12px 0 12px 12px;
  padding: 12px;
  background-color: rgb(14, 12, 19);
  color: rgb(218, 216, 222);
}
</style>

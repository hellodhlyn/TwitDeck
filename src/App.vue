<template>
  <div id="app">
    <div class="menu pannel">
      <div class="menu-item" @click="modal.settings.isActive = true">
        <i class="fas fa-cogs"></i>
        <p>설정</p>
      </div>
    </div>

    <div class="hello pannel" v-if="channelIds.length === 0">
      <h1>TwitDeck!</h1>
      <p>왼쪽의 <strong>[패널 설정]</strong>을 눌러 채널을 추가해주세요.</p>
      <p><a href="https://github.com/HelloDHLyn/TwitDeck" target="_blank">GitHub</a></p>
    </div>

    <div class="chat pannel" v-for="channelId in channelIds" v-bind:key="channelId">
      <chat :channelId="channelId" v-on:delete-pannel="deletePannel(channelId)" />
    </div>

    <!-- 설정 모달 -->
    <div id="settings-modal" v-bind:class="['modal', modal.settings.isActive ? 'active' : '']">
      <div class="modal-content">
        <div class="close-btn" @click="modal.settings.isActive = false">
          <i class="fas fa-times"></i>
        </div>
        <h2>패널 추가</h2>
        <input text="text" placeholder="채널 ID" v-model="input.channelToAdd">
        <button type="button" @click="addPannel()">추가</button>
      </div>
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
      channelIds: [],
      modal: {
        settings: {
          isActive: false,
        },
      },
      input: {
        channelToAdd: '',
      },
    };
  },
  methods: {
    addPannel() {
      this.channelIds.push(this.input.channelToAdd);
      this.modal.settings.isActive = false;
      this.input.channelToAdd = '';
      this.updateLocalStorage();
    },
    deletePannel(channelId) {
      const index = this.channelIds.indexOf(channelId);
      this.channelIds.splice(index, 1);
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      this.$localStorage.set('twitdeck.channelIds', this.channelIds, Array);
    },
  },
  created() {
    this.channelIds = this.$localStorage.get('twitdeck.channelIds', [], Array);
  },
});
</script>


<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  height: 100%;
  overflow: hidden;
}

body {
  font-family: 'Spoqa Han Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  color: rgb(218, 216, 222);
  background-color: rgb(25, 23, 28);
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  a {
    color: rgb(177, 157, 216);
  }

  .pannel {
    padding: 12px;
    background-color: rgb(14, 12, 19);
    flex: 0 0 auto;
  }

  .menu.pannel {
    height: 100%;
    min-height: 100%;
    text-align: center;
    padding: 24px 0;
    margin: 0;
    width: 80px;

    .menu-item {
      i {
        font-size: 28px;
      }

      p {
        margin: 0;
        font-size: 12px;
      }
    }

    .menu-item:hover {
      cursor: pointer;
    }
  }

  .hello.pannel {
    width: 360px;
    margin: 12px 0 12px 12px;
    padding: 16px 12px;

    * {
      word-break: break-all;
    }

    h1, h2, h3 {
      margin: 24px 0 0 0;
      font-weight: normal;
    }

    h1 {
      margin: 0;
    }

    ul {
      margin: 8px 0;
    }

    p, li {
      font-size: 14px;
    }
  }

  .chat.pannel {
    height: calc(100% - 24px);
    margin: 12px 0 12px 12px;
    padding: 12px;
    width: 360px;
  }

  .modal {
    visibility: hidden;
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);

    .modal-content {
      padding: 12px;
      background-color: rgb(25, 23, 28);
      margin: 10vh auto;
      width: 480px;

      h1, h2 {
        margin: 0 0 12px 0;
        font-weight: normal;
      }

      input {
        height: 32px;
        border: 0;
        padding: 0 12px;
        font-size: 12px;
      }

      button {
        margin: 4px;
        border: 0;
        padding: 8px 12px;
        background: rgb(100, 65, 164);
        color: rgb(218, 216, 222);
        font-size: 12px;
      }

      button:hover {
        cursor: pointer;
      }

      .close-btn {
        float: right;
      }

      .close-btn:hover {
        cursor: pointer;
      }
    }
  }

  .modal.active {
    visibility: initial;
  }
}
</style>

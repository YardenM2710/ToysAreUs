<template>
  <section>
    <div v-if="chatOpen" class="chat-container">
      <ul class="messages">
        <li v-for="(msg, idx) in msgs" :key="idx">
          <span :style="{ fontWeight: 'bold' }">{{ msg.from }}: </span
          >{{ msg.txt }}
        </li>
      </ul>
      <div v-if="isTyping" class="typing">
        <span v-for="(user, idx) in typingUsers" :key="idx"
          >{{ user }} is typing...
        </span>
      </div>
      <form id="form" @submit.prevent="sendMsg">
        <input
          @input="startTyping()"
          v-model="msg.txt"
          id="input"
          autocomplete="off"
        />
        <button>Send</button>
      </form>
      <el-button @click="chatOpen = !chatOpen" class="close-chat-btn"
        >X</el-button
      >
    </div>
    <div v-else>
      <el-button
        class="open-chat-ctn"
        @click="chatOpen = !chatOpen"
        type="success"
        >Open Chat</el-button
      >
    </div>
  </section>
</template>

<script>
import { socketService } from '../services/socket.service.js';
export default {
  props: ['toy'],
  data() {
    return {
      chatOpen: false,

      msg: { from: 'me', txt: '' },
      msgs: [],
      user: null,
      typingUsers: [],
      timeOut: null,
      isTyping: false,
    };
  },
  components: {},
  created() {
    // socketService.setup();
    socketService.emit('chat topic', this.toy._id);
    socketService.on('chat addMsg', this.addMsg);
    socketService.on('typing', this.newTypingUser);

    socketService.on('stop typing', this.deleteTypingUser);

    this.user = this.$store.getters.getLoggedinUser;
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg);
    // socketService.terminate();
  },
  computed: {
    // getLoggedinUser() {
    //   return this.$store.getters.getLoggedinUser
    // },
  },
  methods: {
    newTypingUser(userName) {
      if (
        this.typingUsers.includes(userName) ||
        userName === this.user.username
      )
        return;
      this.typingUsers.push(userName);
      this.isTyping = true;
    },
    deleteTypingUser(userName) {
      this.typingUsers = this.typingUsers.filter((user) => user !== userName);
      if (this.typingUsers.length === 0) this.isTyping = false;
    },
    startTyping() {
      socketService.emit('typing', this.user.username);

      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        socketService.emit('stop typing', this.user.username);
      }, 1000);
    },
    addMsg(msg) {
      this.msgs.push(msg);
    },
    sendMsg() {
      this.msg.from = this.user.username;
      socketService.emit('chat newMsg', this.msg);
      // TODO: next line not needed after connecting to backend
      // this.addMsg(this.msg)
      // setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      this.msg = { from: 'Me', txt: '' };
    },
    changeTopic() {
      socketService.emit('chat topic', this.toy._id);
    },
  },
};
</script>

<style></style>

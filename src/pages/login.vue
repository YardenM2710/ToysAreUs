<template>
  <section class="user-modal slide-in-top">
    <div v-if="isLogin">
      <h3>Login</h3>
      <form>
        <el-input type="text" placeholder="user Name" v-model="user.username" />
        <el-input
          type="password"
          placeholder="password"
          v-model="user.password"
        />
        <div class="btn-container">
          <el-button @click.prevent="login">Login</el-button>
          <p>
            Need an account? <span @click="changeIsLogin">{{ showLink }}</span>
          </p>
        </div>
      </form>
    </div>
    <div v-else>
      <h3>Signup</h3>
      <form>
        <el-input type="text" placeholder="Full name" v-model="user.fullname" />
        <el-input type="text" placeholder="Username" v-model="user.username" />
        <el-input
          type="password"
          placeholder="Password"
          v-model="user.password"
        />
        <div class="btn-container">
          <el-button @click.prevent="signup">Sign Up</el-button>
          <el-button @click.prevent="signup('guest')"
            >Continue as guest</el-button
          >
          <p>
            Allready got an account?
            <span @click="changeIsLogin">{{ showLink }}</span>
          </p>
        </div>
      </form>
    </div>
    <!-- <button @click="logout">Logout</button> -->
  </section>
  <!-- <div class="login-page">
    <div v-if="!isSignedUp" class="sign-up-form">
      <h1>Sign up here</h1>
      <p>Please enter Full name:</p>
      <el-input v-model="user.fullname"></el-input>
      <p>Please enter username:</p>
      <el-input v-model="user.username"></el-input>
      <p>Please enter your password:</p>
      <el-input type="password" v-model="user.password"></el-input>
      <el-button @click="signup">Sign</el-button>
      <p>Allready got an account?</p>
      <el-button @click="isSignedUp = !isSignedUp">Click here</el-button>
    </div>

    <div v-else class="sign-up-form">
      <h1>Login here</h1>
      <p>Please enter username:</p>
      <el-input v-model="user.username"></el-input>
      <p>Please enter your password:</p>
      <el-input type="password" v-model="user.password"></el-input>
      <el-button @click="login">Log in</el-button>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      isSignedUp: false,
      user: {},
      loggedInUser: null,
      isLogin: false,
    };
  },
  computed: {
    showLink() {
      return this.isLogin ? 'Sign Up' : 'Login';
    },
  },
  methods: {
    changeIsLogin() {
      this.isLogin = !this.isLogin;
    },
    async signup(isGuest) {
      if (isGuest === 'guest') {
        this.user = {
          fullname: 'Guest', //change to Guest
          username: 'Guest',
          password: 'guest',
        };
      }
      const user = JSON.parse(JSON.stringify(this.user));
      const loggedInUser = await this.$store.dispatch('signUp', { user });
      if (loggedInUser) this.$router.push('/toys');

      this.user = {};
    },
    async login() {
      const user = JSON.parse(JSON.stringify(this.user));
      const loggedInUser = await this.$store.dispatch('login', { user });
      if (loggedInUser) this.$router.push('/toys');
      this.user = {};
    },
  },
};
</script>

<style></style>

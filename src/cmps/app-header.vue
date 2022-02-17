<template>
  <section>
    <div class="main-header">
      <div class="header-details">
        <h1>Toys Are Us</h1>
      </div>

      <section>
        <div @click="openNav()" class="header-menu">
          <i style="font-size: 2.5em" class="el-icon-menu"></i>
        </div>
      </section>
      <section @click="closeNav()" class="navbar">
        <router-link to="/">Home</router-link>
        <router-link v-if="!user.isAdmin" to="/user-details"
          >Order List</router-link
        >
        <router-link to="/toys">Shop</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/chart">Statistics</router-link>
        <router-link v-if="!user" to="/login">Login/Sign up</router-link>
        <a v-else @click="logout">Log out</a>
      </section>
    </div>
    <div @click="closeNav()" v-if="isScreenOpen" class="screen"></div>
  </section>
</template>

<script>
import store from '../store/index';
export default {
  name: 'main-header',
  data() {
    return {
      isScreenOpen: false,
    };
  },
  created() {},

  methods: {
    openNav() {
      document.querySelector('.navbar').classList.add('open');
      this.isScreenOpen = true;
    },
    closeNav() {
      document.querySelector('.navbar').classList.remove('open');
      this.isScreenOpen = false;
    },
    async logout() {
      const loggedOutUser = this.loggedInUser;
      const isLoggedOut = await this.$store.dispatch('logout', {
        loggedOutUser,
      });
      if (isLoggedOut) {
        this.$router.push('/login');
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>

<template>
  <section class="user-details">
    <div v-if="user.isAdmin">
      <h1>Hello Admin !</h1>
    </div>
    <div v-else>
      <h1>Welcome Back {{ user.username }}</h1>
      <h3>Your Balance is {{ user.balance }}$</h3>
      <h1 v-if="userOrder.length > 0">Your Orders :</h1>
      <h1 v-else>No orders yet</h1>
      <div
        class="user-orders"
        v-for="order in userOrder"
        :key="order.createdAt"
      >
        <p>
          <span :style="{ fontWeight: 'bold' }">Product name :</span>
          {{ order.toy.name }}
        </p>
        <p>
          <span :style="{ fontWeight: 'bold' }">Product Price :</span
          >{{ order.toy.price }} $
        </p>
        <p>
          <span :style="{ fontWeight: 'bold' }">Purchased at :</span>
          {{ order.createdAt | moment('from') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      user: this.$store.getters.getLoggedinUser,
    };
  },
  created() {},
  computed: {
    userOrder() {
      return this.user.orders;
    },
  },
  methods: {
    backToMain() {
      this.$router.push('/toys');
    },
  },
};
</script>

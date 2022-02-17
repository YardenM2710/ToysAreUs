<template>
  <div class="home-page">
    <div class="home-page-details">
      <h1>Welcome to my Toys shop App</h1>
      <p>
        Find the New Toys & Games. Fast Delivery and Easy Returns Available!
        Offers a Wide Collection of Lifestyle Products at Attractive Prices
      </p>
      <button @click="goToToys()" class="nice-button">Go to shop</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    goToToys() {
      this.$router.push('/toys');
    },
  },
};
</script>

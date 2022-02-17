<template>
  <section v-if="toy" class="toy-preview">
    <div class="toy-details">
      <ul class="toy-card">
        <li><span>Name : </span>{{ toy.name }}</li>
        <li><span>Price : </span>{{ toy.price }}$</li>
        <li><span>Is available?</span> {{ trueFalseToHumans }}</li>
        <li><span>Labels: </span></li>
        <li class="label">
          <span v-for="label in toy.labels" :key="label">
            {{ label }}
          </span>
        </li>
      </ul>
      <div class="edit-links">
        <router-link :to="'/toy/details/' + toy._id">Details</router-link>
        <router-link v-if="loggedInUser.isAdmin" :to="'/toy/edit/' + toy._id"
          >Edit</router-link
        >
        <a @click="addToCart(toy)" class="buy-now" v-if="!loggedInUser.isAdmin"
          >Buy Now !</a
        >
        <a v-if="loggedInUser.isAdmin">
          <i @click="removeToy(toy._id)" class="el-icon-delete" alt="Remove" />
        </a>
      </div>
    </div>
    <div v-if="toy.url" class="img-container">
      <img :src="require('../assets/' + toy.url)" />
    </div>

    <!-- <button @click="removeToy(toy._id)">X</button> -->
  </section>
</template>

<script>
export default {
  props: ['toy'],
  data() {
    return {
      loggedInUser: this.$store.getters.loggedInUser,
    };
  },
  created() {
    // console.log('toy:', this.toy)
  },
  methods: {
    addToCart(toy) {
      this.$store.dispatch({
        type: 'addToCart',
        toy,
        user: this.loggedInUser,
      });
      this.$notify({
        group: 'foo',
        type: 'success',
        title: `Product ID ${toy._id} has been added to order list`,
        text: 'Hello user! This is a notification!',
      });
    },
    removeToy() {
      this.$emit('removeToy');
    },
    goToOrderlist() {
      console.log('hey');
    },
  },
  computed: {
    trueFalseToHumans() {
      if (this.toy.inStock) return 'Yes';
      else return 'No';
    },
  },
};
</script>

<style></style>

<template>
  <section v-if="toy" class="toy-details">
    <div class="img-container">
      <img :src="require('../assets/' + toy.url)" />
    </div>

    <div class="toy-details">
      <ul class="toy-card">
        <li><span>Name :</span> {{ toy.name }}</li>
        <li><span>Price :</span> {{ toy.price }}$</li>
        <li><span>Available ?</span> {{ trueFalseToHumans }}</li>
      </ul>

      <div v-if="user.isAdmin" class="edit-links">
        <router-link :to="'/toy/edit/' + toy._id">Edit</router-link>
      </div>
    </div>
    <div class="reviews-container scrollbar" v-if="reviews" id="style-2">
      <h1>What do you think about this toy?..</h1>
      <div class="review-card" v-for="(review, idx) in reviews" :key="idx">
        <div class="byUser">
          <h3>{{ review.byUser }}</h3>
        </div>
        <p>{{ review.txt }}</p>
        <span>{{ review.createdAt | moment('from') }}</span>
        <div @click="removeReview(review._id)" class="btn">X</div>
      </div>
      <form class="review-form">
        <textarea
          v-model="reviewToEdit.txt"
          placeholder="Your Opinion Matters..."
        ></textarea>
        <el-button @click="addReview()">Save</el-button>
      </form>
    </div>
    <chat :toy="toy" />

    <el-button @click="backToMain">Back</el-button>
  </section>
</template>

<script>
import { toyService } from '../services/toy-service.js';
import chat from '../cmps/chat.vue';
export default {
  data() {
    return {
      reviewToEdit: {
        txt: '',
        aboutToyId: null,
        byUser: null,
      },
      user: this.$store.getters.loggedInUser,
      toy: null,
    };
  },
  created() {
    this.loadToy();
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    getToyId() {
      return this.toy._id;
    },
    trueFalseToHumans() {
      if (this.toy.inStock) return 'Yes';
      else return 'No';
    },
  },
  methods: {
    removeReview(reviewId) {
      this.$store.dispatch({
        type: 'removeReview',
        reviewId,
      });
    },
    async addReview() {
      try {
        this.reviewToEdit.byUser = this.user.username;
        await this.$store.dispatch({
          type: 'addReview',
          review: this.reviewToEdit,
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.reviewToEdit.txt = '';
      }
    },
    async loadToy() {
      try {
        // move to store
        const id = this.$route.params.toyId;
        const toy = await toyService.getById(id);
        this.toy = toy;
        this.reviewToEdit.aboutToyId = this.toy._id;
      } catch (err) {
        console.log(err);
      } finally {
        this.$store.dispatch({ type: 'loadReviews', toyId: this.toy._id });
      }
    },

    backToMain() {
      this.$router.push('/toys');
    },
  },
  components: {
    chat,
  },
};
</script>

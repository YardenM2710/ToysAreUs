<template>
  <section class="toy-container">
    <div>
      <toy-filter></toy-filter>
      <toy-list @remove="remove" :toys="toysForDisplay"></toy-list>
    </div>
  </section>
</template>

<script>
import { toyService } from '@/services/toy-service.js';
import toyList from '../cmps/toy-list.vue';
import toyFilter from '../cmps/toy-filter.vue';

export default {
  data() {
    return {
      toys: [],
    };
  },
  components: {
    toyList,
    toyFilter,
  },
  created() {
    this.$store.dispatch({ type: 'loadToys' });
  },
  computed: {
    toysForDisplay() {
      return this.$store.getters.toysForDisplay;
    },
  },
  methods: {
    remove(toyId) {
      this.$store.dispatch({ type: 'remove', toyId }).then(() => {});
    },
  },
};
</script>

<style></style>

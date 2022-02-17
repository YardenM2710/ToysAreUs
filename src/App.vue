<template>
  <div id="app">
    <notifications group="foo"></notifications>

    <div id="nav">
      <app-header></app-header>
    </div>
    <router-view />
  </div>
</template>
<script>
import appHeader from '@/cmps/app-header.vue';
import toysApp from '@/pages/toys-app.vue';

export default {
  components: {
    appHeader,
    toysApp,
  },
  created() {
    this.$isLoading(true);
    // this.$store.dispatch({ type: 'loadToys' })
    setTimeout(() => this.$isLoading(false), 1000);
  },
  methods: {},
};
</script>

<style></style>

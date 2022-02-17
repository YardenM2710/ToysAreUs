<template>
  <div class="search-filter">
    <div class="search-input">
      <el-input
        @input="filter"
        placeholder="Search Toys"
        v-model="filterBy.title"
        clearable
      >
      </el-input>
      <div class="select-input">
        <el-select v-model="filterBy.selectOpt" @change="filter">
          <el-option value="All">All</el-option>
          <el-option value="stock">In stock</el-option>
        </el-select>
        <multi-select @setLabelFilter="setLabelFilter" />
        <router-link v-if="user.isAdmin" class="add-toy" to="/toy/edit"
          >Add+</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { utilService } from '../services/util.service.js';
import multiSelect from '../cmps/multiselect.vue';
export default {
  data() {
    return {
      user: this.$store.getters.loggedInUser,
      filterBy: {
        title: '',
        selectOpt: 'All',
        labels: [],
      },
    };
  },
  created() {
    this.filter = utilService.debounce(this.filter, 2000);
  },
  methods: {
    setLabelFilter(labels) {
      this.filterBy.labels = labels;
      this.filter();
    },
    filter() {
      this.$store.dispatch({ type: 'filter', filterBy: { ...this.filterBy } });
    },
  },
  components: {
    multiSelect,
  },
};
</script>

<style></style>

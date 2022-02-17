<template>
  <section v-if="toy" class="toy-details">
    <div class="img-container">
      <img v-if="toy" :src="require('../assets/' + toy.url)" />
    </div>
    <form class="toy-edit">
      <label
        >New name ?
        <el-input type="text" v-model="toy.name" />
      </label>
      <label
        >Price ?

        <el-input type="number" v-model="toy.price" />
      </label>
      <label>Label ? </label>
      <el-select v-model="toy.labels" multiple placeholder="Labels">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <label
        >On stock?
        <input type="checkbox" v-model="toy.inStock" />
      </label>
      <el-button @click.prevent="save">Save</el-button>
    </form>
    <el-button @click="backToMain">Back</el-button>
  </section>
</template>

<script>
import { toyService } from '../services/toy-service.js';
import multiSelect from '../cmps/multiselect';
export default {
  components: {
    multiSelect,
  },
  data() {
    return {
      toy: null,
      options: [
        {
          value: 'Fun',
          label: 'Fun',
        },
        {
          value: 'Action',
          label: 'Action',
        },
        {
          value: 'Space',
          label: 'Space',
        },
        {
          value: 'Funny',
          label: 'Funny',
        },
      ],
      value1: [],
    };
  },
  created() {
    this.loadToy();
  },
  methods: {
    save() {
      this.$store
        .dispatch({
          type: 'updateToy',
          toy: JSON.parse(JSON.stringify(this.toy)),
        })
        .then((savedToy) => {
          this.$router.push('/toys');
        });
    },
    loadToy() {
      const id = this.$route.params.toyId;
      if (id) {
        toyService.getById(id).then((toy) => {
          this.toy = JSON.parse(JSON.stringify(toy));
        });
      } else {
        this.toy = toyService.getEmptyToy();
      }
    },
    backToMain() {
      this.$router.push('/toys');
    },
  },
};
</script>

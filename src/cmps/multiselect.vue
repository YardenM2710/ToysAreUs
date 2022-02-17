<template>
  <el-select
    @change="filter"
    v-model="value1"
    multiple
    placeholder="Search by label"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
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
    }
  },
  methods: {
    filter() {
      this.$emit('setLabelFilter', this.value1)
    },
  },
}
</script>

<style></style>

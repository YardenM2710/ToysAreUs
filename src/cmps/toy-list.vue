<template>
  <section>
    <div class="toy-list">
      <toy-preview
        v-for="toy in toys"
        :key="toy._id"
        :toy="toy"
        @removeToy="$emit('remove', toy._id)"
      />
    </div>
  </section>
</template>

<script>
import toyPreview from './toy-preview.vue'
export default {
  props: {
    toys: null,
  },
  components: {
    toyPreview,
  },
  created() {},
}
</script>

<style></style>

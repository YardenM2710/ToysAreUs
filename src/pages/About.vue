<template>
  <div class="about">
    <h1>Find Us</h1>
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
      }"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: [
        { city: 'Petach Tikva', position: { lat: 32.09573, lng: 34.881865 } },
        { city: 'Tel Aviv', position: { lat: 32.08704, lng: 34.775293 } },
        { city: 'Netanya', position: { lat: 32.290295, lng: 34.861591 } },
      ],
      center: { lat: 32.08704, lng: 34.775293 },
    }
  },
  created() {},
  methods: {
    moveTo(position) {
      const { lat, lng } = position
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo({ lat, lng })
      })
    },
  },
}
</script>

<style></style>

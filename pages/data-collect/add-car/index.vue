<template>
  <car-selector :scrollTop="scrollTop"></car-selector>
</template>

<script>
import carSelector from '@/components/car-selector/index.vue'
export default {
  components: {
    carSelector
  },
  data() {
    return {
      scrollTop: 0
    }
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  methods: {}
}
</script>

<style></style>

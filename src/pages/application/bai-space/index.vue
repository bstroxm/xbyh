<template>
  <view>
    坎坎坷坷
    <u-tabbar :list="tabbarList" :mid-button="true" :active-color="defaultColor.primary.common"></u-tabbar>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['tabbarList', 'defaultColor'])
  },
  methods: {}
}
</script>

<style></style>

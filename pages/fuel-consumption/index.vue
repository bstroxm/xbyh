<template>
  <view>
    啊但是大

    <u-tabbar :list="tabbarList" :mid-button="true" :active-color="defaultColor.primary.common"></u-tabbar>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      pic: 'https://uviewui.com/common/logo.png',
      show: true
    }
  },
  computed: {
    ...mapState(['tabbarList', 'defaultColor'])
  },
  onLoad() {},
  methods: {}
}
</script>

<style lang="scss">
page {
  background-color: #ededed;
}
.camera {
  width: 54px;
  height: 44px;

  &:active {
    background-color: #ededed;
  }
}
.user-box {
  background-color: #fff;
}
</style>

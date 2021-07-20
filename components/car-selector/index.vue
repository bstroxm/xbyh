<template>
  <view>
    <u-index-list :scrollTop="scrollTop">
      <view v-for="(item, index) in indexList" :key="index">
        <u-index-anchor :index="item" />
        <view class="list-cell">列表1</view>
        <view class="list-cell">列表2</view>
        <view class="list-cell">列表3</view>
      </view>
    </u-index-list>
  </view>
</template>

<script>
export { default } from './index'
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
</style>

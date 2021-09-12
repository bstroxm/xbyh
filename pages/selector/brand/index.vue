<template>
  <view>
    <u-index-list :scrollTop="scrollTop" :index-list="indexList">
      <view v-for="brand in brandList" :key="brand.alphabetic">
        <u-index-anchor :index="brand.alphabetic" />
        <view class="list-cell" v-for="item in brand.list" :key="item._id" @click="handleChooseBrand(item)">
          <u-image width="60rpx" height="60rpx" shape="circle" mode="aspectFit" :src="item.brand_logo" @click="handleChooseBrand(item)">
            <u-loading slot="loading"></u-loading>
          </u-image>
          <text class="list-cell-text">{{ item.brand_name }}</text>
        </view>
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

.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 60rpx;
  background-color: #fff;
}

.list-cell-text {
  margin-left: 20rpx;
}
</style>

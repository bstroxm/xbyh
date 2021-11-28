<template>
  <view>
    <scroll-view scroll-y="true" class="my-cars-wrapper">
      <u-radio-group v-model="currentCarId">
        <u-swipe-action
          v-for="(car, index) in userCars"
          :options="swipeActions"
          :index="index"
          :key="car._id"
          :show="car.swipeShow"
          @click="handleSwipeClick"
          @open="handleSwipeOpen"
        >
          <u-card :show-head="false" :show-foot="false" :border="false" margin="0">
            <view class="" slot="body">
              <view class="u-flex">
                <view class="car-image-wrapper">
                  <u-image
                    width="120rpx"
                    height="120rpx"
                    shape="circle"
                    mode="aspectFit"
                    :lazy-load="true"
                    :src="car.cover_url"
                  >
                    <u-loading slot="loading"></u-loading>
                  </u-image>
                </view>
                <view class="car-info-wrapper">
                  <view class="car-name">{{ car.nickname }}</view>
                  <view class="car-info">{{ car.series_name + ' ' + car.car_year + '款 ' + car.car_name }}</view>
                  <!-- <view class="car-info">{{ car.car_year + '款 ' + car.car_name }}</view> -->
                </view>
                <view class="car-radio-wrapper">
                  <u-radio :name="car._id" />
                </view>
              </view>
            </view>
          </u-card>
        </u-swipe-action>
      </u-radio-group>
    </scroll-view>
    <view class="save-wrapper"><u-button type="primary" shape="circle" @click="handleCreate">新建</u-button></view>
  </view>
</template>

<script>
export { default } from './index'
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}

.my-cars-wrapper {
  // #ifdef MP-WEIXIN
  height: calc(100vh - 180rpx);
  // #endif
  // #ifndef MP-WEIXIN
  height: calc(100vh - 285rpx);
  // #endif
  width: calc(100% - 60rpx);
  padding: 0 30rpx;

  .u-swipe-action {
    margin: 30rpx 0;
  }

  .car-image-wrapper {
    margin-right: 20rpx;
  }

  .car-info-wrapper {
    width: calc(100% - 190rpx);

    .car-name {
      font-size: 32rpx;
      color: $u-main-color;
      font-weight: 700;
      margin-bottom: 8rpx;
    }

    .car-info {
      font-size: 24rpx;
      color: $u-tips-color;
      margin-bottom: 8rpx;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .car-radio-wrapper {
    margin-left: 20rpx;

    .u-radio__label {
      display: none;
    }
  }
}

.save-wrapper {
  width: 100%;
  padding: 50rpx;
  background-color: $uni-bg-color-grey;
}
</style>

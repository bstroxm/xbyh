<template>
  <view>
    <scroll-view class="top-filter-wrapper" scroll-x="true">
      <u-tag
        text="全部"
        :mode="filterCarYear === 'all' ? 'plain' : 'light'"
        type="info"
        size="mini"
        @click="handleFilterCar('all')"
      />
      <u-tag
        v-for="car in carList"
        :key="car.carYear"
        :text="car.carYear"
        :mode="filterCarYear === car.carYear ? 'plain' : 'light'"
        type="info"
        size="mini"
        @click="handleFilterCar(car.carYear)"
      />
    </scroll-view>
    <scroll-view @scroll="handleScroll" scroll-y="true" class="index-list-wrapper">
      <u-index-list v-if="filterCarYear === 'all'" :scrollTop="scrollTop" :index-list="[]" :offset-top="indexOffsetTop">
        <view v-for="car in carList" :key="car.carYear">
          <u-index-anchor :use-slot="true">
            <u-divider half-width="240">{{ car.carYear }}</u-divider>
          </u-index-anchor>
          <view class="list-wrapper" v-for="item in car.list" :key="item._id" @click="handleChooseCar(item)">
            <view class="list-cell">
              <text class="list-cell-text">{{ item.car_name }}</text>
            </view>
          </view>
        </view>
      </u-index-list>
      <view v-if="filterCarYear !== 'all'" class="filter-list-wrapper">
        <view class="list-wrapper" v-for="item in filterCarList" :key="item._id" @click="handleChooseCar(item)">
          <view class="list-cell">
            <text class="list-cell-text">{{ item.car_name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export { default } from './index'
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}

.top-filter-wrapper {
  height: 70rpx;
  line-height: 70rpx;
  padding: 0 20rpx;
  background-color: #fff;
  white-space: nowrap;

  .u-tag {
    padding: 8rpx 16rpx;
    margin-right: 20rpx;

    &.u-mode-plain-info {
      color: #333;
    }
    &.u-mode-light-info {
      border: 1px solid #f4f4f5;
      color: #333;
    }

    &:last-child {
      margin-right: 40rpx;
    }
  }
}

.index-list-wrapper {
  height: calc(100vh - 90rpx);

  .u-index-anchor {
    &.u-index-anchor--active {
      .u-divider {
        background-color: #fff !important;
      }
    }

    .u-divider {
      background-color: whitesmoke !important;
    }
  }
}

.filter-list-wrapper {
  margin: 30rpx 0;
}

.list-wrapper {
  margin: 0 24rpx;
  background-color: #fff;

  &:last-child {
    .list-cell {
      border-bottom: none;
    }
  }

  .list-cell {
    display: flex;
    box-sizing: border-box;
    // padding: 0 24rpx;
    margin: 0 30rpx;
    border-bottom: 1px solid #e7e7e7;
    overflow: hidden;
    color: #323233;
    font-size: 28rpx;
    line-height: 120rpx;

    .list-cell-text {
      margin-left: 20rpx;
    }
  }
}
</style>

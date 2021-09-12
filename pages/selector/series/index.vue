<template>
  <view>
    <scroll-view class="top-filter-wrapper" scroll-x="true">
      <u-tag text="全部" :mode="filterSeriesType === 'all' ? 'plain' : 'light'" type="info" size="mini" @click="handleFilterSeries('all')" />
      <u-tag
        v-for="series in seriesList"
        :key="series.seriesType"
        :text="series.seriesType"
        :mode="filterSeriesType === series.seriesType ? 'plain' : 'light'"
        type="info"
        size="mini"
        @click="handleFilterSeries(series.seriesType)"
      />
    </scroll-view>
    <scroll-view @scroll="handleScroll" scroll-y="true" class="index-list-wrapper">
      <u-index-list v-if="filterSeriesType === 'all'" :scrollTop="scrollTop" :index-list="[]" :offset-top="156">
        <view v-for="series in seriesList" :key="series.seriesType">
          <u-index-anchor :use-slot="true">
            <u-divider half-width="240">{{ series.seriesType }}</u-divider>
          </u-index-anchor>
          <view class="list-wrapper" v-for="item in series.list" :key="item._id" @click="handleChooseSeries(item)">
            <view class="list-cell">
              <u-image width="120rpx" height="120rpx" mode="aspectFit" :src="item.cover_url" @click="handleChooseSeries(item)">
                <u-loading slot="loading"></u-loading>
              </u-image>
              <text class="list-cell-text">{{ item.series_name }}</text>
            </view>
          </view>
        </view>
      </u-index-list>
      <view v-if="filterSeriesType !== 'all'" class="filter-list-wrapper">
        <view class="list-wrapper" v-for="item in filterSeriesList" :key="item._id" @click="handleChooseSeries(item)">
          <view class="list-cell">
            <u-image width="120rpx" height="120rpx" mode="aspectFit" :src="item.cover_url" @click="handleChooseSeries(item)">
              <u-loading slot="loading"></u-loading>
            </u-image>
            <text class="list-cell-text">{{ item.series_name }}</text>
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
    display: inline-block;
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
    font-size: 14px;
    line-height: 120rpx;

    .list-cell-text {
      margin-left: 20rpx;
    }
  }
}
</style>

<template>
  <u-form :model="form" ref="uForm" label-width="140">
    <u-card title="基本信息" class="custom-card required" :show-foot="false">
      <view class="" slot="body">
        <u-form-item label="车辆名称"><u-input v-model="name" input-align="right" placeholder="请输入车辆名称" /></u-form-item>
      </view>
    </u-card>

    <u-card title="车辆信息" class="custom-card required" :show-foot="false">
      <view class="" slot="body">
        <!-- <u-form-item label="品牌"><u-input v-model="brand.name" /></u-form-item>
        <u-form-item label="车系"><u-input v-model="series.name" /></u-form-item>
        <u-form-item label="车型"><u-input v-model="car.name" /></u-form-item> -->
        <view class="add-car-wrapper" @click="handleGoSelectBrand">
          <u-icon name="car" custom-prefix="custom-icon" size="160" color="rgb(192, 196, 204)" />
          <text class="add-car">添加</text>
        </view>
      </view>
    </u-card>

    <u-card title="其他（可选）" class="custom-card" :show-foot="false">
      <view class="" slot="body">
        <u-form-item label="车辆来源">
          <u-radio-group v-model="radio">
            <u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
              {{ item.name }}
            </u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item label="提车日期">
          <u-calendar v-model="isCalendarShow" @change="handleCalendarChange"></u-calendar>
          <u-input v-model="purchaseDate.result" input-align="right" placeholder="请输入提车日期" :clearable="false" @click="isCalendarShow = true" />
        </u-form-item>
        <u-form-item label="提车地点"><u-input v-model="car.name" input-align="right" placeholder="请输入提车地点" /></u-form-item>
        <u-form-item label="提车价格"><u-input v-model="car.name" input-align="right" placeholder="请输入提车价格" /></u-form-item>
      </view>
    </u-card>
  </u-form>
</template>

<script>
export { default } from './index'
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}

.custom-card {
  /deep/ &.u-card {
    padding: 0 30rpx;
  }

  // #ifdef MP-WEIXIN
  /deep/ .u-card {
    padding: 0 30rpx;
  }
  // #endif

  /deep/ .u-card__head {
    padding: 20rpx 0 !important;
  }

  /deep/ .u-card__body {
    padding: 0 !important;
  }

  /deep/ .u-card__head--left__title {
    padding-left: 10px;
    border-left: 3px solid $uni-color-primary;
  }

  /deep/ .u-form-item--right__content__slot {
    justify-content: flex-end;

    .u-radio {
      &:last-child {
        .u-radio__label {
          margin-right: 0;
        }
      }
    }
  }

  .u-form-item.u-border-bottom {
    &:last-child {
      &::after {
        border-bottom: 0;
      }
    }
  }

  &.required {
    /deep/ .u-card__head--left__title {
      &:after {
        content: '*';
        color: #f00;
        margin-left: 10rpx;
      }
    }
  }
}

.add-car-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  /deep/ .custom-icon-car {
    color: rgb(192, 196, 204);
    margin-bottom: 40rpx;
  }

  .add-car {
    position: absolute;
    bottom: 50rpx;
    color: rgb(192, 196, 204);
  }
}
</style>

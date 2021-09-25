<template>
  <view class="add-car-main-wrapper">
    <u-form :model="form" ref="addCarForm" label-width="auto" :error-type="['toast']">
      <u-card title="基本信息" class="custom-card required" :show-foot="false">
        <view slot="body">
          <u-form-item label="车辆名称" prop="nickname"><u-input v-model="form.nickname" input-align="right" placeholder="请输入车辆名称" /></u-form-item>
        </view>
      </u-card>

      <u-card title="车辆信息" class="custom-card required" :show-foot="false">
        <view class="" slot="body">
          <u-form-item prop="car" :style="{ position: 'absolute', left: '-9999px', top: '-9999px' }" />
          <u-icon v-if="form.brand._id && form.series._id && form.car._id" class="switch-car" name="switch" custom-prefix="custom-icon" size="30" @click="handleGoSelectBrand" />
          <view v-if="!form.brand._id || !form.series._id || !form.car._id" class="add-car-wrapper" @click="handleGoSelectBrand">
            <u-icon name="car" custom-prefix="custom-icon" size="160" color="rgb(192, 196, 204)" />
            <text class="add-car">添加</text>
          </view>
          <view v-else class="car-info-wrapper">
            <view class="car-info-title">{{ form.series.series_name + ' ' + form.car.car_year + '款 ' + form.car.car_name }}</view>
            <view class="car-info-detail">
              <view class="car-info-items">
                <view class="car-info-item">{{ form.car._cp.engine_description.value }}</view>
                <view class="car-info-item">{{ form.car._cp.gearbox_type.value }}</view>
                <view class="car-info-item">
                  {{ '车重：' + form.car._cp.curb_weight.value + 'KG ' + '油箱：' + form.car._cp.oil_tank_volume.value + 'L' }}
                </view>
                <view class="car-info-item">
                  {{ '指导价：' + form.car._cp.official_price.value }}
                </view>
                <view class="car-info-item">
                  {{ '工信部油耗：' + form.car._cp.fuel_comprehensive.value + 'L' }}
                </view>
              </view>
              <view class="car-info-pic">
                <u-image width="240rpx" height="200rpx" mode="aspectFit" :lazy-load="true" :src="form.series.cover_url">
                  <u-loading slot="loading"></u-loading>
                </u-image>
              </view>
            </view>
            <!-- <u-form label-width="auto">
            <u-form-item :label="form.car._cp.engine_description.text">
              <u-input v-model="form.car._cp.engine_description.value" input-align="right" :clearable="false" :disabled="true" />
            </u-form-item>
            <u-form-item :label="form.car._cp.gearbox_type.text">
              <u-input v-model="form.car._cp.gearbox_type.value" input-align="right" :clearable="false" :disabled="true" />
            </u-form-item>
            <u-form-item :label="form.car._cp.oil_tank_volume.text">
              <u-input v-model="form.car._cp.oil_tank_volume.value" input-align="right" :clearable="false" :disabled="true" />
            </u-form-item>
            <u-form-item :label="form.car._cp.curb_weight.text">
              <u-input v-model="form.car._cp.curb_weight.value" input-align="right" :clearable="false" :disabled="true" />
            </u-form-item>
            <u-form-item :label="form.car._cp.fuel_comprehensive.text">
              <u-input v-model="form.car._cp.fuel_comprehensive.value" input-align="right" :clearable="false" :disabled="true" />
            </u-form-item>
            <u-form-item :label="form.car._cp.official_price.text">
              <u-input v-model="form.car._cp.official_price.value" input-align="right" :clearable="false" :disabled="true" />
            </u-form-item>
          </u-form> -->
          </view>
        </view>
      </u-card>

      <u-card title="其他（可选）" class="custom-card" :show-foot="false">
        <view class="" slot="body">
          <u-form-item label="车辆来源">
            <u-radio-group v-model="form.purchase_source">
              <view v-for="(item, index) in purchase_sourceList" :key="index" class="radio-wrapper">
                <u-radio :name="item.value">
                  {{ item.label }}
                </u-radio>
              </view>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="提车日期">
            <u-calendar v-model="isCalendarShow" @change="handleCalendarChange"></u-calendar>
            <u-input v-model="form.purchase_date.result" input-align="right" placeholder="请输入提车日期" :clearable="false" :disabled="true" @click="isCalendarShow = true" />
          </u-form-item>
          <u-form-item label="提车地点">
            <u-input v-model="form.purchase_loc.name" input-align="right" placeholder="请输入提车地点" :clearable="false" :disabled="true" @click="handleChooseLocation" />
          </u-form-item>
          <u-form-item label="提车价格">
            <u-input v-model="form.purchase_price.result" input-align="right" placeholder="请输入提车价格" :clearable="false" :disabled="true" @click="handlePriceModalShow" />
          </u-form-item>
        </view>
      </u-card>
    </u-form>
    <u-modal v-model="isSelectPriceShow" :show-title="false" :show-cancel-button="true" @confirm="handlePriceModalOk" @cancel="isSelectPriceShow = false">
      <view class="slot-content">
        <u-form ref="priceForm" label-width="auto">
          <u-form-item label="付款方式">
            <u-radio-group v-model="priceForm.purchase_method">
              <view v-for="(item, index) in purchase_methodList" :key="index" class="radio-wrapper">
                <u-radio :name="item.value">
                  {{ item.label }}
                </u-radio>
              </view>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="车价（元）">
            <u-input v-model="priceForm.price" placeholder="请输入车价" type="number" input-align="right" />
          </u-form-item>
          <u-form-item label="购置税（元）" v-show="form.purchase_source === 'new'">
            <u-input v-model="priceForm.tax" placeholder="请输入购置税" type="number" input-align="right" />
          </u-form-item>
          <u-form-item label="保险费（元）">
            <u-input v-model="priceForm.insurance" placeholder="请输入保险费" type="number" input-align="right" />
          </u-form-item>
          <u-form-item label="上牌费（元）">
            <u-input v-model="priceForm.licenseFee" placeholder="请输入上牌费" type="number" input-align="right" />
          </u-form-item>
          <u-form-item label="装潢费（元）" v-show="form.purchase_source === 'new'">
            <u-input v-model="priceForm.decorate" placeholder="请输入装潢费" type="number" input-align="right" />
          </u-form-item>
          <u-form-item label="服务费（元）">
            <u-input v-model="priceForm.service" placeholder="请输入服务费" type="number" input-align="right" />
          </u-form-item>
          <u-form-item label="其他费用（元）">
            <u-input v-model="priceForm.other" placeholder="请输入其他费用" type="number" input-align="right" />
          </u-form-item>
        </u-form>
      </view>
    </u-modal>
    <view class="save-wrapper"><u-button type="primary" shape="circle" @click="handleSave">保存</u-button></view>
  </view>
</template>

<script>
export { default } from './index'
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}

.add-car-main-wrapper {
  overflow: hidden;
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

    .u-radio-group {
      float: right;

      .radio-wrapper {
        display: inline-block;
        vertical-align: middle;

        &:last-child {
          .u-radio__label {
            margin-right: 0;
          }
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

.slot-content {
  padding: 30rpx 40rpx;

  /deep/ .u-form-item--right__content__slot {
    justify-content: flex-end;

    .u-radio-group {
      float: right;

      .radio-wrapper {
        display: inline-block;
        vertical-align: middle;

        &:last-child {
          .u-radio__label {
            margin-right: 0;
          }
        }
      }
    }
  }

  .u-form-item {
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }
    &.u-border-bottom {
      &:last-child {
        &::after {
          border-bottom: 0;
        }
      }
    }
  }
}

.car-info-wrapper {
  padding: 30rpx 0;
  .car-info-title {
    font-weight: 700;
    margin-bottom: 12rpx;
  }

  .car-info-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .car-info-items {
      font-size: 24rpx;
      .car-info-item {
        padding: 10rpx 0 0;
      }
    }
  }
}

.switch-car {
  position: absolute;
  top: 30rpx;
  right: 32rpx;
  color: rgb(48, 49, 51);
}

.save-wrapper {
  width: 100%;
  padding: 0 30rpx 50rpx;
  background-color: $uni-bg-color-grey;
}
</style>

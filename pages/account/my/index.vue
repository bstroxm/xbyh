<template>
  <view>
    <view class="u-flex user-box u-m-30 u-p-30">
      <view class="u-m-r-40"><u-avatar :src="userInfo && userInfo.avatar" size="140"></u-avatar></view>
      <view v-if="!!userInfo" class="u-flex-1">
        <view class="u-font-18 u-p-b-10">{{ userInfo.nickName }}</view>
      </view>
      <view v-else class="u-flex-1">
        <view class="u-font-18 u-p-b-10" @click="handleGoLogin">登录</view>
        <view class="u-font-12 u-tips-color tips-wrapper">登录后即可体验更多服务</view>
      </view>
      <view class="u-m-l-10 u-p-10"><u-icon name="arrow-right" color="#969799" size="28"></u-icon></view>
    </view>

    <!-- <u-card :title="'我的服务'" :border="false" :head-border-bottom="false" :border-radius="'8'"><view class="" slot="body"></view></u-card> -->

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="star" title="车辆管理" @click="handleGoMyCars"></u-cell-item>
        <!-- <u-cell-item icon="photo" title="备份恢复"></u-cell-item>
        <u-cell-item icon="coupon" title="卡券"></u-cell-item>
        <u-cell-item icon="heart" title="关注"></u-cell-item> -->
      </u-cell-group>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="setting" title="设置"></u-cell-item>
      </u-cell-group>
    </view>
    <view v-show="!!userInfo" class="btn-wrapper u-p-l-60 u-p-r-60 u-absolute"><u-button type="error" size="medium" :ripple="true" @click="handleLogout">退出登录</u-button></view>
    <u-tabbar :list="tabbarList" :mid-button="true" :active-color="defaultColor.primary.common"></u-tabbar>
  </view>
</template>

<script>
export { default } from './index'
</script>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}

.user-box {
  background-color: #fff;
  border-radius: 8rpx;
}

.tips-wrapper {
  height: 54rpx;
}

.btn-wrapper {
  width: 100%;
  text-align: center;
  bottom: 220rpx;

  .u-hairline-border:after {
    border: 1px solid #d6d6d6 !important;
  }
}
</style>

<template>
  <view class="login-wrapper">
    <view class="logo-wrapper u-p-t-80"><u-image width="400rpx" height="400rpx" :src="'/static/img/logo.png'"></u-image></view>
    <view class="btn-wrapper u-p-l-60 u-p-r-60 u-absolute"><u-button type="primary" :ripple="true" :loading="btnLoading" @click="handleWxLogin">微信一键登录</u-button></view>
  </view>
</template>

<script>
export { default } from './index'
</script>

<style lang="scss">
.login-wrapper {
  background-color: #fff;

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-wrapper {
    width: 100%;
    bottom: 40rpx;
  }
}
</style>

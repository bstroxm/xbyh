<script>
import { STORAGE } from './constants/index.js'
import { mapMutations, mapActions } from 'vuex'
export default {
  onLaunch: async function () {
    console.log('App Launch')

    const token = uni.getStorageSync(STORAGE.UNI_TOKEN)
    const tokenExpired = uni.getStorageSync(STORAGE.UNI_TOKEN_EXPIRED)
    const isTokenValid = tokenExpired > +new Date()
    if (token && isTokenValid) {
      const userInfo = uni.getStorageSync(STORAGE.USER_INFO)
      if (userInfo) {
        this.storeUpdateUserInfo(userInfo)
      }

      if (userInfo.current_car_id) {
        this.storeUpdateCurrentUserCarId(userInfo.current_car_id)
      }
    }

    await this.getUserCars()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    ...mapMutations(['storeUpdateUserInfo', 'storeUpdateCurrentUserCarId']),
    ...mapActions(['getUserCars'])
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
@import '/static/font-icon/iconfont.css';

// #ifdef MP-WEIXIN
.u-tabbar__content__item__text {
  bottom: 0px !important;
}
// #endif
</style>

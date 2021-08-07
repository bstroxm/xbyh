import { STORAGE } from '@/constants/index.js'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },
  onLoad() {},
  computed: {
    ...mapState({
      tabbarList: state => state.tabbarList,
      defaultColor: state => state.defaultColor,
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    ...mapMutations(['storeUpdateUserInfo']),
    handleGoLogin() {
      uni.navigateTo({ url: '/pages/account/login/index' })
    },
    handleGoAddCars() {
      uni.navigateTo({ url: '/pages/selector/brand/index' })
    },
    async handleLogout() {
      const status = await this.$uc.logout()
      // 登出成功
      if (status) {
        uni.removeStorageSync(STORAGE.UNI_TOKEN)
        uni.removeStorageSync(STORAGE.UNI_TOKEN_EXPIRED)
        uni.removeStorageSync(STORAGE.USER_INFO)
        this.storeUpdateUserInfo()
      }
    }
  }
}

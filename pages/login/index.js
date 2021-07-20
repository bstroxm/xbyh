import uniPromise from '../../decorators/uni-promise'
import { STORAGE } from '../../constants/index.js'
import { mapMutations } from 'vuex'

let weixinAuthService = null

export default {
  data() {
    return {
      hasWeixinAuth: false,
      btnLoading: false
    }
  },
  computed: {},
  onLoad() {
    // #ifdef APP-PLUS
    plus.oauth.getServices(services => {
      weixinAuthService = services.find(service => {
        return service.id === 'weixin'
      })
      if (weixinAuthService) {
        this.hasWeixinAuth = true
      }
    })
    // #endif
  },
  methods: {
    ...mapMutations(['storeUpdateUserInfo']),
    async handleWxLogin() {
      this.btnLoading = true
      const res = await Promise.all([this.loginByWeixin(), uniPromise(uni.getUserProfile)({ desc: '完善个人信息' }).catch(err => Promise.resolve(err))])
      const [loginInfo, userProfile] = res

      // 登录信息不存在，登录失败
      if (!loginInfo || !loginInfo.uid) {
        uni.showModal({
          showCancel: false,
          content: '登录失败，请稍后重试'
        })
        return
      }

      // getUserProfile失败
      if (userProfile.errMsg !== 'getUserProfile:ok') {
        uni.showModal({
          showCancel: false,
          content: '登录失败，请先允许“小白油耗”的权限申请！'
        })
        return
      }

      const { userInfo: { avatarUrl = '', nickName = '', gender = 0, country = '', province = '', city = '' } = {} } = userProfile
      const { uid } = loginInfo

      // 设置头像，但不关心头像是否设置成功
      await this.$uc.setAvatar({
        uid,
        avatar: avatarUrl
      })

      // 更新用户信息到数据库
      const updated = await this.$uc.updateUser({
        uid,
        nickName,
        gender,
        country,
        province,
        city
      })

      // 更新失败，提示登录失败
      if (!updated) {
        uni.showModal({
          showCancel: false,
          content: '登录失败，请稍后重试'
        })
        return
      }

      // 重新从数据库拉取用户信息数据
      const userInfo = await this.$uc.getUserInfo({ uid })
      // 从数据库拉取用户数据失败，登录失败
      if (!userInfo || !userInfo.userInfo) {
        uni.showModal({
          showCancel: false,
          content: '登录失败，请稍后重试'
        })
        return
      }
      uni.setStorage({
        key: STORAGE.USER_INFO,
        data: userInfo.userInfo
      })
      this.storeUpdateUserInfo(userInfo.userInfo)

      this.btnLoading = false
      uni.navigateBack({ delta: 1 })
    },
    getWeixinCode() {
      // #ifdef APP-PLUS
      return uniPromise(weixinAuthService.authorize)()
      // #endif
      // #ifdef MP-WEIXIN
      return uniPromise(uni.login)({ provider: 'weixin' })
      // #endif
    },
    async loginByWeixin() {
      const { code } = await this.getWeixinCode().catch(() => Promise.resolve({}))

      if (code) {
        const loginInfo = await this.$uc.loginByWeixin({ code })

        if (loginInfo) {
          uni.setStorageSync(STORAGE.UNI_TOKEN, loginInfo.token)
          uni.setStorageSync(STORAGE.UNI_TOKEN_EXPIRED, loginInfo.tokenExpired)
          return loginInfo
        }
      }
      return false
    }
  }
}

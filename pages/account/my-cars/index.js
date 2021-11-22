import { STORAGE } from '@/constants/index.js'
import { mapState } from 'vuex'
import pick from 'lodash/pick'

export default {
  data() {
    const { currentUserCarId } = this.$store.state.userCars
    console.log(this.userCars)
    return {
      currentCarId: currentUserCarId || this.userCars[0]?._id || ''
    }
  },
  computed: {
    userCars() {
      const { userCars: storeUserCars } = this.$store.state.userCars
      return storeUserCars.map(uc => {
        const baseInfo = pick(uc, ['_id', 'nickname'])
        const serirsInfo = pick(uc.series, ['series_name', 'cover_url'])
        const carInfo = pick(uc.car, ['car_name', 'car_year'])
        return {
          ...baseInfo,
          ...serirsInfo,
          ...carInfo,
          swipeShow: false
        }
      })
    },
    swipeActions() {
      return [
        {
          text: '删除',
          style: {
            backgroundColor: '#fa3534'
          }
        }
      ]
    }
  },
  methods: {
    handleCreate() {
      uni.navigateTo({ url: '/pages/data-collect/add-car/index' })
    },
    handleSwipeClick(index) {
      this.userCars.splice(index, 1)
      this.$u.toast(`删除成功`)
    },
    handleSwipeOpen(index) {
      // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      // 原本为'false'，再次设置为'false'会无效
      this.userCars[index].swipeShow = true
      this.userCars.map((val, idx) => {
        if (index != idx) this.userCars[idx].swipeShow = false
      })
    }
  }
}

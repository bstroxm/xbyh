import { STORAGE } from '@/constants/index.js'
import { mapState } from 'vuex'
import pick from 'lodash/pick'

export default {
  data() {
    const { userCars: storeUserCars, currentUserCarId } = this.$store.state.userCars
    const userCars = storeUserCars.map(uc => {
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
    return {
      currentCarId: currentUserCarId || userCars[0]?._id || '',
      userCars
    }
  },
  computed: {
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

import { NAVIGATE_EVENT_CHANNEL } from '@/constants/index'

let selectorSource = {}
export default {
  name: 'selector-brand',
  data() {
    return {
      scrollTop: 0,
      indexList: [],
      brandList: []
    }
  },
  onLoad: function (option) {
    const _self = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on(NAVIGATE_EVENT_CHANNEL.TO_SELECTOR, function (selectorSource) {
      if (selectorSource) {
        selectorSource = selectorSource
      }
    })
  },
  created() {
    this.getBrands()
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  methods: {
    getBrands() {
      this.$db.getBrandList().then(brands => {
        let brandList = []
        brands.forEach(brand => {
          if (brand.alphabetic) {
            const arrayIndex = brand.alphabetic.charCodeAt(0) - 65
            if (arrayIndex >= 0) {
              if (brandList[arrayIndex]?.list) {
                brandList[arrayIndex].list.push(brand)
              } else {
                brandList[arrayIndex] = brandList[arrayIndex] || {
                  alphabetic: brand.alphabetic,
                  list: [brand]
                }
              }
            }
          }
        })
        brandList = brandList.filter(brand => {
          if (brand?.list) {
            brand.list.sort((a, b) => a.sort - b.sort)
            return true
          }
          return false
        })
        this.indexList = brandList.map(brand => brand.alphabetic)
        this.brandList.splice(0, 0, ...brandList)
      })
    },
    handleChooseBrand(brand) {
      uni.navigateTo({
        url: '/pages/selector/series/index',
        events: {
          // // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          // acceptDataFromOpenedPage: function(data) {
          //   console.log(data)
          // }
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit(NAVIGATE_EVENT_CHANNEL.SELECTED_BRAND, { brand, selectorSource })
        }
      })
    }
  }
}

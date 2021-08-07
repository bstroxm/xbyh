import { NAVIGATE_EVENT_CHANNEL } from '@/constants/index'

let selectorSource = {}
export default {
  name: 'selector-car',
  data() {
    return {
      scrollTop: 0,
      indexList: [],
      carList: [],
      filterCarYear: 'all',
      filterCarList: [],
      selectedBrand: {},
      selectedSeries: {}
    }
  },
  onLoad: function (option) {
    console.log(option)
    const _self = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on(NAVIGATE_EVENT_CHANNEL.SELECTED_SERIES, function ({ brand, series, selectorSource }) {
      if (selectorSource) {
        selectorSource = selectorSource
      }
      if (brand) {
        _self.selectedBrand = Object.assign({}, _self.selectedBrand, brand)
      }
      if (series) {
        _self.selectedSeries = Object.assign({}, _self.selectedSeries, series)
        setTimeout(() => {
          _self.getCars()
        })
      }
    })
  },
  computed: {
    brandId: function () {
      return this.selectedBrand._id
    },
    seriesId: function () {
      return this.selectedSeries._id
    }
  },
  methods: {
    handleScroll(e) {
      this.scrollTop = e.detail.scrollTop
    },
    getCars() {
      this.$db.getCarListBySeries(this.seriesId).then(cars => {
        let carMap = {}
        cars.forEach(c => {
          if (!c.is_show) {
            if (c.car_year) {
              if (carMap[c.car_year]?.list) {
                carMap[c.car_year].list.push(c)
              } else {
                carMap[c.car_year] = carMap[c.car_year] || {
                  carYear: c.car_year,
                  list: [c]
                }
              }
            }
          }
        })
        console.log(carMap)
        this.indexList = Object.keys(carMap)
        this.carList.splice(0, 0, ...Object.values(carMap).sort((a, b) => Number(b.carYear) - Number(a.carYear)))

        console.log(this.carList)
      })
    },
    handleFilterCar(carYear) {
      this.filterCarYear = carYear
      if (carYear !== 'all') {
        const filterCar = this.carList.find(s => s.carYear === carYear) || {}
        this.filterCarList.splice(0, this.filterCarList.length, ...(filterCar.list || []))
      }
    },
    handleChooseCar(car) {
      uni.navigateTo({
        url: selectorSource.url,
        events: {
          // // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          // acceptDataFromOpenedPage: function(data) {
          //   console.log(data)
          // }
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit(NAVIGATE_EVENT_CHANNEL.SELECTED_CAR, {
            brand: this.selectedBrand,
            series: this.selectedSeries,
            car
          })
        }
      })
    }
  }
}

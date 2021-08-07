import { NAVIGATE_EVENT_CHANNEL } from '@/constants/index'

let selectorSource = {}
export default {
  name: 'selector-series',
  data() {
    return {
      scrollTop: 0,
      indexList: [],
      seriesList: [],
      filterSeriesType: 'all',
      filterSeriesList: [],
      selectedBrand: {}
    }
  },
  onLoad: function (option) {
    console.log(option)
    const _self = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on(NAVIGATE_EVENT_CHANNEL.SELECTED_BRAND, function ({ brand, selectorSource }) {
      if (selectorSource) {
        selectorSource = selectorSource
      }
      if (brand) {
        _self.selectedBrand = Object.assign({}, _self.selectedBrand, brand)
        setTimeout(() => {
          _self.getSeires()
        })
      }
    })
  },
  // created() {
  //   this.getSeires()
  // },
  computed: {
    brandId: function () {
      return this.selectedBrand._id
    }
  },
  methods: {
    handleScroll(e) {
      this.scrollTop = e.detail.scrollTop
    },
    getSeires() {
      this.$db.getSeriesListByBrand(this.brandId).then(series => {
        let seriesMap = {}
        series.forEach(s => {
          if (s.is_show) {
            if (s.series_type) {
              if (s.series_type === '-') {
                s.series_type = '其他'
              }
              if (seriesMap[s.series_type]?.list) {
                seriesMap[s.series_type].list.push(s)
              } else {
                seriesMap[s.series_type] = seriesMap[s.series_type] || {
                  seriesType: s.series_type,
                  list: [s]
                }
              }
            }
          }
        })
        this.indexList = Object.keys(seriesMap)
        this.seriesList.splice(0, 0, ...Object.values(seriesMap))
      })
    },
    handleFilterSeries(seriesType) {
      this.filterSeriesType = seriesType
      if (seriesType !== 'all') {
        const filterSeries = this.seriesList.find(s => s.seriesType === seriesType) || {}
        this.filterSeriesList.splice(0, this.filterSeriesList.length, ...(filterSeries.list || []))
      }
    },
    handleChooseSeries(series) {
      uni.navigateTo({
        url: '/pages/selector/car/index',
        events: {
          // // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          // acceptDataFromOpenedPage: function(data) {
          //   console.log(data)
          // }
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit(NAVIGATE_EVENT_CHANNEL.SELECTED_SERIES, {
            brand: this.selectedBrand,
            selectorSource,
            series
          })
        }
      })
    }
  }
}

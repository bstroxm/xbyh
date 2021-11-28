import { mapMutations } from 'vuex'

let sourceForm = {}
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
  onLoad: function () {
    sourceForm = this.$store.state.addCar.sourceForm

    if (sourceForm.brand) {
      this.selectedBrand = Object.assign({}, this.selectedBrand, sourceForm.brand)
    }

    this.getSeires()
  },
  // created() {
  //   this.getSeires()
  // },
  computed: {
    brandId: function () {
      return this.selectedBrand._id
    },
    indexOffsetTop: function () {
      // #ifdef MP-WEIXIN
      return 70
      // #endif
      // #ifndef MP-WEIXIN
      /* eslint-disable no-unreachable */
      return 156
      /* eslint-enable no-unreachable */
      // #endif
    }
  },
  methods: {
    ...mapMutations(['storeUpdateSourceForm']),
    handleScroll(e) {
      this.scrollTop = e.detail.scrollTop
    },
    getSeires() {
      this.$db.getAllSeriesListByBrand(this.brandId).then(series => {
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
      if (sourceForm) {
        sourceForm.series = series
      }
      this.storeUpdateSourceForm(sourceForm)
      uni.navigateTo({ url: '/pages/selector/car/index' })
    }
  }
}

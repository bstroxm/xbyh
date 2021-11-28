import { mapMutations } from 'vuex'

let sourceForm = {}
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
  onLoad: function () {
    sourceForm = this.$store.state.addCar.sourceForm

    if (sourceForm.brand) {
      this.selectedBrand = Object.assign({}, this.selectedBrand, sourceForm.brand)
    }

    if (sourceForm.series) {
      this.selectedSeries = Object.assign({}, this.selectedSeries, sourceForm.series)
    }

    this.getCars()
  },
  computed: {
    brandId: function () {
      return this.selectedBrand._id
    },
    seriesId: function () {
      return this.selectedSeries._id
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
    getCars() {
      this.$db.getAllCarListBySeries(this.seriesId).then(cars => {
        let carMap = {}
        cars.forEach(c => {
          if (!c.is_show) {
            if (c.custom_properties) {
              const cpMap = {}
              c.custom_properties.forEach(cp => {
                cpMap[cp.key] = {
                  value: cp.value,
                  text: cp.text
                }
              })

              c._cp = cpMap
            }
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
      if (sourceForm) {
        sourceForm.car = car
      }
      this.storeUpdateSourceForm(sourceForm)
      uni.navigateBack({ delta: 3 })
    }
  }
}

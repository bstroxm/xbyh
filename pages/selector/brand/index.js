import { mapState, mapMutations } from 'vuex'

let sourceForm = {}
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
    sourceForm = this.$store.state.addCar.sourceForm
  },
  created() {
    this.getBrands()
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  methods: {
    ...mapMutations(['storeUpdateSourceForm']),
    getBrands() {
      this.$db.getAllBrandList().then(brands => {
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
      if (sourceForm) {
        sourceForm.brand = brand
      }
      this.storeUpdateSourceForm(sourceForm)
      uni.navigateTo({ url: '/pages/selector/series/index' })
    }
  }
}

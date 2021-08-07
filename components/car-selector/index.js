export default {
  name: 'car-selector',
  props: {
    scrollTop: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      indexList: [],
      brandList: [],
      currentBrand: '',
      currentBrand: '',
      currentBrand: ''
    }
  },
  created() {
    this.getBrands()
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
      console.log(brand)
    }
  }
}

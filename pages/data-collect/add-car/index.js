export default {
  data() {
    return {
      isCalendarShow: false,
      purchaseDate: { result: '' },
      name: '',
      brand: {},
      series: {},
      car: {},
      radioList: [
        {
          name: '新车',
          checked: false,
          disabled: false
        },
        {
          name: '二手车',
          checked: false,
          disabled: false
        }
      ]
    }
  },
  methods: {
    handleCalendarChange(date) {
      this.purchaseDate = Object.assign({}, this.purchaseDate, date)
    },
    handleGoSelectBrand() {
      uni.navigateTo({ url: '/pages/selector/brand/index' })
    }
  }
}

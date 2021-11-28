// import QQMapWX from '@/libs/qqmap-wx-jssdk.min.js'
// import { NAVIGATE_EVENT_CHANNEL } from '@/constants/index'
import { mapMutations } from 'vuex'
import pick from 'lodash/pick'

export default {
  // onLoad: function () {
  //   // 实例化API核心类
  //   this.qqmapsdk = new QQMapWX({
  //     key: 'QHDBZ-GIRER-AELWQ-WEGDF-4DUGH-3KFYE'
  //   })
  // },
  onShow: function () {
    if (this.$store.state.addCar.sourceForm) {
      this.form = Object.assign({}, this.form, this.$store.state.addCar.sourceForm)
    }
    console.log(this.form)
  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    this.$refs.addCarForm.setRules(this.rules)
  },
  data() {
    return {
      isCalendarShow: false,
      isSelectPriceShow: false,
      form: {
        nickname: '',
        brand: {},
        series: {},
        car: {},
        purchase_date: { result: '' },
        purchase_loc: {
          name: '',
          address: '',
          latitude: 0,
          longitude: 0
        },
        purchase_source: 'new',
        purchase_price: {
          purchase_method: 'full-amount',
          price: '',
          tax: '',
          insurance: '',
          licenseFee: '',
          decorate: '',
          service: '',
          other: '',
          result: ''
        }
      },
      priceForm: {
        purchase_method: 'full-amount',
        price: '',
        tax: '',
        insurance: '',
        licenseFee: '',
        decorate: '',
        service: '',
        other: '',
        result: ''
      },
      rules: {
        nickname: [
          {
            required: true,
            message: '请输入车辆名称',
            trigger: ['blur', 'change']
          }
        ],
        car: [
          {
            // 自定义验证函数，见上说明
            validator: (rule, value) => {
              return !!(value && value._id)
            },
            message: '请选择车辆',
            // 触发器可以同时用blur和change
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  computed: {
    purchase_sourceList() {
      return [
        {
          value: 'new',
          label: '新车'
        },
        {
          value: 'second-hand',
          label: '二手车'
        }
      ]
    },
    purchase_methodList() {
      return [
        {
          value: 'full-amount',
          label: '全款'
        },
        {
          value: 'credit',
          label: '贷款'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['storeUpdateSourceForm']),
    handleCalendarChange(date) {
      this.form.purchase_date = Object.assign(
        {},
        this.form.purchase_date,
        pick(date, ['result', 'year', 'month', 'day'])
      )
    },
    handleGoSelectBrand() {
      this.storeUpdateSourceForm(this.form)
      uni.navigateTo({ url: '/pages/selector/brand/index' })
    },
    handleChooseLocation() {
      uni.chooseLocation({
        success: loc => {
          this.form.purchase_loc = Object.assign(
            {},
            this.form.purchase_loc,
            pick(loc, ['name', 'address', 'latitude', 'longitude'])
          )
          // this.qqmapsdk.reverseGeocoder({
          //   location: {
          //     longitude: res.longitude,
          //     latitude: res.latitude
          //   },
          //   sig: 'CSDt5v7zqM2bzRoe43eck4U9MDtNkNXC',
          //   success: r => {
          //     console.log(r)
          //   }
          // })
        }
      })
    },
    handlePriceModalShow() {
      this.priceForm = Object.assign({}, this.form.purchase_price)
      this.isSelectPriceShow = true
    },
    handlePriceModalOk() {
      const result = Object.keys(this.priceForm).reduce((temp, key) => {
        if (key === 'purchase_method') {
          return temp
        }
        return (temp += Number(this.priceForm[key]) || 0)
      }, 0)
      this.priceForm.result = result

      this.form.purchase_price = Object.assign({}, this.form.purchase_price, this.priceForm)

      this.isSelectPriceShow = false
    },
    handleSave() {
      const _self = this
      this.$refs.addCarForm.validate(valid => {
        if (valid) {
          const data = this.$u.deepClone(_self.form)
          if (data.brand) {
            data.brand_id = data.brand._id
            delete data.brand
          }
          if (data.series) {
            data.series_id = data.series._id
            delete data.series
          }
          if (data.car) {
            data.car_id = data.car._id
            delete data.car
          }
          this.$db.createUserCar(data)
        }
      })
    }
  }
}

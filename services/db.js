const COLLECTION_BRANDS = 'brands'
const COLLECTION_SERIES = 'series'
const COLLECTION_CARS = 'cars'

class Db {
  constructor() {
    // super()

    this.db = uniCloud.database()
    this.brandsIns = this.db.collection(COLLECTION_BRANDS)
    this.seriesIns = this.db.collection(COLLECTION_SERIES)
    this.carsIns = this.db.collection(COLLECTION_CARS)
  }

  _loopGet = async (givedJQL, page = 0, limit = 500) => {
    let temp = null
    let result = []
    do {
      temp = await givedJQL
        .skip(page * limit)
        .limit(limit)
        .get()
        .catch(err => {
          console.error(err)
          return Promise.resolve(null)
        })

      result = [...result, ...(temp?.result?.data || [])]
      page += 1
    } while (!temp || temp?.result?.data?.length === limit)

    return result
  }

  getBrandList = () => {
    return this._loopGet(this.brandsIns)
  }

  getSeriesListByBrand = brandId => {
    return this._loopGet(this.seriesIns.where({ brand_id: brandId }))
  }

  getCarListBySeries = seriesId => {
    return this._loopGet(this.carsIns.where({ series_id: seriesId }))
  }
}

export default new Db()

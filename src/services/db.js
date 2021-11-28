const COLLECTION_BRANDS = 'brands'
const COLLECTION_SERIES = 'series'
const COLLECTION_CARS = 'cars'
const COLLECTION_USER_CARS = 'user-cars'
class Db {
  constructor() {
    this.db = uniCloud.database()
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

  getAllBrandList = () => {
    return this._loopGet(this.db.collection(COLLECTION_BRANDS))
  }

  getAllSeriesListByBrand = brandId => {
    return this._loopGet(this.db.collection(COLLECTION_SERIES).where({ brand_id: brandId }))
  }

  getAllCarListBySeries = seriesId => {
    return this._loopGet(this.db.collection(COLLECTION_CARS).where({ series_id: seriesId }))
  }

  createUserCar = values => {
    return this.db.collection(COLLECTION_USER_CARS).add(values)
  }

  getUserCars = () => {
    return this.db
      .collection(`${COLLECTION_USER_CARS}, ${COLLECTION_BRANDS}, ${COLLECTION_SERIES}, ${COLLECTION_CARS}`)
      .where('user_id == $cloudEnv_uid')
      .get()
      .then(({ result: { data } }) => {
        if (data?.length) {
          return data.map(d => {
            if (d?.brand_id?.length) {
              d.brand = d.brand_id[0]
              delete d.brand_id
            }
            if (d?.series_id?.length) {
              d.series = d.series_id[0]
              delete d.series_id
            }
            if (d?.car_id?.length) {
              d.car = d.car_id[0]
              delete d.car_id
            }
            return d
          })
        }

        return []
      })
      .catch(err => {
        console.error(err)
        return Promise.resolve([])
      })
  }
}

export default new Db()

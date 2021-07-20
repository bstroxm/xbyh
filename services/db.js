const COLLECTION_BRANDS = 'brands'
const COLLECTION_SERIES = 'series'
const COLLECTION_CARS = 'cars'

class Db {
  constructor() {
    super()

    this.db = uniCloud.database()
    this.brandsIns = this.dbcollection(COLLECTION_BRANDS)
    this.seriesIns = this.dbcollection(COLLECTION_SERIES)
    this.carsIns = this.dbcollection(COLLECTION_CARS)
  }
}

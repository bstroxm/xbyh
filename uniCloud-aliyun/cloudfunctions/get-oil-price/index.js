'use strict'

// const pinyin = require('pinyin')
const db = uniCloud.database()

// function getPinyin(input) {
//   if (!input) {
//     return ''
//   }
//   const result = pinyin(input, {
//     heteronym: false,
//     segment: true,
//     style: pinyin.STYLE_NORMAL
//   }).toString()
//   return result.replace(/,/g, '')
// }

const provinceMap = {
  山东: 'shandong',
  河南: 'henan',
  重庆: 'chongqing',
  西藏: 'xizang',
  新疆: 'xinjiang',
  青海: 'qinghai',
  山西: 'shanxi',
  湖北: 'hubei',
  湖南: 'hunan',
  贵州: 'guizhou',
  甘肃: 'gansu',
  广东: 'guangdong',
  海南: 'hainan',
  云南: 'yunnan',
  北京: 'beijing',
  辽宁: 'liaoning',
  吉林: 'jilin',
  上海: 'shanghai',
  江苏: 'jiangsu',
  浙江: 'zhejiang',
  福建: 'fujian',
  四川: 'sichuan',
  黑龙江: 'heilongjiang',
  天津: 'tianjin',
  河北: 'hebei',
  内蒙古: 'neimenggu',
  宁夏: 'ningxia',
  安徽: 'anhui',
  江西: 'jiangxi',
  广西: 'guangxi',
  陕西: 'shanxi'
}
function getPinyin(input) {
  return provinceMap[input] || ''
}

exports.main = async (event, context) => {
  //event为客户端上传的参数

  const { data: { data: oilPrice } } = await uniCloud.httpclient.request('https://is.snssdk.com/motor/third_service/api/v1/province_oil_price/list', {
    method: 'GET',
    contentType: 'json', // 指定以application/json发送data内的数据
    dataType: 'json' // 指定返回值为json格式，自动进行parse
  })
  const update_at = oilPrice.date
  const update_date = new Date(oilPrice.date)
  if (update_at && update_date && oilPrice.province_oil_price_list) {
    const update_time = update_date.getTime()
    const { data: result } = await db.collection('oil-price').where({ update_at, update_time }).get()
    if (!result.length) {
      const { data: latests } = await db.collection('oil-price').where({ is_latest: true }).get()
      if (latests.length && latests[0].update_time >= update_time) {
        return oilPrice
      }
      if (latests.length) {
        await db.collection('oil-price').where({ is_latest: true }).update({ is_latest: false })
      }
      const update_year = update_date.getFullYear()
      const update_month = update_date.getMonth() + 1
      const update_day = update_date.getDate()
      const addData = oilPrice.province_oil_price_list.map(p => {
        return {
          is_latest: true,
          update_year,
          update_month,
          update_day,
          update_at,
          update_time,
          province: p.province,
          province_pinyin: getPinyin(p.province),
          oilPrice: {
            current: p.oil_price_map,
            previous: p.previous_oil_price_map
          }
        }
      })
      await db.collection('oil-price').add(addData)
      return addData
    }
  }

  //返回数据给客户端
  return oilPrice
}

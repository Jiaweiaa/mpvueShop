const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.analysis.getDailyVisitTrend({
      beginDate: '20170313',
      endDate: '20170313'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}

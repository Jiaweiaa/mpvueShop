// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var params = event.storeId
  var page = "pages/storeIndex/main"
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({ scene: params,
      page: page })

    console.log(event, 321321321321321)
    return result
  } catch (err) {
    console.log(err,111)
    return err
  }
}
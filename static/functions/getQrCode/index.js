// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var params = event.memberId
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({ scene: 'memberId=' + params})
    
    console.log(event,321321321321321)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
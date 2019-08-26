// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
      scene: 'a=1'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-10-06 17:34:12
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '店铺小程序码',
    "usingComponents": {
      'van-toast': '/static/vant/toast/index',
      "van-button": "/static/vant/button/index",
      "van-icon": "/static/vant/icon/index",
       "van-notify": "/static/vant/notify/index",
      "van-dialog": "/static/vant/dialog/index"
    }
  }
}

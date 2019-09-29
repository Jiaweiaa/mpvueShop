/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 09:42:56
 * @LastEditTime: 2019-09-28 16:39:07
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '补贴金发放',
    "usingComponents": {
      'van-toast': '/static/vant/toast/index',
      "van-button": "/static/vant/button/index",
      "van-icon": "/static/vant/icon/index",
       "van-notify": "/static/vant/notify/index",
      "van-dialog": "/static/vant/dialog/index"
    }
  }
}

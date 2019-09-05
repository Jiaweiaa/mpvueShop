/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 16:40:05
 * @LastEditTime: 2019-08-29 16:49:45
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '我的佣金',
    "usingComponents": {
      'van-cell': '/static/vant/cell/index',
      "van-tab": "/static/vant/tab/index",
      "van-tabs": "/static/vant/tabs/index",
      "van-icon": "/static/vant/icon/index",
      "van-button": "/static/vant/button/index"
    }
  }
}

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 14:25:58
 * @LastEditTime: 2019-08-21 15:22:30
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '购物豆明细',
    enablePullDownRefresh: true,
    "usingComponents": {
      "van-icon": "/static/vant/icon/index",
      "van-popup": "/static/vant/popup/index",
      "van-button": "/static/vant/button/index",
      "van-cell-group": "/static/vant/cell-group/index",
      "van-field": "/static/vant/field/index",
      "van-notify": "/static/vant/notify/index"
    }
  }
}

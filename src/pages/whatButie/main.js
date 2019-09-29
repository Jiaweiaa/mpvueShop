/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 14:25:58
 * @LastEditTime: 2019-06-24 14:25:58
 * @LastEditors: your name
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '什么是补贴金',
    "usingComponents": {
      "van-field": "/static/vant/field/index",
      "van-button": "/static/vant/button/index",
      "van-cell-group": "/static/vant/cell-group/index",
      "van-notify": "/static/vant/notify/index"
    }
  }
}

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 16:40:05
 * @LastEditTime: 2019-10-16 14:22:31
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '发放记录',
    "usingComponents": {
      'van-cell': '/static/vant/cell/index',
      "van-tab": "/static/vant/tab/index",
      "van-tabs": "/static/vant/tabs/index",
      "van-icon": "/static/vant/icon/index",
      "van-button": "/static/vant/button/index"
    }
  }
}

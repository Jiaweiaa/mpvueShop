/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-26 09:36:30
 * @LastEditTime: 2019-06-26 09:36:30
 * @LastEditors: your name
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '新建收货地址',
    enablePullDownRefresh: true,
    "usingComponents": {
      "van-notify": '/static/vant/notify/index'
    }
  }
}

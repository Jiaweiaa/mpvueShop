/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-13 17:24:09
 * @LastEditTime: 2019-09-23 11:49:20
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    // 页面配置，即 page.json 的内容
    navigationBarTitleText: '支付成功',
    'usingComponents': {
      'van-stepper': '/static/vant/stepper/index',
      'van-popup': '/static/vant/popup/index',
      'van-button': '/static/vant/button/index',
      "van-card": "/static/vant/card/index"
    }
  }
}


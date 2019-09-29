/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-09-28 17:22:12
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount();
export default {
  config: {
    enablePullDownRefresh: true,
    navigationBarTitleText: '合伙人列表',
    "usingComponents": {
      'van-toast': '/static/vant/toast/index',
      "van-button": "/static/vant/button/index"
    }
  }
}

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-25 15:50:28
 * @LastEditTime: 2019-09-27 09:37:22
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '修改店铺信息',
    "usingComponents": {
      'van-toast': '/static/vant/toast/index',
      "van-button": "/static/vant/button/index"
    }
  }
}

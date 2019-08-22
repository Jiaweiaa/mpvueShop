/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 09:01:37
 * @LastEditTime: 2019-08-20 11:54:05
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // 页面配置，即 page.json 的内容
    navigationBarTitleText: '选择城市',
    enablePullDownRefresh: true,
    'usingComponents': {
      'van-search': '/static/vant/search/index',
      'van-button': '/static/vant/button/index',
      'van-card': '/static/vant/card/index',
      'van-icon': '/static/vant/icon/index',
      'van-switch-cell': '/static/vant/switch-cell/index',
      "van-notify": "/static/vant/notify/index"
    }
  }
}


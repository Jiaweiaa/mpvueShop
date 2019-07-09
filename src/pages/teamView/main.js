import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '团长中心',
    "usingComponents": {
      'van-cell': '/static/vant/cell/index',
      "van-tabbar": "/static/vant//tabbar/index",
      "van-tabbar-item": "/static/vant/tabbar-item/index",
      "van-icon": "/static/vant/icon/index",
      "van-button": "/static/vant/button/index",
      "van-notify": "/static/vant/notify/index",
      "van-dialog": "/static/vant/dialog/index"
    }
  }
}

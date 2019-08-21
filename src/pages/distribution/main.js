import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '我的二维码',
    "usingComponents": {
      'van-toast': '/static/vant/toast/index',
      "van-button": "/static/vant/button/index",
      "van-icon": "/static/vant/icon/index",
       "van-notify": "/static/vant/notify/index",
      "van-dialog": "/static/vant/dialog/index"
    }
  }
}

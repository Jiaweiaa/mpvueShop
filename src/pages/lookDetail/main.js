import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '团长佣金',
    "usingComponents": {
      'van-cell': '/static/vant/cell/index',
      "van-tab": "/static/vant/tab/index",
      "van-tabs": "/static/vant/tabs/index",
      "van-icon": "/static/vant/icon/index",
      "van-button": "/static/vant/button/index"
    }
  }
}

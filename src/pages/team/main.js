import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '团长订单',
    enablePullDownRefresh: true,
    "usingComponents": {
      "van-tab": '/static/vant/tab/index',
      "van-tabs": '/static/vant/tabs/index',
      "van-card": '/static/vant/card/index',
      "van-button": '/static/vant/button/index',
      "van-dialog": "/static/vant/dialog/index",
      "van-loading": "/static/vant/loading/index",
      "van-search": "/static/vant/search/index",
      "van-icon": "/static/vant/icon/index",
      "van-popup": "/static/vant/popup/index",
      "van-panel": "/static/vant/panel/index",
      "van-datetime-picker": "/static/vant/datetime-picker/index"
    }
  }
}

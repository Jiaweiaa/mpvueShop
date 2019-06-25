import Vue from 'vue'
import App from '.'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '供应商订单',
    enablePullDownRefresh: true,
    "usingComponents": {
      "van-tab": '/static/vant/tab/index',
      "van-tabs": '/static/vant/tabs/index',
      "van-datetime-picker": "/static/vant/datetime-picker/index",
      "van-popup": "/static/vant/popup/index",
      "van-collapse": "/static/vant/collapse/index",
      "van-collapse-item": "/static/vant/collapse-item/index",
      "van-button": '/static/vant/button/index',
      "van-icon": "/static/vant/icon/index",

      "van-card": '/static/vant/card/index',
      "van-loading": "/static/vant/loading/index",
      "van-dialog": "/static/vant/dialog/index",
    }
  }
}

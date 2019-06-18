import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '优惠券',
    enablePullDownRefresh: true,
    "usingComponents": {
      "van-notify": '/static/vant/notify/index',
      "van-loading": "/static/vant/loading/index",
      "van-tag": "/static/vant/tag/index",
      "van-tab": "/static/vant/tab/index",
      "van-tabs": "/static/vant/tabs/index"
    }
  }
}

import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    "backgroundTextStyle":"dark",
    "backgroundColor": "#fff",
    enablePullDownRefresh: true,
    "usingComponents": {
      "van-popup": "/static/vant/popup/index",
      "van-transition": "/static/vant/transition/index",
      "van-cell": "/static/vant/cell/index",
      "van-button": "/static/vant/button/index",
      "van-icon": "/static/vant/icon/index"
    }
  }
}

import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '团长排行',
    enablePullDownRefresh: true,
    "usingComponents": {
      "van-icon": "/static/vant/icon/index",
      "van-tag": "/static/vant/tag/index"
    }
  }
}

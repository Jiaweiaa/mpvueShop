import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '我的',
    enablePullDownRefresh: true,
    "usingComponents": {
      'van-cell': '/static/vant/cell/index',
      'van-cell-group': '/static/vant/cell-group/index',
      'van-icon': '/static/vant/icon/index',
      "van-badge": "/static/vant/badge/index",
      "van-dialog": "/static/vant/dialog/index",
      "van-badge-group": "/static/vant/badge-group/index"
    }
  }
}

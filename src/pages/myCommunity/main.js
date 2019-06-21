import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '我的社区',
    "usingComponents": {
      "van-field": "/static/vant/field/index",
      "van-button": "/static/vant/button/index",
      "van-cell-group": "/static/vant/cell-group/index"
    }
  }
}

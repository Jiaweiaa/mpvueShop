import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '成为供应商',
    "usingComponents": {
      'van-toast': '/static/dist/vant/toast/index',
      "van-button": "/static/vant/button/index"
    }
  }
}

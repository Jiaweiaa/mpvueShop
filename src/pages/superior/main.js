import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount();
export default {
  config: {
    navigationBarTitleText: '上级代理',
    "usingComponents": {
      'van-toast': '/static/vant/toast/index',
      "van-button": "/static/vant/button/index"
    }
  }
}

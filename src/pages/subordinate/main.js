import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount();
export default {
  config: {
    enablePullDownRefresh: true,
    navigationBarTitleText: '下级列表',
    "usingComponents": {
      'van-toast': '/static/vant/toast/index',
      "van-button": "/static/vant/button/index"
    }
  }
}

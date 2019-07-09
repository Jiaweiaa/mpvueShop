import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    // 页面配置，即 page.json 的内容
    navigationBarTitleText: '商品详情',
    'usingComponents': {
      'van-stepper': '/static/vant/stepper/index',
      'van-popup': '/static/vant/popup/index',
      'van-button': '/static/vant/button/index',
      "van-icon": "/static/vant/icon/index"
    }
  }
}


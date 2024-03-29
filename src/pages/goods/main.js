import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    // 页面配置，即 page.json 的内容
    navigationBarTitleText: '时刻益每家',
    'usingComponents': {
      'van-stepper': '/static/vant/stepper/index',
      'van-cell': '/static/vant/cell/index',
      "van-icon": "/static/vant/icon/index",
      'van-popup': '/static/vant/popup/index',
      'van-button': '/static/vant/button/index'
    }
  }
}


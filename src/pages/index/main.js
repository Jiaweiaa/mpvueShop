import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // 页面配置，即 page.json 的内容
    navigationBarTitleText: '时刻益每家',
    enablePullDownRefresh: true,
    'usingComponents': {
      'van-search': '/static/vant/search/index',
      'van-button': '/static/vant/button/index',
      'van-card': '/static/vant/card/index',
      'van-icon': '/static/vant/icon/index',
      'van-switch-cell': '/static/vant/switch-cell/index',
      "van-notify": "/static/vant/notify/index"
    }
  }
}


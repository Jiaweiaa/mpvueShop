import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    // 页面配置，即 page.json 的内容
    navigationBarTitleText: '下单',
    'usingComponents': {
      'van-stepper': '/static/vant/stepper/index',
      'van-popup': '/static/vant/popup/index',
      'van-button': '/static/vant/button/index',
      'van-icon': '/static/vant/icon/index',
      'van-submit-bar': '/static/vant/submit-bar/index',
      'van-cell-group': '/static/vant/cell-group/index',
      'van-swipe-cell': '/static/vant/swipe-cell/index',
      'van-cell': '/static/vant/cell/index',
      'van-card': '/static/vant/card/index',
      'van-checkbox': '/static/vant/checkbox/index',
      "van-toast": "/static/vant/toast/index",
      "van-radio": "/static/vant/radio/index",
      "van-tabs": "/static/vant/tabs/index",
      "van-tab": "/static/vant/tab/index",
      "van-radio-group": "/static/vant/radio-group/index",
      "van-action-sheet": "/static/vant/action-sheet/index"
    }
  }
}

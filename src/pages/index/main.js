import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // 页面配置，即 page.json 的内容
    navigationBarTitleText: '首页',
    'usingComponents': {
      'van-search': '/static/vant/search/index',
      'van-row': '/static/vant/row/index',
      'van-col': '/static/vant/col/index',
      'van-tab': '/static/vant/tab/index',
      'van-tabs': '/static/vant/tabs/index',
      'van-cell': '/static/vant/cell/index',
      'van-cell-group': '/static/vant/cell-group/index',
      'van-radio': '/static/vant/radio/index',
      'van-radio-group': '/static/vant/radio-group/index',
      'van-field': '/static/vant/field/index',
      'van-button': '/static/vant/button/index',
      'van-card': '/static/vant/card/index',
      'van-popup': '/static/vant/popup/index',
      'van-icon': '/static/vant/icon/index',
      'van-panel': '/static/vant/panel/index',
      'van-action-sheet': '/static/vant/cell-group/index',
      'van-switch-cell': '/static/vant/switch-cell/index',
      'van-area': '/static/vant/area/index',
      'van-dialog': '/static/vant/dialog/index'
    }
  }
}


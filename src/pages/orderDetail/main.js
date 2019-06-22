import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
    config: {
        navigationBarTitleText: '订单详情',
        "usingComponents": {
        "van-tab": '/static/vant/tab/index',
        "van-tabs": '/static/vant/tabs/index',
        "van-card": '/static/vant/card/index',
        "van-button": '/static/vant/button/index',
        "van-dialog": "/static/vant/dialog/index",
        "van-cell": "/static/vant/cell/index",
        "van-panel": "/static/vant/panel/index"
        }
    }
  }
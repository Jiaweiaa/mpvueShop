import Vue from "vue";
import App from ".";

const app = new Vue(App);
app.$mount();
export default {
  config: {
    navigationBarTitleText: "订单详情",
    enablePullDownRefresh: true,
    usingComponents: {
      "van-tab": "/static/vant/tab/index",
      "van-tabs": "/static/vant/tabs/index",
      "van-card": "/static/vant/card/index",
      "van-button": "/static/vant/button/index",
      "van-dialog": "/static/vant/dialog/index",
      "van-cell": "/static/vant/cell/index",
      "van-cell-group": "/static/vant/cell-group/index",
      "van-icon": "/static/vant/icon/index",
      "van-radio": "/static/vant/radio/index",
      "van-radio-group": "/static/vant/radio-group/index",
      "van-popup": "/static/vant/popup/index",
      "van-panel": "/static/vant/panel/index"
    }
  }
};

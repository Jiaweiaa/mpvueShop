import Vue from "vue";
import App from "./index";

const app = new Vue(App);
app.$mount();
export default {
  config: {
    backgroundTextStyle: "dark",
    backgroundColor: "#fff",
    navigationBarTitleText: "店铺首页",
    enablePullDownRefresh: false,
    usingComponents: {
      "van-popup": "/static/vant/popup/index",
      "van-transition": "/static/vant/transition/index",
      "van-cell": "/static/vant/cell/index",
      "van-button": "/static/vant/button/index",
      "van-icon": "/static/vant/icon/index",
      "van-card": "/static/vant/card/index",
      "van-tab": "/static/vant/tab/index",
      "van-tabs": "/static/vant/tabs/index",
      "van-tabbar": "/static/vant/tabbar/index",
      "van-tabbar-item": "/static/vant/tabbar-item/index",
      "van-notice-bar": "/static/vant/notice-bar/index"
    }
  }
};

import Vue from "vue";
import App from "./index";

const app = new Vue(App);
app.$mount();
export default {
  config: {
    navigationBarTitleText: "授权登录",
    usingComponents: {
      "van-cell": "/static/vant/cell/index",
      "van-cell-group": "/static/vant/cell-group/index",
      "van-icon": "/static/vant/icon/index",
      "van-field": "/static/vant/field/index",
      "van-button": "/static/vant/button/index"
    }
  }
};

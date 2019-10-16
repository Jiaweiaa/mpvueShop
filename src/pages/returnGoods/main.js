/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-27 16:17:00
 * @LastEditTime: 2019-06-27 16:17:00
 * @LastEditors: your name
 */
import Vue from "vue";
import App from ".";

const app = new Vue(App);
app.$mount();
export default {
  config: {
    navigationBarTitleText: "退货退款详情",
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
      "van-panel": "/static/vant/panel/index",
      "van-steps": "/static/vant/steps/index"
    }
  }
};

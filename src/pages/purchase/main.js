/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-10-17 15:09:17
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import App from "./index";

const app = new Vue(App);
app.$mount();
export default {
  config: {
    backgroundTextStyle: "dark",
    backgroundColor: "#fff",
    navigationBarTitleText: "采购中心",
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
      "van-tabbar-item": "/static/vant/tabbar-item/index"
    }
  }
};

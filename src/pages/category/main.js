/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-13 17:24:09
 * @LastEditTime: 2019-10-08 08:46:20
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import App from "./index";

const app = new Vue(App);
app.$mount();
export default {
  config: {
    navigationBarTitleText: '分类',
    enablePullDownRefresh: true,
  }
};

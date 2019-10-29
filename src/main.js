/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 09:01:37
 * @LastEditTime: 2019-10-25 17:11:50
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import App from "./App";
import "weapp-cookie"; //解决小程序不能自动保存服务端的cookie问题
//引入自定义scss公共样式
import "./assets/styles/baituan.scss";
//全局处理重复页面跳转详情初始化,和详情跳详情返回的bug
import MyPlugin from "./minxins";
//全局变量
import globalVariable from "@/utils/global_variable";
Vue.prototype.GLOBAL = globalVariable;
Vue.use(MyPlugin);

//引入store
import store from "./store/index";
//把store挂载到全局
Vue.prototype.$store = store;

Vue.config.productionTip = false;
App.mpType = "app";

wx.cloud.init({
  traceUser: true
});
const app = new Vue(App);
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    permission: {
      "scope.userLocation": {
        desc: "确认点击"
      }
    },
    pages: [
      "pages/my/main", // 我的
      "pages/recordList/main",
      "pages/refundChoose/main",
      "pages/beGive/main", // 成为供应商
      "pages/whatRecruit/main", // 成为供应商
      "pages/lookDetail/main", // 团长我的 查看详情
      "pages/subordinate/main", // 下级
      "pages/whatBean/main",
      "pages/whatButie/main",
      "pages/purchase/main",
      "pages/storeInfo/main",
      "pages/editStoreInfo/main",
      "pages/cart/main",
      "pages/joinUs/main",
      "^pages/index/main",
      "pages/oldStoreIndex/main",
      "pages/storeQrcode/main",
      "pages/teamView/main", //团长 我的主页
      "pages/withdraw/main", //  提现
      "pages/integral/main", // 积分管理
      "pages/collectlist/main",
      "pages/categorylist/main",
      "pages/butiejin/main",
      "pages/storeIndex/main", // 店铺首页
      "pages/myOrder/main",
      "pages/orderDetail/main",
      "pages/category/main",
      "pages/goods/main",
      "pages/citys/main",
      "pages/distribution/main",
      "pages/editUserInfo/main",
      "pages/logisticsDetail/main", //物流详情页
      "pages/feedback/main",
      "pages/mappage/main",
      "pages/address/main",
      "pages/addressSelect/main",
      "pages/addaddress/main",
      "pages/team/main", // 团长订单
      "pages/returnGoods/main",
      "pages/returnGoodsMoney/main",
      "pages/search/main",
      "pages/login/main",
      "pages/refund/main",
      "pages/refundOrder/main",
      "pages/refundList/main", //退换货列表
      "pages/beTeam/main", // 成为团长
      "pages/categorylist/main",
      "pages/topic/main",
      "pages/record/main", //购买记录详情
      "pages/branddetail/main",
      "pages/brandlist/main", // 商品详情
      "pages/newgoods/main", // 原来带的商品分类
      "pages/practice/main", // 转发？ 没用到
      "pages/topicdetail/main", // 分类专题详情
      "pages/coupon/main", // 优惠券
      "pages/myCommunity/main", // 团长 我的社区
      "pages/teamReaking/main", // 团长我的 团长排行
      "pages/orderDetail/main", // 订单详情
      "pages/integralList/main", // 积分明细列表
      "pages/giver/main",
      "pages/superior/main", // 上级信息
      "pages/canvas/main", // 海报
      "pages/shoppingBean/main", // 购物豆
      "pages/shoppingBeanList/main" // 购物豆明细
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "易起省",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      backgroundColor: "#fafafa",
      borderStyle: "white",
      selectedColor: "#e13c54",
      color: "#666",
      list: [
        {
          pagePath: "pages/index/main",
          iconPath: "static/images/bt_home.png",
          selectedIconPath: "static/images/bt_home_active.png",
          text: "首页"
        },
        {
          pagePath: "pages/category/main",
          iconPath: "static/images/bt_fenlei.png",
          selectedIconPath: "static/images/bt_fenlei_active.png",
          text: "分类"
        },
        {
          pagePath: "pages/topic/main",
          iconPath: "static/images/bt_zhuanti.png",
          selectedIconPath: "static/images/bt_zhuanti_active.png",
          text: "发现"
        },

        {
          pagePath: "pages/cart/main",
          iconPath: "static/images/bt_cart.png",
          selectedIconPath: "static/images/bt_cart_active.png",
          text: " 购物车"
        },
        {
          pagePath: "pages/my/main",
          iconPath: "static/images/bt_my.png",
          selectedIconPath: "static/images/bt_my_active.png",
          text: "我的"
        }
      ]
    },
    permission: {
      "scope.userLocation": {
        desc: "你的位置信息将用于给您提供服务"
      }
    }
  }
};

import Vue from 'vue'
import App from './App'
import 'weapp-cookie' //解决小程序不能自动保存服务端的cookie问题

//全局处理重复页面跳转详情初始化,和详情跳详情返回的bug
import MyPlugin from './minxins'
Vue.use(MyPlugin)


//引入store
import store from './store/index'
//把store挂载到全局
Vue.prototype.$store = store;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    "permission": {
      "scope.userLocation": {
        "desc": "确认点击"
      }
    },
    "pages": [
      "pages/feedback/main",
      "pages/order/main",
      "pages/cart/main",
      "pages/mappage/main",
      "pages/collectlist/main",
      "pages/addressSelect/main",
      "pages/addaddress/main",
      "pages/address/main",
      "pages/myOrder/main",
      "pages/orderDetail/main",
      "pages/team/main",     // 团长订单
      "pages/index/main",
      "pages/teamView/main",  //团长 我的主页
      "pages/search/main",
      "pages/my/main",            // 我的
      "pages/login/main",
      "pages/refund/main",
      "^pages/refundOrder/main",
      "pages/category/main",
      "pages/beTeam/main",       // 成为团长
      "pages/beGive/main",       // 成为供应商
      "pages/categorylist/main",
      "pages/topic/main",
      "pages/goods/main",
      "pages/branddetail/main",
      "pages/brandlist/main",    // 商品详情
      "pages/newgoods/main",     // 原来带的商品分类
      "pages/practice/main",     // 转发？ 没用到
      "pages/topicdetail/main",  // 分类专题详情
      "pages/coupon/main",       // 优惠券
      "pages/myCommunity/main",  // 团长 我的社区
      "pages/teamReaking/main",  // 团长我的 团长排行
      "pages/orderDetail/main",  // 订单详情
      "pages/lookDetail/main",   // 团长我的 查看详情
      "pages/withdraw/main",     //  提现
      "pages/integral/main",     // 积分管理
      "pages/integralList/main",  // 积分明细列表
      "pages/giver/main"
    ],
    "window": {
      "backgroundTextStyle": "light",
      "navigationBarBackgroundColor": "#fff",
      "navigationBarTitleText": "科比",
      "navigationBarTextStyle": "black"
    },
    "tabBar": {
      "backgroundColor": "#fafafa",
      "borderStyle": "white",
      "selectedColor": "#b4282d",
      "color": "#666",
      "list": [{
          "pagePath": "pages/index/main",
          "iconPath": "static/images/ic_menu_choice_nor.png",
          "selectedIconPath": "static/images/ic_menu_choice_pressed.png",
          "text": "首页"
        },
        {
          "pagePath": "pages/topic/main",
          "iconPath": "static/images/ic_menu_topic_nor.png",
          "selectedIconPath": "static/images/ic_menu_topic_pressed.png",
          "text": "专题"
        },
        {
          "pagePath": "pages/category/main",
          "iconPath": "static/images/ic_menu_sort_nor.png",
          "selectedIconPath": "static/images/ic_menu_sort_pressed.png",
          "text": "分类"
        },
        {
          "pagePath": "pages/cart/main",
          "iconPath": "static/images/ic_menu_shoping_nor.png",
          "selectedIconPath": "static/images/ic_menu_shoping_pressed.png",
          "text": "购物车"
        },
        {
          "pagePath": "pages/my/main",
          "iconPath": "static/images/ic_menu_me_nor.png",
          "selectedIconPath": "static/images/ic_menu_me_pressed.png",
          "text": "我的"
        }
      ]
    },
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序学习使用"
      }
    }
  }
}

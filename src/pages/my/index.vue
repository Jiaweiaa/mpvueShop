<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 17:12:49
 * @LastEditTime: 2019-09-05 10:22:24
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="my">
    <van-dialog id="van-dialog" />
    <div class="myinfo">
      <div class="avatar" style="width: 130rpx;height: 130rpx;border-radius: 50%;overflow: hidden;">
        <img
          v-if="userInfo.avatar"
          style="width:130rpx;height:130rpx;border-raduis:50%;"
          :src="'https:'+userInfo.avatar"
        />
        <img
          v-else
          style="width:130rpx;height:130rpx;border-raduis:50%;"
          src="http://webimg.gaoshanapp.com/my_avatar.png"
        />
      </div>
      <div class="user">
        <div class v-if="userInfo.nickname">
          <p>{{userInfo.nickname}}</p>
          <!-- <p>欢迎您,时刻益每家会员</p> -->
          <p class="">欢迎您,易起省会员</p>
          <!-- <p>欢迎您,高山会员</p> -->
          <!-- <p style="color:#fff;">
            <span ></span>省
            <span type="userCity" lang="zh_CN"></span>市
          </p>-->
        </div>
        <p v-else @click="goToLogin">点我登录</p>
      </div>
      <div class="refresh">
        <button @click="goToLogin()">
          <van-icon size="50rpx" name="replay" />
        </button>
      </div>
    </div>
    <div class="myMenu boxMenu">
      <div class="title">
        <div class="navTitle">我的订单</div>
        <div class="navBody" @click="goTo('/pages/myOrder/main')">全部订单 ></div>
      </div>
      <div class="content">
        <div
          class="childContent"
          @click="goTo(item.url)"
          :key="index"
          v-for="(item, index) in orderMenu"
        >
          <van-icon size="30px" :info="item.total == 0 ? '': item.total" :name="item.icon" />
          <div class="childText">{{item.title}}</div>
        </div>
      </div>
    </div>

    <div class="mySecond boxMenu">
      <div class="title">
        <div class="navTitle">我的服务</div>
      </div>
      <div class="content">
        <div
          class="childContent"
          @click="goTo(item.url)"
          :key="index"
          v-for="(item, index) in myService"
        >
          <van-icon size="30px" :name="item.icon" />
          <div class="childText">{{item.title}}</div>
        </div>
      </div>
    </div>

    <div class="myThree boxMenu">
      <div class="title">
        <div class="navTitle">更多服务</div>
      </div>
      <div class="content">
        <div
          class="childContent"
          @click="goTo(item.url)"
          :key="index"
          v-for="(item, index) in moreService"
        >
          <van-icon size="30px" :name="item.icon" />
          <div class="childText">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toLogin, login } from "../../utils";
import { shoppingcartCount } from "../../api/shoppingcart";
import { findOrderNum } from "../../api/myOrder";
import { isCapOrSup, checkCap, checkSup } from "../../api/login";
import Dialog from "../../../static/vant/dialog/dialog";
export default {
  onPullDownRefresh() {
    this.getCartGoodsNum();
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    if (login()) {
      this.userInfo = login();
      this.avator = this.userInfo.avatarUrl;
      findOrderNum()
        .then(res => {
          let result = res.data.result;
          this.$set(this.orderMenu[0], "total", result.waitPayCount);
          this.$set(this.orderMenu[1], "total", result.waitSendCount);
          this.$set(this.orderMenu[2], "total", result.waitReciveCount);
          this.$set(this.orderMenu[3], "total", result.waitBackCount);
        })
        .catch(err => {});
    }
    this.moreService = [""];
    if (wx.getStorageSync("tokenInfo").access_token) {
      isCapOrSup().then(isRes => {
        wx.setStorageSync("isCap", isRes.data.result.isCap);
        wx.setStorageSync("isSup", isRes.data.result.isSup);
        if (isRes.data.result.isSup == false) {
          this.moreService.push({
            title: "供应商招募",
            icon: "http://webimg.gaoshanapp.com/my_gongyingshang.png",
            url: "/pages/beGive/main"
          });
        } else {
          this.moreService.push({
            title: "我是供应商",
            icon: "http://webimg.gaoshanapp.com/my_gongyingshang.png",
            url: "/pages/giver/main"
          });
        }
      });
    } else {
      this.moreService = [
        {
          title: "供应商招募",
          icon: "http://webimg.gaoshanapp.com/my_gongyingshang.png",
          url: "/pages/beGive/main"
        }
      ];
    }

    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  onShow() {
    this.getCartGoodsNum();
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    if (login()) {
      this.userInfo = login();
      this.avator = this.userInfo.avatarUrl;
      findOrderNum()
        .then(res => {
          let result = res.data.result;
          this.$set(this.orderMenu[0], "total", result.waitPayCount);
          this.$set(this.orderMenu[1], "total", result.waitSendCount);
          this.$set(this.orderMenu[2], "total", result.waitReciveCount);
          this.$set(this.orderMenu[3], "total", result.waitBackCount);
        })
        .catch(err => {});
    }
    this.moreService = [""];

    //判断是否有生成积分二维码权限
    if(wx.getStorageSync("userLevel")==2){
      this.myService = [
        {
          title: "优惠券",
          icon: "http://webimg.gaoshanapp.com/my_youhui.png",
          url: "/pages/coupon/main"
        },
        {
          title: "地址管理",
          icon: "http://webimg.gaoshanapp.com/my_address.png",
          url: "/pages/address/main"
        },
        {
          title: "补贴金",
          icon: "http://webimg.gaoshanapp.com/my_butiejin.png",
          url: "/pages/integral/main"
        },
      
        {
          title: "生成积分码",
          icon: "http://webimg.gaoshanapp.com/my_butiejin.png",
          url: "/pages/createQrcode/main"
        }
      ]
    }
    if (wx.getStorageSync("tokenInfo").access_token) {
      isCapOrSup().then(isRes => {
        wx.setStorageSync("isCap", isRes.data.result.isCap);
        wx.setStorageSync("isSup", isRes.data.result.isSup);
      });
      this.moreService = [];
      if (wx.getStorageSync("isSup") == false) {
        this.moreService.push(
          {
            title: "供应商招募",
            icon: "http://webimg.gaoshanapp.com/my_gongyingshang.png",
            url: "/pages/beGive/main"
          },
          {
            title: "我的代理",
            icon: "http://webimg.gaoshanapp.com/my_daili.png",
            url: "/pages/teamView/main"
          }
        );
      } else {
        this.moreService.push(
          {
            title: "我是供应商",
            icon: "http://webimg.gaoshanapp.com/my_gongyingshang.png",
            url: "/pages/giver/main"
          },
          {
            title: "我的代理",
            icon: "http://webimg.gaoshanapp.com/my_daili.png",
            url: "/pages/teamView/main"
          }
        );
      }
    } else {
      this.moreService = [
        {
          title: "供应商招募",
          icon: "http://webimg.gaoshanapp.com/my_gongyingshang.png",
          url: "/pages/beGive/main"
        },
        {
          title: "我的代理",
          icon: "http://webimg.gaoshanapp.com/my_daili.png",
          url: "/pages/teamView/main"
        }
      ];
    }
  },
  data() {
    return {
      orderMenu: [
        {
          title: "待支付",
          icon: "http://webimg.gaoshanapp.com/my_daizhifu.png",
          url: "/pages/myOrder/main?id=2"
        },

        {
          title: "待发货",
          icon: "http://webimg.gaoshanapp.com/my_daifahuo.png",
          url: "/pages/myOrder/main?id=4"
        },
        {
          title: "待收货",
          icon: "http://webimg.gaoshanapp.com/my_daishouhuo.png",
          url: "/pages/myOrder/main?id=3"
        },
        {
          title: "已完成",
          icon: "http://webimg.gaoshanapp.com/my_yiwancheng.png",
          url: "/pages/myOrder/main?id=5"
        },
        {
          title: "退/换货",
          icon: "http://webimg.gaoshanapp.com/my_tuihuan.png",
          url: "/pages/refundList/main"
        }
      ],
      myService: [
        {
          title: "优惠券",
          icon: "http://webimg.gaoshanapp.com/my_youhui.png",
          url: "/pages/coupon/main"
        },
        {
          title: "地址管理",
          icon: "http://webimg.gaoshanapp.com/my_address.png",
          url: "/pages/address/main"
        },
        {
          title: "补贴金",
          icon: "http://webimg.gaoshanapp.com/my_butiejin.png",
          url: "/pages/integral/main"
        }
        
      ],
      moreService: [
        {
          title: "供应商招募",
          icon: "http://webimg.gaoshanapp.com/my_gongyingshang.png",
          url: "/pages/beGive/main"
        },
        {
          title: "我是供应商",
          icon: "http://webimg.gaoshanapp.com/my_gongyingshang.png",
          url: "/pages/giver/main"
        },
        {
          title: "我的代理",
          icon: "http://webimg.gaoshanapp.com/my_daili.png",
          url: "/pages/teamView/main"
        }
      ],

      avator:
        "http://webimg.gaoshanapp.com/my_avator.png",
      allcheck: false,
      Listids: [],
      userInfo: {}
    };
  },
  methods: {
    //获取购物车中的商品数量
    getCartGoodsNum() {
      shoppingcartCount()
        .then(res => {
          if (res.data.code == "200") {
            wx.showTabBarRedDot({
              index: 3
            });
            wx.setTabBarBadge({
              index: 3,
              text: res.data.result.toString()
            });
          }
        })
        .catch(err => {});
    },
    goTo(url) {
      if (toLogin()) {
        //如果想去的路径是申请代理页校验是否申请过
        if (url == "/pages/beGive/main") {
          checkSup()
            .then(res => {
              if (res.data.result) {
                Dialog.alert({
                  title: "提示",
                  message: "您已提交过供应商申请,请耐心等待"
                }).then(() => {
                  // on close
                });
              } else {
                wx.navigateTo({
                  url: url
                });
              }
            })
            .catch(err => {});
        } else {
          wx.navigateTo({
            url: url
          });
        }
      }
    },
    goToLogin() {
      wx.navigateTo({
        url: "/pages/login/main"
      });
    }
  },
  computed: {}
};
</script>
<style>
page {
  background: #eee;
}
</style>
<style lang='scss' scoped>
@import "./style";
</style>

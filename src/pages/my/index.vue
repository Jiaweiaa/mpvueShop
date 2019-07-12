<template>
  <div class="my">
    <div class="myinfo">
      <div class="avatar" style="width: 130rpx;height: 130rpx;border-radius: 50%;overflow: hidden;">
        <open-data style="width:130rpx;height:130rpx;border-raduis:50%;" type="userAvatarUrl"></open-data>
      </div>
      <div class="user">
        <div class v-if="userInfo.nickname">
          <p>{{userInfo.nickname}}</p>
          <p style="color:#fff;">
            <open-data type="userProvince" lang="zh_CN"></open-data>省
            <open-data type="userCity" lang="zh_CN"></open-data>市
          </p>
        </div>
        <p v-else @click="goToLogin">点击登录</p>
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
        <div class="navBody" @click="goTo('/pages/myOrder/main')">查看全部订单></div>
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
import { isCapOrSup } from "../../api/login";
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
      });
      this.moreService = [];
      if (wx.getStorageSync("isCap") == false) {
        this.moreService.push({
          title: "团长招募",
          icon: "manager-o",
          url: "/pages/beTeam/main"
        });
      } else {
        this.moreService.push({
          title: "我是团长",
          icon: "manager-o",
          url: "/pages/teamView/main"
        });
      }
      if (wx.getStorageSync("isSup") == false) {
        this.moreService.push({
          title: "供应商招募",
          icon: "user-o",
          url: "/pages/beGive/main"
        });
      } else {
        this.moreService.push({
          title: "我是供应商",
          icon: "friends-o",
          url: "/pages/giver/main"
        });
      }
    } else {
      this.moreService = [
        {
          title: "团长招募",
          icon: "manager-o",
          url: "/pages/beTeam/main"
        },
        {
          title: "供应商招募",
          icon: "user-o",
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
    if (wx.getStorageSync("tokenInfo").access_token) {
      isCapOrSup().then(isRes => {
        wx.setStorageSync("isCap", isRes.data.result.isCap);
        wx.setStorageSync("isSup", isRes.data.result.isSup);
      });
      this.moreService = [];
      if (wx.getStorageSync("isCap") == false) {
        this.moreService.push({
          title: "团长招募",
          icon: "manager-o",
          url: "/pages/beTeam/main"
        });
      } else {
        this.moreService.push({
          title: "我是团长",
          icon: "manager-o",
          url: "/pages/teamView/main"
        });
      }
      if (wx.getStorageSync("isSup") == false) {
        this.moreService.push({
          title: "供应商招募",
          icon: "user-o",
          url: "/pages/beGive/main"
        });
      } else {
        this.moreService.push({
          title: "我是供应商",
          icon: "friends-o",
          url: "/pages/giver/main"
        });
      }
      console.log(this.moreService);
    } else {
      this.moreService = [
        {
          title: "团长招募",
          icon: "manager-o",
          url: "/pages/beTeam/main"
        },
        {
          title: "供应商招募",
          icon: "user-o",
          url: "/pages/beGive/main"
        }
      ];
    }
  },
  data() {
    return {
      orderMenu: [
        {
          title: "待支付",
          icon: "pending-payment",
          url: "/pages/myOrder/main?id=2"
        },

        {
          title: "待发货",
          icon: "paid",
          url: "/pages/myOrder/main?id=4"
        },
        {
          title: "待收货",
          icon: "tosend",
          url: "/pages/myOrder/main?id=3"
        },
        {
          title: "已完成",
          icon: "cash-on-deliver",
          url: "/pages/myOrder/main?id=5"
        },
        {
          title: "退/换货",
          icon: "more-o",
          url: "/pages/refundList/main"
        }
      ],
      myService: [
        {
          title: "优惠券",
          icon: "balance-pay",
          url: "/pages/coupon/main"
        },
        {
          title: "地址管理",
          icon: "home-o",
          url: "/pages/address/main"
        }
        // {
        //   title: "百团联盟券",
        //   icon: "after-sale",
        //   url: "/pages/integral/main"
        // }
      ],
      moreService: [
        {
          title: "团长招募",
          icon: "manager-o",
          url: "/pages/beTeam/main"
        },
        {
          title: "我是团长",
          icon: "manager-o",
          url: "/pages/teamView/main"
        },
        {
          title: "供应商招募",
          icon: "user-o",
          url: "/pages/beGive/main"
        },
        {
          title: "我是供应商",
          icon: "friends-o",
          url: "/pages/giver/main"
        }
      ],

      avator:
        "http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png",
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
        wx.navigateTo({
          url: url
        });
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

<template>
  <div class="my">
    <div class="myinfo">
      <div style="width: 130rpx;height: 130rpx;border-radius: 50%;overflow: hidden;">
        <open-data style="width:130rpx;height:130rpx;border-raduis:50%;" type="userAvatarUrl"></open-data>
      </div>
      <div>
        <div v-if="userInfo.nickname">
          <p>{{userInfo.nickname}}</p>
          <p style="color:#fff;">
            <open-data type="userProvince" lang="zh_CN"></open-data>省
            <open-data type="userCity" lang="zh_CN"></open-data>市
          </p>
        </div>
        <p v-else @click="goToLogin">点击登录</p>
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
          <van-icon size="30px" :info="item.total == 0 ? '': item.total" :name="item.icon"/>
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
          <van-icon size="30px" :name="item.icon"/>
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
          v-show="item.isShow"
          v-for="(item, index) in moreService"
        >
          <van-icon size="30px" :name="item.icon"/>
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
export default {
  onShow() {
    this.getCartGoodsNum();
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    if (login()) {
      this.userInfo = login();
      this.avator = this.userInfo.avatarUrl;
      findOrderNum().then((res) => {
        let result = res.data.result;
        this.$set(this.orderMenu[0],"total",result.waitPayCount);
        this.$set(this.orderMenu[1],"total",result.waitReciveCount);
        this.$set(this.orderMenu[2],"total",result.waitSendCount);
        this.$set(this.orderMenu[3],"total",result.waitBackCount);
      }).catch((err) => {
      });
    }
	  if(wx.getStorageSync("isCap")) {
      if(wx.getStorageSync("isCap") == false) {
        this.moreService[0].isShow = true;
        this.moreService[1].isShow = false;
      }else {
        this.moreService[0].isShow = false;
        this.moreService[1].isShow = true;
      }
      if(wx.getStorageSync("isSup") == false) {
        this.moreService[2].isShow = true;
        this.moreService[3].isShow = false;
      }else {
        this.moreService[2].isShow = false;
        this.moreService[3].isShow = true;
      }
	  }else {
      this.moreService[0].isShow = true;
      this.moreService[1].isShow = false;
      this.moreService[2].isShow = true;
      this.moreService[3].isShow = false;
	  }
  },
  data() {
    return {
      orderMenu: [
        {
          title: "待支付",
          icon: "pending-payment",
          url: "/pages/myOrder/main?id=1"
        },
        {
          title: "待收货",
          icon: "tosend",
          url: "/pages/myOrder/main?id=2"
        },
        {
          title: "待发货",
          icon: "paid",
          url: "/pages/myOrder/main?id=3"
        },
        {
          title: "已完成",
          icon: "cash-on-deliver",
          url: "/pages/myOrder/main?id=4"
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
        },
        {
          title: "积分管理",
          icon: "after-sale",
          url: "/pages/integral/main"
        },
	      
      ],
      moreService: [
        {
          title: "团长招募",
          icon: "manager-o",
          url: "/pages/beTeam/main",
	        isShow: ''
        },
        {
          title: "我是团长",
          icon: "manager-o",
          url: "/pages/teamView/main",
          isShow: ''
        },
        {
          title: "供应商招募",
          icon: "user-o",
          url: "/pages/beGive/main",
          isShow: ''
        },
        {
          title: "我是供应商",
          icon: "friends-o",
          url: "/pages/giver/main",
          isShow: ''
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
      if (!this.userInfo.avatarUrl) {
        wx.navigateTo({
          url: "/pages/login/main"
        });
      }
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
.myMenu {
  position: absolute;
  left: 2.5%;
  top: 150px;
}
.mySecond {
  position: absolute;
  top: 275px;
  left: 2.5%;
}

.myThree {
  position: absolute;
  top: 400px;
  left: 2.5%;
}
.boxMenu {
  width: 95%;
  overflow: hidden;
  background: #fff;
  height: 100px;
  border-radius: 5px;
  .title {
    height: 30px;
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    .navTitle {
      float: left;
      width: 40%;
      font-weight: bold;
      padding-left: 10px;
    }
    .navBody {
      width: calc(60% - 20px);
      text-align: right;
      float: left;
      padding-right: 10px;
      color: #999;
      font-size: 20rpx;
    }
  }
  .content {
    overflow: hidden;
    height: 70px;
    .childContent {
      height: 100%;
      padding: 10px;
      float: left;
      width: calc(25% - 20px);
      text-align: center;
      .childText {
        font-size: 24rpx;
      }
    }
  }
}
</style>

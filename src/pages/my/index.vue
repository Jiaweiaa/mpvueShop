<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 17:12:49
 * @LastEditTime: 2019-09-30 11:34:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="my">
    <van-dialog id="van-dialog" />
    <div class="myinfo">
      <div class="avatar" style="width: 130rpx;height: 130rpx;border-radius: 50%;overflow: hidden;">
        <img
          v-if="userInfo&& userInfo.avatar"
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
        <div class v-if="userInfo!=null">
          <p>{{userInfo.nickname}}</p>
          <!-- <p>欢迎您,时刻益每家会员</p> -->
          <p class>欢迎您,易起省会员</p>
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

    <div class="myMenu boxMenu" v-if="userInfo">
      <div class="boxContent" @click="goTo('/pages/integral/main?active=1')">
        <div>{{score}}</div>
        <div>我的补贴金</div>
      </div>
      <div class="boxContent" @click="goTo('/pages/integral/main?active=0')">
        <div>{{beanScore}}</div>
        <div>我的购物豆</div>
      </div>
    </div>

    <div class="mySecond boxMenu" v-if="userInfo">
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

    <div class="myThree boxMenu" v-if="myService.length>0">
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

    <div class="myFour boxMenu" v-if="moreService.length>0">
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
import {getMemberAmount} from "@/api/integral/index";
import { toLogin, login } from "../../utils";
import { shoppingcartCount } from "../../api/shoppingcart";
import { findOrderNum } from "../../api/myOrder";
import { isCapOrSup, checkSup } from "../../api/login";
import Dialog from "../../../static/vant/dialog/dialog";
export default {
  onPullDownRefresh() {
    this.getBeanData();
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
      //9.27日判断菜单权限
      if (this.userInfo) {
        //普通用户登录
        if (wx.getStorageSync("userLevel") == null) {
          this.myService = [
            {
              title: "新手帮助",
              icon: "http://pydsg4puk.bkt.clouddn.com/xinshou.png",
              url: "/pages/coupon/main"
            },
            {
              title: "地址管理",
              icon: "http://pydsg4puk.bkt.clouddn.com/dizhi.png",
              url: "/pages/address/main"
            },
            {
              title: "联系客服",
              icon: "http://pydsg4puk.bkt.clouddn.com/kefu.png",
              url: "/pages/address/main"
            }
          ];
          this.moreService = [];
        } else if (wx.getStorageSync("userLevel") == 1) {
          this.myService = [];
          this.moreService = [
            {
              title: "我的佣金",
              icon: "http://pydsg4puk.bkt.clouddn.com/yongjin.png",
              url: "/pages/lookDetail/main"
            },
            {
              title: "我的代理",
              icon: "http://pydsg4puk.bkt.clouddn.com/daili.png",
              url: "/pages/teamView/main"
            }
          ];
        } else if (wx.getStorageSync("userLevel") == 2) {
          this.myService = [
            {
              title: "新手帮助",
              icon: "http://pydsg4puk.bkt.clouddn.com/xinshou.png",
              url: "/pages/coupon/main"
            },
            {
              title: "地址管理",
              icon: "http://pydsg4puk.bkt.clouddn.com/dizhi.png",
              url: "/pages/address/main"
            },
            {
              title: "联系客服",
              icon: "http://pydsg4puk.bkt.clouddn.com/kefu.png",
              url: "/pages/address/main"
            },
            {
              title: "采购中心",
              icon: "http://pydsg4puk.bkt.clouddn.com/caigou.png",
              url: "/pages/purchase/main"
            }
          ];
          this.moreService = [
            {
              title: "补贴金发放",
              icon: "http://pydsg4puk.bkt.clouddn.com/butiejin.png",
              url: "/pages/butiejin/main"
            },
            {
              title: "我的合伙人",
              icon: "http://pydsg4puk.bkt.clouddn.com/hehuoren.png",
              url: "/pages/subordinate/main"
            },
            {
              title: "我的佣金",
              icon: "http://pydsg4puk.bkt.clouddn.com/yongjin.png",
              url: "/pages/lookDetail/main"
            },
            {
              title: "店铺信息",
              icon: "http://pydsg4puk.bkt.clouddn.com/dianpu.png",
              url: "/pages/storeInfo/main"
            },
            // {
            //   title: "我的代理",
            //   icon: "http://pydsg4puk.bkt.clouddn.com/daili.png",
            //   url: "/pages/teamView/main"
            // }
          ];
        }
      }

      //******** */
    }

    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  onShow() {
    this.getBeanData();
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
      //9.27日判断菜单权限
      if (this.userInfo) {
        //普通用户登录
        if (wx.getStorageSync("userLevel") == null) {
          this.myService = [
            {
              title: "新手帮助",
              icon: "http://pydsg4puk.bkt.clouddn.com/xinshou.png",
              url: "/pages/coupon/main"
            },
            {
              title: "地址管理",
              icon: "http://pydsg4puk.bkt.clouddn.com/dizhi.png",
              url: "/pages/address/main"
            },
            {
              title: "联系客服",
              icon: "http://pydsg4puk.bkt.clouddn.com/kefu.png",
              url: "/pages/address/main"
            }
          ];
          this.moreService = [];
        } else if (wx.getStorageSync("userLevel") == 1) {
          this.myService = [];
          this.moreService = [
            {
              title: "我的佣金",
              icon: "http://pydsg4puk.bkt.clouddn.com/yongjin.png",
              url: "/pages/lookDetail/main"
            },
            {
              title: "我的代理",
              icon: "http://pydsg4puk.bkt.clouddn.com/daili.png",
              url: "/pages/teamView/main"
            }
          ];
        } else if (wx.getStorageSync("userLevel") == 2) {
          this.myService = [
            {
              title: "新手帮助",
              icon: "http://pydsg4puk.bkt.clouddn.com/xinshou.png",
              url: "/pages/coupon/main"
            },
            {
              title: "地址管理",
              icon: "http://pydsg4puk.bkt.clouddn.com/dizhi.png",
              url: "/pages/address/main"
            },
            {
              title: "联系客服",
              icon: "http://pydsg4puk.bkt.clouddn.com/kefu.png",
              url: "/pages/address/main"
            },
            {
              title: "采购中心",
              icon: "http://pydsg4puk.bkt.clouddn.com/caigou.png",
              url: "/pages/purchase/main"
            }
          ];
          this.moreService = [
            {
              title: "补贴金发放",
              icon: "http://pydsg4puk.bkt.clouddn.com/butiejin.png",
              url: "/pages/butiejin/main"
            },
            {
              title: "我的合伙人",
              icon: "http://pydsg4puk.bkt.clouddn.com/hehuoren.png",
              url: "/pages/subordinate/main"
            },
            {
              title: "我的佣金",
              icon: "http://pydsg4puk.bkt.clouddn.com/yongjin.png",
              url: "/pages/lookDetail/main"
            },
            {
              title: "店铺信息",
              icon: "http://pydsg4puk.bkt.clouddn.com/dianpu.png",
              url: "/pages/storeInfo/main"
            },
            {
              title: "我的代理",
              icon: "http://pydsg4puk.bkt.clouddn.com/daili.png",
              url: "/pages/teamView/main"
            }
          ];
        }
      }
    }
  },
  data() {
    return {
      
      score:0,//补贴金
      beanScore:0,//购物豆
      // 用户数据
      usersData: "",

      orderMenu: [
        {
          title: "待付款",
          icon: "http://pydsg4puk.bkt.clouddn.com/daifukuan.png",
          url: "/pages/myOrder/main?id=2"
        },

        {
          title: "待发货",
          icon: "http://pydsg4puk.bkt.clouddn.com/daifahuo.png",
          url: "/pages/myOrder/main?id=4"
        },
        {
          title: "待收货",
          icon: "http://pydsg4puk.bkt.clouddn.com/daishouhuo.png",
          url: "/pages/myOrder/main?id=3"
        },
        {
          title: "已完成",
          icon: "http://pydsg4puk.bkt.clouddn.com/yiwancheng.png",
          url: "/pages/myOrder/main?id=5"
        },
        {
          title: "退/换货",
          icon: "http://pydsg4puk.bkt.clouddn.com/tuihuo.png",
          url: "/pages/refundList/main"
        }
      ],
      myService: [],
      moreService: [],
      avator: "http://webimg.gaoshanapp.com/my_avator.png",
      allcheck: false,
      Listids: [],
      userInfo: null
    };
  },
  methods: {
    //获取购物豆及补贴金数量
     // 获取数据
    async getBeanData() {
      let data = await getMemberAmount();
      this.score = data.data.result.scoreAmount;
      this.beanScore = data.data.result.shoppingBeans;
    },
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

<template>
  <div class="my">
    <div class="myinfo">
      <img @click="toLogin" :src="avator" alt="">
      <div @click="toLogin">
        <p>董昊澎</p>
        <p v-if="userInfo.nickname">点击登录</p>
        <p v-else>微信用户</p>
      </div>
    </div>
    <div class="myMenu boxMenu">
      <div class="title">
	      <div class="navTitle">我的订单</div>
	      <div class="navBody" @click="goTo('/pages/myOrder/main')">查看全部订单></div>
      </div>
	    <div class="content">
		    <div>
			   
		    </div>
	    </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    toLogin,
    login
  } from "../../utils";
  export default {
    onShow() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      if (login()) {
        this.userInfo = login();
        console.log(this.userInfo);
        this.avator = this.userInfo.avatarUrl;
      }
    },
    created() {},
    mounted() {},
    data() {
      return {
	      orderMenu: [
		      {
            title: "待支付",
            icon: "icon-unie64a",
            url: "/pages/myOrder/main"
		      },
          {
            title: "待收货",
            icon: "icon-unie64a",
            url: "/pages/myOrder/main"
          },
          {
            title: "待发货",
            icon: "icon-unie64a",
            url: "/pages/myOrder/main"
          },
          {
            title: "已完成",
            icon: "icon-unie64a",
            url: "/pages/myOrder/main"
          },
	      ],
        
        avator: "http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png",
        allcheck: false,
        Listids: [],
        userInfo: {},
        listData: [{
          title: "我的订单",
          icon: "icon-unie64a",
          url: "/pages/myOrder/main"
        },
          {
            title: "优惠券",
            icon: "icon-youhuiquan",
            url: "/pages/coupon/main"
          },
          {
            title: "我的足迹",
            icon: "icon-zuji",
            url: ""
          },
          {
            title: "我的收藏",
            icon: "icon-shoucang",
            url: "/pages/collectlist/main"
          },
          {
            title: "地址管理",
            icon: "icon-dizhiguanli",
            url: "/pages/address/main"
          },
          {
            title: "我是团长",
            icon: "icon-dizhiguanli",
            url: "/pages/team/main"
          },
          {
            title: "成为团长",
            icon: "icon-lianxikefu",
            url: "/pages/beTeam/main"
          },
          {
            title: "成为供应商",
            icon: "icon-bangzhuzhongxin",
            url: "/pages/beGive/main"
          }
        ]
      };
    },
    components: {},
    methods: {
      goTo(url) {
        if (toLogin()) {
          wx.navigateTo({
            url: url
          });
        }
      },
      toLogin() {
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
	.boxMenu {
		width: 95%;
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
	}
</style>

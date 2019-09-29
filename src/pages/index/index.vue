<!--
 * @Description: 首页模块
 * @Author: 董
 * @Date: 2019-08-14 09:01:37
 * @LastEditTime: 2019-09-29 10:47:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="index_home">
    <div class="search">
      <div @click="toSearch" class="search_bar">
        <input type="text" placeholder="搜索您要的商品" disabled placeholder-class="phcolor" />
        <span class="icon"></span>
        <span class="qr_icon"></span>
      </div>
    </div>
    <div class="swiper-group">
      <div class="swiper">
        <swiper
          class="swiper-container"
          indicator-dots="true"
          autoplay="true"
          interval="3000"
          circular="true"
          duration="500"
        >
          <block v-for="(item, index) in banner " :key="index">
            <swiper-item class="swiper-item">
              <img
                @click="goodsDetail(item)"
                :src="'http://qn.gaoshanmall.cn/' + item.banner"
                class="slide-image"
              />
            </swiper-item>
          </block>
        </swiper>
      </div>
    </div>

    <div class="channel">
      <div
        @click="toCategoryList(item.categoryId, item.name)"
        v-for="(item, index) in channelList"
        :key="index"
      >
        <img :src="'http://qn.gaoshanmall.cn/'+ item.logo" alt />
        <p>{{item.name}}</p>
      </div>
    </div>
    
    <!-- 限时抢购 -->
    <!-- <div class="rush">
      <div class="rush_title">
        <span class="stand"></span>
        <span class="text">限时抢购</span>
        <span class="count_down_text">距离结束还有</span>
      </div>
      <div class="rush_content">
        <div class="rush_item" v-for="(item,index) in 4" :key="index">
          <div class="thumb">
            <img src="http://qn.gaoshanmall.cn/cloudmall/file/662905256241269760.jpg" alt />
          </div>
          <div class="vip_price">
            ￥120+
            <img src="/static/images/index/money.png" alt />
            32
          </div>
          <div class="price">￥220</div>
          <div class="desc">小米空气净化器</div>
        </div>
      </div>
    </div> -->

    <div class="product_group">
      <div class="product_title">
        <div class="title_item">
          <p>热门推荐</p>
          <p>猜你喜欢</p>
        </div>
        <div class="title_item">
          <p>新品榜单</p>
          <p>新品榜单</p>
        </div>
        <div class="title_item">
          <p>品牌好货</p>
          <p>大品牌出厂价</p>
        </div>
      </div>
      <div class="product_content">

      </div>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(item, index) in newCategoryList" :key="item.id">
        <!-- <div class="head" v-if="item.goodsList&&item.goodsList.length>0">{{item.name}}</div> -->
        <div v-if="item.name !== '优惠券'" class="sublist">
          <div
            class="good-card"
            v-for="(good, goodIndex) in item.goodsList"
            :key="goodIndex"
            @click="goodsDetail(good)"
          >
            <div class="thumb"> 
              <img :src="'http://qn.gaoshanmall.cn/' + good.img" alt />
            </div>
            <div class="desc">
              <div class="title">{{good.name}}</div>
              <div class="sketch">
                <span>家庭必备</span>
                <span>送礼首选</span>
              </div>
              <div class="vip" v-if="good.mixCashPrice &&good.mixScorePrice">
                <img class="vip_img" src="/static/images/index/vip.png" alt />
                <span>￥{{good.mixCashPrice}}+ <img class="money" src="/static/images/index/money.png" alt /> {{good.mixScorePrice}}补贴金</span>
              </div>
              <div class="price">
                <p>￥{{good.listPrice}}</p>
                <p>￥{{good.salePrice}}</p>
              </div>
              <div class="origin-price" v-if="goodIndex==0">

                <span>{{good.salePrice?good.salePrice:''}}购物豆</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="coupon-item">
          <div
            class="coupon_box"
            v-for="(couponData, couponIndex) in item.goodsList"
            :key="couponIndex"
          >
            <img class="bg" src="/static/images/coupon.png" />
            <div class="content">
              <div class="left">
                <p style="position:relative;">
                  <!-- <span class="name">{{item.mDescription.name}}</span> -->
                  <span class="coupon_price">{{couponData.couponDetailVo.mDescription.amount}}</span>
                  <span class="coupon_type">{{couponData.couponDetailVo.mDescription.action}}</span>
                  <span class="name">{{couponData.couponDetailVo.name}}</span>
                </p>
                <p>
                  <span>{{couponData.couponDetailVo.mDescription.name}}</span>
                  <br />
                  <span>{{couponData.couponDetailVo.mDescription.scope}}</span>
                </p>
                <p>有效期:{{couponData.couponDetailVo.mDescription.date}}</p>
              </div>
              <div class="right">
                <p @click="useBtn(couponData)" v-if="couponData.btnAble" class="btn">立即领取</p>
                <p class="btn" v-else>领取中</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="newCategoryList.length > 0" class="no_more_data">
      <span>—</span>
      <span>暂时没有更多商品啦,祝您购物愉快</span>
      <span>—</span>
    </div>

    <van-notify id="van-notify" />
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { getIndexItem, getcoupon } from "../../api/index/index";
import { mapState, mapMutations } from "vuex";
import { shoppingcartCount } from "../../api/shoppingcart/index";
import { scanQrCode, showQRCodeToScan } from "../../api/distribution/index";
import Notify from "../../../static/vant/notify/notify";
import cityArr from "../../assets/data/city";
export default {
  onPullDownRefresh: function() {
    this.brandList = [];
    this.newGoods = [];
    this.hotGoods = [];
    this.newCategoryList = [];
    this.getCartGoodsNum();
    this.getData();
    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  mounted() {
    this.getCityName();
    this.getData();
    this.getCartGoodsNum();
  },
  onLoad: function(options) {
    console.log(options, "看这里看这里");
    //如果是通过工作人员分享的小程序码进入,则有推荐人id
    if (options.scene) {
      wx.setStorageSync("parentMemberId", decodeURIComponent(options.scene));
    }
    console.log(decodeURIComponent(options.scene), "序列化后的参数");
  },
  onShow() {
    console.log("是否登录:", wx.getStorageSync("haveLogin"));
    console.log("上级ID:", wx.getStorageSync("parentMemberId"));
    if (wx.getStorageSync("haveLogin") && wx.getStorageSync("parentMemberId")) {
      let flag = wx.getStorageSync("haveLogin");
      if (flag) {
        let params = {
          parentMemberId: wx.getStorageSync("parentMemberId")
        };
        scanQrCode(params)
          .then(res => {
            if (res.data.code == 200) {
              wx.setStorageSync("haveLogin", false);
            }
          })
          .catch(err => {});
      }
    }

    this.getCartGoodsNum();
    // if (wx.getStorageSync("data")) {
    //   this.captainInfo = Object.assign({}, wx.getStorageSync("data"));
    // } else {
    //   wx.navigateTo({
    //     url: "/pages/mappage/main"
    //   });
    // }
  },
  onShareAppMessage(res) {
    console.log(res);
  },
  computed: {
    ...mapState(["cityName"])
  },

  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
      channelList: [],
      captainInfo: null,
      qrCode: ""
    };
  },
  methods: {
    // 商品分类
    toCategoryList(id, name) {
      wx.navigateTo({
        url: "../search/main?id=" + id + "&name=" + name
      });
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
    ...mapMutations(["update"]),
    toMappage() {
      var _this = this;
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success(res) {
          //如果没有同意授权,打开设置
          if (!res.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success: res => {
                _this.getCityName();
              }
            });
          } else {
            wx.navigateTo({
              url: "/pages/mappage/main"
            });
          }
        }
      });
    },
    getCityName() {
      var _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548"
      });
      myAmapFun.getRegeo({
        success: function(data) {
          // data[0].regeocodeData.formatted_address
          // _this.cityName = data[0].regeocodeData.formatted_address;
          _this.update({ cityName: data[0].regeocodeData.formatted_address });
        },
        fail: function(info) {
          //失败回调
          console.log(info);
          //如果用户拒绝授权
          // 默认为北京
          _this.cityName = "北京市";
          _this.update({ cityName: "北京市" });
        }
      });
    },
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    },

    async getData() {
      wx.showLoading({
        title: "加载中"
      });

      const data = await getIndexItem();
      // console.log(data,'666');
      if (data.data.code == "200") {
        this.banner = data.data.result.banner;
        this.channelList = data.data.result.indexCategories;

        this.newCategoryList.push({
          name: "优惠券",
          goodsList: data.data.result.indexCouponVos
        });
        if (this.newCategoryList[0].goodsList != null) {
          this.newCategoryList[0].goodsList.map(coupon => {
            this.$set(coupon, "btnAble", true);
          });
        }
        this.newCategoryList.push({
          name: "新品上市",
          goodsList: data.data.result.recommended
        });
        this.newCategoryList.push({
          name: "热销爆品",
          goodsList: data.data.result.hotSale
        });

        console.log(data.data.result);
      }
      setTimeout(() => {
        wx.hideLoading();
      }, this.GLOBAL.timer);
    },
    goodsDetail(item) {
      if (item.status == 1) {
        wx.navigateTo({
          url: "/pages/topicdetail/main?id=" + item.itemId
        });
      } else {
        wx.navigateTo({
          url: "/pages/goods/main?id=" + item.itemId
        });
      }
    },
    // 更多分类
    categoryList(item) {
      wx.navigateTo({
        url: "/pages/categorylist/main?id=" + id
      });
    },
    goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url: "/pages/newgoods/main?isHot=" + 1
        });
      } else {
        wx.navigateTo({
          url: "/pages/newgoods/main?isNew=" + 1
        });
      }
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
    totopic() {
      wx.navigateTo({
        url: "/pages/topic/main"
      });
    },
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main"
      });
    },
    branddetail(id) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + id
      });
    },
    // 使用优惠券
    useBtn(val) {
      console.log(val);
      val.btnAble = false;
      let params = {
        uniqueId: val.couponDetailVo.uniqueId,
        storeId: val.couponDetailVo.storeId
      };
      getcoupon(params).then(res => {
        val.btnAble = true;
        if (res.data.code == 200) {
          wx.showToast({
            icon: "none",
            title: res.data.result
          });
        } else {
          val.btnAble = true;
          // Notify(res.data.message);
          wx.showToast({
            icon: "none",
            title: res.data.message
          });
        }
      });
    }
  }
};
</script>

<style lang='scss'>
@import "./style.scss";
</style>
<style>
.coupon-item {
  width: 100%;
}
.style-six {
  width: auto;
  height: 200rpx;
  position: relative;
  margin: 20rpx 10rpx;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7dbcd;
  color: #e5004f;
}
.style-six .info-box {
  -webkit-box: 1;
  height: 100%;
  -webkit-flex: 1;
  flex: 1;
  padding: 0 3% 0 10%;
  position: relative;
}
.coupon-item .nick {
  padding: 0.66% 0;
  color: #e5004f;
  font-size: 28rpx;
  margin-top: 22px;
}
.coupon-item .coupon-money {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
}
.coupon-item .coupon-money .of {
  font-size: 32rpx;
}
.coupon-item .coupon-money text {
  font-size: 32rpx;
  margin-top: 11px;
  display: block;
  color: #05d978;
}
.coupon-item .coupon-money .lay:last-child {
  flex: 1;
  padding: 0 3%;
  font-size: 22rpx;
  line-height: 1.22rem;
}
.coupon-item .coupon-money .lay .demand {
  height: 30rpx;
  line-height: 30rpx;
  margin-left: 20rpx;
  color: #f0f0f0;
  margin-top: 14px;
}
.style-six .get-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200rpx;
  text-align: center;
  color: #fff;
  font-size: 1.5rem;
  line-height: 1.35;
  width: 28%;
  background-color: #fff;
  position: relative;
}
.style-six .get-btn span {
  border: 1rpx solid #e5004f;
  padding: 8rpx 16rpx;
  border-radius: 26rpx;
  color: #e5004f;
  font-size: 28rpx;
}
.style-six:after {
  top: -5rpx;
}
/* 齿轮 */
.style-six:before {
  bottom: -0.05rpx;
  -webkit-transform: rotate(180deg);
}
.style-six:after,
.style-six:before {
  content: "";
  height: 0.3rem;
  position: absolute;
  left: 0;
  right: 0;
  display: block;
  z-index: 9;
  background-image: linear-gradient(
      -45deg,
      #f5f5f5 25%,
      transparent 25%,
      transparent
    ),
    linear-gradient(-135deg, #f5f5f5 25%, transparent 25%, transparent),
    linear-gradient(-45deg, transparent 75%, #f5f5f5 75%),
    linear-gradient(-135deg, transparent 75%, #f5f5f5 75%);
  background-size: 0.55rem 0.55rem;
  background-repeat: repeat-x, repeat-x;
}
</style>

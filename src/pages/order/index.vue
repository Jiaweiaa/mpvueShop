<template>
  <div class="order">
    <van-toast id="van-toast"/>
    <div @click="toAddressList" v-if="address!=null" class="address">
      <div class="item">
        <div class="list">
          <div class="addresslist">
            <div>
              <span>{{address.firstName}}</span>
              <div class="moren">默认</div>
            </div>
            <div class="info">
              <p>{{address.mobile}}</p>
              <p>{{address.dizhi}}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div @click="toAdd" v-show="address==null" class="seladdress">请选择收货地址</div>
    <div class="orderbox">
      <div class="item">
        <div>商品合计</div>
        <div>￥{{originPayAmount}}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>
    <div class="cartlist">
      <!-- 分店铺形式的购物车列表 -->
      <div class="store-list" v-for="(group,index) in shopList" :key="index">
        <!-- 店铺名称 -->
        <van-cell>
          <div class="store-name" style="display:flex;">
            <van-icon name="shop-o"/>
            <span>{{group.storeInfoVo.name}}</span>
          </div>
        </van-cell>
        <!-- 购物车中所选的该店铺商品 -->
        <div v-for="(item,key) in group.shoppingCartLineDtos" :key="key">
          <van-swipe-cell :right-width="65">
            <van-cell>
              <div style="display:flex;">
                <van-card
                  style="width: 100%;"
                  :num="item.quantity"
                  :price="item.salePrice"
                  desc="描述信息"
                  :title="item.itemTitle"
                  :thumb="'http://qn.gaoshanmall.cn/'+item.imageUrl"
                ></van-card>
              </div>
            </van-cell>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>实付 : ￥{{currentPayAmount}}</div>
      <div @click="pay">支付</div>
    </div>
  </div>
</template>

<script>
import {
  ShopCartOrderconfirm,
  detailOrderconfirm
} from "../../api/shoppingcart";
import { getMemAddressList } from "../../api/address";
import { get, post, login, getStorageOpenid } from "../../utils";
import { createOrder, toPay, afterOrderDetail } from "../../api/order";
import Toast from "../../../static/vant/toast/toast";
import fly from "../../api/request";
let querystring = require("querystring");
let deviceId = new Date().getTime();
export default {
  onShow: function(options) {
    // Toast("我是清体型321");
    if (wx.getStorageSync("orderFrom") && wx.getStorageSync("orderParams")) {
      this.from = wx.getStorageSync("orderFrom");
      this.params = JSON.parse(wx.getStorageSync("orderParams"));
    }
    wx.getStorage({
      key: "data",
      success: res => {
        this.captainId = res.data.id;
      }
    });
    wx.showLoading({
      title: "订单生成中...", //提示的内容,
      mask: true //显示透明蒙层，防止触摸穿透,
    });
    //将字符串转换成数组或者对象
    if (this.from == "shoppingcart") {
      let params = this.params;
      ShopCartOrderconfirm(params)
        .then(res => {
          if (res.data.code == "200") {
            //商品信息赋值
            this.orderLines = [];
            this.shopList = res.data.result.storeShoppingCartLineDtos;
            this.shopList.map(v => {
              v.shoppingCartLineDtos.map(vv => {
                this.$set(vv, "storeId", v.storeInfoVo.id);
                this.$set(vv, "shoppingCartIds", vv.id);
                this.orderLines.push(vv);
              });
            });
            this.currentPayAmount = res.data.result.currentPayAmount;
            this.originPayAmount = res.data.result.originPayAmount;
            this.currentShippingFee = res.data.result.currentShippingFee;

            //地址信息赋值
            if (
              res.data.result.shippingAddressVo.defaultMemberAddress != null
            ) {
              this.address =
                res.data.result.shippingAddressVo.defaultMemberAddress;
            } else {
              this.address = res.data.result.shippingAddressVo.shippingAddress;
            }
            this.$set(
              this.address,
              "dizhi",
              this.address.province +
                this.address.city +
                this.address.town +
                this.address.address
            );
          }
          wx.hideLoading();
        })
        .catch(function(error) {
          wx.hideLoading();
          console.log(error, "获取商品信息和地址接口报错");
        });
      //321321321321321
    } else if (this.from == "goodsDetail") {
      let params = this.params;
      //3213211111
      detailOrderconfirm(params)
        .then(res => {
          if (res.data.code == "200") {
            //商品信息赋值
            this.orderLines = [];
            this.shopList = res.data.result.storeShoppingCartLineDtos;
            this.shopList.map(v => {
              v.shoppingCartLineDtos.map(vv => {
                this.$set(vv, "storeId", v.storeInfoVo.id);
                this.$set(vv, "shoppingCartIds", vv.id);
                this.orderLines.push(vv);
              });
            });
            this.currentPayAmount = res.data.result.currentPayAmount;
            this.originPayAmount = res.data.result.originPayAmount;
            this.currentShippingFee = res.data.result.currentShippingFee;
            //地址信息赋值
            if (
              res.data.result.shippingAddressVo.defaultMemberAddress != null
            ) {
              this.address =
                res.data.result.shippingAddressVo.defaultMemberAddress;
            } else {
              this.address = res.data.result.shippingAddressVo.shippingAddress;
            }
            this.$set(
              this.address,
              "dizhi",
              this.address.province +
                this.address.city +
                this.address.town +
                this.address.address
            );
          }
          wx.hideLoading();
        })
        .catch(function(error) {
          wx.hideLoading();
          console.log(error, "获取商品信息和地址接口报错");
        });
    }
  },

  created() {},
  mounted() {},
  data() {
    return {
      addressId: "",
      openId: "",
      allprice: "",
      shopList: [], //分店铺商品列表
      originPayAmount: "", //应付金额
      currentPayAmount: "", //实付金额
      currentShippingFee: "", //运费
      address: {
        firstName: ""
      },
      orderLines: null,
      from: "", //从哪个入口进入的下单页面
      params: null, //获取下单所需要的参数
      storeId: "", //店铺ID 从购物车进入此页面时需要用到
      captainId: "" //团长ID
    };
  },
  components: {},
  methods: {
    //获取收货地址列表
    getAddressList() {
      getMemAddressList().then(res => {
        if (res.data.code == 200) {
          res.data.result.map(v => {
            if (v.defalutFlag) {
              this.address = v;
              this.$set(
                this.address,
                "dizhi",
                this.address.province +
                  this.address.city +
                  this.address.town +
                  this.address.address
              );
            }
          });
        }
      });
    },
    //支付方法
    pay() {
      //弹起遮罩层 防止二次支付
      wx.showLoading({
        title: "校验支付状态...", //提示的内容,
        mask: true //显示透明蒙层，防止触摸穿透,
      });
      if (this.from != "") {
        let params = {
          codPaymentType: "",
          deliveryDescription: "",
          deliveryTimebar: "",
          deliveryType: "",
          expectDeliveryDate: "",
          expectDeliveryTime: "",
          memberId: "1136203741534760962",
          orderLines: [],
          paymentType: 4,
          shppingAddressId: "", //地址
          captainId: "", //团长ID
          type: 1 //type为1是从商品详情页面进入  2是购物车中进入
        };
        params.captainId = this.captainId;
        if (this.orderLines != null) {
          this.orderLines.map(v => {
            params.orderLines.push(v);
          });
        }
        params.orderLines.map(v => {
          this.$set(v, "buyType", "N");
        });
        params.shppingAddressId = params.shppingAddressId.toString();
        params.storeId = this.storeId;
        if (this.from == "shoppingcart") {
          params.type = 2;
          params.buyType = "N";
        }
        // console.log(this.orderLines,222);
        let orderTab = params.type;
        // params.orderLines.push(this.orderLines);
        params.shppingAddressId = this.address.id;
        //创建订单方法 成功则调用    captainID
        createOrder(params)
          .then(res => {
            if (res.data.code == "200") {
              let params = {};
              let orderCode = res.data.result.scmCode;
              params.orderCode = res.data.result.scmCode;
              params.paymentType = 4;
              params.orderTab = orderTab;
              params.deviceType = 2;
              //创建订单成功则调用后台支付
              toPay(params)
                .then(res => {
                  //如果调用toPay方法成功 则拉起微信登录方法获取code传给后台并调用
                  if (res.data.code == "200") {
                    let params = {
                      subOrdinate: res.data.result.subOrdinate,
                      deviceType: 2
                    };
                    let url = `/trade${res.data.result.redirectUrl}`;
                    let querystring = require("querystring");
                    wx.login({
                      success: res => {
                        console.log(res, 111);
                        if (res.code) {
                          params.code = res.code;

                          //成功的话  拉起wxPay方法  获取支付所需要的一切参数
                          const wxPay = params => {
                            let data = querystring.encode(params);
                            return fly.request({
                              url: url,
                              method: "post",
                              body: data,
                              headers: {
                                "Content-Type":
                                  "application/x-www-form-urlencoded"
                              }
                            });
                          };
                          wxPay(params)
                            .then(res => {
                              wx.hideLoading();
                              //如果成功 拉起微信支付API进行支付
                              if (res.data.code == "200") {
                                wx.requestPayment({
                                  timeStamp:
                                    res.data.result.wechatJsApiPayCommand
                                      .timeStamp,
                                  nonceStr:
                                    res.data.result.wechatJsApiPayCommand
                                      .nonceStr,
                                  package:
                                    res.data.result.wechatJsApiPayCommand
                                      .packAge,
                                  signType:
                                    res.data.result.wechatJsApiPayCommand
                                      .signType,
                                  paySign:
                                    res.data.result.wechatJsApiPayCommand
                                      .paySign,
                                  success: res => {
                                    wx.showToast({
                                      title: "支付成功!",
                                      icon: "success",
                                      duration: 2000,
                                      mask: true
                                    });

                                    setTimeout(() => {
                                      wx.redirectTo({
                                        url: "/pages/myOrder/main"
                                      });
                                    }, 1000);
                                  },
                                  fail: res => {
                                    //调用失败弹到待支付订单页
                                    afterOrderDetail({ orderCode: orderCode })
                                      .then(res => {
                                        if (res.data.code == "200") {
                                          wx.hideLoading();
                                          wx.redirectTo({
                                            url:
                                              "/pages/myOrder/main"
                                          });
                                        }
                                      })
                                      .catch(err => {});
                                  }
                                });
                              }
                            })
                            .catch(err => {
                              wx.hideLoading();
                            });
                        } else {
                          console.log("登录失败！" + res.errMsg);
                        }
                      },
                      fail: err => {
                        console.log(err, 222);
                      }
                    });
                  }
                })
                .catch(err => {});
            }
          })

          .catch(err => {
            wx.hideLoading();
          });
      }
    },
    toAddressList() {
      wx.navigateTo({
        url: "/pages/addressSelect/main"
      });
    },
    toAdd() {
      wx.navigateTo({
        url: "/pages/addaddress/main"
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>

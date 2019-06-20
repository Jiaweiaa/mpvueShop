<template>
  <div class="order">
    <div @click="toAddressList" v-if="address.firstName" class="address">
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
    <div @click="toAdd" v-else class="seladdress">请选择收货地址</div>
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
import { createOrder, toPay } from "../../api/order";
import fly from "../../api/request";
let querystring = require("querystring");
let deviceId = new Date().getTime();
export default {
  onLoad: function(options) {
    this.from = options.from;
    wx.getStorage({
      key: "data",
      success: res => {
        this.captainId = res.data.id;
      }
    });
    //将字符串转换成数组或者对象
    // console.log(params);
    if (options.from == "shoppingcart") {
      let params = JSON.parse(options.params);
      wx.showLoading();
      ShopCartOrderconfirm(params)
        .then(res => {
          this.orderLines = [];
          this.shopList = res.data.result.storeShoppingCartLineDtos;
          this.shopList.map(v => {
            v.shoppingCartLineDtos.map(vv => {
              this.$set(vv, "storeId", v.storeInfoVo.id);
              this.$set(vv, "shoppingCartIds", vv.id);
              this.orderLines.push(vv);
            });
          });
          console.log(this.orderLines, 999);
          this.currentPayAmount = res.data.result.currentPayAmount;
          this.originPayAmount = res.data.result.originPayAmount;
          this.currentShippingFee = res.data.result.currentShippingFee;
          wx.hideLoading();
        })
        .catch(err => {
          wx.hideLoading();
        });
    } else if (options.from == "goodsDetail") {
      let params = JSON.parse(options.params);
      wx.showLoading();
      detailOrderconfirm(params)
        .then(res => {
          this.orderLines = [];
          this.shopList = res.data.result.storeShoppingCartLineDtos;
          this.shopList.map(v => {
            v.shoppingCartLineDtos.map(vv => {
              this.$set(vv, "storeId", v.storeInfoVo.id);
              this.$set(vv, "shoppingCartIds", vv.id);
              this.orderLines.push(vv);
            });
          });
          console.log(this.orderLines, 999);
          this.currentPayAmount = res.data.result.currentPayAmount;
          this.originPayAmount = res.data.result.originPayAmount;
          this.currentShippingFee = res.data.result.currentShippingFee;
          wx.hideLoading();
        })
        .catch(err => {
          wx.hideLoading();
        });
    }
    this.getAddressList();
  },
  onShow() {
    if (wx.getStorageSync("addressId")) {
      this.addressId = wx.getStorageSync("addressId");
    }
    this.openId = getStorageOpenid();
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
      address: {},
      orderLines: null,
      from: "", //从哪个入口进入的下单页面
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
          this.showFlag = false;
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
    pay() {
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
        createOrder(params)
          .then(res => {
            let params = {};
            params.scmCode = res.data.result.scmCode;
            params.paymentType = 4;
            params.orderTab = orderTab;
            params.deviceType = 2;
            toPay(params)
              .then(res => {

                wx.login({
                  success:(res)=> {
                    if (res.code) {
                       console.log(res.code);
                    } else {
                      console.log("登录失败！" + res.errMsg);
                    }
                  }
                });
              })
              .catch(err => {});
          })
          .catch(err => {});
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

<template>
  <div class="order">
    <!-- 轻提醒 -->
    <van-toast id="van-toast" />
    <!-- 上拉选项菜单 -->
    <van-action-sheet
      id="delivery"
      :show="sheetShow"
      :actions="deliveryOption"
      cancel-text="取消"
      @close="onClose"
      @cancel="onClose"
      @select="onSelect"
    />
    <van-action-sheet
      id="pay"
      :show="paySheetShow"
      :actions="payOption"
      cancel-text="取消"
      @close="onPayClose"
      @cancel="onPayClose"
      @select="onPaySelect"
    />
    <div @click="toAddressList" v-if="address!=null" class="address">
      <div class="item">
        <div class="list">
          <div class="addresslist">
            <div>
              <span>{{address.firstName}}</span>
              <div class="moren" v-if="address.defalutFlag">默认</div>
            </div>
            <div class="info">
              <p>{{address.mobile}}</p>
              <p>{{address.province}}{{address.city}}{{address.district}}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div @click="toAdd" v-show="address==null" class="seladdress">请添加收货地址</div>

    <div class="cartlist">
      <!-- 分店铺形式的购物车列表 -->
      <div class="store-list" v-for="(store,index) in shopList" :key="index">
        <!-- 店铺名称 -->
        <van-cell>
          <div class="store-name" style="display:flex;">
            <van-icon name="shop-o" />
            <span>{{store.storeInfoVo.name}}</span>
          </div>
        </van-cell>
        <!-- 购物车中所选的该店铺商品 -->
        <div v-for="(item,key) in store.shoppingCartLineDtos" :key="key">
          <van-cell>
            <!-- <van-card
                style="width: 100%;"
                :num="item.quantity"
                :price="item.salePrice"
                desc="描述信息"
                :title="item.itemTitle"
                :thumb="'http://qn.gaoshanmall.cn/'+item.imageUrl"
            ></van-card>-->
            <van-card
              :tag="item.tag"
              :lazy-load="true"
              :price="item.discountPrice"
              :title="item.itemTitle"
              :num="item.quantity"
              thumb-class="goods-image"
              title-class="goods-title"
              price-class="goods-price"
              desc-class="goods-desc"
              :key="key"
              :thumb="'http://qn.gaoshanmall.cn/' + item.imageUrl"
            >
              <div slot="desc" class="goods-bottom">
                <div class="sketch">
                  <span
                    v-for="(property,proIndex) in item.saleProperties"
                    :key="proIndex"
                  >{{property}}&nbsp;</span>
                </div>
              </div>
              <!-- <div slot="desc" class="goods-bottom">
                <div>{{item.keyword}}</div>
                <div class="sketch">{{item.sketch}}</div>
              </div>-->
            </van-card>
          </van-cell>
        </div>
        <div class="bottom_item">
          <div>优惠券</div>
          <div v-show="store.canBeAppliedCoupons==null">暂无可用</div>
          <div v-show="store.canBeAppliedCoupons!=null">
            <div
              @click=" getCouponList(store)"
            >{{store.selectCouponName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="orderbox">
      <div class="item">
        <div>商品合计</div>
        <div>￥{{originPayAmount}}</div>
      </div>
      <div class="item">
        <div>优惠金额</div>
        <div>￥{{discount}}</div>
      </div>
      <div class="item" @click="paySheetShow=true">
        <div>选择支付方式</div>
        <div>{{payObj.name}}</div>
      </div>
      <div class="item" v-if="payObj.value==12 ||payObj.value==13">
        <div>联盟券余额</div>
        <div>余额&nbsp;{{scoreAmount}}</div>
      </div>
      <div class="item" @click="sheetShow=true">
        <div>选择配送方式</div>
        <div>{{deliveryObj.name}}</div>
      </div>
      <!-- <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item" @click="couponShow=true">
        <div>优惠券</div>
        <div>暂无</div>
      </div>-->
    </div>
    <div class="bottom">
      <div>实付 : ￥{{currentPayAmount}}</div>
      <div @click="pay">支付</div>
    </div>
    <!-- 优惠券列表弹出层 -->
    <van-popup
      custom-class="coupon_popup"
      :show="couponShow"
      position="bottom"
      @close="closeCoupon"
      nav-class="nav-top"
    >
      <van-tabs sticky custom-class="coupon_tabs">
        <!-- 可用优惠券列表 -->
        <van-tab :title="canBeAppliedCouponsTitle">
          <div class="coupon_list">
            <div
              class="coupon_item"
              v-for="(coupon,index) in canBeAppliedCoupons"
              @click="toUseCoupon(coupon)"
              :key="index"
            >
              <van-icon
                v-if="coupon.active"
                name="success"
                size="40rpx;"
                custom-class="coupon_active"
              />
              <div class="coupon_top">
                <div class="left">
                  <p class="price">
                    <span>{{coupon.name}}</span>
                  </p>
                  <p>{{coupon.mDescription.name}}</p>
                  <p>{{coupon.mDescription.scope}}</p>
                </div>
                <div class="right">
                  <p class="title">{{coupon.mDescription.action}}</p>
                  <p class="title">{{coupon.mDescription.amount}}</p>
                  <p class="time">有效期:{{coupon.mDescription.date}}</p>
                </div>
              </div>
              <div class="coupon_bottom">
                <p>描述信息:{{coupon.mDescription.scope}}{{coupon.mDescription.name}}</p>
              </div>
            </div>
          </div>
        </van-tab>
        <!-- 不可用优惠券列表 -->
        <van-tab :title="cantBeAppliedCouponsTitle">
          <div class="coupon_list">
            <div class="coupon_item" v-for="(coupon,index) in cantBeAppliedCoupons" :key="index">
              <div class="coupon_top">
                <div class="left">
                  <p class="price">
                    <span>{{coupon.name}}</span>
                  </p>
                  <p>{{coupon.mDescription.name}}</p>
                  <p>{{coupon.mDescription.scope}}</p>
                </div>
                <div class="right">
                  <p class="title">{{coupon.mDescription.action}}</p>
                  <p class="title">{{coupon.mDescription.amount}}</p>
                  <p class="time">有效期:{{coupon.mDescription.date}}</p>
                </div>
              </div>
              <div class="coupon_bottom">
                <p>描述信息:{{coupon.mDescription.scope}}{{coupon.mDescription.name}}</p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <van-button @click="onCouponClose(selectShop)" type="default" size="large">不使用优惠券</van-button>
    </van-popup>
  </div>
</template>

<script>
import {
  ShopCartOrderconfirm,
  getMemberAmount,
  flashOrderconfirm,
  detailOrderconfirm
} from "../../api/shoppingcart";
import { get, post, login, getStorageOpenid } from "../../utils";
import {
  createOrder,
  toPay,
  afterOrderDetail,
  useCoupon,
  cancelCoupon
} from "../../api/order";
import Toast from "../../../static/vant/toast/toast";
import fly from "../../api/request";
import { getDateTime } from "../../utils";
let querystring = require("querystring");
let deviceId = new Date().getTime();
export default {
  onHide() {
    wx.setStorageSync("orderAdress", "");
  },
  onUnload() {
    wx.setStorageSync("orderAdress", "");
  },
  onShow() {
    console.log( )
    getMemberAmount().then(res => {
      this.scoreAmount = res.data.result.scoreAmount;
      if (this.scoreAmount <= 0) {
        this.payObj.value = 4;
      }
    });
    if (wx.getStorageSync("orderFrom") && wx.getStorageSync("orderParams")) {
      this.from = wx.getStorageSync("orderFrom");
      this.params = JSON.parse(wx.getStorageSync("orderParams"));
    }
    if (wx.getStorageSync("userInfo")) {
      this.userInfo = Object.assign({}, wx.getStorageSync("userInfo"));
    }
    if (wx.getStorageSync("orderAdress") != "") {
      this.address = Object.assign({}, wx.getStorageSync("orderAdress"));
    }
    this.captainId = wx.getStorageSync("data").id;
    wx.showLoading({
      title: "获取订单信息..", //提示的内容,
      mask: true //显示透明蒙层，防止触摸穿透,
    });
    //将字符串转换成数组或者对象
    if (this.from == "shoppingcart") {
      let params = this.params;
      ShopCartOrderconfirm(params)
        .then(res => {
          if (res.data.code == "200") {
            if (res.data.result.errorFlag === false) {
              return wx.showToast({
                title: res.data.result.errorMap.errorMsg,
                icon: "none",
                duration: 3000,
                mask: true
              });
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                });
              }, 3000);
            }
            //地址信息赋值
            if (this.address == null) {
              let addressObj = res.data.result.shippingAddressVo;
              if (addressObj.defaultMemberAddress) {
                this.address = Object.assign(
                  {},
                  addressObj.defaultMemberAddress
                );
              } else if (addressObj.shippingAddress) {
                this.address = Object.assign({}, addressObj.shippingAddress);
              }
            }
            //商品信息赋值
            this.shopList = res.data.result.storeShoppingCartLineDtos;
            let useCouponFlag = false; //是否有可用优惠券标识 迭代时只要有一个店铺有优惠券 就调用使用优惠券接口重新获取总价
            this.shopList.map(v => {
              // 如果存在优惠券 优惠券时间戳改时间
              if (v.canBeAppliedCoupons) {
                useCouponFlag = true;
                //初始化订单时给orderLines的每个商品设置一个coupons的空字段
                v.shoppingCartLineDtos.map(good => {
                  this.$set(good, "coupons", "");
                });
                v.canBeAppliedCoupons.map(coupon => {
                  this.$set(coupon, "active", false);
                });
                //初始化的时候 如果店铺含有优惠券 则默认第一个优惠券被使用
                this.$set(
                  v,
                  "selectCouponCode",
                  v.canBeAppliedCoupons[0].offerCouponCodeVo[0].offerCode
                );
                this.$set(v, "selectCouponName", v.canBeAppliedCoupons[0].name);
              }
              v.shoppingCartLineDtos.map(vv => {
                this.$set(vv, "storeId", v.storeInfoVo.id);
                this.$set(vv, "shoppingCartIds", vv.id);
              });
            });
            this.currentPayAmount = res.data.result.currentPayAmount;
            this.originPayAmount = res.data.result.originPayAmount;
            this.currentShippingFee = res.data.result.currentShippingFee;
            this.discount = res.data.result.discount;
            //使用优惠券
            if (useCouponFlag) {
              this.toUseCoupon();
            } else {
              wx.hideLoading();
            }
          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none",
              duration: 2000,
              mask: true
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1000);
          }
        })
        .catch(function(error) {
          wx.hideLoading();
          console.log(error, "获取商品信息和地址接口报错");
        });
    } else if (this.from == "goodsDetail") {
      let params = this.params;
      let requireName = '';
      if(this.$root.$mp.query.type) {
         requireName = flashOrderconfirm;
      }else {
         requireName = detailOrderconfirm;
      }
      requireName(params)
        .then(res => {
          if (res.data.code == "200") {
            if (res.data.result.errorFlag === false) {
              return wx.showToast({
                title: res.data.result.errorMap.errorMsg,
                icon: "none",
                duration: 3000,
                mask: true
              });
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                });
              }, 3000);
            }
            //地址信息赋值
            if (this.address == null) {
              let addressObj = res.data.result.shippingAddressVo;
              if (addressObj.defaultMemberAddress) {
                this.address = Object.assign(
                  {},
                  addressObj.defaultMemberAddress
                );
              } else if (addressObj.shippingAddress) {
                this.address = Object.assign({}, addressObj.shippingAddress);
              }
            }

            //商品信息赋值
            this.orderLines = [];
            this.shopList = res.data.result.storeShoppingCartLineDtos;
            let useCouponFlag = false; //是否有可用优惠券标识 迭代时只要有一个店铺有优惠券 就调用使用优惠券接口重新获取总价
            this.shopList.map(v => {
              //优惠券时间戳改时间
              if (v.canBeAppliedCoupons) {
                useCouponFlag = true;
                //初始化订单时给orderLines的每个商品设置一个coupons的空字段
                v.shoppingCartLineDtos.map(good => {
                  this.$set(good, "coupons", "");
                });
                v.canBeAppliedCoupons.map(coupon => {
                  this.$set(coupon, "active", false);
                });
                this.$set(
                  v,
                  "selectCouponCode",
                  v.canBeAppliedCoupons[0].offerCouponCodeVo[0].offerCode
                );
                this.$set(v, "selectCouponName", v.canBeAppliedCoupons[0].name);
              }
              v.shoppingCartLineDtos.map(vv => {
                this.$set(vv, "storeId", v.storeInfoVo.id);
                this.$set(vv, "shoppingCartIds", vv.id);
              });
            });
            this.currentPayAmount = res.data.result.currentPayAmount;
            this.originPayAmount = res.data.result.originPayAmount;
            this.currentShippingFee = res.data.result.currentShippingFee;
            this.discount = res.data.result.discount;
            //使用优惠券
            if (useCouponFlag) {
              this.toUseCoupon();
            } else {
              wx.hideLoading();
            }
          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none",
              duration: 2000,
              mask: true
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1000);
          }
        })
        .catch(function(error) {
          wx.hideLoading();
          console.log(error, "获取商品信息和地址接口报错");
        });
    }
  },

  data() {
    return {
      couponShow: false,
      canBeAppliedCouponsTitle: "", //可用优惠券标题
      cantBeAppliedCouponsTitle: "", //不可用优惠券标题
      canBeAppliedCoupons: [], //可用优惠券列表
      cantBeAppliedCoupons: [], //不可用优惠券列表
      selectShop: {}, //被选中的店铺对象
      //配送方式上拉菜单是否显示
      sheetShow: false,
      deliveryObj: {
        name: "自提",
        value: 1
      },
      deliveryOption: [
        {
          name: "自提",
          value: 1
        },
        {
          name: "送货上门",
          value: 2
        }
      ],
      //百团支付方式
      // payObj: {
      //   name: "联盟券",
      //   value: 12
      // },
      // 时刻支付方式
      payObj: {
        name: "微信",
        value: 4
      },
      paySheetShow: false,
      payOption: [
        {
          name: "微信",
          value: 4
        },
        {
          name: "混合支付",
          value: 13
        },
        {
          name: "联盟券",
          value: 12
        }
      ],
      //  联盟券
      scoreAmount: 0,

      addressId: "",
      openId: "",
      allprice: "",
      shopList: [], //分店铺商品列表
      originPayAmount: "", //应付金额
      discount: "", //优惠金额
      currentPayAmount: "", //实付金额
      currentShippingFee: "", //运费
      userInfo: "", //用户信息 里面有memberID等一系列信息
      address: null, //收货地址
      orderLines: null,
      from: "", //从哪个入口进入的下单页面
      params: null, //获取下单所需要的参数
      storeId: "", //店铺ID 从购物车进入此页面时需要用到
      captainId: "" //团长ID
    };
  },
  components: {},
  methods: {
    //打开优惠券列表
    getCouponList(store) {
      console.log(store, "111");
      //存在优惠券的时候 显示弹出层 否则不显示
      if (store.canBeAppliedCoupons || store.cantBeAppliedCoupons) {
        if (store.canBeAppliedCoupons) {
          this.canBeAppliedCouponsTitle = `可用优惠券${
            store.canBeAppliedCoupons.length
          }张`;
        } else {
          this.canBeAppliedCouponsTitle = `可用优惠券0张`;
        }
        if (store.cantBeAppliedCoupons) {
          this.cantBeAppliedCouponsTitle = `不可用优惠券${
            store.cantBeAppliedCoupons.length
          }张`;
        } else {
          this.cantBeAppliedCouponsTitle = `不可用优惠券0张`;
        }
        this.canBeAppliedCoupons = store.canBeAppliedCoupons;
        this.cantBeAppliedCoupons = store.cantBeAppliedCoupons;
        this.selectShop = Object.assign({}, store);
        console.log(store, "222");
        this.couponShow = true;
      } else {
        wx.showToast({
          icon: "none",
          title: "该店铺暂无优惠券"
        });
      }
    },
    //使用优惠券
    toUseCoupon(coupon) {
      if (this.from != "") {
        let params = {
          codPaymentType: "",
          deliveryDescription: "",
          deliveryTimebar: "",
          deliveryType: this.deliveryObj.value, //配送方式
          expectDeliveryDate: "",
          expectDeliveryTime: "",
          memberId: this.userInfo.memberId,
          orderLines: [],
          paymentType: this.payObj.value,
          shppingAddressId: "", //地址
          captainId: "", //团长ID
          type: 1 //type为1是从商品详情页面进入  2是购物车中进入
        };
        params.captainId = this.captainId;
        if (coupon) {
          this.shopList.map(store => {
            //迭代店铺 如果店铺ID与被选中店铺ID一致 则将该店铺默认选中的优惠券改为本次点击的优惠券
            if (store.storeInfoVo.id == this.selectShop.storeInfoVo.id) {
              store.selectCouponCode = coupon.offerCouponCodeVo[0].offerCode; //默认选中优惠券code等于本次选择的优惠券的code
              store.selectCouponName = coupon.name; //默认选中的优惠券对象赋值为本次选择的优惠券对象
            }
          });
          //当前点击的优惠券设为选中状态
          // coupon.active = true;
        }
        // let couponArr = [];
        //先将每个店铺已选择的优惠券扔到一个数组中
        this.shopList.map(store => {
          //循环每个店铺的优惠券列表 如果优惠券的code码等于默认优惠券code码 active状态设为true;
          store.canBeAppliedCoupons.map(coupons => {
            coupons.active = false;
            console.log("清空active");
            if (
              coupons.offerCouponCodeVo[0].offerCode == store.selectCouponCode
            ) {
              coupons.active = true;
            }
          });
          store.shoppingCartLineDtos.map(good => {
            good.coupons = ""; //清空优惠券信息 防止BUG
            good.coupons = store.selectCouponCode;
          });
          // couponArr.push(store.selectCouponCode);
        });

        this.shopList.map(store => {
          store.shoppingCartLineDtos.map(good => {
            this.$set(good, "buyType", "N");
            // //每个商品信息里加上offerCode的优惠券数组信息,再转换成以逗号分割的字符串,后台要用嘻嘻
            // this.$set(good, "coupons", couponArr);
            // good.coupons = good.coupons.toString();
            params.orderLines.push(good);
          });
        });
        params.storeId = this.storeId;
        if (this.from == "shoppingcart") {
          params.type = 2;
          params.buyType = "N";
        }

        let orderTab = params.type;

        //创建订单方法 成功则调用    captainID
        //弹起遮罩层 防止二次支付
        wx.showLoading({
          title: "使用优惠券中...", //提示的内容,
          mask: true //显示透明蒙层，防止触摸穿透,
        });

        useCoupon(params)
          .then(res => {
            this.couponShow = false;
            wx.hideLoading();
            if (res.data.code == "200") {
              this.currentPayAmount = res.data.result.currentPayAmount;
              this.discount = res.data.result.discount;
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.result
              });
            }
          })
          .catch(err => {
            this.couponShow = false;
            wx.hideLoading();
          });
      }
    },
    closeCoupon(){
      console.log(888);
        this.couponShow = false;
    },
    //取消使用优惠券列表
    onCouponClose(selectShop) {
      if (selectShop) {
        this.shopList.map(store => {
          //迭代店铺 如果店铺ID与被选中店铺ID一致 则将该店铺默认选中的优惠券改为本次点击的优惠券
          if (store.storeInfoVo.id == selectShop.storeInfoVo.id) {
            store.selectCouponCode = ""; //默认选中优惠券code等于本次选择的优惠券的code
            let couponNum = store.canBeAppliedCoupons.length;
            store.selectCouponName = `可用优惠券${couponNum}张`; //默认选中的优惠券对象赋值为本次选择的优惠券对象
            store.shoppingCartLineDtos.map(good => {
              good.coupons = "";
            });
          }
        });
        if (this.from != "") {
          let params = {
            codPaymentType: "",
            deliveryDescription: "",
            deliveryTimebar: "",
            deliveryType: this.deliveryObj.value, //配送方式
            expectDeliveryDate: "",
            expectDeliveryTime: "",
            memberId: this.userInfo.memberId,
            orderLines: [],
            paymentType: this.payObj.value,
            shppingAddressId: "", //地址
            captainId: "", //团长ID
            type: 1 //type为1是从商品详情页面进入  2是购物车中进入
          };
          params.captainId = this.captainId;
          this.shopList.map(store => {
            //循环每个店铺的优惠券列表 如果优惠券的code码等于默认优惠券code码 active状态设为true;
            store.canBeAppliedCoupons.map(coupons => {
              coupons.active = false;
              // if (
              //   coupons.offerCouponCodeVo[0].offerCode == store.selectCouponCode
              // ) {
              //   coupons.active = true;
              // }
            });
            store.shoppingCartLineDtos.map(good => {
              good.coupons = ""; //清空优惠券信息 防止BUG
              good.coupons = store.selectCouponCode;
            });
            // couponArr.push(store.selectCouponCode);
          });

          this.shopList.map(store => {
            store.shoppingCartLineDtos.map(good => {
              this.$set(good, "buyType", "N");
              //每个商品信息里加上offerCode的优惠券数组信息,再转换成以逗号分割的字符串,后台要用嘻嘻
              // this.$set(good, "coupons", couponArr);
              // good.coupons = good.coupons.toString();
              params.orderLines.push(good);
            });
          });
          params.storeId = this.storeId;
          if (this.from == "shoppingcart") {
            params.type = 2;
            params.buyType = "N";
          }

          let orderTab = params.type;

          //创建订单方法 成功则调用    captainID
          //弹起遮罩层 防止二次支付
          wx.showLoading({
            title: "取消优惠券中...", //提示的内容,
            mask: true //显示透明蒙层，防止触摸穿透,
          });

          cancelCoupon(params)
            .then(res => {
              this.couponShow = false;
              wx.hideLoading();
              if (res.data.code == "200") {
                this.currentPayAmount = res.data.result.currentPayAmount;
                this.discount = res.data.result.discount;
              } else {
                wx.showToast({
                  icon: "none",
                  title: res.data.result
                });
              }
            })
            .catch(err => {
              this.couponShow = false;
              wx.hideLoading();
            });
        }
      } else {
        this.couponShow = false;
      }
    },
    //关闭上拉菜单
    onClose() {
      this.sheetShow = false;
    },
    //选中项改变本地变量值
    onSelect(e) {
      // console.log(e,'234');
      this.deliveryObj = Object.assign({}, e.mp.detail);
      this.sheetShow = false;
      console.log(this.deliveryObj);
    },
    //关闭支付上拉菜单
    onPayClose() {
      this.paySheetShow = false;
    },
    onPaySelect(e) {
      // console.log(e,'234');
      this.payObj = Object.assign({}, e.mp.detail);
      this.paySheetShow = false;
      // console.log(this.deliveryObj);
    },

    //支付方法
    pay() {
      if (this.from != "") {
        let params = {
          codPaymentType: "",
          deliveryDescription: "",
          deliveryTimebar: "",
          deliveryType: this.deliveryObj.value, //配送方式
          expectDeliveryDate: "",
          expectDeliveryTime: "",
          memberId: this.userInfo.memberId,
          orderLines: [],
          paymentType: this.payObj.value,
          shppingAddressId: "", //地址
          captainId: "", //团长ID
          type: 1 //type为1是从商品详情页面进入  2是购物车中进入
        };
        params.captainId = this.captainId;
        this.shopList.map(store => {
          store.shoppingCartLineDtos.map(good => {
            this.$set(good, "buyType", "N");
            if(this.$root.$mp.query.type) {
              this.$set(good, "offerType", "1000");
              console.log(good)
            }
            params.orderLines.push(good);
          });
        });

        params.storeId = this.storeId;
        if (this.from == "shoppingcart") {
          params.type = 2;
          params.buyType = "N";
        }

        let orderTab = 1;  //正常下单 orderTab为1

        //创建订单方法 成功则调用    captainID
        //如果存在收货地址 则可以下单 否则让用户选择收货地址
        if (this.address != null) {
          params.shppingAddressId = this.address.id;
          params.shppingAddressId = params.shppingAddressId.toString();
          // console.log(this.address, 444);
          //弹起遮罩层 防止二次支付
          wx.showLoading({
            title: "生成订单中...", //提示的内容,
            mask: true //显示透明蒙层，防止触摸穿透,
          });
          createOrder(params)
            .then(res => {
              if (res.data.code == "200") {
                let params = {};
                let orderCode = res.data.result.scmCode;
                params.orderCode = res.data.result.scmCode;
                params.paymentType = this.payObj.value;
                params.orderTab = orderTab;
                params.deviceType = 2;
                //创建订单成功则调用后台支付
                wx.showLoading({
                  title: "校验支付状态...", //提示的内容,
                  mask: true //显示透明蒙层，防止触摸穿透,
                });
                //如果paymentType为 12 则是用积分支付 不调用微信支付接口
                if (params.paymentType == 12) {
                  toPay(params)
                    .then(res => {
                      wx.hideLoading();
                      //因为是使用积分支付,如果调用toPay方法成功 则直接成功
                      if (res.data.code == "200") {
                        wx.showToast({
                          title: "支付成功!",
                          icon: "success",
                          duration: 2000,
                          mask: true
                        });

                        wx.redirectTo({
                          url: "/pages/myOrder/main?id=4"
                        });
                      } else {
                        wx.showToast({
                          title: res.data.message,
                          duration: 1500,
                          mask: true
                        });
                        setTimeout(() => {
                          wx.redirectTo({
                            url: "/pages/myOrder/main?id=2"
                          });
                        }, 1500);
                      }
                    })
                    .catch(err => {
                      wx.hideLoading();
                      wx.redirectTo({
                        url: "/pages/myOrder/main?id=2"
                      });
                    });
                } else if (params.paymentType == 4 || params.paymentType == 13) {
                  //4是调用微信支付
                  toPay(params)
                    .then(res => {
                      //如果调用toPay方法成功 则拉起微信登录方法获取code传给后台并调用
                      if (res.data.code == "200") {
                        let params = {
                          subOrdinate: res.data.result.subOrdinate,
                          deviceType: 2,
                          orderTab:1,
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

                                        wx.redirectTo({
                                          url: "/pages/myOrder/main?id=4"
                                        });
                                      },
                                      fail: res => {
                                        wx.redirectTo({
                                          url: "/pages/myOrder/main?id=2"
                                        });
                                      }
                                    });
                                  }
                                })
                                .catch(err => {
                                  wx.hideLoading();
                                  wx.redirectTo({
                                    url: "/pages/myOrder/main?id=2"
                                  });
                                });
                            } else {
                              console.log("登录失败！" + res.errMsg);
                            }
                          },
                          fail: err => {
                            wx.hideLoading();
                            console.log(err, 222);
                          }
                        });
                      } else {
                        wx.showToast({
                          title: res.data.message,
                          duration: 1500,
                          mask: true
                        });
                        setTimeout(() => {
                          wx.redirectTo({
                            url: "/pages/myOrder/main?id=2"
                          });
                        }, 1500);
                      }
                    })
                    .catch(err => {
                      wx.hideLoading();
                      wx.redirectTo({
                        url: "/pages/myOrder/main?id=2"
                      });
                    });
                }
              }
            })

            .catch(err => {
              wx.hideLoading();
            });
        } else {
          wx.showToast({
            title: "请选择收货地址!",
            icon: "none",
            duration: 2000
          });
        }
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
<style lang='scss' >
@import "./style";
</style>
<style lang="scss">
.radioStyle {
  .van-radio {
    background: #fff;
    height: 40px;
    line-height: 30px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
}
</style>

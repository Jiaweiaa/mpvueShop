<template>
  <div class="page" v-if="detailData!=null">
    <!-- 待付款 -->
    <div
      class="bg"
      v-if="detailData.orderVo.financialStatus == '1' && detailData.orderVo.paymentType != '1' && detailData.orderVo.logisticsStatus == '1'"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway" />
        <span>待付款</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <!-- 待发货 -->
    <div
      class="bg"
      v-else-if=" detailData.orderVo.financialStatus != 1 && detailData.orderVo.logisticsStatus == 1 ||detailData.orderVo.logisticsStatus == 3 ||detailData.orderVo.logisticsStatus == 4 ||detailData.orderVo.logisticsStatus == 5"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway" />
        <span>待发货</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <!-- 待收货 -->
    <div
      class="bg"
      v-else-if=" detailData.orderVo.financialStatus == 3 && detailData.orderVo.logisticsStatus == 6"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway" />
        <span>待收货</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <!--付款之后或COD  发货之前 取消订单 -->
    <div class="bg" v-else-if="detailData.newestRefund!=null&&detailData.orderVo.type=='3'">
      <h3>
        <van-icon custom-class="colorW" name="underway" />
        <span>取消订单：正在处理申请</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <!-- 退货 -->
    <div
      class="bg"
      v-else-if="detailData.newestRefund!=null&&detailData.newestRefund.type == '1' &&  detailData.newestRefund.status !='2' && detailData.newestRefund.status !='4' && detailData.newestRefund.status !='9' && detailData.newestRefund.status !='10'"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway" />商品状态：
        <span>{{detailData.title }}</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <div
      class="bg"
      v-else-if="detailData.refundProcessing!=null&&detailData.refundProcessing.type == '1' &&  detailData.refundProcessing.status !='2' && detailData.refundProcessing.status !='4' && detailData.refundProcessing.status !='9' && detailData.refundProcessing.status !='10'"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway" />商品状态：
        <span>{{detailData.title }}</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <!-- 换货  -->
    <div
      class="bg"
      v-else-if="detailData.newestRefund!=null&&detailData.newestRefund.type == '2' &&  detailData.newestRefund.status !='2' && detailData.newestRefund.status !='4' && detailData.newestRefund.status !='9' && detailData.newestRefund.status !='10'"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway" />换货状态：
        <span>{{detailData.title }}</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <div
      class="bg"
      v-else-if="detailData.refundProcessing!=null&&detailData.refundProcessing.type == '2' &&  detailData.refundProcessing.status !='2' && detailData.refundProcessing.status !='4' && detailData.refundProcessing.status !='9' && detailData.refundProcessing.status !='10'"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway" />换货状态：
        <span>{{detailData.title }}</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <div class="bg" v-else-if="detailData.orderVo.logisticsStatus == 15">
      <h3>
        <van-icon custom-class="colorW" name="underway" />
        <span>已完成</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <!-- 第一个板块 -->
    <div class="info">
      <div class="header">
        <h3>提货信息</h3>
      </div>
      <div class="body">
        <div class="borderT" v-if="detailData.captainVo"></div>

        <div class="item" v-if="detailData.captainVo">
          <div class="left">团长信息</div>
          <div class="right">{{detailData.captainVo.captain.name}}</div>
        </div>
        <div class="item" v-if="detailData.orderVo.shippingAddress.deliveryType!=''">
          <div class="left">提货方式</div>
          <div class="right">{{detailData.orderVo.shippingAddress.deliveryType=='1'? '自提':'送货上门'}}</div>
        </div>
        <div class="item" v-if="detailData.captainVo">
          <div class="left">提货地点</div>
          <div class="right">
            {{detailData.captainVo.captain.city}}
            {{detailData.captainVo.captain.address}}
            {{detailData.captainVo.captain.deliveryAddress}}
          </div>
        </div>

        <div class="borderT"></div>

        <div class="item">
          <div class="left">收货人</div>
          <div
            class="right"
          >{{detailData.orderVo.shippingAddress.firstName}} {{detailData.orderVo.shippingAddress.mobile}}</div>
        </div>
        <div class="item">
          <div class="left">收货地址</div>
          <div class="right">
            {{detailData.orderVo.shippingAddress.province}} {{detailData.orderVo.shippingAddress.city}}
            {{detailData.orderVo.shippingAddress.district}}
            {{detailData.orderVo.shippingAddress.address}}
          </div>
        </div>
        <div class="item" v-if="detailData.orCode!=null">
          <div class="left">核销码</div>
          <div class="right">
            <img class="code" :src="detailData.orCode" alt />
          </div>
        </div>
      </div>
      <div class="footer">
        <p
          class="p1"
          v-if="detailData.orderVo.totalSalesPrice!=null"
        >总价:￥{{detailData.orderVo.totalSalesPrice}} 优惠:￥{{detailData.orderVo.discount}}</p>
        <p class="p2">
          共1件商品,合计
          <span>￥{{detailData.orderVo.totalActure}}</span>
        </p>
      </div>
    </div>
    <!-- 第二个板块 -->
    <div class="info">
      <div class="header">
        <h3>商品信息</h3>
        <span>共1件商品</span>
      </div>
      <div class="body">
        <div class="borderT"></div>
        <div class="store-info">
          <div class="store-name">
            <van-icon name="shop-o" />
            <span>我的店铺</span>
            <van-icon name="arrow" />
          </div>
          <div class="goods">
            <div
              class="goods-item"
              v-for="(goods,index) in detailData.orderVo.orderLines"
              :key="index"
            >
              <div class="img-box">
                <img :src="'http://qn.gaoshanmall.cn/'+goods.itemImg" alt />
              </div>
              <div class="goods-info">
                <h3 class="van-ellipsis" style="font-size:26rpx;">{{goods.itemName}}</h3>
                <p>
                  <span
                    style="font-size:21rpx;"
                    v-for="(propert,proIndex) in goods.propertiesValue"
                    :key="proIndex"
                  >{{propert}}</span>
                </p>
                <p>
                  <span style="font-size:23rpx;">￥{{goods.salePrice}}</span>
                  <!-- <span
                    style="text-decoration:line-through;color:#999;font-size:22rpx;"
                  >￥{{goods.listPrice}}</span> -->
                </p>
              </div>
              <div class="goods-num">
                <span>数量:{{goods.quantity}}</span>
                <button
                  @click="applyRefund(goods)"
                  class="refundBtn"
                  v-if="detailData.orderVo.logisticsStatus=='6'&&detailData.orderVo.financialStatus=='3'&&goods.reType==null&&goods.reStatus==null"
                >退货</button>
                <button
                  @click="applyCancelRefund(goods)"
                  class="refundBtn"
                  v-if="detailData.orderVo.logisticsStatus=='6'&&detailData.orderVo.financialStatus=='3'&&goods.reType=='1'&&goods.reStatus!='8'"
                >退货中</button>

                <button
                  class="refundBtn"
                  v-if="detailData.orderVo.logisticsStatus=='6'&&detailData.orderVo.financialStatus=='3'&&goods.reType=='1'&&goods.reStatus=='8'"
                >已退货</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 第三个板块 -->
    <div class="info">
      <div class="header">
        <h3>订单信息</h3>
      </div>
      <div class="body">
        <div class="borderT"></div>
        <div class="item">
          <div class="left">订单编号</div>
          <div class="right">{{detailData.orderVo.orderReVo.orderCode}}</div>
        </div>
        <div class="item">
          <div class="left">下单时间</div>
          <div class="right">{{detailData.orderVo.createTime}}</div>
        </div>

        <div class="item">
          <div class="left">商品总价</div>
          <div class="right">￥{{detailData.orderVo.totalActure}}</div>
        </div>
        <div class="borderT"></div>
        <!-- <div class="item">
          <div class="left">促销优惠</div>
          <div class="right">没这个字段</div>
        </div>
        <div class="item">
          <div class="left">余额抵扣</div>
          <div class="right">没这个字段</div>
        </div>-->
        <div class="item">
          <div class="left">在线支付</div>
          <div class="right">￥{{detailData.orderVo.totalActure}}</div>
        </div>
        <div class="item">
          <div class="left">备注信息</div>
          <div class="right">{{detailData.orderVo.remark==null?'无':detailData.orderVo.remark}}</div>
        </div>
      </div>
    </div>
    <!-- 操作区 -->
    <div class="fixed">
      <button class="plain" @click="orderShow=true;from='cancle'" v-if="orderCancelBtn">取消订单</button>
      <button class="plain" v-if="confrimReciveBtn">查看物流</button>
      <button class="danger" @click="sureGet()" v-if="confrimReciveBtn">确认收货</button>
      <button class="danger" @click="pay()" v-if="orderPayBtn">立即支付</button>
      <button class="danger" @click="deleteOrder()" v-if="orderDeleteBtn">删除订单</button>
      <button
        class="danger"
        @click="orderShow=true;from='apply'"
        style="width:100%;"
        v-if="applayOrderCancelBtn"
      >申请取消订单</button>
      <!-- <button class="danger" @click="pay()" v-if="applayAfterBtn">申请售后</button> -->
      <!-- <button class="danger" @click="pay()" v-if="giveUpApplayBtn">放弃退换货</button> -->
    </div>
    <!-- 弹出层 -->
    <van-popup :show="orderShow" id="orderPop" position="bottom" @close="resonClose">
      <van-radio-group :value="reason" @change="onChange" checked-color="#07c160">
        <van-cell-group>
          <van-cell
            v-for="(reasonItem,reasonIndex) in reasons"
            :key="reasonIndex"
            :title="reasonItem"
            value-class="value-class"
            clickable
            :data-name="reasonItem"
            @click="changeReason(reasonItem)"
          >
            <van-radio :name="reasonItem" custom-class="radioLabel" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <button class="popBtn" @click="cancelOrder">提 交</button>
    </van-popup>
  </div>
</template>
<style lang='scss'>
@import "./style";
</style>
<script>
import {
  ShopCartOrderconfirm,
  detailOrderconfirm
} from "../../api/shoppingcart";
import { getMemAddressList } from "../../api/address";
import { get, post, login, getStorageOpenid } from "../../utils";
import {
  orderDetail,
  toPay,
  afterOrderDetail,
  applyCancelOrder,
  cancleOrder,
  confirmReceive,
  removeOrderByCode
} from "../../api/order";
import Toast from "../../../static/vant/toast/toast";
import fly from "../../api/request";
let querystring = require("querystring");
let deviceId = new Date().getTime();
export default {
  onLoad: function(options) {
    let params = {
      id:options.id
    }
    if(options.capationFlag){
      params.capationFlag = options.capationFlag;
    }
    orderDetail(params)
      .then(res => {
        if (res.data.code == 200) {
          this.detailData = res.data.result;

          // this.detailData.title = this.detailData.displayOrderStatusTips;
          this.$set(
            this.detailData,
            "title",
            this.detailData.displayOrderStatusTips
          );
          this.$set(this.detailData, "orCode", this.detailData.orcode);

          this.detailData.eventList.map(event => {
            switch (event) {
              case "orderCancelEvent":
                this.orderCancelBtn = true; //取消订单
                break;
              case "orderPayEvent":
                this.orderPayBtn = true; //立即支付
                break;
              case "orderDeleteEvent":
                this.orderDeleteBtn = true; //删除订单
                break;
              case "applayOrderCancelEvent":
                this.applayOrderCancelBtn = true; //申请取消订单
                break;
              case "applayAfterSaleEvent":
                this.applayAfterBtn = true; //申请售后
                break;
              case "giveUpApplayEvent":
                this.giveUpApplayBtn = true; //放弃退换货
                break;
              case "confrimReciveEvent":
                this.confrimReciveBtn = true; //确认收货
                break;
              default:
                break;
            }
          });
        }
      })
      .catch(err => {});
  },
  onShow() {},
  created() {},
  data() {
    return {
      detailData: null, //订单信息
      reason: "我不想买了",
      orderShow: false, //弹出层是否显示
      //取消订单理由
      reasons: ["我不想买了", "信息填写错误,重新购买", "买错了", "其他原因"],
      orderCancelBtn: false, //取消订单按钮
      orderPayBtn: false, //立即支付
      orderDeleteBtn: false, //删除订单
      applayOrderCancelBtn: false, //申请取消订单
      applayAfterBtn: false, //申请售后
      giveUpApplayBtn: false, //放弃退换货
      confrimReciveBtn: false, //确认收货
      form: ""
    };
  },
  components: {},
  methods: {
    //删除订单
    deleteOrder() {
      wx.showModal({
        title: "提示",
        content: "确认删除订单吗?",
        success: res => {
          if (res.confirm) {
            removeOrderByCode({ orderCode: detailData.orderVo.code })
              .then(res => {
                wx.showToast({
                  title: res.data.message
                });
                wx.navigateBack({
                  delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                });
              })
              .catch(err => {
                wx.navigateBack({
                  delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                });
              });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //确认收货
    sureGet() {
      wx.showModal({
        title: "提示",
        content: "确认收到货物了吗?",
        success: res => {
          if (res.confirm) {
            confirmReceive({ orderCode: detailData.orderVo.code })
              .then(res => {
                wx.showToast({
                  title: res.data.message
                });
                wx.navigateBack({
                  delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                });
              })
              .catch(err => {
                wx.navigateBack({
                  delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                });
              });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //申请取消订单
    applyCancel() {
      wx.showLoading({
        title: '加载中'
      });
      applyCancelOrder({
        orderId: this.detailData.orderVo.id,
        cancelReason: this.reason
      })
        .then(res => {
          wx.hideLoading();
          wx.showToast({
            title: res.data.result.message
          });

          wx.navigateBack({
            delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
          });
        })
        .catch(err => {
          wx.hideLoading();
        });
    },
    //申请退货
    applyRefund(goods) {
      console.log(goods);
      wx.setStorageSync("refundGoods", goods);
      wx.setStorageSync("orderInfo", this.detailData);
      wx.navigateTo({
        url: "/pages/refund/main"
      });
    },
    //取消退换货 跳转至退换货详情去取消
    applyCancelRefund(goods) {
      wx.setStorageSync("refundCode", goods.reCode);
      wx.navigateTo({
        url: "/pages/returnGoods/main?code=" + goods.reCode
      });
    },
    //取消订单遮罩层关闭
    resonClose() {
      this.orderShow = false;
    },
    //选择取消原因
    onChange(mp) {
      this.reason = mp.mp.detail;
      console.log(mp);
    },
    //选择取消原因
    changeReason(reasonItem) {
      this.reason = reasonItem;
    },
    //支付方法
    pay() {
      //弹起遮罩层 防止二次支付
      wx.showLoading({
        title: "校验支付状态...", //提示的内容,
        mask: true //显示透明蒙层，防止触摸穿透,
      });

      //创建订单方法 成功则调用    captainID

      let params = {
        orderCode: this.detailData.orderVo.scmCode,
        paymentType: this.detailData.orderVo.paymentType,
        orderTab: 2,
        deviceType: 2
      };
      // 调用后台支付
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
                        "Content-Type": "application/x-www-form-urlencoded"
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
                            res.data.result.wechatJsApiPayCommand.timeStamp,
                          nonceStr:
                            res.data.result.wechatJsApiPayCommand.nonceStr,
                          package:
                            res.data.result.wechatJsApiPayCommand.packAge,
                          signType:
                            res.data.result.wechatJsApiPayCommand.signType,
                          paySign:
                            res.data.result.wechatJsApiPayCommand.paySign,
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

                            wx.hideLoading();
                            wx.redirectTo({
                              url: "/pages/myOrder/main"
                            });
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
    },
    //取消订单
    cancelOrder() {
      wx.showLoading({
        title: '加载中'
      });
      if (this.from == "cancle") {
        cancleOrder({
          orderCode: this.detailData.orderVo.code,
          reason: this.reason
        })
          .then(res => {
            wx.hideLoading();
            wx.showToast({
              title: res.data.result.message
            });
            if (res.data.code == "200") {
              if (res.data.result.isSuccess == true) {
                wx.redirectTo({
                  url: "/pages/myOrder/main"
                });
              }
            }
          })
          .catch(err => {
            wx.hideLoading();
          });
      } else if (this.from == "apply") {
        applyCancelOrder({
          orderId: this.detailData.orderVo.id,
          cancelReason: this.reason
        })
          .then(res => {
            wx.hideLoading();
            wx.showToast({
              title: res.data.result.message
            });
            if (res.data.code == "200") {
              wx.setStorageSync("refundCode", res.data.result);
              wx.redirectTo({
                url: "/pages/returnGoodsMoney/main?code=" + res.data.result
              });
            }
          })
          .catch(err => {
            wx.hideLoading();
          });
      }
    }
  },
  computed: {}
};
</script>


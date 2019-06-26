<template>
  <div class="page" v-if="detailData!=null">
    <!--付款之后或COD  发货之前 取消订单 -->
    <div class="bg" v-if="detailData.newestRefund!=null&&detailData.orderVo.type=='3'">
      <h3>
        <van-icon custom-class="colorW" name="underway"/>
        <span>取消订单：正在处理申请</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <!-- 退货 -->
    <div
      class="bg"
      v-if="detailData.newestRefund!=null&&detailData.newestRefund.type == '1' &&  detailData.newestRefund.status !='2' && detailData.newestRefund.status !='4' && detailData.newestRefund.status !='9' && detailData.newestRefund.status !='10'"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway"/>退货状态：
        <span>{{detailData.displayRefundTips }}</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <div
      class="bg"
      v-if="detailData.refundProcessing!=null&&detailData.refundProcessing.type == '1' &&  detailData.refundProcessing.status !='2' && detailData.refundProcessing.status !='4' && detailData.refundProcessing.status !='9' && detailData.refundProcessing.status !='10'"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway"/>退货状态：
        <span>{{detailData.displayRefundTips }}</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <!-- 换货  -->
    <div
      class="bg"
      v-if="detailData.newestRefund!=null&&detailData.newestRefund.type == '2' &&  detailData.newestRefund.status !='2' && detailData.newestRefund.status !='4' && detailData.newestRefund.status !='9' && detailData.newestRefund.status !='10'"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway"/>换货状态：
        <span>{{detailData.displayRefundTips }}</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <div
      class="bg"
      v-if="detailData.refundProcessing!=null&&detailData.refundProcessing.type == '2' &&  detailData.refundProcessing.status !='2' && detailData.refundProcessing.status !='4' && detailData.refundProcessing.status !='9' && detailData.refundProcessing.status !='10'"
    >
      <h3>
        <van-icon custom-class="colorW" name="underway"/>换货状态：
        <span>{{detailData.displayRefundTips }}</span>
      </h3>
      <!-- <h3>需付款:￥{{detailData.orderVo.totalActure}} 剩余时间:{{detailData.orderVo.willCancelTime}}</h3> -->
    </div>
    <!-- 第一个板块 -->
    <div class="info">
      <div class="header">
        <h3>提货信息</h3>
      </div>
      <div class="body">
        <div class="borderT"></div>
        <div class="item">
          <div class="left">提货时间</div>
          <div class="right" style="color:rgb(214,70,60);">预计2019-06-25(周二)可提货</div>
        </div>
        <div class="item">
          <div class="left">团长信息</div>
          <div class="right">没这个字段</div>
        </div>
        <div class="item">
          <div class="left">提货地点</div>
          <div class="right">没这个字段</div>
        </div>

        <div class="borderT"></div>
        <div class="item">
          <div class="left">提货方式</div>
          <div class="right">没这个字段</div>
        </div>
        <div class="item">
          <div class="left">收货人</div>
          <div
            class="right"
          >{{detailData.orderVo.shippingAddress.firstName}} {{detailData.orderVo.shippingAddress.mobile}}</div>
        </div>
      </div>
      <div class="footer">
        <p class="p1">总价:￥{{detailData.orderVo.totalSalesPrice}} 优惠:￥{{detailData.orderVo.discount}}</p>
        <p class="p2">
          共1件商品,待付
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
            <van-icon name="shop-o"/>
            <span>我的店铺</span>
            <van-icon name="arrow"/>
          </div>
          <div class="goods">
            <div
              class="goods-item"
              v-for="(goods,index) in detailData.orderVo.orderLines"
              :key="index"
            >
              <div class="img-box">
                <img :src="'http://qn.gaoshanmall.cn/'+goods.itemImg" alt>
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
                  <span
                    style="text-decoration:line-through;color:#999;font-size:22rpx;"
                  >￥{{goods.listPrice}}</span>
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
          <div class="left">订单期数</div>
          <div class="right">没这个字段</div>
        </div>
        <div class="item">
          <div class="left">商品总价</div>
          <div class="right">￥{{detailData.orderVo.totalActure}}</div>
        </div>
        <div class="borderT"></div>
        <div class="item">
          <div class="left">促销优惠</div>
          <div class="right">没这个字段</div>
        </div>
        <div class="item">
          <div class="left">余额抵扣</div>
          <div class="right">没这个字段</div>
        </div>
        <div class="item">
          <div class="left">在线支付</div>
          <div class="right">没这个字段</div>
        </div>
        <div class="item">
          <div class="left">备注信息</div>
          <div class="right">没这个字段</div>
        </div>
      </div>
    </div>
    <!-- 操作区 -->
    <div class="fixed">
      <button class="plain" @click="orderShow=true" v-if="detailData.typeData.btnShow[3]">取消订单</button>
      <button class="danger" @click="pay()" v-show="detailData.typeData.btnShow[0]">提醒商家发货</button>
      <button class="danger" @click="pay()" v-show="detailData.typeData.btnShow[1]">确认收货</button>
      <button class="danger" @click="pay()" v-show="detailData.typeData.btnShow[2]">立即支付</button>
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
            <van-radio :name="reasonItem" custom-class="radioLabel"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <button class="popBtn" @click="cancelOrder">提交</button>
    </van-popup>
  </div>
</template>
<style lang='scss'>
.refundBtn {
  width: 120rpx;
  height: 48rpx;
  border: 1rpx solid rgba(153, 153, 153, 1);
  border-radius: 24rpx;
  font-size: 24rpx;
  line-height: 48rpx;
}
#orderPop {
  .van-radio {
    justify-content: flex-end !important;
  }
  .van-radio__icon--checked {
    background-color: rgb(214, 70, 60) !important;
    border-color: rgb(214, 70, 60) !important;
    color: #fff !important;
  }
  .radioLabel {
    color: #fff !important;
  }
  .popBtn {
    width: 100%;
    height: 85rpx;
    font-size: 30rpx;
    color: #000;
    line-height: 85rpx;
    border-radius: 0;
    background: linear-gradient(70deg, rgb(214, 70, 60), red);
    color: #fff;
  }
}

.page {
  padding-bottom: 200rpx;
  //  padding-bottom: 10rpx;
  min-height: 140vh;
}
.bg {
  width: 100%;
  height: 300rpx;
  background: rgb(214, 70, 30);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    .colorW {
      color: #fff !important;
    }
    color: #fff;
    height: 40rpx;
    line-height: 40rpx;
  }
}
.info {
  background: #fff;
  border-radius: 20rpx;
  width: 90%;
  margin: 0 auto;
  margin-top: 30rpx;

  padding-top: 1rpx;
  padding-bottom: 20rpx;

  .header {
    width: 94%;
    margin: 3%;
    padding-top: 1rpx;
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 28rpx;
    }
    span {
      font-size: 22rpx;
      color: #999;
    }
  }
  .body {
    width: 94%;
    margin: 0 3%;
    .borderT {
      border-top: 1rpx solid #999;
      height: 1rpx;
      margin: 20rpx 0 !important;
      padding-top: 1rpx !important;
    }
    //正常文本cell样式
    .item {
      display: flex;
      margin: 10rpx 0;
      .left {
        width: 50%;
        font-size: 22rpx;
        text-align: left;
        color: #999;
      }
      .right {
        width: 50%;
        font-size: 22rpx;
        text-align: right;
        color: #000;
      }
    }
    //商品cell样式
    .store-info {
      .store-name {
        display: flex;
        align-items: center;
        height: 47rpx;
        van-icon {
          height: 49rpx;
        }
        span {
          height: 48rpx;
          font-size: 27rpx;
          // line-height: 50rpx;
        }
      }
      .goods {
        .goods-item {
          display: flex;
          // align-items: flex-start;
          .img-box {
            width: 20%;
            height: 120rpx;
            display: flex;
            // justify-content: center;
            img {
              width: 120rpx;
              height: auto;
            }
          }
          .goods-info {
            // margin-left: 20rpx;
            width: 50%;
            h3 {
            }
            p:nth-child(1) {
              color: #999;
              font-size: 18rpx;
            }
            p:nth-child(2) {
              color: red;
              font-size: 26rpx;
              del {
                color: #999;
              }
            }
          }
          .goods-num {
            width: 30%;
            color: #999;
            font-size: 20rpx;
            text-align: right;
          }
        }
      }
    }
  }
  .footer {
    width: 94%;
    margin: 0 3%;
    text-align: right !important;
    .p1 {
      font-size: 22rpx;
      color: #999;
    }
    .p2 {
      font-size: 24rpx;
      span {
        font-size: 36rpx;
        color: red;
      }
    }
  }
}
.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 85rpx;
  button {
    width: 50%;
    height: 85rpx;
    font-size: 30rpx;
    color: #000;
    line-height: 85rpx;
    border-radius: 0;
  }
  .plain {
    background: #fff;
    color: #999;
  }
  .danger {
    background: linear-gradient(70deg, rgb(214, 70, 60), red);
    color: #fff;
  }
}
</style>
<script>
import { orderDetail, confirmReceive, cancleOrder } from "../../api/order";
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
  onLoad: function(options) {
    orderDetail({ id: options.id })
      .then(res => {
        if (res.data.code == 200) {
          this.detailData = res.data.result;
          // this.detailData.title = this.detailData.displayOrderStatusTips;
          this.$set(
            this.detailData,
            "title",
            this.detailData.displayOrderStatusTips
          );
          // this.detailData.orderVo.orderLines.map(goods => {
          //   goods.propertiesValue = goods.propertiesValue.toArr();
          // });

          // 1. 催货 2. 确认收获  3. 支付 4.取消订单
          if (this.detailData.orderVo.logisticsStatus == 6) {
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [2, 4],
              btnShow: [false, true, false, true]
            });
          } else if (this.detailData.orderVo.logisticsStatus == 15) {
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [],
              btnShow: [false, false, false, false]
            });
          } else if (
            this.detailData.orderVo.logisticsStatus == 9 &&
            this.detailData.orderVo.financialStatus == 3
          ) {
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [],
              btnShow: [false, false, false, false]
            });
          } else if (
            this.detailData.orderVo.logisticsStatus == 9 &&
            this.detailData.orderVo.financialStatus == 1
          ) {
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [],
              btnShow: [false, false, false, false]
            });
          } else if (this.detailData.orderVo.logisticsStatus == 11) {
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [],
              btnShow: [false, false, false, false]
            });
          } else if (
            this.detailData.orderVo.financialStatus == 1 &&
            this.detailData.orderVo.paymentType != 1 &&
            this.detailData.orderVo.logisticsStatus == 1
          ) {
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [3, 4],
              btnShow: [false, false, true, true]
            });
          } else if (
            (this.detailData.orderVo.financialStatus != 1 &&
              this.detailData.orderVo.logisticsStatus == 1) ||
            this.detailData.orderVo.logisticsStatus == 3 ||
            this.detailData.orderVo.logisticsStatus == 4 ||
            this.detailData.orderVo.logisticsStatus == 5
          ) {
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [1, 4],
              btnShow: [true, false, false, true]
            });
          } else if (
            this.detailData.orderVo.logisticsStatus == 10 &&
            this.detailData.orderVo.financialStatus == 1
          ) {
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [],
              btnShow: [false, false, false, false]
            });
          }
          // console.log(this.detailData.eventList.includes('orderPayEvent'),656);
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
      reasons: ["我不想买了", "信息填写错误,重新购买", "买错了", "其他原因"]
    };
  },
  components: {},
  methods: {
    //申请退货
    applyRefund(goods) {
      console.log(goods);
      wx.setStorageSync("refundGoods", goods);
      wx.setStorageSync("orderInfo", this.detailData.orderVo);
      wx.navigateTo({
        url: "/pages/refund/main"
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
        paymentType: 4,
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
      wx.showLoading();
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
    }
  },
  computed: {}
};
</script>


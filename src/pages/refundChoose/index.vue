<template>
  <div class="cart">
    <!-- 购物车中所选的该店铺商品 -->
    <div>
      <van-cell-group>
        <van-cell>
          <div style="display:flex;">
            <div style="margin:auto 0;">
              <div class="icon" ></div>
            </div>
            <van-card
              style="width: 100%;"
              num="999"
              price="999"
              desc="描述信息"
              title="我是个商品"
              thumb="'http://qn.gaoshanmall.cn/"
            >
              <div slot="footer">
                <!-- <div>￥  {{item.salePrice}}</div> -->
                <van-stepper integer :min="1" :step="1"/>
              </div>
            </van-card>
          </div>
        </van-cell>
      </van-cell-group>
      <div class="fixed">
        <div style="margin-left:15px;">
          <div class="icon"></div>
        </div>

        <div>全选</div>
        <div class="right">
          <div style="min-width:170px;"></div>
          <div>确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='scss'>
.page {
  padding-bottom: 200rpx;
  //  padding-bottom: 10rpx;
  min-height: 140vh;
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
    p {
      width: 50%;
      height: 52rpx;
      line-height: 52rpx;
      // font-size: 28rpx;
    }
    p:nth-child(2) {
      display: flex;
      justify-content: flex-end;
      .addBtn {
        font-size: 24rpx;
        line-height: 48rpx;
        color: rgba(255, 108, 0, 1);
        width: 140rpx;
        height: 48rpx;
        border: 1px solid rgba(255, 108, 0, 1);
        opacity: 0.6;
        border-radius: 24rpx;
        margin: 0;
      }
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
            width: 180rpx;
            height: 180rpx;
            display: flex;
            // justify-content: center;
            img {
              width: 180rpx;
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
              font-size: 28rpx;
            }
            p:nth-child(2) {
              color: red;
              font-size: 24rpx;
              min-height: 75rpx;
              del {
                color: #999;
              }
            }
          }
          .goods-num {
            width: 30%;
            color: #999;
            font-size: 24rpx;
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
.refund-cell {
  width: 90%;
  margin: 0 auto;
  margin-top: 30rpx;
  padding: 1rpx 0;
  .title {
    font-size: 32rpx;
  }
  .item {
    width: 100%;
    background: #fff;
    border-radius: 20rpx;
    padding: 1rpx 0;

    p {
      margin: 25rpx 20rpx;
      padding: 1rpx 0;
      font-size: 28rpx;
    }
  }
}
.hint {
  p {
    width: 90%;
    margin: 0 auto;
    font-size: 24rpx;
    color: rgb(153, 153, 153);
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
// import { orderDetail, confirmReceive, cancleOrder } from "../../api/order";
// import {
//   ShopCartOrderconfirm,
//   detailOrderconfirm
// } from "../../api/shoppingcart";
// import { getMemAddressList } from "../../api/address";
// import { get, post, login, getStorageOpenid } from "../../utils";
// import { createOrder, toPay, afterOrderDetail } from "../../api/order";
// import Toast from "../../../static/vant/toast/toast";
// import fly from "../../api/request";
// let querystring = require("querystring");
// let deviceId = new Date().getTime();
// export default {
//   onLoad: function(options) {
//     orderDetail({ id: options.id })
//       .then(res => {
//         if (res.data.code == 200) {
//           this.detailData = res.data.result;
//           this.detailData.orderVo.orderLines.map(goods => {
//             goods.propertiesValue = goods.propertiesValue.toArr();
//           });
//           console.log(this.detailData, 656);
//           // 1. 催货 2. 确认收获  3. 支付 4.取消订单
//           if (this.detailData.orderVo.logisticsStatus == 6) {
//             this.$set(this.detailData, "typeData", {
//               title: "商家已发货",
//               type: [2, 4],
//               btnShow: [false, true, false, true]
//             });
//           } else if (this.detailData.orderVo.logisticsStatus == 15) {
//             this.$set(this.detailData, "typeData", {
//               title: "商家已发货",
//               type: [],
//               btnShow: [false, false, false, false]
//             });
//           } else if (
//             this.detailData.orderVo.logisticsStatus == 9 &&
//             this.detailData.orderVo.financialStatus == 3
//           ) {
//             this.$set(this.detailData, "typeData", {
//               title: "商家已发货",
//               type: [],
//               btnShow: [false, false, false, false]
//             });
//           } else if (
//             this.detailData.orderVo.logisticsStatus == 9 &&
//             this.detailData.orderVo.financialStatus == 1
//           ) {
//             this.$set(this.detailData, "typeData", {
//               title: "商家已发货",
//               type: [],
//               btnShow: [false, false, false, false]
//             });
//           } else if (this.detailData.orderVo.logisticsStatus == 11) {
//             this.$set(this.detailData, "typeData", {
//               title: "商家已发货",
//               type: [],
//               btnShow: [false, false, false, false]
//             });
//           } else if (
//             this.detailData.orderVo.financialStatus == 1 &&
//             this.detailData.orderVo.paymentType != 1 &&
//             this.detailData.orderVo.logisticsStatus == 1
//           ) {
//             this.$set(this.detailData, "typeData", {
//               title: "商家已发货",
//               type: [3, 4],
//               btnShow: [false, false, true, true]
//             });
//           } else if (
//             (this.detailData.orderVo.financialStatus != 1 &&
//               this.detailData.orderVo.logisticsStatus == 1) ||
//             this.detailData.orderVo.logisticsStatus == 3 ||
//             this.detailData.orderVo.logisticsStatus == 4 ||
//             this.detailData.orderVo.logisticsStatus == 5
//           ) {
//             this.$set(this.detailData, "typeData", {
//               title: "商家已发货",
//               type: [1, 4],
//               btnShow: [true, false, false, true]
//             });
//           } else if (
//             this.detailData.orderVo.logisticsStatus == 10 &&
//             this.detailData.orderVo.financialStatus == 1
//           ) {
//             this.$set(this.detailData, "typeData", {
//               title: "商家已发货",
//               type: [],
//               btnShow: [false, false, false, false]
//             });
//           }
//         }
//       })
//       .catch(err => {});
//   },
//   onShow() {},
//   created() {},
//   data() {
//     return {
//       detailData: null, //订单信息
//       reason: "我不想买了",
//       orderShow: false, //弹出层是否显示
//       //取消订单理由
//       reasons: ["我不想买了", "信息填写错误,重新购买", "买错了", "其他原因"]
//     };
//   },
//   components: {},
//   methods: {
//     //取消订单遮罩层关闭
//     resonClose() {
//       this.orderShow = false;
//     },
//     //选择取消原因
//     onChange(mp) {
//       this.reason = mp.mp.detail;
//       console.log(mp);
//     },
//     //选择取消原因
//     changeReason(reasonItem) {
//       this.reason = reasonItem;
//     },
//     //支付方法
//     pay() {
//       //弹起遮罩层 防止二次支付
//       wx.showLoading({
//         title: "校验支付状态...", //提示的内容,
//         mask: true //显示透明蒙层，防止触摸穿透,
//       });

//       //创建订单方法 成功则调用    captainID

//       let params = {
//         orderCode: this.detailData.orderVo.scmCode,
//         paymentType: 4,
//         orderTab: 2,
//         deviceType: 2
//       };
//       // 调用后台支付
//       toPay(params)
//         .then(res => {
//           //如果调用toPay方法成功 则拉起微信登录方法获取code传给后台并调用
//           if (res.data.code == "200") {
//             let params = {
//               subOrdinate: res.data.result.subOrdinate,
//               deviceType: 2
//             };
//             let url = `/trade${res.data.result.redirectUrl}`;
//             let querystring = require("querystring");
//             wx.login({
//               success: res => {
//                 console.log(res, 111);
//                 if (res.code) {
//                   params.code = res.code;

//                   //成功的话  拉起wxPay方法  获取支付所需要的一切参数
//                   const wxPay = params => {
//                     let data = querystring.encode(params);
//                     return fly.request({
//                       url: url,
//                       method: "post",
//                       body: data,
//                       headers: {
//                         "Content-Type": "application/x-www-form-urlencoded"
//                       }
//                     });
//                   };
//                   wxPay(params)
//                     .then(res => {
//                       wx.hideLoading();
//                       //如果成功 拉起微信支付API进行支付
//                       if (res.data.code == "200") {
//                         wx.requestPayment({
//                           timeStamp:
//                             res.data.result.wechatJsApiPayCommand.timeStamp,
//                           nonceStr:
//                             res.data.result.wechatJsApiPayCommand.nonceStr,
//                           package:
//                             res.data.result.wechatJsApiPayCommand.packAge,
//                           signType:
//                             res.data.result.wechatJsApiPayCommand.signType,
//                           paySign:
//                             res.data.result.wechatJsApiPayCommand.paySign,
//                           success: res => {
//                             wx.showToast({
//                               title: "支付成功!",
//                               icon: "success",
//                               duration: 2000,
//                               mask: true
//                             });

//                             setTimeout(() => {
//                               wx.redirectTo({
//                                 url: "/pages/myOrder/main"
//                               });
//                             }, 1000);
//                           },
//                           fail: res => {
//                             //调用失败弹到待支付订单页

//                             wx.hideLoading();
//                             wx.redirectTo({
//                               url: "/pages/myOrder/main"
//                             });
//                           }
//                         });
//                       }
//                     })
//                     .catch(err => {
//                       wx.hideLoading();
//                     });
//                 } else {
//                   console.log("登录失败！" + res.errMsg);
//                 }
//               },
//               fail: err => {
//                 console.log(err, 222);
//               }
//             });
//           }
//         })
//         .catch(err => {});
//     },
//     //取消订单
//     cancelOrder() {
//       wx.showLoading();
//       cancleOrder({
//         orderCode: this.detailData.orderVo.code,
//         reason: this.reason
//       })
//         .then(res => {
//           wx.hideLoading();
//           wx.showToast({
//             title: res.data.result.message
//           });
//           if (res.data.code == "200") {
//             if (res.data.result.isSuccess == true) {
//               wx.redirectTo({
//                 url: "/pages/myOrder/main"
//               });
//             }
//           }
//         })
//         .catch(err => {
//           wx.hideLoading();
//         });
//     }
//   },
//   computed: {}
// };
</script>

<style lang='scss' scoped>
@import "./style";
</style>
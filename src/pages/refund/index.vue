<template>
  <div class="page">
    <!-- 第二个板块 -->
    <div class="info">
      <div class="header">
        <p> <span>订单编号:</span> <span>{{orderInfo.orderVo.code}}</span> </p>
        <p> <span>{{orderInfo.orderVo.createTime}}</span> </p>
      </div>
      <div class="body">
        <div class="borderT"></div>
        <div class="store-info">
          <div class="goods">
            <div class="goods-item">
              <div class="img-box">
                <img :src="'http://qn.gaoshanmall.cn/'+goods.itemImg" alt>
              </div>
              <div class="goods-info">
                <h3 class="van-ellipsis" style="font-size:26rpx;">{{goods.itemName}}</h3>
                <p>
                  <span style="font-size:21rpx;">{{goods.propertiesValue}}</span>
                </p>
                <p>
                  <span style="font-size:23rpx;">￥{{goods.listPrice}}</span>
                  <span style="text-decoration:line-through;color:#999;font-size:22rpx;">￥{{goods.salePrice}}</span>
                </p>
              </div>
              <div class="goods-num">
                <span>数量:{{goods.quantity}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 第三个板块 -->
    <div class="func-label">
      <!-- <div class="title">
         <p>订单编号:3213213213132</p>
         <p>2019-06-25 19:66</p>
      </div>-->
      <div class="func-group">
        <div class="func-item" @click="toRefundOrder">
          <div class="icon">
            <van-icon name="cash-back-record"/>
          </div>
          <div class="desc">
            <p style="font-size:28rpx;">我要退货退款</p>
            <p style="font-size:24rpx;color:rgb(153,153,153);">已收到货,需要退还收到的货物</p>
          </div>
          <div class="icon" style="text-align:right;">
            <van-icon name="arrow"/>
          </div>
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

.func-label {
  background: #fff;
  border-radius: 20rpx;
  width: 90%;
  margin: 0 auto;
  margin-top: 30rpx;
  padding-top: 1rpx;
  .title {
    width: 94%;
    margin: 0 3%;
    display: flex;
    p {
      width: 50%;
    }
    p:nth-child(2) {
      text-align: right;
    }
  }
  .func-group {
    width: 94%;
    padding-top: 1rpx;
    margin: 0 3%;

    .func-item {
      display: flex;
      align-items: center;
      height: 140rpx;

      .icon {
        width: 10%;
      }
      .desc {
        width: 80%;
      }
    }
    .borderT {
      border-top: 1rpx solid #999;
      height: 1rpx;
      margin: 20rpx 0 !important;
      padding-top: 1rpx !important;
    }
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
            margin-left: 10rpx;
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
import { createOrder, toPay, afterOrderDetail } from "../../api/order";
import Toast from "../../../static/vant/toast/toast";

export default {
  onLoad: function(options) {},
  onShow() {
    this.goodsList = [];
    this.orderInfo = Object.assign({}, wx.getStorageSync("orderInfo"));
    this.goods = Object.assign({}, wx.getStorageSync("refundGoods"));
    console.log(this.goods,'000');
  },
  created() {},
  data() {
    return {
      goods: {}, //被点击的商品信息
      orderInfo: {}
    };
  },
  components: {},
  methods: {
    //去退款提交页
    toRefundOrder(){
      let refundGoodsList = [];
      refundGoodsList.push(this.goods);
      wx.setStorageSync("refundGoodsList", refundGoodsList);
      wx.redirectTo({
        url: "/pages/refundOrder/main"
      });
    }
  },
  computed: {}
};
</script>


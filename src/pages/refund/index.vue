<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-15 16:47:11
 * @LastEditTime: 2019-10-12 09:06:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page">
    <!-- 第二个板块 -->
    <div class="info">
      <div class="header">
        <p class="title">
         订单编号:{{orderInfo.orderVo.code}}
        </p>
        <p class="time">
          {{orderInfo.orderVo.createTime}}
          <!-- <span>{{orderInfo.orderVo.createTime}}</span> -->
        </p>
      </div>
      <div class="body">
        <div class="borderT"></div>
        <div class="store-info">
          <div class="goods">
            <div class="goods-item">
              <div class="img-box">
                <img :src="'http://qn.gaoshanmall.cn/'+goods.itemImg" alt />
              </div>
              <div class="goods-info">
                <h3 class="van-ellipsis" style="font-size:26rpx;">{{goods.itemName}}</h3>
                <p class="property">
                  <span>
                    {{goods.propertiesValue}}
                  </span>
                </p>
                <p class="price_group">
                  <span class="price">￥{{goods.listPrice}}</span>
                  <span class="num">x{{goods.quantity}}</span>
                </p>
              </div>
              <!-- <div class="goods-num">
                <span>数量:{{goods.quantity}}</span>
              </div> -->
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
          <div class="left">
            <img src="http://pz74d9amq.bkt.clouddn.com/refund_money.png" alt="">
          </div>
          <div class="desc">
            <p style="font-size:28rpx;">我要退货退款</p>
            <p style="font-size:24rpx;color:rgb(153,153,153);">已收到货,需要退还收到的货物</p>
          </div>
          <div class="right" style="text-align:right;">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='scss'>
@import "./style";
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
    console.log(this.goods, "000");
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
    toRefundOrder() {
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


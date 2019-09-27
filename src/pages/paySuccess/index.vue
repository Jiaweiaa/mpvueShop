<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-09-23 14:45:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="record_content">
    <div class="img_group">
      <img src="/static/images/paySuccess/success.png" alt />
    </div>
    <div class="text">订单已支付成功</div>
    <div class="btn-group">
      <button class="btn" @click="toDetail">查看详情</button>
      <button class="btn" @click="toIndex">回到首页</button>
    </div>
  </div>
</template>

<script>
import { toLogin, login, getStorageOpenid } from "../../utils";
import { getGoodsDetail, itemPurchaseHistory } from "../../api/goods";
import wxParse from "mpvue-wxparse";
import {
  insertOrEditMemAddress,
  addShoppingcart,
  shoppingcartCount,
  delShoppingcart,
  updateShoppingcart,
  checkShoppingcart,
  availableCoupon,
  getcoupon,
  orderconfirm
} from "../../api/shoppingcart";
export default {
  onShow() {},
  onReachBottom() {},
  data() {
    return {};
  },

  components: {},
  methods: {
    toIndex() {
      wx.switchTab({
        url: "../index/main" //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
      });
    }
  },
  computed: {}
};
</script>

<style lang='scss'>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style.scss";
</style>
<style lang='scss' scoped>
.record_content {
  margin-bottom: 100rpx;
  padding-bottom: 1rpx;
}
.record_content .sku {
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  border: 1px solid #ccc;
  width: auto;
  padding: 0px 20px;
  float: left;
  font-size: 13px;
  border-radius: 20px;
  margin-right: 10px;
  margin-top: 10px;
}
.notClick {
  background: #999999;
  color: white;
}
#goodsinfo .tabContent {
  overflow: hidden;
  padding: 10px;
}

#goodsinfo .tabContent .active {
  background: $main-color;
  color: white;
}
.goods .van-stepper {
  width: 200px !important;
  margin: 30px !important;
}
.goodsInfo {
  display: flex;
  border-radius: 20rpx;
  width: 90%;
  margin: 20rpx auto;
}
.goodsInfo .picture {
  width: 150rpx;
  height: 150rpx;
  border-radius: 20rpx;
}
.goodsInfo .picture img {
  width: 150rpx;
  height: 150rpx;
}
.record .label {
  flex-grow: 1;
}
.record .item {
  float: right;
  color: #999;
  font-size: 28rpx;
}
.record .item span {
  font-size: 30rpx;
  color: #d8001a;
}

.img_group .img_item {
  display: flex;
  height: 130rpx;
  align-items: center;
  padding: 0 10rpx;
  border-top: 1rpx solid #999;
}
.img_group .img_item img {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
}
.img_group .img_item .user {
  font-size: 32rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 160rpx;
}
.img_group .img_item .num {
  width: 160rpx;
  font-size: 28rpx;
}
.img_group .img_item .time {
  flex-grow: 1;
  text-align: right;
  color: #999;
  font-size: 24rpx;
}
</style>

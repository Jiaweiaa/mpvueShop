<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-15 16:47:11
 * @LastEditTime: 2019-10-12 14:57:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="page">
    <!-- 第二个板块 -->
    <div class="info">
      <div class="header">
        <p>退货商品</p>
        <p>
          <button class="addBtn" @click="toRefundChoose">添加/编辑</button>
        </p>
      </div>
      <div class="body">
        <div class="borderT"></div>
        <div class="store-info">
          <div class="goods">
            <div class="goods-item" v-for="(goods,index) in goodsList" :key="index">
              <div class="img-box">
                <img :src="'http://qn.gaoshanmall.cn/'+goods.itemImg" alt />
              </div>
              <div class="goods-info" >
                <h3 class="van-ellipsis title">{{goods.itemName}}</h3>
                <p class="property">
                  <span style="font-size:21rpx;">{{goods.propertiesValue}}</span>
                </p>
                <p class="refund-num">
                  <span>退货数量:{{goods.quantity}}</span>
                </p>
                <!-- <p class="price">
                  <span style="font-size:23rpx;">￥{{goods.listPrice}}</span>
                  <span
                    style="text-decoration:line-through;color:#999;font-size:22rpx;"
                  >￥{{goods.salePrice}}</span>
                </p> -->
              </div>
              <!-- <div class="goods-num">
                <span>退货数量:{{goods.quantity}}</span>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="refund-cell">
      <div class="title">退货原因</div>
      <div class="item" @click="orderShow=true">
        <p style="color:rgba(153,153,153,1);">
          {{reason!=''?reason:'请选择退货原因'}}
          <van-icon style="float:right;" name="arrow-down" />
        </p>
      </div>
    </div>
    <div class="refund-cell">
      <div class="title">订单退款</div>
      <div class="item">
        <p>
          退款金额:
          <span style="color:rgba(255,108,0,1);">￥{{refundPrice}}</span>
        </p>
        <p class="refundMark">
          <span>退款说明:</span>          
          <input type="text" placeholder="选填" />
        </p>
      </div>
    </div>
    <div class="hint">
      <p>温馨提示:</p>
      <p>• 商品寄回地址将在审核通过后以短信形式告知，或在退换货订单详情中查询。</p>
      <p>• 提交退货订单后，售后专员可能与您电话沟通，请保持手机畅通</p>
      <p>• 退货处理成功后退款金额将原路返回到您的付款账户中</p>
    </div>
    <div>
      <button @click="submitRefund" class="submitBtn">提交</button>
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
      <button class="popBtn" @click="orderShow=false">确 定</button>
    </van-popup>
  </div>
</template>

<script>
import { applyRefund } from "../../api/refund";
import Toast from "../../../static/vant/toast/toast";

export default {
  onLoad: function(options) {},
  onShow() {
    this.goodsList = [];
    this.orderInfo = Object.assign({}, wx.getStorageSync("orderInfo"));
    this.goodsList = wx.getStorageSync("refundGoodsList");
    console.log(this.orderInfo, "444");
    // console.log(object);
    this.refundPrice = null;
    this.goodsList.map(goods => {
      this.refundPrice += Number(goods.salePrice * goods.quantity);
      goods.orderLineId = goods.id;
      goods.refundCount = goods.quantity;
    });
    // wx.setStorageSync("refundGoods", this.goodsList);
  },
  created() {},
  data() {
    return {
      goodsList: [], //退款商品列表
      orderInfo: {},
      reason: "",
      refundPrice: null, //退款金额
      orderShow: false,
      reasons: ["我不想买了", "信息填写错误,重新购买", "买错了", "其他原因"]
    };
  },
  components: {},
  methods: {
    //选择退货原因
    onChange(mp) {
      this.reason = mp.mp.detail;
      console.log(mp);
    },
    //选择取消原因
    changeReason(reasonItem) {
      this.reason = reasonItem;
    },
    //取消订单遮罩层关闭
    resonClose() {
      this.orderShow = false;
    },
    //去选择退款商品页
    toRefundChoose() {
      wx.navigateTo({
        url: "/pages/refundChoose/main"
      });
    },
    //提交退款申请
    submitRefund() {
      wx.showLoading({
        title: '加载中'
      });
      let params = {
        applylines: this.goodsList,
        orderCode: this.orderInfo.orderVo.code,
        orderId: this.orderInfo.orderVo.id,
        refundReason: this.reason,
        refundType: 1
      };

      applyRefund(params)
        .then(res => {
          if (res.data.code == "200") {
            wx.setStorageSync("refundCode", res.data.result);
            wx.redirectTo({
              url: "/pages/returnGoods/main?code=" + res.data.result
            });
          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            });
          }
          wx.hideLoading();
        })
        .catch(err => {
          wx.hideLoading();
          wx.navigateBack({
            delta: 10
          });
        });
    }
  },
  computed: {}
};
</script>

<style lang='scss'>
@import "./style";
</style>
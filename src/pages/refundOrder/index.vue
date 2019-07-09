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
                <h3 class="van-ellipsis" style="font-size:26rpx;">{{goods.itemName}}</h3>
                <p>
                  <span style="font-size:21rpx;">{{goods.propertiesValue}}</span>
                </p>
                <p>
                  <span style="font-size:23rpx;">￥{{goods.listPrice}}</span>
                  <span
                    style="text-decoration:line-through;color:#999;font-size:22rpx;"
                  >￥{{goods.salePrice}}</span>
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
        <p>
          退款说明:
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
<style lang='scss'>
.page {
  padding-bottom: 200rpx;
  //  padding-bottom: 10rpx;
  min-height: 140vh;
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
//提交按钮
.submitBtn {
  width: 690rpx;
  height: 90rpx;
  margin: 0 auto;
  background: linear-gradient(
    -90deg,
    rgba(255, 167, 48, 1) 0%,
    rgba(255, 108, 0, 1) 100%
  );
  border-radius: 45rpx;
  color: #fff;
  font-size: 32rpx;
  line-height: 90rpx;
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


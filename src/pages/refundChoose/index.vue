<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-15 16:47:11
 * @LastEditTime: 2019-10-12 16:46:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="refundChoose">
    <!-- 退款商品备选项 -->
    <div>
      <div class="goods-group">
        <div class="good-item" v-for="(goods,index) in goodsList" :key="index">
          <div class="checked">
            <div
              class="icon"
              :class="[ goods.selectStatus=='1' ? 'active' : '',{active:allCheck}]"
              @click="itemChange(goods)"
            ></div>
          </div>
          <div class="good-card">
            <div class="thums">
              <img :src="'http://qn.gaoshanmall.cn/'+goods.itemImg" alt />
            </div>
            <div class="desc">
              <p class="title">{{goods.itemTitle}}</p>
              <p class="propery">{{goods.propertiesValue}}</p>
              <p class="price">￥{{goods.salePrice}}</p>
              <div class="stepper-group">
                <van-stepper integer :min="1" :max="goods.quantity" :step="1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <van-cell-group>
        <van-cell v-for="(goods,index) in goodsList" :key="index">
          <div style="display:flex;">
            <div style="margin:auto 0;">
              <div
                class="icon"
                :class="[ goods.selectStatus=='1' ? 'active' : '',{active:allCheck}]"
                @click="itemChange(goods)"
              ></div>
            </div>
            <van-card
              style="width: 100%;"
              :num="goods.quantity"
              :price="goods.salePrice"
              :desc="goods.propertiesValue"
              :title="goods.itemTitle"
              :thumb="'http://qn.gaoshanmall.cn/'+goods.itemImg"
            >
              <div slot="footer">
                <!-- <div>￥  {{item.salePrice}}</div> -->
                <van-stepper integer :min="1" :max="goods.quantity" :step="1" />
              </div>
            </van-card>
          </div>
        </van-cell>
      </van-cell-group>
      <div class="fixed">
        <div style="margin-left:15px;">
          <div class="icon" @click="allCheckChange()" :class="allCheck==true ? 'active' : ''"></div>
        </div>

        <div>全选</div>
        <div class="right">
          <div style="min-width:170px;"></div>
          <div @click="submitChoose()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findAvailableOrderlines } from "../../api/refund";
import Toast from "../../../static/vant/toast/toast";

export default {
  onLoad: function(options) {},
  onShow() {
    this.orderInfo = Object.assign({}, wx.getStorageSync("orderInfo"));
    // this.goodsList = wx.getStorageSync("refundGoodsList");
    // this.goodsList.map(goods => {
    //   goods.orderLineId = goods.id;
    //   goods.refundCount = goods.quantity;
    // });
    this.getGoodsGroup();
  },
  created() {},
  data() {
    return {
      goodsList: [], //退款商品列表
      orderInfo: {},
      refundPrice: "", //退款金额
      select: [],
      allCheck: false
    };
  },
  components: {},
  methods: {
    //获取订单内可退货订单行
    getGoodsGroup() {
      wx.showLoading({
        title: "加载中"
      });
      let params = {
        orderId: this.orderInfo.orderVo.id,
        applylines: this.goodsList
      };
      findAvailableOrderlines(params)
        .then(res => {
          if (res.data.code == "200") {
            this.goodsList = res.data.result;
            this.goodsList.map(goods => {
              goods.orderLineId = goods.id;
              goods.refundCount = goods.quantity;
            });
            let flag = this.goodsList.every(goods => {
              return goods.selectStatus == "1";
            });
            // console.log(flag, 444);
            if (flag) {
              this.allCheck = true;
            }
          }
          wx.hideLoading();
        })
        .catch(err => {
          wx.hideLoading();
        });
    },
    //单选
    itemChange(item, group) {
      this.select = [];
      let shopListLength = null;
      let allCheckFlag = true;
      item.selectStatus == "1"
        ? (item.selectStatus = "0")
        : (item.selectStatus = "1");
      shopListLength = this.goodsList.length;
      this.goodsList.map(goods => {
        if (goods.selectStatus == "1") {
          this.select.push(goods);
        } else {
          allCheckFlag = false;
        }
      });
      allCheckFlag == true ? (this.allCheck = true) : (this.allCheck = false);
    },
    //全选
    allCheckChange() {
      this.allCheck = !this.allCheck;
      this.goodsList.map(goods => {
        if (this.allCheck) {
          goods.selectStatus = "1";
        } else {
          goods.selectStatus = "0";
        }
      });
    },
    //提交选择
    submitChoose() {
      let selectArr = this.goodsList.filter(goods => {
        return goods.selectStatus == "1";
      });
      if (selectArr.length > 0) {
        selectArr.map(goods => {
          goods.orderLineId = goods.id;
          goods.refundCount = goods.quantity;
        });
        console.log(selectArr, 666);
        wx.setStorageSync("refundGoodsList", selectArr);
        // console.log(wx.getStorageSync("refundGoods"),666);
        wx.navigateBack({
          delta: 1
        });
      } else {
        wx.showToast({
          title: "请至少选择一个商品",
          icon: "none",
          duration: 2000
        });
      }
    }
  },
  computed: {}
};
</script>
<style lang='scss'>
.van-stepper {
  width: 160rpx;
  height: 42rpx;
  border: 1rpx solid rgba(209, 209, 209, 1);
  border-radius: 6rpx;
}
.van-stepper__minus,
.van-stepper__plus {
  position: relative;
  display: inline-block;
  width: 40rpx!important;
  height: 50rpx!important;
  // padding: 5rpx;
  margin: 1rpx;
  vertical-align: middle;
  background-color: #f2f3f5;
  border: 0;
  box-sizing: border-box;
}

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


<style lang='scss' scoped>
@import "./style";
</style>
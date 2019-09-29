<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 14:00:02
 * @LastEditTime: 2019-09-29 16:03:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="myOrder">
    <van-tabs tab-class="tabClass" :active="currentActive" @change="onChange">
      <van-tab
        title-style="flex-basis: 20%;"
        :title="itemTab"
        :key="indexTab"
        v-for="(itemTab, indexTab) in tabs"
      >
        <noDataView v-if="(list.length <=0  && onLoadLoading == false)"></noDataView>
        <view class="section" v-else>
          <div
            v-for="(value,index) in list"
            v-show="list!=null&&list.length>0"
            :key="index"
            class="listViewBox"
            @click="detailOrder(value)"
          >
            <div class="top">
              <div class="order_title">易起省商城</div>
              <div class="order-ok">{{value.typeData ? value.typeData.title : ''}}</div>
            </div>
            <div v-for="(val,childIndex) in value.orderLines" :key="childIndex">
              <van-card
                custom-class="order-card"
                thumb-class="order-image"
                :thumb="'http://qn.gaoshanmall.cn/'+val.itemImg"
              >
                <div slot="title">
                  <div class="good_title">{{val.itemName}}</div>
                  <div class="good_sku">
                    <span>{{val.propertiesValue}}</span>
                  </div>
                  <div class="good_price">
                    <span
                      class="list_price"
                      v-if="value.paymentType==13"
                    >￥{{val.mixCashPrice?val.mixCashPrice:'0'}}+补贴金{{val.mixScorePrice?val.mixScorePrice:'0'}}</span>
                    <span
                      class="list_price"
                      v-else-if="value.paymentType==12"
                    >补贴金{{val.mixScorePrice?val.mixScorePrice:'0'}}</span>
                    <span class="vip_price" v-else-if="value.paymentType==4">￥{{val.listPrice}}</span>
                    <span class="quantity">x{{val.quantity}}</span>
                  </div>
                </div>
              </van-card>
            </div>
            <div v-if="value.paymentType==13" style="text-align:right;">
              <span style="color:rgba(102,102,102,1);">应付款:</span>
              <span>￥{{value.totalActure}}+补贴金{{value.totalScoreActure}}</span>
            </div>
            <div v-else-if="value.paymentType==4" style="text-align:right;">
              <span style="color:rgba(102,102,102,1);">应付款:</span>
              <span>￥{{value.totalActure}}</span>
            </div>
            <div v-else style="text-align:right;">
              <span style="color:rgba(102,102,102,1);">应付款:</span>
              <span>补贴金{{value.totalScoreActure}}</span>
            </div>
            <view slot="footer" class="btn_group">
              <div
                class="order_btn white_btn"
                @click.stop="detailOrder(value)"
                v-if="value.typeData? value.typeData.canBtn: ''"
              >取消订单</div>
              <div
                class="order_btn red_btn"
                @click.stop="detailOrder(value)"
                v-if="value.typeData?value.typeData.giveBtn: ''"
              >立即付款</div>
              <div
                class="order_btn red_btn"
                @click.stop="sureGet(value)"
                v-if="value.typeData?value.typeData.afrimBtn: ''"
              >确认收货</div>
            </view>
          </div>
          <div style="width: 100%; text-align: center;margin-top: 5px;">
            <div class="title" v-if="allCount!=''&&list.length >= allCount && list.length > 0">
              <span>—</span>
              <span>我也是有底线的</span>
              <span>—</span>
            </div>
          </div>
        </view>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <!-- <van-popup :show="reasonShow" id="reasonPop" position="bottom" @close="popClose">
      <van-radio-group :value="reason" @change="onChange" >
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
    </van-popup>-->
  </div>
</template>

<script>
import { findAllOrders } from "../../api/myOrder";
import {
  orderDetail,
  confirmReceive,
  cancleOrder,
  capConfirmReceived
} from "../../api/order";
import noDataView from "../../components/noDataView/index";

export default {
  onLoad() {
    if (this.$root.$mp.query.id) {
      this.orderType = this.$root.$mp.query.id;
      this.currentActive = Number(this.$root.$mp.query.id) - 1;
      if (this.$root.$mp.query.id == 4) {
        this.currentActive = 2;
      }
      if (this.$root.$mp.query.id == 3) {
        this.currentActive = 3;
      }
      if (this.$root.$mp.query.id == 9) {
        this.currentActive = 4;
      }
      if (this.$root.$mp.query.id == 5) {
        this.currentActive = 5;
      }
    }
    this.getOrderList();
  },
  data() {
    return {
      scmCode: "", //已选择的订单scmCode
      currentActive: 0,
      orderType: 1, //默认为全部
      pageNum: 1,
      list: [],
      allCount: "",
      loading: false,
      onLoadLoading: false,
      tabs: ["全部", "待支付", "待发货", "待收货", "已完成"],
      reason: "我不想买了",
      reasonShow: false, //弹出层是否显示
      //取消订单理由
      reasons: ["我不想买了", "信息填写错误,重新购买", "买错了", "其他原因"]
    };
  },
  components: {
    noDataView
  },
  //  下啦刷新
  onPullDownRefresh(e) {
    this.pageNum = 1;
    this.getOrderList();
  },

  // 上啦加载
  async onReachBottom() {
    if (this.loading) return;
    wx.showLoading({
      title: "加载中"
    });
    this.loading = true;
    if (this.list.length >= this.allCount) {
      this.loading = false;
      setTimeout(() => {
        wx.hideLoading();
      }, this.GLOBAL.timer);
    } else {
      this.pageNum++;
      let params = {
        pageNum: this.pageNum,
        pageSize: 5,
        orderType: this.orderType
      };
      findAllOrders(params).then(res => {
        // console.log(999);
        if (res.data.code == 200) {
          this.loading = false;
          this.list = this.list.concat(res.data.result.orders.records);
          this.list.map(order => {
            // giveBtn是支付   canBtn是取消订单  seeBtn是查看物流 afrimBtn是确认收货
            if (order.logisticsStatus == 6) {
              this.$set(order, "typeData", {
                title: "商家已发货",
                canBtn: false, //取消订单
                giveBtn: false, //立即支付
                seeBtn: true, //查看物流
                afrimBtn: true //确认收货
              });
            } else if (order.logisticsStatus == 15) {
              this.$set(order, "typeData", {
                title: "交易成功",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
            } else if (
              order.logisticsStatus == 9 &&
              order.financialStatus == 3
            ) {
              this.$set(order, "typeData", {
                title: "待退款",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: true
              });
            } else if (
              order.logisticsStatus == 9 &&
              order.financialStatus == 1
            ) {
              this.$set(order, "typeData", {
                title: "交易取消",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
            } else if (order.logisticsStatus == 11) {
              this.$set(order, "typeData", {
                title: "退款成功",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
            } else if (
              order.financialStatus == 1 &&
              order.paymentType != 1 &&
              order.logisticsStatus == 1
            ) {
              this.$set(order, "typeData", {
                title: "待支付",
                canBtn: true,
                giveBtn: true,
                seeBtn: false,
                afrimBtn: false
              });
            } else if (
              (order.financialStatus != 1 && order.logisticsStatus == 1) ||
              order.logisticsStatus == 3 ||
              order.logisticsStatus == 4 ||
              order.logisticsStatus == 5
            ) {
              this.$set(order, "typeData", {
                title: "等待商家发货",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
            } else if (
              order.logisticsStatus == 10 &&
              order.financialStatus == 1
            ) {
              this.$set(order, "typeData", {
                title: "自动取消",
                canBtn: false,
                giveBtn: false,
                seeBtn: true,
                afrimBtn: false
              });
            }
          });
          // console.log(this.list);
          this.allCount = res.data.result.orders.total;
        } else {
          this.loading = false;
        }
        setTimeout(() => {
          wx.hideLoading();
        }, this.GLOBAL.timer);
      });
    }
  },
  methods: {
    openPopup(value) {
      this.reasonShow = true;
      this.scmCode = value.scmCode;
    },
    //取消订单遮罩层关闭
    popClose() {
      this.reasonShow = false;
    },

    //选择取消原因
    changeReason(reasonItem) {
      this.reason = reasonItem;
    },
    //取消订单
    cancelOrder() {
      wx.showLoading({
        title: "加载中"
      });
      cancleOrder({ orderCode: this.scmCode, reason: this.reason })
        .then(res => {
          wx.showToast({
            title: res.data.message
          });
          if (res.data.code == "200") {
            this.getOrderList();
          }
        })
        .catch(err => {
          setTimeout(() => {
            wx.hideLoading();
          }, this.GLOBAL.timer);
        });
    },
    //跳转到商城首页
    toIndex() {
      wx.switchTab({
        url: "/pages/index/main"
      });
    },

    //立即支付是跳转订单详情页支付
    payBtn(val) {},
    //确认收货
    sureGet(val) {
      wx.showModal({
        title: "提示",
        content: "确认收到货物了吗?",
        success: res => {
          if (res.confirm) {
            confirmReceive({ orderCode: val.code })
              .then(res => {
                if (res.data.code == "200") {
                  this.getOrderList();
                } else {
                  wx.showToast({
                    title: res.data.message
                  });
                }
              })
              .catch(err => {});
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },

    getOrderList() {
      wx.showLoading({
        title: "加载中"
      });
      this.onLoadLoading = true;
      let params = {
        pageNum: this.pageNum,
        pageSize: 5,
        orderType: this.orderType
      };
      this.list = [];
      // 1是立即支付  2是取消订单 3查看详情 4查看物流
      findAllOrders(params)
        .then(res => {
          this.list = res.data.result.orders.records;
          this.list.map(order => {
            // giveBtn是支付   canBtn是取消订单  seeBtn是查看物流 afrimBtn是确认收货
            if (order.logisticsStatus == 6) {
              this.$set(order, "typeData", {
                title: "商家已发货",
                canBtn: false,
                giveBtn: false,
                seeBtn: true,
                afrimBtn: true
              });
            } else if (order.logisticsStatus == 15) {
              this.$set(order, "typeData", {
                title: "交易成功",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
            } else if (
              order.logisticsStatus == 9 &&
              order.financialStatus == 3
            ) {
              this.$set(order, "typeData", {
                title: "待退款",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: true
              });
            } else if (
              order.logisticsStatus == 9 &&
              order.financialStatus == 1
            ) {
              this.$set(order, "typeData", {
                title: "交易取消",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
            } else if (order.logisticsStatus == 11) {
              this.$set(order, "typeData", {
                title: "退款成功",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
            } else if (
              order.financialStatus == 1 &&
              order.paymentType != 1 &&
              order.logisticsStatus == 1
            ) {
              this.$set(order, "typeData", {
                title: "待支付",
                canBtn: true,
                giveBtn: true,
                seeBtn: false,
                afrimBtn: false
              });
            } else if (
              (order.financialStatus != 1 && order.logisticsStatus == 1) ||
              order.logisticsStatus == 3 ||
              order.logisticsStatus == 4 ||
              order.logisticsStatus == 5
            ) {
              this.$set(order, "typeData", {
                title: "等待商家发货",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
            } else if (
              order.logisticsStatus == 10 &&
              order.financialStatus == 1
            ) {
              this.$set(order, "typeData", {
                title: "自动取消",
                canBtn: false,
                giveBtn: false,
                seeBtn: true,
                afrimBtn: false
              });
            }
          });
          this.allCount = res.data.result.orders.total;
          setTimeout(() => {
            wx.hideLoading();
          }, this.GLOBAL.timer);
          wx.stopPullDownRefresh(); //停止下拉刷新
          this.onLoadLoading = false;
        })
        .catch(err => {
          wx.hideLoading();
          this.onLoadLoading = false;
          wx.stopPullDownRefresh(); //停止下拉刷新
        });
    },

    detailOrder(val) {
      let params = Object.assign({}, val);
      let model = JSON.stringify(params);
      wx.navigateTo({
        url: "/pages/orderDetail/main?id=" + params.id
      });
      // wx.navigateTo({ url: "../order/main" });
    },

    onChange(val) {
      console.log(val, "888", val.mp.detail.title);
      switch (val.mp.detail.title) {
        case "全部":
          this.orderType = 1;
          break;
        case "待支付":
          this.orderType = 2;
          break;
        case "待发货":
          this.orderType = 4;
          break;
        case "待收货":
          this.orderType = 3;
          break;
        case "已完成":
          this.orderType = 5;
          break;
        default:
          break;
      }
      if (val.mp.detail.index == 0) {
        this.currentActive = 0;
      } else {
        this.currentActive = val.mp.detail.index;
      }

      this.pageNum = 1;
      this.list = [];
      this.getOrderList();
    }
  },
  computed: {}
};
</script>
<style lang='scss'>
@import "./style";

.order-card {
  padding: 10rpx 15rpx !important;
}
.van-card__thumb {
  position: relative;
  width: 136rpx !important;
  height: 136rpx !important;
  margin-right: 28rpx !important;
  -webkit-flex: none;
  flex: none;
}

.order-image {
  width: 180rpx !important;
  height: 180rpx !important;
}
.good_title {
  font-size: 28rpx;
  color: rgb(51, 51, 51);
  margin-bottom: 13rpx;
}
.good_sku {
  span {
    font-size: 24rpx;
    color: #666;
    padding: 9rpx 8rpx;
    background: #f8f8f8;
  }
}
.good_price {
  margin-top: 53rpx;
  font-size: 32rpx;
  font-weight: 600;
  .quantity {
    margin-left: 15rpx;
    font-size: 28rpx;
    color: rgba(153, 153, 153, 1);
  }
}
</style>


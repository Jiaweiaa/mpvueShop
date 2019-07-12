<template>
  <div class="captain_order">
    <van-dialog id="van-dialog" />

    <van-tabs tab-class="tabClass" :active="currentActive" @change="onChange">
      <van-search
        :value="searchVal"
        placeholder="请输入手机号"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
      <noDataView v-if="(list.length <=0  && onLoadLoading == false)"></noDataView>
      <checkbox-group @change="onSelectChange">
        <van-tab
          title-style="flex-basis: 20%;"
          :title="itemTab"
          :key="indexTab"
          v-for="(itemTab, indexTab) in tabs"
        >
          <view class="section">
            <div v-for="(value,index) in list" class="mapListView" :key="index">
              <div class="top border-bottom" style="overflow: hidden;">
                <checkbox
                  v-if="getActive == 2"
                  @click.stop
                  class="checkBox"
                  v-bind:value="value.code"
                ></checkbox>
                <div class="order-ok orderTitle">{{value.typeData.title}}</div>
                <div class="orderCode">订单编号: {{value.code}}</div>
              </div>
              <div class="timer bottom border-top orderTime">创建时间: {{value.createTime}}</div>
              <div v-for="(val,childIndex) in value.orderLines" :key="childIndex">
                <van-card
                  :num="val.quantity"
                  :price="val.salePrice"
                  :title="val.itemName"
                  :thumb="'http://qn.gaoshanmall.cn/' +val.itemImg"
                  custom-class="goods-card"
                  thumb-class="goods-image"
                  origin-price-class="goods-origin-price"
                  price-class="goods-price"
                  title-class="goods-title"
                  desc-class="goods-desc"
                >
                  <div slot="desc" class="goods-bottom">
                    <div class="sketch">{{val.propertiesValue}}</div>
                  </div>
                  <view slot="footer"></view>
                </van-card>
              </div>
              <div class="sketch" v-if="value.shippingAddress!=null">
                <van-icon name="manager" size="20rpx;" />
                收货人:{{value.shippingAddress.firstName}}
              </div>
              <div
                class="sketch"
                v-if="value.shippingAddress!=null"
                @click.stop="call(value.shippingAddress.mobile)"
              >
                <van-icon name="phone" size="20rpx;" />
                收货电话:{{value.shippingAddress.mobile}}
              </div>
              <div class="sketch" v-if="value.shippingAddress!=null">
                <van-icon name="map-marked" size="20rpx;" />
                收货地址:{{value.shippingAddress.province}}
                {{value.shippingAddress.city}}
                {{value.shippingAddress.district}}
                {{value.shippingAddress.address}}
              </div>
              <div class="btn-group">
                <van-button
                  plain
                  round
                  @click.stop="detailOrder(value)"
                  class="childBtn"
                  size="small"
                  v-if="value.typeData.seeBtn"
                >查看订单</van-button>

                <van-button
                  plain
                  round
                  @click.stop="payBtn(value)"
                  type="primary"
                  class="childBtn"
                  size="small"
                  v-if="getActive == 2"
                >核销</van-button>
              </div>
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
      </checkbox-group>
    </van-tabs>

    <van-button
      v-if="getActive == 2"
      style="position: fixed; right: 30px; bottom: 30px;"
      plain
      hairline
      @click="toggleClick"
      type="primary"
    >一键核销</van-button>
  </div>
</template>

<script>
import { findAllCapOrders, writeOff } from "../../api/myOrder/index";
import Dialog from "../../../static/vant/dialog/dialog";
import noDataView from "../../components/noDataView/index";

export default {
  onPullDownRefresh() {
    this.getOrderList();
    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  // 上啦加载
  onReachBottom() {
    if (this.loading) return;
    this.loading = true;
    if (this.list.length >= this.allCount) {
      this.loading = false;
      setTimeout(() => {
        wx.hideLoading();
      }, 1000);
    } else {
      wx.showLoading({
        title: "加载中"
      });
      this.pageNum++;
      let params = {
        pageNum: this.pageNum,
        pageSize: 5,
        orderType: Number(this.getActive) + 1
      };
      findAllCapOrders(params).then(res => {
        if (res.data.code == 200) {
          this.list = this.list.concat(res.data.result.orders.records);
          this.list.map(order => {
            if (order.logisticsStatus == 6) {
              order.typeData = {
                title: "商家已发货",
                canBtn: true,
                giveBtn: true,
                seeBtn: true
              };
            } else if (order.logisticsStatus == 15) {
              order.typeData = {
                title: "交易成功",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              };
            } else if (
              order.logisticsStatus == 9 &&
              order.financialStatus == 3
            ) {
              order.typeData = {
                title: "待退款",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              };
            } else if (
              order.logisticsStatus == 9 &&
              order.financialStatus == 1
            ) {
              order.typeData = {
                title: "交易取消",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              };
            } else if (order.logisticsStatus == 11) {
              order.typeData = {
                title: "退款成功",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              };
            } else if (
              order.financialStatus == 1 &&
              order.paymentType != 1 &&
              order.logisticsStatus == 1
            ) {
              order.typeData = {
                title: "待支付",
                canBtn: false,
                giveBtn: true,
                seeBtn: true
              };
            } else if (
              (order.financialStatus != 1 && order.logisticsStatus == 1) ||
              order.logisticsStatus == 3 ||
              order.logisticsStatus == 4 ||
              order.logisticsStatus == 5
            ) {
              order.typeData = {
                title: "等待商家发货",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              };
            } else if (
              order.logisticsStatus == 10 &&
              order.financialStatus == 1
            ) {
              order.typeData = {
                title: "自动取消",
                canBtn: false,
                giveBtn: false,
                seeBtn: true
              };
            }
          });
          this.allCount = res.data.result.orders.total;
        }
        this.loading = false;
        setTimeout(() => {
          wx.hideLoading();
        }, 1000);
      });
    }
  },
  mounted() {
    this.getOrderList();
  },
  components: {
    noDataView
  },
  data() {
    return {
      currentActive: 0,
      pageNum: 1,
      list: [],
      searchVal: "",
      getActive: "3",
      allCount: "",
      loading: false,
      tabs: ["待发货", "待核销", "已核销"],
      resultCheck: [],
      onLoadLoading: false
    };
  },
  methods: {
    //拨打电话
    call(mobile) {
      wx.makePhoneCall({
        phoneNumber: mobile
      });
    },
    // 获取数据列表
    getOrderList() {
      this.pageNum = 1;
      let params = {
        pageNum: this.pageNum,
        pageSize: 5,
        buyerMobile: this.searchVal,
        orderType: Number(this.getActive) + 1
      };
      wx.showLoading({
        title: "加载中"
      });
      this.onLoadLoading = true;
      // 1是立即支付  2是取消订单 3查看详情 4查看物流
      findAllCapOrders(params).then(res => {
        this.list = res.data.result.orders.records;
        this.list.map(order => {
          if (order.logisticsStatus == 6) {
            order.typeData = {
              title: "商家已发货",
              canBtn: true,
              giveBtn: true,
              seeBtn: true
            };
          } else if (order.logisticsStatus == 15) {
            order.typeData = {
              title: "交易成功",
              canBtn: false,
              giveBtn: true,
              seeBtn: true
            };
          } else if (order.logisticsStatus == 9 && order.financialStatus == 3) {
            order.typeData = {
              title: "待退款",
              canBtn: false,
              giveBtn: false,
              seeBtn: true
            };
          } else if (order.logisticsStatus == 9 && order.financialStatus == 1) {
            order.typeData = {
              title: "交易取消",
              canBtn: false,
              giveBtn: false,
              seeBtn: true
            };
          } else if (order.logisticsStatus == 11) {
            order.typeData = {
              title: "退款成功",
              canBtn: false,
              giveBtn: false,
              seeBtn: true
            };
          } else if (
            order.financialStatus == 1 &&
            order.paymentType != 1 &&
            order.logisticsStatus == 1
          ) {
            order.typeData = {
              title: "待支付",
              canBtn: false,
              giveBtn: true,
              seeBtn: true
            };
          } else if (
            (order.financialStatus != 1 && order.logisticsStatus == 1) ||
            order.logisticsStatus == 3 ||
            order.logisticsStatus == 4 ||
            order.logisticsStatus == 5
          ) {
            order.typeData = {
              title: "等待商家发货",
              canBtn: false,
              giveBtn: false,
              seeBtn: true
            };
          } else if (
            order.logisticsStatus == 10 &&
            order.financialStatus == 1
          ) {
            order.typeData = {
              title: "自动取消",
              canBtn: false,
              giveBtn: false,
              seeBtn: true
            };
          }
        });
        setTimeout(() => {
          wx.hideLoading();
        }, 1000);
        this.onLoadLoading = false;
        this.allCount = res.data.result.orders.total;
      });
    },

    //  订单详情
    detailOrder(val) {
      let params = Object.assign({}, val);
      let model = JSON.stringify(params);
      wx.navigateTo({
        url: "/pages/orderDetail/main?id=" + params.id + "&&capationFlag=111"
      });
    },

    // 批量审核赋值
    onSelectChange(val) {
      this.resultCheck = val.mp.detail.value;
    },

    // 搜索
    onSearch(val) {
      this.searchVal = val.mp.detail;
      this.getOrderList();
    },
    onCancel() {
      this.searchVal = "";
    },

    // 审核
    payBtn(val) {
      let valueData = val;
      Dialog.confirm({
        title: "核销",
        message: "确认核销订单吗?"
      })
        .then(() => {
          let data = [];
          data.push(valueData.code);

          writeOff({
            orderCodes: data
          }).then(res => {
            if (res.data.code == 200) {
              Dialog.alert({
                message: res.data.result
              }).then(() => {
                // on close
              });
              this.getOrderList();
              // });
            } else {
              Dialog.alert({
                message: res.data.message
              }).then(() => {
                // on close
              });
            }
           
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // tab数据改变
    onChange(val) {
      if (val.target.index == 0) {
        this.getActive = 3;
      } else if (val.target.index == 1) {
        this.getActive = 2;
      } else if (val.target.index == 2) {
        this.getActive = 4;
      }
      this.currentActive = val.target.index;
      this.pageNum = 1;
      this.list = [];
      this.getOrderList();
    },
    // 一键审核
    toggleClick() {
      if (this.resultCheck.length > 0) {
        Dialog.confirm({
          title: "核销",
          message: "确认核销订单吗?"
        })
          .then(() => {
            writeOff({
              orderCodes: this.resultCheck
            }).then(res => {
              this.getOrderList();
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  }
};
</script>
<style lang='scss'>
@import "./style.scss";
</style>

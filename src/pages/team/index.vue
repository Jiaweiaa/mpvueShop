<template>
  <div class="captain_order">
    <van-dialog id="van-dialog" />

    <van-tabs tab-class="tabClass" :active="currentActive" @change="onChange">
      <van-search
        :value="searchParams.buyerMobile"
        placeholder="请输入手机号"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
      <van-panel custom-class="panelStyle">
        <view class="btnStyle" plain>
          <!--<van-icon size="13px"   custom-class="iconStyle" name="arrow-down" />-->
          <span @click.stop="showPopup(1)">{{startDate}}</span>
          &nbsp;一&nbsp;
          <span @click.stop="showPopup(2)">{{endDate}}</span>
          <van-icon
            v-if="startDate !== '开始时间' || endDate !== '结束时间'"
            @click.stop="clearTime"
            name="cross"
            color="#999"
            custom-class="iconStyle"
          />
        </view>
      </van-panel>
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
                  v-if="getActive == 11 || getActive == 9"
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
              <div class="commission" v-if="value.logisticsStatus==15">
                已得佣金:
                <span class="symbol">￥</span>
                <span class="money">{{value.commission}}</span>
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
                  v-if="getActive == 11"
                >收货</van-button>
                <van-button
                  plain
                  round
                  @click.stop="payHeXiao(value)"
                  type="primary"
                  class="childBtn"
                  size="small"
                  v-if="getActive == 9"
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

    <van-popup :show="popupShow" position="bottom" @close="onClose">
      <van-datetime-picker
        type="date"
        :value="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dateConfirm"
        @cancel="dateCancel"
      />
    </van-popup>

    <van-button
      v-if="getActive == 11"
      style="position: fixed; right: 30px; bottom: 30px;"
      plain
      hairline
      @click="toggleClick"
      type="primary"
    >一键收货</van-button>

    <van-button
      v-if="getActive == 9"
      style="position: fixed; right: 30px; bottom: 30px;"
      plain
      hairline
      @click="toggleHXClick"
      type="primary"
    >一键核销</van-button>
  </div>
</template>

<script>
import {
  findAllCapOrders,
  writeOff,
  toWriteOff
} from "../../api/myOrder/index";
import { formatTime } from "../../utils";
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
      }, this.GLOBAL.timer);
    } else {
      wx.showLoading({
        title: "加载中"
      });
      this.pageNum++;
      let params = {
        pageNum: this.pageNum,
        pageSize: 5,
        orderType: this.getActive
      };
      findAllCapOrders(params).then(res => {
        if (res.data.code == 200) {
          this.list = this.list.concat(res.data.result.orders.records);
          this.list.map(order => {
            if (order.logisticsStatus == 6) {
              order.typeData = {
                title: "商家已发货",
                seeBtn: true
              };
            } else if (order.logisticsStatus == 15) {
              order.typeData = {
                title: "交易成功",
                seeBtn: true
              };
            } else if (
              order.logisticsStatus == 9 &&
              order.financialStatus == 3
            ) {
              order.typeData = {
                title: "待退款",
                seeBtn: true
              };
            } else if (
              order.logisticsStatus == 9 &&
              order.financialStatus == 1
            ) {
              order.typeData = {
                title: "交易取消",
                seeBtn: true
              };
            } else if (order.logisticsStatus == 11) {
              order.typeData = {
                title: "退款成功",
                seeBtn: true
              };
            } else if (
              order.financialStatus == 1 &&
              order.paymentType != 1 &&
              order.logisticsStatus == 1
            ) {
              order.typeData = {
                title: "待支付",
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
                seeBtn: true
              };
            } else if (
              order.logisticsStatus == 10 &&
              order.financialStatus == 1
            ) {
              order.typeData = {
                title: "自动取消",
                seeBtn: true
              };
            }
          });
          this.allCount = res.data.result.orders.total;
        }
        this.loading = false;
        setTimeout(() => {
          wx.hideLoading();
        }, this.GLOBAL.timer);
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
      popupShow: false,
      minDate: "",
      maxDate: new Date().getTime(),
      currentDate: new Date().getTime(),

      currentActive: 0,
      pageNum: 1,
      list: [],
      searchParams: {
        buyerMobile: "",
        startTime: "",
        endTime: ""
      },

      getActive: "4",
      allCount: "",
      loading: false,
      tabs: ["待发货", "待收货", "待确认", "待核销", "已核销"],
      resultCheck: [],
      onLoadLoading: false,

      startDate: "开始时间",
      endDate: "结束时间"
    };
  },
  methods: {
    // 时间选择
    // 展示popup
    showPopup(val) {
      this.dateType = val;
      this.popupShow = true;
    },
    // 关闭popup
    onClose() {
      this.popupShow = false;
    },
    // 确认选择时间
    dateConfirm(val) {
      if (this.dateType == 1) {
        this.startDate = formatTime(val.mp.detail).year;
        this.searchParams.startTime = formatTime(val.mp.detail).year;
      } else {
        this.endDate = formatTime(val.mp.detail).year;
        this.searchParams.endTime = formatTime(val.mp.detail).year;
      }
      this.getOrderList();
      this.onClose();
    },
    // 取消选择时间
    dateCancel() {
      this.onClose();
    },

    //拨打电话
    call(mobile) {
      wx.makePhoneCall({
        phoneNumber: mobile
      });
    },
    // 获取数据列表
    getOrderList() {
      this.pageNum = 1;
      let params = Object.assign(
        {
          pageNum: this.pageNum,
          pageSize: 5,
          orderType: this.getActive
        },
        this.searchParams
      );
      wx.showLoading({
        title: "加载中"
      });
      this.resultCheck = [];
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
          } else if (order.logisticsStatus == 7) {
            order.typeData = {
              title: "待核销",
              canBtn: true,
              giveBtn: true,
              seeBtn: true
            };
          }
        });
        this.onLoadLoading = false;
        this.allCount = res.data.result.orders.total;
        setTimeout(() => {
          wx.hideLoading();
        }, this.GLOBAL.timer);
      });
    },

    //  订单详情
    detailOrder(val) {
      let params = Object.assign({}, val);
      console.log(params);
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
      this.searchParams.buyerMobile = String(val.mp.detail);
      this.getOrderList();
    },
    onCancel() {
      this.searchVal = "";
    },

    // 发货
    payBtn(val) {
      let valueData = val;
      Dialog.confirm({
        title: "收货",
        message: "确认收货吗?"
      })
        .then(() => {
          let data = [];
          data.push(valueData.code);

          toWriteOff({
            orderCodes: data
          }).then(res => {
            if (res.data.code == 200) {
              Dialog.alert({
                message: "收货成功!"
              }).then(() => {
                // on close
              });
              this.getOrderList();
              // });
            } else {
              Dialog.alert({
                message: "收货失败~"
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
    // 一键审核收货
    toggleClick() {
      if (this.resultCheck.length > 0) {
        Dialog.confirm({
          title: "收货",
          message: "确认收货选中订单吗?"
        })
          .then(() => {
            toWriteOff({
              orderCodes: this.resultCheck
            }).then(res => {
              this.getOrderList();
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },

    // 核销
    payHeXiao(val) {
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
    // 一键审核发货
    toggleHXClick() {
      if (this.resultCheck.length > 0) {
        Dialog.confirm({
          title: "发货",
          message: "确认发货选中订单吗?"
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
    },
    // tab数据改变
    onChange(val) {
      if (val.target.index == 0) {
        this.getActive = 4;
      } else if (val.target.index == 1) {
        this.getActive = 11;
      } else if (val.target.index == 2) {
        this.getActive = 10;
      } else if (val.target.index == 3) {
        this.getActive = 9;
      } else if (val.target.index == 4) {
        this.getActive = 5;
      }
      this.currentActive = val.target.index;
      this.pageNum = 1;
      this.list = [];
      this.getOrderList();
    },

    // 清除时间 默认获取两天前的
    clearTime() {
      this.startDate = "开始时间";
      this.endDate = "结束时间";
      let timeStamp = new Date(new Date());
      // 获取时间戳 一天是86400 截取2天前的
      let ageTimeStamp = timeStamp - 86400 * 2;
      this.searchParams.startTime = "";
      this.searchParams.endTime = "";
      this.getOrderList();
    }
  }
};
</script>
<style lang='scss'>
@import "./style.scss";
.btnStyle {
  border: none;
  color: #ab2b2b;
  padding: 0 5px;
  width: 80%;
  .iconStyle {
    margin-left: 10px;
  }
}
.panelStyle {
  padding: 10px 10px;
}
</style>

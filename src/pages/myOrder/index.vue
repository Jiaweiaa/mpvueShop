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
				      @click="detailOrder(value)"
		      >
			      <div class="top border-bottom" style="overflow: hidden;">
				      <div
						      style="height: 30px; line-height: 30px; font-size: 12px; width: 70%; float: left; margin-left: 10px; margin-top: 10px;"
				      >订单编号: {{value.code}}</div>
				      <div
						      class="order-ok"
						      style="width: calc(30% - 20px); float: right; padding-right: 10px; margin-top: 10px; font-size: 13px; text-align: right;"
				      >{{value.typeData.title}}</div>
			      </div>
			      <div
					      class="timer bottom border-top"
					      style="height: 30px; line-height: 30px; font-size: 13px; margin-left: 10px; margin-bottom: 10px;"
			      >创建时间: {{value.createTime}}</div>
			      <div v-for="(val,childIndex) in value.orderLines" :key="childIndex">
				      <van-card
						      :num="val.quantity"
						      tag="标签"
						      :price="val.salePrice"
						      :title="val.itemName"
						      :thumb="'http://qn.gaoshanmall.cn/'+val.itemImg"
				      >
					      <view slot="footer">
						      <van-button
								      @click.stop="cancelOrder(value)"
								      type="danger"
								      class="childBtn"
								      size="small"
								      v-if="value.typeData.canBtn"
						      >取消订单</van-button>
						      <van-button
								      @click="logistics(value)"
								      class="childBtn"
								      size="small"
								      v-if="value.typeData.seeBtn"
						      >查看物流</van-button>
						      <van-button
								      @click.stop="sureGet(value)"
								      type="danger"
								      class="childBtn"
								      size="small"
								      v-if="value.typeData.afrimBtn"
						      >确认收货</van-button>
						      <van-button
								      @click="payBtn(value)"
								      type="primary"
								      class="childBtn"
								      size="small"
								      v-if="value.typeData.giveBtn"
						      >立即支付</van-button>
					      </view>
				      </van-card>
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
    </van-tabs>
  </div>
</template>

<script>
import { findAllOrders } from "../../api/myOrder";
import { orderDetail, confirmReceive, cancleOrder } from "../../api/order";
import noDataView  from '../../components/noDataView/index'

export default {
  onShow() {
    if(this.$root.$mp.query.id) {
      this.currentActive = this.$root.$mp.query.id;
    }
    this.getOrderList();
  },
  data() {
    return {
      currentActive: 0,
      pageNum: 1,
      list: [],
      allCount: "",
      loading: false,

	    onLoadLoading: false,
	    
      tabs: ["全部", "待支付", "待收货", "待发货", "已完成"]
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
      title: '加载中',
    })
    this.loading = true;
    if (this.list.length >= this.allCount) {
      this.loading = false;
      wx.hideLoading()
    } else {
      this.pageNum++;
      let params = {
        pageNum: this.pageNum,
        pageSize: 5,
        orderType: Number(this.currentActive) + 1
      };
      findAllOrders(params).then(res => {
        // console.log(999);
        if (res.data.code == 200) {
          this.loading = false;
          this.list = this.list.concat(res.data.result.orders.records);

          this.list.map(order => {
            // console.log(111);
            // giveBtn是支付   canBtn是取消订单  seeBtn是查看物流 afrimBtn是确认收货
            if (order.logisticsStatus == 6) {
              this.$set(order, "typeData", {
                title: "商家已发货",
                canBtn: false, //取消订单
                giveBtn: false, //立即支付
                seeBtn: true, //查看物流
                afrimBtn: true //确认收货
              });

              // order.typeData = {
              //   title: "商家已发货",
              //   canBtn: false,
              //   giveBtn: false,
              //   seeBtn: true
              // };
            } else if (order.logisticsStatus == 15) {
              this.$set(order, "typeData", {
                title: "交易成功",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
              // order.typeData = {
              //   title: "交易成功",
              //   canBtn: false,
              //   giveBtn: false,
              //   seeBtn: false
              // };
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
              // order.typeData = {
              //   title: "待退款",
              //   canBtn: false,
              //   giveBtn: false,
              //   seeBtn: false
              // };
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
              // order.typeData = {
              //   title: "交易取消",
              //   canBtn: false,
              //   giveBtn: false,
              //   seeBtn: false
              // };
            } else if (order.logisticsStatus == 11) {
              this.$set(order, "typeData", {
                title: "退款成功",
                canBtn: false,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
              // order.typeData = {
              //   title: "退款成功",
              //   canBtn: false,
              //   giveBtn: false,
              //   seeBtn: false
              // };
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
              // order.typeData = {
              //   title: "待支付",
              //   canBtn: true,
              //   giveBtn: true,
              //   seeBtn: false
              // };
            } else if (
              (order.financialStatus != 1 && order.logisticsStatus == 1) ||
              order.logisticsStatus == 3 ||
              order.logisticsStatus == 4 ||
              order.logisticsStatus == 5
            ) {
              this.$set(order, "typeData", {
                title: "等待商家发货",
                canBtn: true,
                giveBtn: false,
                seeBtn: false,
                afrimBtn: false
              });
              // order.typeData = {
              //   title: "等待商家发货",
              //   canBtn: true,
              //   giveBtn: false,
              //   seeBtn: false
              // };
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
              // order.typeData = {
              //   title: "自动取消",
              //   canBtn: false,
              //   giveBtn: false,
              //   seeBtn: false
              // };
            }
          });
          // console.log(this.list);
          this.allCount = res.data.result.orders.total;
        } else {
          this.loading = false;
        }
        wx.hideLoading()
      })
    }
  },
  methods: {
    //跳转到商城首页
    toIndex() {
      wx.switchTab({
        url: "/pages/index/main"
      });
    },
    //取消订单
    cancelOrder(val) {
      // console.log(val);
      wx.showModal({
        title: "提示",
        content: "确认取消这笔订单吗?",
        success: res => {
          if (res.confirm) {
            cancleOrder({ orderCode: val.code })
              .then(res => {
                wx.showToast({
                  title: res.data.message
                });
                this.getOrderList();
              })
              .catch(err => {});
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //确认收货
    sureGet(val) {
      wx.showModal({
        title: "提示",
        content: "确认收到货物了吗?",
        success: res => {
          if (res.confirm) {
            confirmReceive({ orderCode: val.code })
              .then(res => {
                wx.showToast({
                  title: res.data.message
                });
                this.getOrderList();
              })
              .catch(err => {});
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },

    getOrderList() {
      wx.showLoading();
      this.onLoadLoading = true;
      let params = {
        pageNum: this.pageNum,
        pageSize: 5,
        orderType: Number(this.currentActive) + 1
      };
      this.list = [];
      // 1是立即支付  2是取消订单 3查看详情 4查看物流
      findAllOrders(params)
        .then(res => {
          if (wx.getStorageSync("g_i") == "") {
            let sourceCookie = res.headers["set-cookie"][0];
            let index = sourceCookie.indexOf(";");
            let myCookie = sourceCookie.substring(0, index);
            wx.setStorageSync("g_i", myCookie);
          }
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
                canBtn: true,
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
          wx.hideLoading();
          wx.stopPullDownRefresh() //停止下拉刷新
          this.onLoadLoading = false;
        })
        .catch(err => {
          wx.hideLoading();
          this.onLoadLoading = false;
          wx.stopPullDownRefresh() //停止下拉刷新
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
      this.currentActive = val.target.index;
      this.pageNum = 1;
      this.list = [];
      this.getOrderList();
    }
  },
  computed: {}
};
</script>
<style lang='scss'>
.tabClass {
  flex-basis: 20% !important;
}
.scroll-view-item {
  width: 100%;
  height: 200px;
}
.myOrder {
  background: #fafafa;
}
.childBtn {
  margin:0 8px;
}
.title {
	text-align: center;
	padding: 20 rpx 0;
	width: 100%;
	margin-bottom: 10px;
	span:nth-child(2){
		font-size: 24rpx;
		color: #333;
		padding: 0 10rpx;
	}
	span:nth-child(2n + 1) {
		color: #999;
	}
}


</style>

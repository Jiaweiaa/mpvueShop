<template>
  <div class="topic">
	  <view class="section">
	  <scroll-view scroll-y class="scrollView" @scrolltolower="lower">
		  <div v-for="(value,index) in list" :key="index" @click="detailOrder(value)">
			  <div class='top border-bottom' style="overflow: hidden;">
				  <div style="height: 30px; line-height: 30px; font-size: 13px; width: 80%; float: left; margin-left: 10px; margin-top: 10px;">订单编号: {{value.code}}</div>
				  <div class="order-ok" style="width: calc(20% - 10px); float: right; margin-top: 10px; font-size: 15px;">{{value.typeData.title}}</div>
			  </div>
			  <div class="timer bottom border-top" style="height: 30px; line-height: 30px; font-size: 13px; margin-left: 10px; margin-bottom: 10px;">创建时间: {{value.createTime}}</div>
			  <div 	v-for="(val,childIndex) in value.orderLines" :key="childIndex" >
				  <van-card
						  :num="val.quantity"
						  tag="标签"
						  :price="val.salePrice"
						  :title="val.itemName"
						  :thumb="'http://img.gaoshanmall.com/static/resource/'+val.itemImg"
				  >
					  <view slot="footer">
						  <van-button @click="cancelOrder(value)" type="danger" class="childBtn" size="small" v-if="value.typeData.canBtn">取消订单</van-button>
						  <van-button @click="logistics(value)" class="childBtn" size="small" v-if="value.typeData.seeBtn">查看物流</van-button>
						  <van-button @click="payBtn(value)" type="primary" class="childBtn" size="small" v-if="value.typeData.giveBtn">立即支付</van-button>
					  </view>
				  </van-card>
			  </div>
		  </div>
		  <div style="width: 100%; text-align: center;margin-top: 5px;">
			
			  <div v-if="list.length >= allCount" style="font-size: 13px;">全部加载完成!</div>
			  <van-loading v-else size="20px" type="spinner" color="#fff" />
		  </div>
	  </scroll-view>
	  </view>
  </div>
</template>

<script>
import {
  findAllCapOrders
} from '../../api/myOrder/index'

export default {
  onPullDownRefresh() {
    this.page = 1;
    this.getListData(true);
    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  created() {},
  mounted() {
    this.getOrderList();
  },
  data() {
    return {
      currentActive: 0,
      pageNum: 1,
      list: [],
      allCount: '',
      loading: false
    };
  },
  components: {},
  methods: {
    lower: function(e) {
      if(this.loading) return;
      this.loading = true;
      if(this.list.length >= this.allCount) {
        this.loading = false;
      }else {
        this.pageNum++;
        let params = {
          pageNum: this.pageNum,
          pageSize : 5,
          orderType:1
        }
        findAllCapOrders(params).then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.list = this.list.concat(res.data.result.orders.records);
            this.list.map(order => {
              if(order.logisticsStatus == 6) {
                order.typeData = {
                  title: "商家已发货",
                  canBtn: true,
                  giveBtn: true,
                  seeBtn: true
                }
              }else if(order.logisticsStatus==15) {
                order.typeData = {
                  title: "交易成功",
                  canBtn: false,
                  giveBtn: true,
                  seeBtn: true
                }
              }else if(order.logisticsStatus==9 && order.financialStatus==3) {
                order.typeData = {
                  title: "待退款",
                  canBtn: false,
                  giveBtn: false,
                  seeBtn: true
                }
              }else if(order.logisticsStatus==9 && order.financialStatus==1) {
                order.typeData = {
                  title: "交易取消",
                  canBtn: false,
                  giveBtn: false,
                  seeBtn: true
                }
              }else if(order.logisticsStatus==11) {
                order.typeData = {
                  title: "退款成功",
                  canBtn: false,
                  giveBtn: false,
                  seeBtn: true
                }
              }else if(order.financialStatus==1 && order.paymentType!=1 && order.logisticsStatus==1) {
                order.typeData = {
                  title: "待支付",
                  canBtn: true,
                  giveBtn: true,
                  seeBtn: false
                }
              }else if(order.financialStatus!=1 && order.logisticsStatus==1 || order.logisticsStatus==3 || order.logisticsStatus==4 || order.logisticsStatus==5) {
                order.typeData = {
                  title: "等待商家发货",
                  canBtn: true,
                  giveBtn: false,
                  seeBtn: true
                }
              }else if(order.logisticsStatus==10 && order.financialStatus==1) {
                order.typeData = {
                  title: "自动取消",
                  canBtn: false,
                  giveBtn: false,
                  seeBtn: true
                }
              }
            });
            this.allCount = res.data.result.orders.total;
          } else {
            this.loading = false
          }
        })
      }
    },

    getOrderList() {
      let params = {
        pageNum: this.pageNum,
        pageSize : 5,
        orderType: 1
      }
      // 1是立即支付  2是取消订单 3查看详情 4查看物流
      findAllCapOrders(params).then(res => {
        let sourceCookie = res.headers["set-cookie"][0];
        let index = sourceCookie.indexOf(';');
        let myCookie = sourceCookie.substring(0,index);
        // console.log(myCookie);
        wx.setStorageSync("g_i", myCookie)
        this.list = res.data.result.orders.records;
        console.log(res.data.result)
        this.list.map(order => {
          if(order.logisticsStatus == 6) {
            order.typeData = {
              title: "商家已发货",
              canBtn: true,
              giveBtn: true,
              seeBtn: true
            }
          }else if(order.logisticsStatus==15) {
            order.typeData = {
              title: "交易成功",
              canBtn: false,
              giveBtn: true,
              seeBtn: true
            }
          }else if(order.logisticsStatus==9 && order.financialStatus==3) {
            order.typeData = {
              title: "待退款",
              canBtn: false,
              giveBtn: false,
              seeBtn: true
            }
          }else if(order.logisticsStatus==9 && order.financialStatus==1) {
            order.typeData = {
              title: "交易取消",
              canBtn: false,
              giveBtn: false,
              seeBtn: true
            }
          }else if(order.logisticsStatus==11) {
            order.typeData = {
              title: "退款成功",
              canBtn: false,
              giveBtn: false,
              seeBtn: true
            }
          }else if(order.financialStatus==1 && order.paymentType!=1 && order.logisticsStatus==1) {
            order.typeData = {
              title: "待支付",
              canBtn: false,
              giveBtn: true,
              seeBtn: true
            }
          }else if(order.financialStatus!=1 && order.logisticsStatus==1 || order.logisticsStatus==3 || order.logisticsStatus==4 || order.logisticsStatus==5) {
            order.typeData = {
              title: "等待商家发货",
              canBtn: false,
              giveBtn: false,
              seeBtn: true
            }
          }else if(order.logisticsStatus==10 && order.financialStatus==1) {
            order.typeData = {
              title: "自动取消",
              canBtn: false,
              giveBtn: false,
              seeBtn: true
            }
          }
        });
        this.allCount = res.data.result.orders.total;
      })
    },

    detailOrder(val) {
      wx.navigateTo({url: '../order/main'})

    },
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>

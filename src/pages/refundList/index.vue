<template>
  <div class="refund_list">
    <div class="myOrder">
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
            >订单编号: {{value.orderCode}}</div>
            <div
              v-if="value.reType=='1'"
              class="order-ok"
              style="width: calc(30% - 20px); float: right; padding-right: 10px; margin-top: 10px; font-size: 13px; text-align: right;"
            >退货退款</div>
            <div
              v-if="value.reType=='2'"
              class="order-ok"
              style="width: calc(30% - 20px); float: right; padding-right: 10px; margin-top: 10px; font-size: 13px; text-align: right;"
            >换货</div>
            <div
              class="order-ok"
              v-if="value.reType=='3'"
              style="width: calc(30% - 20px); float: right; padding-right: 10px; margin-top: 10px; font-size: 13px; text-align: right;"
            >仅退款</div>
          </div>
          <div
            class="timer bottom border-top"
            style="height: 30px; line-height: 30px; font-size: 13px; margin-left: 10px; margin-bottom: 10px;"
          >创建时间: {{value.createTime}}</div>
          <div v-for="(val,childIndex) in value.orderLines" :key="childIndex">
            <van-card
              :num="val.quantity"
              :price="val.salePrice"
              :title="val.itemName"
              :thumb="'http://qn.gaoshanmall.cn/'+val.itemImg"
            ></van-card>
            
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
  </div>
</template>

<script>
import { findAllOrders, findAllRefundOrders } from "../../api/myOrder";
import { confirmReceive, cancleOrder } from "../../api/order";
import noDataView from "../../components/noDataView/index";

export default {
  onShow() {
    this.getRefundList();
    console.log(999);
  },
  data() {
    return {
      scmCode: "", //已选择的订单scmCode
      currentActive: 0,
      pageNum: 1,
      list: [],
      allCount: "",
      loading: false,
      onLoadLoading: false,
      tabs: ["全部", "待支付", "待收货", "待发货", "已完成"],
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

    this.getRefundList();
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
      wx.hideLoading();
    } else {
      this.pageNum++;
      wx.showLoading({
        title: "加载中"
      });
      this.onLoadLoading = true;
      let params = {
        pageNum: this.pageNum,
        pageSize: 5
      };
      this.list = [];
      // 1是立即支付  2是取消订单 3查看详情 4查看物流
      findAllRefundOrders(params)
        .then(res => {
          this.list = this.list.concat(res.data.result.records);
          this.allCount = res.data.result.total;
          wx.hideLoading();
          wx.stopPullDownRefresh(); //停止下拉刷新
          this.onLoadLoading = false;
        })
        .catch(err => {
          wx.hideLoading();
          this.onLoadLoading = false;
          wx.stopPullDownRefresh(); //停止下拉刷新
        });
    }
  },
  methods: {
    openPopup(value) {
      this.reasonShow = true;
      this.scmCode = value.scmCode;
      // console.log(111);
    },
    //取消订单遮罩层关闭
    popClose() {
      this.reasonShow = false;
    },
    //选择取消原因
    onChange(mp) {
      this.reason = mp.mp.detail;
      console.log(mp);
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
          wx.hideLoading();
          wx.showToast({
            title: res.data.message
          });
          if (res.data.code == "200") {
            this.getOrderList();
          }
        })
        .catch(err => {
          wx.hideLoading();
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
    //获取退换货订单
    getRefundList() {
      wx.showLoading({
        title: "加载中"
      });
      this.onLoadLoading = true;
      let params = {
        pageNum: this.pageNum,
        pageSize: 5
      };
      this.list = [];
      // 1是立即支付  2是取消订单 3查看详情 4查看物流
      findAllRefundOrders(params)
        .then(res => {
          this.list = res.data.result.records;
          this.allCount = res.data.result.total;
          wx.hideLoading();
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
      wx.setStorageSync("refundCode", val.reCode);
      if (val.reType == "1") {
        wx.navigateTo({
          url: "/pages/returnGoods/main?code=" + val.reCode
        });
      } else if (val.reType == "3") {
        wx.navigateTo({
          url: "/pages/returnGoodsMoney/main?code=" + val.reCode
        });
      }
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
@import "./style";
</style>

<template>
  <div class="cart" v-if="detailData!=null">
    <div class="orderType">
      <p style="width: 36%;  margin-left: 4%; font-size: 18px; color: #FFA730;">
        <van-icon name="clock-o"/>
        <span>{{detailData ? detailData.displayOrderStatusTips : ''}}</span>
      </p>
      <p
        style="width: 56%; margin-right: 4%; text-align: right;"
      >截止时间:{{detailData? detailData.orderVo.willCancelTime : ''}}</p>
    </div>
    <div style="height:15px;"></div>
    <van-cell-group>
      <van-cell center :border="false">
        <!-- <template> -->
        <div>{{detailData.orderVo.shippingAddress.firstName}} {{detailData.orderVo.shippingAddress.mobile}}</div>
        <div>{{detailData.orderVo.shippingAddress ? detailData.orderVo.shippingAddress.province +' '+detailData.orderVo.shippingAddress.city + ' ' + detailData.orderVo.shippingAddress.district + ' ' + detailData.orderVo.shippingAddress.address: ''}}</div>
        <!-- </template> -->
      </van-cell>
    </van-cell-group>
    <div style="height:15px;"></div>
    <div>
      <van-card
        v-for="(item, index) in detailData.orderVo.orderLines"
        :key="index"
        :num="item.quantity"
        :price="item.discountPrice"
        :desc="item.propertiesValue"
        :title="item.itemName"
        :thumb="'http://img.gaoshanmall.com/static/resource/'+item.itemImg"
        :origin-price="item.salePrice"
      ></van-card>
    </div>
    <div style="height:15px;"></div>
    <van-cell-group>
      <van-cell title="订单编号" :value="detailData.orderVo.code"/>
      <van-cell title="下单时间" :value="detailData.orderVo.createTime"/>
      <van-cell title="订单状态" :value="goodsType"/>
      <van-cell
        v-if="detailData.orderVo.paymentInfos.length>0"
        title="支付方式"
        :value="detailData.orderVo.paymentInfos[0].paymentType"
      />
      <van-cell
        v-if="detailData.orderVo.paymentInfos.length>0"
        title="支付时间"
        :value="detailData.orderVo.paymentInfos[0].createTime"
      />
      <van-cell title="配送方式" value="暂无"/>
      <van-cell title="发票类型" value="暂无"/>
    </van-cell-group>
    <div style="height:15px;"></div>
    <van-cell-group class="total">
      <van-cell title="商品总额" :value="detailData.orderVo.totalSalesPrice"/>
      <van-cell title="运费" :value="detailData.orderVo.actualFreight"/>
      <van-cell title="实付金额" :value="detailData.orderVo.totalActure" style="font-weight: 700;"/>
    </van-cell-group>
    <div class="footer">
      <div class="munu">
        
        <van-button size="small" v-if="detailData.typeData.btnShow[0]">提醒商家发货</van-button>
        <van-button size="small" @click="sureGet" v-if="detailData.typeData.btnShow[1]">确认收货</van-button>
        <van-button
          size="small"
          type="danger"
          @click="cancelOrder"
          v-if="detailData.typeData.btnShow[3]"
        >取消订单</van-button>
        <van-button
          size="small"
          type="danger"
          v-if="detailData.typeData.btnShow[2]"
        >支付</van-button>
        
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, login, getStorageOpenid } from "../../utils";
import { orderDetail, confirmReceive, cancleOrder } from "../../api/order";

export default {
  onLoad: function(options) {
    orderDetail({ id: options.id })
      .then(res => {
        if (res.data.code == 200) {
          this.detailData = res.data.result;
          console.log(this.detailData);
          // 1. 催货 2. 确认收获  3. 支付 4.取消订单
          this.showFlag = false;
          if (this.detailData.orderVo.logisticsStatus == 6) {
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [2, 4],
              btnShow:[false,true,false,true]
            });
            // this.detailData.typeData = {
            //   title: "商家已发货",
            //   type: [2, 4]
            // };
          } else if (this.detailData.orderVo.logisticsStatus == 15) {
            // this.detailData.typeData = {
            //   title: "交易成功",
            //   type: []
            // };
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [],
              btnShow:[false,false,false,false]
            });
          } else if (
            this.detailData.orderVo.logisticsStatus == 9 &&
            this.detailData.orderVo.financialStatus == 3
          ) {
            // this.detailData.typeData = {
            //   title: "待退款",
            //   type: []
            // };
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [],
              btnShow:[false,false,false,false]
            });
          } else if (
            this.detailData.orderVo.logisticsStatus == 9 &&
            this.detailData.orderVo.financialStatus == 1
          ) {
            // this.detailData.typeData = {
            //   title: "交易取消",
            //   type: []
            // };
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [],
              btnShow:[false,false,false,false]
            });
          } else if (this.detailData.orderVo.logisticsStatus == 11) {
            // this.detailData.typeData = {
            //   title: "退款成功",
            //   type: []
            // };
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [],
              btnShow:[false,false,false,false]
            });
          } else if (
            this.detailData.orderVo.financialStatus == 1 &&
            this.detailData.orderVo.paymentType != 1 &&
            this.detailData.orderVo.logisticsStatus == 1
          ) {
            // this.detailData.typeData = {
            //   title: "待支付",
            //   type: [3, 4]
            // };
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [3, 4],
              btnShow:[false,false,true,true]
            });
          } else if (
            (this.detailData.orderVo.financialStatus != 1 &&
              this.detailData.orderVo.logisticsStatus == 1) ||
            this.detailData.orderVo.logisticsStatus == 3 ||
            this.detailData.orderVo.logisticsStatus == 4 ||
            this.detailData.orderVo.logisticsStatus == 5
          ) {
            // this.detailData.typeData = {
            //   title: "等待商家发货",
            //   type: [1, 4]
            // };
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [1, 4],
              btnShow:[true,false,false,true]
            });
          } else if (
            this.detailData.orderVo.logisticsStatus == 10 &&
            this.detailData.orderVo.financialStatus == 1
          ) {
            // this.detailData.typeData = {
            //   title: "自动取消",
            //   type: []
            // };
            this.$set(this.detailData, "typeData", {
              title: "商家已发货",
              type: [],
              btnShow:[false,false,false,false]
            });
          }
        //   this.type = this.detailData.typeData.type;
          console.log(this.detailData.typeData.btnShow,333);
        }
      })
      .catch(err => {});
  },
  onShow() {},
  created() {},
  data() {
    return {
      detailData: null, //订单信息
      type:""
    };
  },
  components: {},
  methods: {},
  computed: {
    buttonIsShow(val) {
      let flag = false;
      if (this.detailData != null) {
        if (this.detailData.typeData.type.indexOf(val) != -1) {
          flag = true;
        } else {
          flag = false;
        }
      }

      return flag;
    }
  }
};
</script>
<style>
    .munu{
        display: flex;
        justify-content: space-around;
    }
</style>

<template>
  <div>
    <!-- 第一个板块 -->
    <van-panel title="提货信息" >
      <div class="item">
        <div class="left">
          提货时间
        </div>
        <div class="right">
          预计2019-6-25(周二)可提货
        </div>
      </div>
      <div class="item">
        <div class="left">
          团长信息
        </div>
        <div class="right">
          宋雪 13082227657
        </div>
      </div>
      <div class="item">
        <div class="left">
          提货地点
        </div>
        <div class="right">
          兴隆大厦醒了大厦对对对王
        </div>
      </div>
    </van-panel>
    <!-- 第二个板块 -->
    <van-panel title="商品信息" >
      <div class="item">
        <div class="left">
          提货时间
        </div>
        <div class="right">
          预计2019-6-25(周二)可提货
        </div>
      </div>
      
    </van-panel>
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
    
</style>

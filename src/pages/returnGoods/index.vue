<template>
  <div class="page" v-if="pageData!=null">
    <div class="bg">{{ pageData.reName}}</div>
    <div class="codeType">
      <div class="title">{{pageData.reContent}}</div>
      <div class="message">退款编号:&nbsp;{{pageData.myReCode}}</div>
      <div class="message">申请时间:&nbsp;{{pageData.myReCreateTime}}</div>
      <div class="message">商家同意或超时未处理，系统将退款给您</div>
      <div class="message">如商家拒绝，您可以联系商家后再次发起，商家会重新处理</div>
      <div style="height:50rpx;" v-show="pageData.myReStatus=='0'&&pageData.myReType=='1'">
        <button class="cancelBtn" @click="cancelRefund(pageData)">撤销申请</button>
      </div>
    </div>

    <div class="codeSession">
      <div class="title">退款进度</div>
      <van-steps custom-class="stepStyle" :steps="steps" :active="active"/>
    </div>

    <div class="codeSession">
      <div class="title">退货说明</div>
      <div class="content">
        <div>
          <span class="spanStyle">收</span>
          <span>陈小陈</span>
          <span>16601048888</span>
        </div>
        <div class="address">辽宁省盘锦市兴隆台区水游城回迁办公楼1号楼10层1007</div>
      </div>
      <div class="returnSession">
        <p>1.商品自售出之日起30日内，电器商品出现质量问题（机器本身发生性能故障）予以退换。顾客不愿意退换货，愿意维修的，进行额外补偿购机金额的10%。</p>
        <p>2.购机60日内商品磨损影响二次销售及缺少配件，商场承担磨损费和缺少配件的40%费用。</p>
        <p>3.购机90日内商品磨损影响二次销售及缺少配件，商场承担磨损费和缺少配件的30%费用。</p>
      </div>
      <ul>
        <li>
          <span></span>未与商家协商一致，请勿自行退货，以免商家拒收货物。
        </li>
        <li>
          <span></span>交易的钱款还在高山中间平台，确保您的资金安全。
        </li>
        <li>
          <span></span>请与商家确认真实的退货物流信息，逾期未确认申请将关闭。
        </li>
      </ul>
    </div>

    <div class="codeSession">
      <div class="title">退款信息</div>
      <div class="cardStyleRow">
        <van-card
          custom-class="cardStyle"
          v-for="(item, index) in pageData.orderLines"
          :num="item.quantity"
          :key="index"
          :price="item.subTotal"
          :title="item.itemName"
          :thumb="'http://qn.gaoshanmall.cn/'+ item.itemImg"
        >
          <view slot="footer">退货数量:{{item.refundNum}}</view>
        </van-card>
      </div>
      <div class="cardType">
        <p>
          <span>退款原因</span>
          {{pageData.myReReason}}
        </p>
        <p>
          <span>申请退款金额</span>
          {{pageData.myApplyRefundAmount}}
        </p>
        <p>
          <span>实际退款金额</span>
          {{pageData.myActualRefundAmount}}
        </p>
        <p>
          <span>退款说明</span>
          {{pageData.myRemark}}
        </p>
        <p>
          <span>申请时间:{{pageData.myReCreateTime}}</span>
        </p>
        <p>
          <span>退款编号</span>
          {{pageData.myReCode}}
        </p>
      </div>
    </div>
  </div>
</template>
<style lang='scss'>
.cancelBtn {
  float: right;
  width: 140rpx;
  height: 48rpx;
  border: 1rpx solid rgba(255, 108, 0, 1);
  border-radius: 6rpx;
  color: rgba(255, 108, 0, 1);
  font-size: 26rpx;
  line-height: 48rpx;
}
.cardStyle {
  background: #fff !important;
  margin-bottom: 10px;
  view {
    background: #fff;
  }
}
.cardStyleRow {
  padding: 10px;
  border-bottom: 1px solid #e3e3e3;
}
.bg {
  width: 100%;
  height: 75px;
  background: rgb(214, 70, 30);
  text-align: center;
  line-height: 75px;
  padding-left: 10px;
  color: #fff;
  font-size: 18px;
}
.codeType {
  background: #fff;
  padding: 10px;
  .title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .message {
    font-size: 13px;
    color: #999;
    margin-bottom: 8px;
  }
}

.codeSession {
  background: #fff;
  margin-top: 10px;
  padding: 10px;
  .title {
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e3e3e3;
    font-size: 14px;
  }
  .content {
    padding: 10px 0;
    background: #fbfbfb;
    margin-bottom: 10px;
    div {
      height: 25px;
      line-height: 25px;
      display: flex;
      vertical-align: middle;
      .spanStyle {
        display: inline-block;
        color: #ab2b2b;
        height: 18px;
        line-height: 18px;
        width: 18px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #ab2b2b;
        font-size: 10px;
      }
      span {
        margin-right: 10px;
      }
    }
  }
  .returnSession p {
    color: #666;
    font-size: 13px;
    line-height: 20px;
    margin-bottom: 5px;
  }
  ul li {
    font-size: 12px;
    color: #999;
    height: 15px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    span {
      border-radius: 50%;
      height: 5px;
      width: 5px;
      display: inline-block;
      background: #999;
      margin-right: 5px;
    }
  }
  .cardType {
    padding: 10px 0;
    p {
      height: 25px;
      line-height: 25px;
      color: #999;
      font-size: 13px;
      span {
        margin-right: 10px;
      }
    }
  }
}

.van-step:first-child .van-step__title {
  position: absolute;
  left: -25px;
}
.van-step:last-child .van-step__title {
  width: 100%;
  height: 45px;
  position: relative;
}
.van-step--horizontal:last-child {
  width: 25% !important;
  height: 45px;
}
.van-step:last-child .van-step__title view:first-child {
  position: absolute;
  left: 15px;
  top: 0px;
  width: 100%;
}
.van-step:last-child .van-step__title view:last-child {
  position: absolute;
  left: 10px;
  top: 15px;
  width: 100%;
  height: 30px;
}

.stepStyle {
  width: 95%;
  .van-step__title {
    height: 45px;
    width: 100%;
    overflow: hidden;

    view,
    text {
      font-size: 11px;
      height: 15px;
      text-align: center;
    }
    view:nth-child(2) {
      height: 30px;
      width: 60%;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>
<script>
import { findRefundOrderDetail } from "../../api/return/index";
import { giveUpRefund } from "../../api/refund/index";

export default {
  onShow() {
    this.getPageData();
  },
  data() {
    return {
      steps: [
        {
          text: "提交申请",
          desc: ""
        },
        {
          text: "",
          desc: ""
        },
        {
          text: "仓库收货",
          desc: ""
        },
        {
          text: "处理完成",
          desc: ""
        }
      ],
      active: 0,
      pageData: null,
      stepsData: ""
    };
  },
  methods: {
    //撤销退货
    cancelRefund(data) {
      wx.showModal({
        title: "提示",
        content: "确认撤销吗",
        success: res => {
          if (res.confirm) {
            let params = {
              code: data.reCode,
              refundType: data.reType
            };
            giveUpRefund(params)
              .then(res => {
                wx.navigateBack({
                  delta: 1
                });
              })
              .catch(err => {
                wx.showToast({
                  title: err.data.message,
                  icon: "nonde",
                  duration: 2000
                });
              });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });

      let params = {
        code: data.reCode,
        refundType: data.reType
      };
      giveUpRefund(params)
        .then(res => {})
        .catch(err => {});
    },
    async getPageData() {
      let data = await findRefundOrderDetail({
        reCode: wx.getStorageSync("refundCode")
      });
      this.pageData = data.data.result;
      // this.pageData.remark == null
      //   ? (this.pageData.remark = "无")
      //   : this.pageData.remark=this.pageData.remark;
      // this.pageData.reReason == null
      //   ? (this.pageData.reReason = "无")
      //   : this.pageData.reReason=this.pageData.reReason;
      this.pageData.orderLines = this.pageData.orderLines.filter(goods => {
        return goods.selectStatus == "1";
      });
      console.log(this.pageData);

      this.stepsData = this.pageData.restatusChangeInfo;
      if (this.pageData.restatusChangeInfo.length > 0) {
        this.steps[0].desc = this.pageData.reCreateTime;
      }

      if (this.stepsData.length > 0) {
        if (this.stepsData[0].afterStatus == 2) {
          this.steps[1].text = "审核驳回";
          this.active = 1;
          this.steps[1].desc = this.stepsData[0].createTime;
        } else {
          this.steps[1].text = "审核通过";
          this.active = 1;
          this.steps[1].desc = this.stepsData[0].createTime;
        }
        if (this.stepsData[1]) {
          if (this.stepsData[1].afterStatus == 6) {
            this.steps[2].text = "仓库收货";
            this.active = 2;
            this.steps[2].desc = this.stepsData[1].createTime;
          }
        }
        if (this.stepsData[2]) {
          if (this.stepsData[2].afterStatus == 8) {
            this.steps[3].text = "仓库收货";
            this.active = 3;
            this.steps[3].desc = this.stepsData[2].createTime;
          }
        }
      } else {
        this.steps[1].text = "待审核";
      }
      console.log("1111");
      this.$set(this.pageData, "reName", "");
      this.$set(this.pageData, "reContent", "");
      this.$set(this.pageData, "myReCreateTime", this.pageData.reCreateTime);
      this.$set(this.pageData, "myReCode", this.pageData.reCode);
      this.$set(this.pageData, "myReReason", this.pageData.reReason);
      this.$set(this.pageData, "myRemark", this.pageData.remark);
      this.$set(this.pageData, "myReStatus", this.pageData.reStatus);
      this.$set(this.pageData, "myReType", this.pageData.reType);
      this.$set(
        this.pageData,
        "myApplyRefundAmount",
        this.pageData.applyRefundAmount
      ); //申请退款金额
      this.$set(
        this.pageData,
        "myActualRefundAmount",
        this.pageData.actualRefundAmount
      ); //实际退款金额
      if (this.pageData.reType == 1) {
        if (this.pageData.reStatus == 0) {
          this.pageData.reName = "已提交退申请";
          this.pageData.reContent = "您的退货申请已提交,请等待商家审核!";
        } else if (this.pageData.reStatus == 1 || this.pageData.reStatus == 3) {
          this.pageData.reName = "商家已同意";
          this.pageData.reContent = "您的退货申请已同意,请买家尽快退货!";
        } else if (this.pageData.reStatus == 6 && this.pageData.reType == 1) {
          this.pageData.reName = "仓库已收货";
          this.pageData.reContent = "您的退货仓库已收货,请等待商家退款.";
        } else if (
          this.pageData.reStatus == 8 &&
          this.pageData.reType == 1 &&
          this.pageData.reFinancialStatus == 1
        ) {
          this.pageData.reName = "商家已退款";
          this.pageData.reContent = "商家已退款,请注意您的付款账户到账记录.";
        } else if (this.pageData.reStatus == 2) {
          this.pageData.reName = "商家已拒绝";
          this.pageData.reContent = "您的退货申请已拒绝!";
        }else if(this.pageData.reStatus == 10){
          this.pageData.reName = "买家已撤销";
          this.pageData.reContent = "买家已撤销此次退货申请!";
        }
      }
    }
  }
};
</script>


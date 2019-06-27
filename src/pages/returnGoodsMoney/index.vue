<template>
  <div class="page">
    <div class="bg">
     {{ pageData.reName}}
    </div>
	  <div class="codeType">
		  <div class="title">{{pageData.reContent}}</div>
		  <div class="message">退款编号:&nbsp;{{pageData.reCode}}</div>
		  <div class="message">申请时间:&nbsp;{{pageData.reCreateTime}}</div>
	  </div>
	  
	  <div class="codeSession">
		  <div class="title">退款进度</div>
		  <van-steps
			  custom-class="stepStyle"
			  :steps="steps"
			  :active="active"
		  />
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
			  />
		  </div>
		  <div class="cardType">
			  <p><span>退款原因</span>{{pageData.reReason}}</p>
			  <p><span>退款金额</span>{{pageData.applyRefundAmount}}</p>
			  <!--<p><span>退款说明</span>{{pageData.reReason}}</p>-->
			  <p><span>申请件数</span>{{pageData.reReason}}</p>
			  <p><span>申请时间</span>{{pageData.reCreateTime}}</p>
			  <p><span>退款编号</span>{{pageData.code}}</p>
		  </div>
	  </div>
  </div>
</template>
<style lang='scss'>
.cardStyle {
	background: #fff!important;
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
  text-align: left;
	line-height: 75px;
	padding-left: 10px;
	color: #fff;
	font-size: 18px
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
	.returnSession p{
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
		align-items:center;
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


.stepStyle {
	.van-step__title {
		height: 45px;
		view, text {
			font-size: 11px;
			height: 15px;
			text-align: center;
		}
		view:nth-child(2) {
			height: 30px;
			margin: 0 auto;
			text-align: center;
		}
	}
}


</style>
<script>
import { findRefundOrderDetail} from "../../api/return/index";
export default {
  onShow() {
    this.getPageData();
  },
  data() {
    return {
      steps:[
        {
          text: '处理中',
          desc: ''
        },
        {
          text: '',
          desc: ''
        }
      ],
      active: 0,
      pageData: '',
	    stepsData: ''
    };
  },
  methods: {
    async getPageData() {
      let data = await findRefundOrderDetail({
	      reCode: '16534794497810432030703'
      })
	    this.pageData = data.data.result;
      console.log(this.pageData);
      this.stepsData = this.pageData.restatusChangeInfo;
      this.steps[0].desc = this.pageData.reCreateTime;
      if(this.stepsData.length > 0) {
        if (this.stepsData[0].afterStatus == 2)  {
          this.steps[1].text = '审核驳回';
	        this.active = 1;
          this.steps[1].desc = this.stepsData[0].createTime;
        }else {
          this.steps[1].text = '审核通过';
          this.active = 1;
          this.steps[1].desc = this.stepsData[0].createTime;
        }
        if(this.stepsData[1]) {
          if (this.stepsData[1].afterStatus == 6) {
            this.steps[2].text = '仓库收货';
            this.active = 2;
            this.steps[2].desc = this.stepsData[1].createTime;
          }
        }
        if(this.stepsData[2]) {
          if (this.stepsData[2].afterStatus == 8) {
            this.steps[3].text = '仓库收货';
            this.active = 3;
            this.steps[3].desc = this.stepsData[2].createTime;
          }
        }
        
      }else {
        this.steps[1].text = '待审核'
      }
      if(this.pageData.reType == 1) {
        if ( this.pageData.reStatus == 0) {
          this.pageData.reName = '已提交退申请';
          this.pageData.reContent = '您的退货申请已提交,请等待商家审核!';
        } else if ( this.pageData.reStatus == 1 || this.pageData.reStatus == 3) {
          this.pageData.reName = '商家已同意';
          this.pageData.reContent = '您的退货申请已同意,请买家尽快退货!';
        } else if ( this.pageData.reStatus == 6 && this.pageData.reType == 1) {
          this.pageData.reName = '仓库已收货';
          this.pageData.reContent = '您的退货仓库已收货,请等待商家退款.';
        } else if (this.pageData.reStatus == 8 && this.pageData.reType == 1 && this.pageData.reFinancialStatus == 1) {
          this.pageData.reName = '商家已退款';
          this.pageData.reContent = '商家已退款,请注意您的付款账户到账记录.';
        } else if (this.pageData.reStatus == 2) {
          this.pageData.reName = '商家已拒绝';
          this.pageData.reContent = '您的退货申请已拒绝!';
        }
      }
    }
  }
};
</script>


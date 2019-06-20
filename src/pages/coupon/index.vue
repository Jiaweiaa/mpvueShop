<template>
  <div class="index">
	  <van-tabs @change="changeTab">
		  <van-tab title="未使用" name="couponsUnUsed">
			  <noDataView v-show="(couponList.length <=0  && onLoadLoading == false)"></noDataView>
			  <div class="quan clear" v-show="couponList.length > 0" v-for="(item, index) in couponList" :key="index">
				  <div class="quanLeft">
					  <p class="money">{{item.name}}</p>
					  <p class="conts">无满额限制,立减折扣</p>
					  <p class="dates">有效期: {{item.startDate}} - {{item.endDate}}</p>
				  </div>
				  <div class="quanRight">
					  <p class="ft">折扣券</p>
					  <p class="sd">仅限{{item.storeName}}使用</p>
				  </div>
			  </div>
		  </van-tab>
		  <van-tab title="已使用" name="couponsUsed"></van-tab>
		  <van-tab title="已失效" name="couponsOver"></van-tab>
	  </van-tabs>
  </div>
</template>

<script>
  import { getMemberCoupon } from "../../api/coupon/index"
  import noDataView  from '../../components/noDataView/index'


  export default {
    onShow() {
      this.getList();
    },
    components: {
      noDataView
    },
    data() {
      return {
        listData: '',
	      couponList: [],
        onLoadLoading: false
      };
    },
    methods: {
      getList() {
        this.onLoadLoading = false;
        getMemberCoupon().then(res => {
          this.list = res.data.result;
          this.onLoadLoading = true;
        })
      },
      changeTab(val) {
        this.couponList = this.list[val.mp.detail.name]
      }
    },
    created() { }
  };
</script>

<style lang='scss' scoped>
	.quan{
		position: relative;
		width: 96%;
		margin: 5% auto;
		padding: 6px;
		padding-right:0;
		box-sizing: border-box;
		background-color: #ff6347;
		color: #fff;
		background-image: radial-gradient(#fff 35%,#ff6374 35%);
		background-size: 17px 17px;
		background-position: -9px 0;
		background-repeat: repeat-y
	}
	.clear::after{
		content: "";
		display: block;
		clear: both;
	}
	.quanLeft{
		float: left;
		width: 70%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
		background-image: radial-gradient(#fff 35%,#ff6374 35%);
		background-size: 7px 7px;
		background-position: right 0;
		background-repeat: repeat-y
	}
	.quanRight{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		box-sizing: border-box;
		width: 30%;
		padding: 12px;
		text-align: center;
		background-image: radial-gradient(#fff 35%,#ff6374 35%);
		background-size: 17px 17px;
		background-position: 109% 0;/* 不支持 calc 属性就会以109%为准 */
		background-position: calc(100% + 9px) 0;
		background-repeat: repeat-y
	}
	.money{
		margin-bottom: 6px;
		margin-right: 8px;
		font-size: 26px;
		font-weight: bold;
		border-bottom: 1px solid #fff;
		line-height: 1.6;
		color: #fff;
	}
	.tit{
		font-size: 17px;
		color: #fff;
	}
	.conts{
		font-size: 13px;
		color: #fff;
	}
	.dates{
		font-size: 12px;
		color: #fff;
	}
	.ft{
		margin: 3% auto;
		width: 16px;
		color: #fff;
	}
	.sd{
		display: inline-block;
		font-size: 12px;
		border: 1px solid #fff;
		margin-top: 6px;
		padding:3px 5px;
		color: #fff;
	}
</style>

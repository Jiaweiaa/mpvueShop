<template>
  <div class="index">
	  
	  <van-tabs @change="changeTab" >
		  <van-tab title="未使用">
			  <noDataView v-if="(couponList.length <=0  && onLoadLoading == false)"></noDataView>
			  <div class="quan clear" v-if="couponList.length > 0" v-for="(item, index) in couponList" :key="index">
				  <div class="quanLeft">
					  <p class="money">{{item.name}}</p>
					  <p class="conts">{{item.mDescription.scope}},{{item.mDescription.name}}</p>
					  <p class="dates">有效期: {{item.mDescription.date}} </p>
				  </div>
				  <div class="quanRight">
					  <p class="ft">{{item.mDescription.action}}</p>
					  <p class="sd">{{item.mDescription.amount}}</p>
				  </div>
			  </div>
		  </van-tab>
		  <van-tab title="已使用">
			  <noDataView v-if="(couponList.length <=0  && onLoadLoading == false)"></noDataView>
			  <div class="quanUse clear" v-if="couponList.length > 0" v-for="(item, index) in couponList" :key="index">
				  <div class="titleType">已使用</div>
				  <div class="quanLeftUse">
					  <p class="money">{{item.name}}</p>
					  <p class="conts">{{item.mDescription.scope}},{{item.mDescription.name}}</p>
					  <p class="dates">有效期: {{item.mDescription.date}} </p>
				  </div>
				  <div class="quanRightUse">
					  <p class="ft">{{item.mDescription.action}}</p>
					  <p class="sd">{{item.mDescription.amount}}</p>
				  </div>
			  </div>
		  </van-tab>
		  <van-tab title="已失效">
			  <noDataView v-if="(couponList.length <=0  && onLoadLoading == false)"></noDataView>
			  <div class="quanUse clear" v-if="couponList.length > 0" v-for="(item, index) in couponList" :key="index">
				  <div class="titleType">已过期</div>
				  <div class="quanLeftUse">
					  <p class="money">{{item.name}}</p>
					  <p class="conts">{{item.mDescription.scope}},{{item.mDescription.name}}</p>
					  <p class="dates">有效期: {{item.mDescription.date}} </p>
				  </div>
				  <div class="quanRightUse">
					  <p class="ft">{{item.mDescription.action}}</p>
					  <p class="sd">{{item.mDescription.amount}}</p>
				  </div>
			  </div>
		  </van-tab>
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
        wx.showLoading({
	        title: '数据加载中'
        });
        this.onLoadLoading = true;
        getMemberCoupon().then(res => {
          this.list = res.data.result;
          this.couponList = this.list.couponsUnUsed;
          this.onLoadLoading = false
          wx.hideLoading();
        })
      },
      changeTab(val) {
        if(val.mp.detail.title == '未使用') {
          this.couponList = this.list.couponsUnUsed;
        }else if(val.mp.detail.title == '已使用') {
          this.couponList = this.list.couponsUsed;
        }else {
          this.couponList = this.list.couponsOver;
        }
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
	
	.quanUse{
		position: relative;
		width: 96%;
		overflow: hidden;
		margin: 5% auto;
		padding: 6px;
		padding-right:0;
		box-sizing: border-box;
		background-color: #ccc;
		color: #fff;
		background-image: radial-gradient(#fff 35%,#ccc 35%);
		background-size: 17px 17px;
		background-position: -9px 0;
		background-repeat: repeat-y
	}
	.clear::after{
		content: "";
		display: block;
		clear: both;
	}
	.quanLeftUse{
		float: left;
		width: 70%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
		background-image: radial-gradient(#fff 35%,#ccc 35%);
		background-size: 7px 7px;
		background-position: right 0;
		background-repeat: repeat-y
	}
	.quanRightUse{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		box-sizing: border-box;
		width: 30%;
		padding: 12px;
		text-align: center;
		background-image: radial-gradient(#fff 35%,#ccc 35%);
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
		font-size: 16px;
		margin-top: 6px;
		padding:3px 5px;
		color: #fff;
	}
	
	.titleType {
		position: absolute;
		width:100px;
		height:25px;
		z-index: 999;
		font-size: 12px;
		text-align: center;
		right: -60rpx;
		top: 5rpx;
		line-height: 25px;
		background-color:#ccc;
		border: 1px solid #fff;
		color:#fff;
		/* Rotate div */
		transform:rotate(40deg);
		-ms-transform:rotate(40deg); /* Internet Explorer */
		-moz-transform:rotate(40deg); /* Firefox */
		-webkit-transform:rotate(40deg); /* Safari 和 Chrome */
		-o-transform:rotate(40deg); /* Opera */
	}
</style>

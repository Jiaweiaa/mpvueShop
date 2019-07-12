<template>
  <div class="my">
    <div class="myinfo">
	    <div class="myMoney">
		   <p>我的佣金</p>
		   <p>¥&nbsp;{{teamData.commission}}</p>
	     </div>
	    <div class="noMoney">
		    <p>未到账佣金</p>
		    <p>¥&nbsp;{{teamData.undrawnCommission}}</p>
	    </div>
	    <van-button style="position: absolute; right: 20px; bottom: 50px;" size="small" @click="getWithdraw" custom-class="btnClass" round plain type="default">申请提现</van-button>
    </div>
	  <div class="boxMenu">
		  <van-tabs color="#ab2b2b" @change="tabChange">
			  <van-tab title="佣金记录">
				  <div class="noData" v-if="listData <= 0">
					  没有数据啦～
				  </div>
				  <div v-else>
					  <div>
						  <div class="item" v-for="(item, index) in listData" :key="index">
							  <div class="box">
								  <div class="title">{{item.commissionType == 3 ? '提现佣金' : '到账佣金'}}</div>
								  <div class="money">￥{{item.commission}}</div>
								  <div class="date">{{item.createTime}}</div>
							  </div>
						  </div>
					  </div>
					  <div style="width: 100%; text-align: center;margin-top: 5px;">
						  <div class="endTitle" v-if="allCount!=''&&listData.length >= allCount && listData.length > 0">
							  <span>—</span>
							  <span>我也是有底线的</span>
							  <span>—</span>
						  </div>
					  </div>
				  </div>
			  </van-tab>
			  <van-tab title="未到账佣金">
				  <div class="noData" v-if="listData <= 0">
					  没有数据啦～
				  </div>
				  <div v-else>
					  <div>
						  <div class="item" v-for="(item, index) in listData" :key="index">
							  <div class="box">
								  <div class="title">未到账佣金</div>
								  <div class="money">￥{{item.commission}}</div>
								  <div class="date">{{item.createTime}}</div>
							  </div>
						  </div>
					  </div>
					  <div style="width: 100%; text-align: center;margin-top: 5px;">
						  <div class="endTitle" v-if="allCount!=''&&listData.length >= allCount && listData.length > 0">
							  <span>—</span>
							  <span>我也是有底线的</span>
							  <span>—</span>
						  </div>
					  </div>
				  </div>
			  </van-tab>
		  </van-tabs>
	  </div>
  </div>
</template>

<script>
  import {
    myDetile,
    getCommissonRecordPage
  } from "../../api/myTeam/index";
  export default {
    onShow() {
      this.getTeamData();
      this.getData();
    },
    data() {
      return {
        teamData: {},
	      listData: [],
        commissionType: 1,
        allCount: 0,
        pageNum: 1,
        loading: false
      };
    },
    // 上啦加载
    async onReachBottom() {
      if (this.loading) return;
      wx.showLoading({
        title: "加载中"
      });
      this.loading = true;
      if (this.listData.length >= this.allCount) {
        this.loading = false;
        wx.hideLoading();
      } else {
        this.pageNum++;
        const res = await getCommissonRecordPage({
          pageNum: this.pageNum,
          commissionType: this.commissionType
        });
        if (res.data.code == 200) {
          this.loading = false;
          this.listData = this.listData.concat(res.data.result.records);
          this.allCount = res.data.result.total;
        } else {
          this.loading = false;
        }
        wx.hideLoading();
      }
    },

    // 下啦刷新
    async onPullDownRefresh() {
      this.pageNum = 1;
      this.getData();
      wx.stopPullDownRefresh(); //停止下拉刷新
    },
    methods: {
      // 去提现
      getWithdraw() {
        wx.navigateTo({
          url: "/pages/withdraw/main"
        });
      },
      // 获取数据
      async getData() {
        wx.showLoading({
          title: "加载中"
        });
        let data = await getCommissonRecordPage({
          commissionType: this.commissionType
        });
        this.listData = data.data.result.records;
        this.allCount = data.data.result.total;
        wx.hideLoading();
      },
	    
      // 详情
      async getTeamData() {
        let data = await myDetile();
        this.teamData = data.data.result;
      },
	    
	    // tab 切换
      tabChange(val) {
	      if(val.mp.detail.index == 0) {
	        this.commissionType = 1;
	      }else {
	        this.commissionType = 0;
	      }
	      this.pageNum = 1;
	      this.getData();
      }
    },
    computed: {}
  };

</script>
<style>
	page {
		background: #eee;
	}
</style>
<style lang='scss' scoped>
	.my {
		position: relative;
		.myinfo {
			width: 100%;
			height: 184px;
			background: $main-color;
			padding: 0 30rpx;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			top: 0;
			.myMoney {
				width: 100%;
				color: #fff;
				height: 50px;
				margin-top: 20px;
				margin-bottom: 20px;
				p {
					font-size: 16px;
				}
			}
			.noMoney {
				width: 100%;
				color: #fff;
				p {
					font-size: 13px;
				}
			}
			p {
				color: #fff;
			}
		}
		.noData {
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			font-size: 12px;
			color: #ccc;
		}
	}
	
  .boxMenu {
		width: 95%;
		overflow: hidden;
		background: #fff;
		border-radius: 10px;
	  position: absolute;
	  left: 1.5%;
	  top: 150px;
	  .item {
		  height: 80px;
		  padding: 10px 15px 0;
		  .box {
			  border-bottom: 1px solid #cccccc;
			  position: relative;
			  height: 98%;
			  .title {
				  position: absolute;
				  top: 15px;
				  left: 20px;
				  font-weight: bold;
			  }
			  .money {
				  position: absolute;
				  top: 15px;
				  right: 20px;
				  color: #ab2b2b;
			    font-size: 16px;
			  }
			  .date {
				  position: absolute;
				  top: 48px;
				  left: 20px;
				  font-size: 13px;
				  color: #8c9bae;
			  }
		  }
	  }
	}
	
	.endTitle {
		text-align: center;
		padding: 20rpx 0;
		margin-bottom: 10px;
		width: 100%;
		span:nth-child(2) {
			font-size: 24 rpx;
			color: #333;
			padding: 0 10 rpx;
		}
		span:nth-child(2n + 1) {
			color: #999;
		}
	}
</style>
<style>
	.btnClass {
		background: rgba(255,255,255,0.3)!important;
		color: #fff!important;
		border: none!important;
		padding: 0 12px!important;
	}
	.myMenu .van-icon {
		margin-top: 22px;
		margin-left: 30px;
		float: left;
	}
</style>

<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-09-28 17:17:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="my">
    <div class="myinfo">
      <div class="noMoney">
		    <p>到账佣金</p>
		    <p>¥&nbsp;{{teamData.undrawnCommission}}</p>
	    </div>
	    <div class="myMoney">
		   <p>未到账佣金</p>
		   <p>¥&nbsp;{{teamData.commission}}</p>
	     </div>
        <div class="tixian" @click="getWithdraw">
          <img src="/static/images/myCommission/tixian.png" alt="">
        </div>
	    <!-- <van-button style="position: absolute; right: 20px; bottom: 50px;" size="small" @click="getWithdraw" custom-class="btnClass" round plain type="default">申请提现</van-button> -->
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
								  <div class="title">{{item.type == 1 ? '到账佣金' : '未到账佣金'}}</div>
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
			  <van-tab title="提现记录">
				  <div class="noData" v-if="listData <= 0">
					  没有数据啦～
				  </div>
				  <div v-else>
					  <div>
						  <div class="item" v-for="(item, index) in listData" :key="index">
							  <div class="box">
								  <div class="title">提现佣金<span style="font-size: 12px; margin-left: 5px; color: #ab5b5b;">{{item.status== 1 ? '提现中': '提现已到账'}}</span></div>
								  <div class="money">￥{{item.amount}}</div>
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
    getMemRelationshipRecordingByMemberId,
    getMemWithdrawRecordingByMemberId
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
	      first: true,
        commissionType: '',
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
        const res = await this.commissionType({
          pageNum: this.pageNum,
	        pageSize: 10
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
        if(this.first)   this.commissionType = getMemRelationshipRecordingByMemberId;
        this.first = false;
        wx.showLoading({
          title: "加载中"
        });
        let data = await this.commissionType({
	        pageNum: 1,
	        pageSize: 10
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
	        this.commissionType = getMemRelationshipRecordingByMemberId;
	      }else {
	        this.commissionType = getMemWithdrawRecordingByMemberId;
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
	@import "./style";
</style>


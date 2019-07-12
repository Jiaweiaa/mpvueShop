<template>
	<div class="captain_rank">
    <div class="my">
      <div class="myinfo">
			<image
				class="avatar"
				mode="scaleToFill"
				:src="teamData.avatar ? teamData.avatar : 'http://m.360buyimg.com/pop/jfs/t25639/76/221614415/35426/e4e1d66a/5b6974a6N56a3b40d.jpg'">
			</image>
			<open-data :type="teamData.avatar" ></open-data>
			<div class="title">{{teamData.name}}<van-tag style="margin-left: 5px;" color="#fff" mark plain>{{teamData.city}}</van-tag></div>
			<div class="myAddress">我的社区: {{teamData.community}}</div>
			<div class="money">总佣金:<span style="color:rgb(122,239,185); margin-left: 10px; font-size: 16px">¥&nbsp;{{teamData.commission}}</span></div>
			<div class="rank">第<span style="padding: 0 5px; display:inline-block; font-size: 28px">{{reakingNum	}}</span>名</div>
		</div>
		<div class="list">
			<div class="child" v-for="(item, index) in reakingList" :key="index">
				<div class="num" :class="(index + 1) == 1 ? 'first' : (index + 1) == 2 ? 'second' : (index + 1) == 3 ? 'three' : 'otherNum'">{{index + 1}}.</div>
				<image
					class="avatar"
					mode="scaleToFill"
					:src="item.avatar ? item.avatar : 'http://m.360buyimg.com/pop/jfs/t25639/76/221614415/35426/e4e1d66a/5b6974a6N56a3b40d.jpg'">
				</image>
				<div class="title">{{item.name}}<van-tag style="margin-left: 5px;" color="#ab2b2b" mark plain>{{item.city}}</van-tag></div>
				<div class="myAddress">社区: {{item.community}}</div>
				<div class="money">¥&nbsp;{{item.commission}}</div>
				<div class="all">总佣金</div>
			</div>
			<div style="width: 100%; text-align: center;margin-top: 5px;">
				<div class="endTitle" v-if="allCount!=''&&reakingList.length >= allCount && reakingList.length > 0">
					<span>—</span>
					<span>我也是有底线的</span>
					<span>—</span>
				</div>
			</div>
		</div>
    </div>
		
	</div>
</template>

<script>
  import {
    getCaptainPageByCommission,
	  myDetile
  } from "../../api/myTeam/index";
  export default {
    onShow() {
      this.getTeamData();
    },
    // 上啦加载
    async onReachBottom() {
      if (this.loading) return;
      wx.showLoading({
        title: "加载中"
      });
      this.loading = true;
      if (this.reakingList.length >= this.allCount) {
        this.loading = false;
        wx.hideLoading();
      } else {
        this.pageNum++;
        const res = await getCaptainPageByCommission({
	        pageNum: this.pageNum
        });
        if (res.data.code == 200) {
          this.loading = false;
          this.reakingList = this.reakingList.concat(res.data.result.captainDtos.records);
          this.allCount = res.data.result.captainDtos.total;
        } else {
          this.loading = false;
        }
        wx.hideLoading();
      }
    },
	  
    // 下啦刷新
    async onPullDownRefresh() {
      this.pageNum = 1;
      this.getTeamData();
      wx.stopPullDownRefresh(); //停止下拉刷新
    },
    data() {
      return {
        teamData: [],
	      reakingList: [],
        loading: '',
        pageNum: 1,
        allCount: 0,
	      reakingNum: ''
      };
    },
    components: {},
    methods: {
      async getTeamData() {
        wx.showLoading({
          title: "加载中"
        });
        let myData = await myDetile();
        this.teamData = myData.data.result;
        this.teamData.avatar ='http:' + this.teamData.avatar;
        let captData = await getCaptainPageByCommission();
        this.reakingList = captData.data.result.captainDtos.records;
        this.allCount = captData.data.result.captainDtos.total;
        this.reakingNum = captData.data.result.rownum;
        wx.hideLoading();
      },
    },
    computed: {}
  };

</script>
<style>
	page {
		background: #eee;
	}
</style>
<style lang='scss' >
@import "./style.scss";

	
</style>

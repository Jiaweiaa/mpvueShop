<template>
	<div class="list">
		<div class="row" v-for="(item, index) in listData" :key="index">
			<div class="title">{{item.operationContent}}</div>
			<div class="integral" :class="{'addNum': item.operationType == 1}">{{item.operationType == 1 ? '+': '-'}}{{item.operationAmount}}</div>
			<div class="date">{{item.createTime}}</div>
		</div>
		<div style="width: 100%; text-align: center;margin-top: 5px;">
			<div class="endTitle" v-if="allCount!=''&&listData.length >= allCount && listData.length > 0">
				<span>—</span>
				<span>我也是有底线的</span>
				<span>—</span>
			</div>
		</div>
	</div>
</template>

<script>
  import {
    getShoppingBeansLogList
  }  from '@/api/shopping/index';

  export default {
    onShow() {
      this.getList();
    },
    data() {
      return {
        listData: [],
        allCount: 0,
	      pageSize: 10,
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
        const res = await getShoppingBeansLogList({
          pageNum: this.pageNum,
          pageSize: this.pageSize
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
      this.getList();
      wx.stopPullDownRefresh(); //停止下拉刷新
    },
    methods: {
      // 数据
			async getList() {
        wx.showLoading({
          title: "加载中"
        });
        let listData = await getShoppingBeansLogList({
	        page: this.pageNum,
	        pageSize: this.pageSize
        });
        this.listData = listData.data.result.records;
        this.allCount = listData.data.result.total;
        wx.hideLoading();
			}
    }
  };

</script>
<style>
	page {
		background: #fff;
	}
</style>
<style lang='scss' scoped>
	.row {
		position: relative;
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #eee;
		height: 75px;
		.title {
			position: absolute;
			left: 0;
			top: 20px;
		}
		.integral {
			position: absolute;
			right: 0;
			top: 20px;
		}
		.date {
			position: absolute;
			left: 0;
			font-size: 13px;
			color: #999;
			top: 43px;
		}
	}
	.endTitle {
		text-align: center;
		padding: 20rpx 0;
		width: 100%;
		span:nth-child(2){
			font-size: 24rpx;
			color: #333;
			padding: 0 10rpx;
		}
		span:nth-child(2n + 1) {
			color: #999;
		}
	}
	.addNum {
		color: #ab2b2b;
	}
</style>

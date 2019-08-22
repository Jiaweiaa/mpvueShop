<template>
	<div class="index">
		<van-notify id="van-notify" />
		<div class="scrollChild" v-for="(value,index) in list" :key="index">
			<image
				class="img"
				mode="scaleToFill"
				:src="value.memberInfo? value.memberInfo.avatar : 'https://bpic.588ku.com/element_pic/19/04/16/4ee64442adb1c6e51b0e020e8c32b198.jpg!/fw/253/quality/90/unsharp/true/compress/true'"></image>
			<view class="name">{{value.memberInfo?value.memberInfo.lastName : ''}}</view>
			<view class="mobile">{{value.memberInfo?value.memberInfo.mobile: ''}}</view>
			<view class="address">{{value.memberInfo ? value.memberInfo.city: ''}}</view>
		</div>
		<div v-if="isShow" style="width: 100%; text-align: center;margin-top: 5px; margin-bottom: 5px;">
			<div v-if="list.length >= allCount" style="font-size: 13px;">全部加载完成!</div>
		</div>
	</div>
</template>

<script>
  import { myChildrenInfo } from "../../api/superior/index";

  export default {
    onShow() {
			this.getData();
    },
    data() {
      return {
        list: [],
      
        allCount: null,
        loading: false,
      
        pageNum: 1,

        isShow: false
      };
    },
    onPullDownRefresh() {
      this.page = 1;
      this.list = [];
      this.getData();
      //刷新完成后关闭
    },
    onReachBottom() {
      this.page = this.page + 1;
      if (this.list.length > this.allCount) {
        return false;
      }
      this.getData();
    },
    methods: {
      getData() {
        let params = {
          pageSize: 10,
          pageNum: this.pageNum
        }
        wx.showLoading({
          title: '加载中',
        })
        myChildrenInfo(params).then(res => {
          this.isShow = true;
          if (res.data.code == 200) {
            this.loading = false;
            this.list = this.list.concat(res.data.result.records);
            this.allCount = res.data.result.total;
          } else {
            this.loading = false
          }
          wx.hideLoading()
          wx.stopPullDownRefresh();
        }).catch(e => {
          wx.hideLoading()
        })
      }
    }
  };
</script>
<style lang='scss' scoped>
	@import "./style.scss";
	.index {
		height: 100vh;
	}
	.scrollChild {
		border-bottom: 1px solid #ccc;
		overflow: hidden;
		position: relative;
		.img {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			float: left;
			margin: 10px 20px 10px;
		}
		.name {
			margin-top: 9px;
			width: calc(100% - 100px);
			margin-left: 70px;
			font-size: 13px;
		}
		.address {
			width: calc(100% - 100px);
			height: 30%;
			margin-left: 70px;
			margin-top: 3px;
			color: #9e9e9e;
		}
		.mobile {
			width: calc(100% - 100px);
			height: 30%;
			margin-left: 70px;
			margin-top: 3px;
			color: #9e9e9e;
		}
	}
	
</style>

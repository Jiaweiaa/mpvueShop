<template>
	<div class="my">
		<div class="myinfo">
			<div class="title">{{teamData.community}}</div>
			<div class="address">{{teamData.address}}</div>
		</div>
		
		<div class="contentBox">
			<van-cell-group>
				<van-field
					:value="teamData.mobile"
					:clearable="true"
					label="手机号"
					@clear="clearNumber"
					placeholder="请输入手机号"
					@input="numberChange"
				/>
				<van-field
					:value="teamData.deliveryAddress"
					:clearable="true"
					label="提货地址"
					placeholder="请输入提货地址"
					@clear="clearAddress"
					@input="addressChange"
				/>
				<!--error-message="手机号格式错误"-->
			</van-cell-group>
			<van-button
					@click="submitData"
					square
					type="primary"
					style="position: absolute; top: 85%;left: 1.5%; width: 100%;"
					custom-class="btnClass">确认更新</van-button>
		</div>
		
		<van-notify id="van-notify" />
	</div>
</template>

<script>
  import {
    myDetile,
    udpateCaptain
  } from "../../api/myTeam/index";
  import Notify from '../../../static/vant/notify/notify';
  
  export default {
    onShow() {
      this.getTeamData();
    },
    data() {
      return {
        teamData: {
          mobile: '',
          deliveryAddress: ''
        }
      };
    },
    components: {},
    methods: {
      async getTeamData() {
        let data = await myDetile();
        this.teamData = data.data.result;
      },
      numberChange(val) {
        this.teamData.mobile = val.mp.detail;
      },
      addressChange(val) {
        this.teamData.deliveryAddress = val.mp.detail;
      },
	    clearNumber(val) {
        this.teamData.mobile = '';
	    },
	    clearAddress() {
        this.teamData.deliveryAddress = '';
      },
      submitData() {
        if(this.teamData.mobile && this.teamData.deliveryAddress) {
          let params = {
            captainId: this.teamData.id,
            mobile: this.teamData.mobile,
            deliveryAddress: this.teamData.deliveryAddress
          }
          udpateCaptain(params).then(res => {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 600
            })
	          setTimeout(() => {
              wx.navigateTo({
                url: "/pages/teamView/main"
              });
            },600)
          })
        }else {
          Notify('请填写完整');
        }
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
<style lang='scss' scoped>
	.my {
		position: relative;
		height: 100vh;
		.myinfo {
			padding: 10px 30px 0;
			width: 100%;
			height: 100px;
			background: #ab2b2b;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			top: 0;
			.title {
				height: 60px;
				line-height: 60px;
				font-size: 25px;
				color: #fff;
			}
			.address {
				height: 20px;
				line-height: 20px;
				font-size: 16px;
				color: #fff;
			}
		}
		.contentBox {
			position: absolute;
			top: 100px;
			width: 100%;
			height: calc( 100% - 100px);
		}
	}
</style>
<style>
	.btnClass {
		background: #ab2b2b !important;
		color: #fff!important;
		border: none!important;
		width: 97%;
		margin: 0 auto;
		border-radius: 10px!important;
	}
</style>

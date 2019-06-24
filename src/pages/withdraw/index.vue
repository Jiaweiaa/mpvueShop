<template>
	<div class="my">
		<div class="myinfo">
			<div class="title">输入提现金额(最低0元-手续费0%)</div>
		</div>
		
		<div class="contentBox">
			<van-cell-group>
				<van-field
						:value="teamData.withdraw"
						:clearable="true"
						label="提现金额"
						placeholder="请输入提现额"
						@input="withdrawChange"
				/>
				<van-field
					:value="teamData.name"
					:clearable="true"
					label="姓名"
					placeholder="请输入姓名"
					@input="nameChange"
				/>
				<van-field
					:value="teamData.mobile"
					:clearable="true"
					label="手机"
					placeholder="请输入手机"
					@input="mobileChange"
				/>
				<van-field
						:value="teamData.wechatAccount"
						:clearable="true"
						label="微信号"
						placeholder="请输入微信号"
						@input="wechatAccountChange"
				/>
				<!--error-message="手机号格式错误"-->
			</van-cell-group>
			<van-button
					@click="submitData"
					square
					type="primary"
					style="position: absolute; top: 85%;left: 1.5%; width: 100%;"
					custom-class="btnClass">提交申请</van-button>
		</div>
		
		<van-notify id="van-notify" />
	</div>
</template>

<script>
  import {
    toWithdrawal
  } from "../../api/myTeam/index";
  import Notify from '../../../static/vant/notify/notify';
  
  export default {
    onShow() {
    },
    data() {
      return {
        teamData: {
          withdraw: '',
          name: '',
          mobile: '',
          wechatAccount: ''
        }
      };
    },
    components: {},
    methods: {
      withdrawChange(val) {
        this.teamData.withdraw = val.mp.detail;
      },
      nameChange(val) {
        this.teamData.name = val.mp.detail;
      },
      mobileChange(val) {
        this.teamData.mobile = val.mp.detail;
      },
      wechatAccountChange(val) {
        this.teamData.wechatAccount = val.mp.detail;
      },

      submitData() {
        if(this.teamData.withdraw && this.teamData.name&& this.teamData.mobile&& this.teamData.wechatAccount&& this.teamData.withdraw >= 0) {
          let params = {
            withdraw: this.teamData.withdraw,
            name: this.teamData.name,
            mobile: this.teamData.mobile,
            wechatAccount: this.teamData.wechatAccount
          }
          toWithdrawal(params).then(res => {
            if(res.data.code == 200) {
              wx.showToast({
                title: '提现成功',
                icon: 'success',
                duration: 600
              })
              setTimeout(() => {
                wx.navigateTo({
                  url: "/pages/teamView/main"
                });
              },600)
            }else {
              Notify(res.data.message);
            }
         
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
			padding: 10px 20px 0;
			width: 100%;
			height: 40px;
			background: #ab2b2b;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			top: 0;
			.title{
				color: #fff;
			}
		}
		.contentBox {
			position: absolute;
			top: 40px;
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

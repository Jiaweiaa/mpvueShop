<template>
	<div class="feedback beTeam">
		<van-toast id="van-toast" />
		
		<div class="title">
			供应商申请请填写您的真实信息
		</div>
		<div class="connect">
			<label>
				你的姓名:
			</label>
			<input type="text" v-model="teamForm.name" placeholder="输入您的姓名">
		</div>
		<div class="connect">
			<label>
				联系电话:
			</label>
			<input type="text" v-model="teamForm.mobile" placeholder="输入您的手机号">
		</div>
		<div class="connect">
			<label>
				所在地区:
			</label>
			<input type="text" v-model="teamForm.city" placeholder="请输入所在地址">
		</div>
		<div class="connect">
			<label>
				详细地址:
			</label>
			<input type="text" v-model="teamForm.address" placeholder="请输入详细地址">
		</div>
	
		<van-button custom-class="btnStyle" class="btnView" :loading="btnLoading" loading-text="提交中..."  @click="submitMes" type="primary">提交申请</van-button>
	</div>
</template>

<script>
  import {
    post,
    login,
  } from '../../utils'
  import {
    addSupplier
  } from '../../api/beTeam'
  import Toast from '../../../static/vant/toast/toast';
  
  export default {
    mounted() {
      //判断是否登录获取用户信息
      if (login()) {
        this.userInfo = login();
      }
    },
    data() {
      return {
        userInfo: {},

        teamForm: {
          city: '',
          address: '',
          name: '',
          mobile: ''
        },
        btnLoading: false
      };
    },
    onShow() {
      if(wx.getStorageSync('address')) {
        this.teamForm.city = wx.getStorageSync('address');
      }
    },
    components: {},
    methods: {

      async submitMes() {
        for(let i in this.teamForm) {
          if(this.teamForm[i] == '') {
            Toast('请填写表单');
            return ;
          }
        }
        if(this.btnLoading) return;
        this.btnLoading = true;
        const res = await addSupplier(this.teamForm)
        if(res.data.code == 200) {
          wx.showToast({
            title: '申请成功', //提示的内容,
            icon: 'none', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {
              this.teamForm = {
                city: '',
                address: '',
                name: '',
                mobile: ''
              }
              wx.navigateBack({
                delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
              });
            }
          });
        }else {
          wx.showToast({
            title: res.message //提示的内容,
          });
        }
        this.btnLoading = false;
      },
    },
    computed: {}
  };

</script>

<style lang='scss' scoped>
	@import "./style";
</style>
<style lang="scss">
	.van-toast {
		view, text {
			color: #fff;
		}
	}
	.btnStyle {
		width: 90%;
		margin: 70px 0 0 5%;
	}
	.btnView {
		.van-button {
			background: #ab2b2b!important;
			border: 1px solid #ab2b2b!important;
			view, text {
				color: #fff;
			}
		}
	}
</style>

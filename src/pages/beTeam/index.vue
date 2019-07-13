<template>
  <div class="feedback team">
	  <van-toast id="van-toast" />
	  
    <div class="title">
      申请团长请填写您的真实信息
    </div>
    <div class="connect">
      <label>
        所在地区:
      </label>
      <input type="text" v-model="teamForm.city" placeholder="请输入所在城市">
    </div>
	  <div class="connect">
		  <label>
			  社区名称:
		  </label>
		  <input type="text" v-model="teamForm.community" placeholder="请输入所在社区">
	  </div>
	  <div class="connect">
		  <label>
			  定位社区:
		  </label>
		  <button style="font-size: 13px; color: #666; left: 14px; width: 100%; text-align: left;  vertical-align: middle; line-height: 50px;" @tap="getMap">{{teamForm.address ? teamForm.address: '点击获取定位信息'}}</button>
	  </div>
	  <div class="connect">
		  <label>
			  提货地址:
		  </label>
		  <input type="text" v-model="teamForm.deliveryAddress" placeholder="例如：xxx栋xx单元xx楼xx号">
	  </div>
	  <div class="connect">
		  <label>
			  你的姓名:
		  </label>
		  <input type="text" v-model="teamForm.name" placeholder="请输入您的姓名">
	  </div>
	  <div class="connect">
		  <label>
			  联系电话:
		  </label>
		  <input type="text" v-model="teamForm.mobile" placeholder="请输入您的手机号">
	  </div>
	  
	  <van-button custom-class="btnStyle" class="btnView" :loading="btnLoading" loading-text="提交中..."  @click="submitMes" type="primary">提交申请</van-button>
  </div>
</template>

<script>
  import {
    saveOrEditCaptain
  } from '../../api/beTeam'
  import Toast from '../../../static/vant/toast/toast';
  import amapFile from "../../utils/amap-wx";
  
  export default {
    data() {
      return {
        userInfo: {},
	      
        teamForm: {
          city: '',
	        address: '',
          community: '',
          deliveryAddress: '',
          name: '',
          mobile: '',
          latitude: '',
          longitude: ''
        },
	      btnLoading: false
      };
    },
    components: {},
	  onShow() {
      if(wx.getStorageSync('address')) {
        this.teamForm.city = wx.getStorageSync('addressToBe');
      }
	  },
    methods: {
      getMap(){
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success:(res) => {
	          let latitude = res.latitude;
	          let longitude = res.longitude;
            wx.chooseLocation({
              latitude: latitude,
              longitude: longitude,
              scale: 28,
              success: (res) => {
                this.teamForm.address = res.name;
                this.teamForm.latitude = res.latitude;
                this.teamForm.longitude = res.longitude;
              },
              fail: (error) => {
                console.log(error)
              }
            })
          }
        })
      },
	    
      async submitMes() {
        for(let i in this.teamForm) {
          if(this.teamForm[i] == '') {
            Toast('请填写表单');
            return ;
          }
        }
        if(this.btnLoading) return;
        this.btnLoading = true;
        const res = await saveOrEditCaptain(this.teamForm)
        if(res.data.code == 200) {
          wx.showToast({
            title: '申请成功', //提示的内容,
            icon: 'none', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {
              wx.navigateBack({
                delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
              });
            }
          });
        }else {
          Toast(res.data.message);
        }
        this.btnLoading =  false;
      },
    },
    computed: {}
  };

</script>
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
<style lang='scss' scoped>
  @import "./style";
</style>

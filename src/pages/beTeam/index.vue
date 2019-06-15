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
      <input type="text" v-model="teamForm.city" placeholder="请输入所在地区">
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
		  <input type="text" v-model="teamForm.address" placeholder="点击定位社区位置">
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
		  <input type="text" v-model="teamForm.name" placeholder="输入您的姓名">
	  </div>
	  <div class="connect">
		  <label>
			  联系电话:
		  </label>
		  <input type="text" v-model="teamForm.mobile" placeholder="输入您的手机号">
	  </div>
    <div @click="submitMes" class="bottom">
      提交申请
    </div>
  </div>
</template>

<script>
  import {
    post,
    login,
  } from '../../utils'
  import {
    saveOrEditCaptain
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
          community: '',
          phone: '',
          deliveryAddress: '',
          name: '',
          mobile: ''
        }
      };
    },
    components: {},
    methods: {

      async submitMes() {
        for(let i in this.teamForm) {
          if(this.teamForm[i] == '') {
            wx.showToast({
              title: '请填写表单' //提示的内容,
            });
            return ;
          }
        }

        const res = await saveOrEditCaptain(this.teamForm)
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
                  community: '',
                  phone: '',
                  deliveryAddress: '',
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
      },
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";
</style>

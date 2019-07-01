<template>
  <div class="my">
	  <van-icon class="icon" custom-class="iconBorder" name="gold-coin" size="60px" color="orange"/>
	  <div class="title">
		  我的积分
	  </div>
	  <div class="myMoney">
		  <span style="display: inline-block; vertical-align: middle;">
			  <van-icon name="points" style="margin-right: 5px;" />
		  </span>{{score}}
	  </div>
	  <div class="btnRow">
		  <van-button custom-class="btnStyle" @click="getIntegral" type="primary">充值积分</van-button>
		  <van-button custom-class="btnStyle" @click="integralList" type="default">积分明细</van-button>
	  </div>
	 
	  
	  <!--
	    充值积分
	  -->
	  <van-popup
		  :show="show"
		  position="bottom"
		  @close="onClose">
		 <div class="popupBox">
			 <div class="title">积分充值</div>
			 <div class="content">
				 <van-cell-group>
					 <van-field
						 :value="code"
						 required
						 clearable
						 label="积分code"
						 placeholder="请输入积分code"
						 @change="fieldChange"
					 />
				 </van-cell-group>
			 </div>
			 <div class="btnRow" style="top: 135px">
				 <van-button custom-class="btnStyle" :loading="btnLoading" loading-text="充值中..."  @click="integralClick" type="primary">充值</van-button>
			 </div>
		 </div>
	  </van-popup>
	  <van-notify id="van-notify" />
  </div>
</template>

<script>
  import Notify from '../../../static/vant/notify/notify';
	import { getMemberAmount, rechargeScore }  from '@/api/integral/index';	
	
  export default {
    onShow() {
      this.getData();
    },
    data() {
      return {
        code: '',
        show: false,
	      score: '',
        btnLoading: false
      };
    },
    methods: {
      // 获取数据
      async getData() {
        let data = await getMemberAmount();
        this.score = data.data.result.scoreAmount;
      },
	    
	    // 充值积分
      getIntegral() {
        this.show = true;
      },
      integralClick() {
        if(this.code) {
          if(this.btnLoading) return;
          this.btnLoading = true;
          rechargeScore({
            code: this.code
          }).then(res => {
            if(res.data.code == 200) {
              Notify({
                text: res.data.result,
                duration: 1000,
                selector: '#van-notify',
                backgroundColor: '#ab2b2b'
              });
              this.code = '';
              this.getData();
							this.show = false;
            }else {
              Notify(res.data.message);
            }
            this.btnLoading = false;
          })
        }else {
          Notify('请填写卡号');
        }
      },
	    // 输入框变化
      fieldChange(val) {
        this.code = val.mp.detail;
      },
	    
      integralList() {
        wx.navigateTo({
          url: '/pages/integralList/main'
        })
      },
      onClose() {
        this.show = false;
      }
      
    }
  };

</script>
<style lang='scss'>
	page {
		background: #fff;
		color: #fff;
	}
	.iconBorder {
		border: 3px solid yellow;
		border-radius: 50%;
	}
	.btnRow {
		width: 250px;
		position: absolute;
		top: 350px;
		left: 50%;
		margin-left: -125px;
		.btnStyle {
			width: 100%;
			margin-bottom: 20px;
			border-radius: 5px;
			
		}
	}
	.van-button__loading-text {
		color: #fff!important;
	}
	.popupBox {
		.van-loading {
			view, text {
				color: #fff;
			}
		}
	}
	
</style>
<style lang='scss' scoped>
	.my {
		position: relative;
		.icon {
			position: absolute;
			left: 50%;
			margin-left: -30px;
			top: 80px ;
		}
		.title {
			position: absolute;
			top: 160px;
			width: 100%;
			text-align: center;
			font-size: 16px;
		}
		.myMoney {
			position: absolute;
			font-size: 20px;
			width: 100%;
			text-align: center;
			top: 210px;
		}
		
		.popupBox {
			height: 200px;
			position: relative;
			.title {
				position: absolute;
				top: 10px;
				font-size: 16px;
				font-weight: bold;
			}
			.content {
				position: absolute;
				top: 50px;
				width: 100%;
			}
		}
	}
</style>

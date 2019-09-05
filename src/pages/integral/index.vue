<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 14:25:58
 * @LastEditTime: 2019-09-05 10:33:06
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="my">
    <van-icon class="icon" custom-class="iconBorder" name="gold-coin" size="60px" color="orange" />
    <div class="title">我的补贴金</div>
    <div class="myMoney">
      <span style="display: inline-block; vertical-align: middle;">
        <van-icon name="points" style="margin-right: 5px;" />
      </span>
      {{score}}
    </div>
    <div class="btnRow">
      <van-button custom-class="btnStyle" @click="getQrcode" type="primary">扫码获取补贴金</van-button>
      <van-button custom-class="btnStyle" @click="getIntegral" type="primary">充值补贴金</van-button>
      <van-button custom-class="btnStyle" @click="integralList" type="default">补贴金明细</van-button>
    </div>

    <!--
	    充值积分
    -->
    <van-popup :show="show" position="bottom" @close="onClose">
      <div class="popupBox">
        <div class="title">补贴金充值</div>
        <div class="content">
          <van-cell-group>
            <van-field
              :value="code"
              required
              clearable
              label="补贴金券码"
              placeholder="请输入补贴金券码"
              @change="fieldChange"
            />
          </van-cell-group>
        </div>
        <div class="btnRow" style="top: 135px">
          <van-button
            custom-class="btnStyle"
            :loading="btnLoading"
            loading-text="充值中..."
            @click="integralClick"
            type="primary"
          >充值</van-button>
        </div>
      </div>
    </van-popup>
    <van-notify id="van-notify" />
    <van-dialog id="van-dialog" />


  </div>
</template>

<script>
import Notify from "../../../static/vant/notify/notify";
import Dialog from "../../../static/vant/dialog/dialog";
import { getMemberAmount, rechargeScore,scanQrCode2AddScore } from "@/api/integral/index";

export default {
  onShow() {
    this.getData();
  },
  data() {
    return {
      code: "",
      show: false,
      score: "",
      btnLoading: false
    };
  },
  methods: {
    //扫码获取补贴金
    getQrcode() {
      wx.scanCode({
        success(res) {
          if(res.result){
            let arr = res.result.split(',');
            scanQrCode2AddScore({qrCodeId:arr[0],bMemberId:arr[1]}).then((res) => {
              Dialog.alert({
                title: '提示',
                message: res.data.message
              }).then(() => {
                getMemberAmount().then(resData => {
                  this.score = resData.data.result.scoreAmount;
                })
              });
            }).catch((err) => {
            
            });
          }
        }
      });
    },
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
      if (this.code) {
        if (this.btnLoading) return;
        this.btnLoading = true;
        rechargeScore({
          code: this.code
        }).then(res => {
          if (res.data.code == 200) {
            Notify({
              text: res.data.result,
              duration: 1000,
              selector: "#van-notify",
              backgroundColor: "#ab2b2b"
            });
            this.code = "";
            this.getData();
            this.show = false;
          } else {
            Notify(res.data.message);
          }
          this.btnLoading = false;
        });
      } else {
        Notify("请填写卡号");
      }
    },
    // 输入框变化
    fieldChange(val) {
      this.code = val.mp.detail;
    },

    integralList() {
      wx.navigateTo({
        url: "/pages/integralList/main"
      });
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
  color: #fff !important;
}
.popupBox {
  .van-loading {
    view,
    text {
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
    top: 80px;
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

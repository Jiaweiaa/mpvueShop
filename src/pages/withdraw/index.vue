<template>
  <div class="withdraw">
    <div class="my">
      <div class="myinfo">
        <div class="title">输入提现金额(最低0元-手续费0%)</div>
      </div>

      <div class="contentBox">
        <van-cell-group>
          <van-field
            :value="teamData.amount"
            :clearable="true"
            label="提现金额"
            placeholder="请输入提现额"
            @input="withdrawChange"
          />
          <!--<van-field-->
            <!--:value="teamData.name"-->
            <!--:clearable="true"-->
            <!--label="姓名"-->
            <!--placeholder="请输入姓名"-->
            <!--@input="nameChange"-->
          <!--/>-->
          <!--<van-field-->
            <!--:value="teamData.mobile"-->
            <!--:clearable="true"-->
			<!--type="number"-->
            <!--label="手机"-->
            <!--placeholder="请输入手机"-->
            <!--@input="mobileChange"-->
          <!--/>-->
          <!--<van-field-->
            <!--:value="teamData.wechatAccount"-->
            <!--:clearable="true"-->
            <!--label="微信号"-->
            <!--placeholder="请输入微信号"-->
            <!--@input="wechatAccountChange"-->
          <!--/>-->
          <!--error-message="手机号格式错误"-->
        </van-cell-group>
        <van-button
          @click="submitData"
          square
          type="primary"
          style="position: absolute; top: 85%;left: 1.5%; width: 100%;"
          custom-class="btnClass"
        >提交申请</van-button>
      </div>

      <van-notify id="van-notify" />
    </div>
  </div>
</template>

<script>
import { applyForCommission } from "../../api/myTeam/index";
import Notify from "../../../static/vant/notify/notify";

export default {
  onShow() {},
  data() {
    return {
      teamData: {
        withdraw: "",
        name: "",
        mobile: "",
        wechatAccount: ""
      }
    };
  },
  components: {},
  methods: {
    withdrawChange(val) {
      this.teamData.amount = val.mp.detail;
    },
    // nameChange(val) {
    //   this.teamData.name = val.mp.detail;
    // },
    // mobileChange(val) {
    //   this.teamData.mobile = val.mp.detail;
    // },
    // wechatAccountChange(val) {
    //   this.teamData.wechatAccount = val.mp.detail;
    // },

    submitData() {
      let patrn = /^\d+(\.\d+)?$/;
      if (patrn.test(this.teamData.amount)) {
        let params = {
          amount: this.teamData.amount
        };
        applyForCommission(params).then(res => {
          if (res.data.code == 200) {
            wx.showToast({
              title: "申请成功",
              icon: "success",
              duration: 600
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, this.GLOBAL.timer);
          } else {
            Notify(res.data.message);
          }
        });
      } else {
        Notify("请填写正确金额!");
      }
    }
  },
  computed: {}
};
</script>

<style lang='scss' >
@import "./style";
</style>


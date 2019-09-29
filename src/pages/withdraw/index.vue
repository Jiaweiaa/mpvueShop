<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-09-26 15:34:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="withdraw">
    <div class="banner">
      <img src="/static/images/withdraw/wechat.png" alt />
      <p>微信零钱</p>
    </div>
    <div class="my">
      <div class="title">
        <p>提现金额</p>
      </div>
      <div class="contentBox">
        <img src="/static/images/withdraw/rmb.png" alt />
        <van-field
          :value="teamData.amount"
          :clearable="true"
          placeholder="请输入提现额"
          @input="withdrawChange"
        />
      </div>
      <div class="title">
        <p>可提现金额0.00元</p>
      </div>
      <!-- <div class="contentBox">
        <van-cell-group>
          <van-field
            :value="teamData.amount"
            :clearable="true"
            label="提现金额"
            placeholder="请输入提现额"
            @input="withdrawChange"
          />
        
        </van-cell-group>
        
      </div>-->
      <div class="btnGroup">
        <van-button
          @click="submitData"
          square
          type="primary"
          
          custom-class="btnClass"
        >确认提现</van-button>
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


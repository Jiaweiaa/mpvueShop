<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-09-30 13:48:14
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div style="width:100vw;height:100vh;" @click="toBeGive">
    <img style="width:100%;height:100%" src="http://pydsg4puk.bkt.clouddn.com/recruit_text.png" alt />
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
    toBeGive() {
      wx.redirectTo({
        url: "/pages/beGive/main"
      });
    },
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


<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-10-10 15:53:36
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div style="width:100vw;height:100vh;">
    <img style="width:100%;height:100%" src="http://pz53ekn6o.bkt.clouddn.com/butiejin_text.png" alt="">
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


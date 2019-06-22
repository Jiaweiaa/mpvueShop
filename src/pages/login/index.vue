<template>
  <div class="login">
    <div class="logo"></div>
    <van-cell-group>
      <van-field
        v-model="model.mobile"
        center
        clearable
        label="手机号"
        placeholder="请输入手机号码"
        :border="false"
        use-button-slot
        @change="aaa"
      >
        <van-button slot="button" size="small" type="primary">获取本机号码</van-button>
      </van-field>
    </van-cell-group>
    <button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">微信登录</button>
  </div>
</template>

<script>
import { host } from "../../utils";
import { littleAppLogin,littleAppRegister } from "../../api/login";
export default {
  created() {},
  mounted() {
    wx.login({
      success: res => {
        if (res.code) {
          let params = {
            code: res.code
          };
          littleAppLogin(params)
            .then(res => {
              this.openId = res.data.result;
            })
            .catch(err => {});
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      }
    });
  },
  data() {
    return {
      //与后台交互的数据模型
      openId: "",
      model: {
        mobile: "321321321"
      }
    };
  },
  components: {},
  methods: {
    aaa(mp) {
      console.log(mp, this.model);
    },
    doLogin() {
      wx.openSetting({
        success(res) {
          console.log(res.authSetting);
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
        }
      });
      //后台登录接口判断用户未注册则进入这个登录页面 主要是拿用户的授权信息传给后台
      wx.getUserInfo({
        success: res => {
          let userInfo = res.userInfo; //抓取到的用户信息 配合openID传给后台的注册接口完成登录
          this.model = Object.assign({}, res.userInfo);
          this.model.mobile = "13082227657";
          this.model.openId = this.openId;
          this.model.avatar = this.model.avatarUrl;
          wx.showLoading({
            title: "登录中...", //提示的内容,
            mask: true //显示透明蒙层，防止触摸穿透,
          });
          let params = Object.assign({}, this.model);
          littleAppRegister(params)
            .then(res => {
              wx.hideLoading();
            })
            .catch(err => {
              wx.hideLoading();
            });
        }
      });
      // wx.login({
      //   success: res => {
      //     if (res.code) {
      //       let params = {
      //         code: res.code
      //       };
      //       littleAppLogin(params)
      //         .then(res => {
      //           console.log(res);
      //           //code为999代表未注册
      //           if (res.data.code == "999") {
      //           }
      //         })
      //         .catch(err => {});
      //     } else {
      //       console.log("登录失败！" + res.errMsg);
      //     }
      //   }
      // });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
button[disabled] {
  background: #ccc;
}
</style>

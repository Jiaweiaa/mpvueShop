<template>
  <div class="login" v-if="signFlag">
    <div class="logo">
      <!-- 百团 -->
      <!-- <img src="/static/images/baituan_logo.jpeg" alt=""> -->
      <!-- 时刻 -->
      <img src="/static/images/shike_logo.jpeg" alt="">
    </div>
    <van-cell-group>
      <!-- <van-field
        v-model="mobile"
        center
        clearable
        label="手机号"
        placeholder="请输入手机号码"
        :border="false"
        use-button-slot
        @change="mobileChange"
      >
        <van-button slot="button" size="small" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取本机号码</van-button>
      </van-field> -->
    </van-cell-group>
    <p class="join">欢迎加入时刻益每家!轻松购!乐享购!</p>
    <button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="signIn">点击授权</button>
  </div>
</template>

<script>
import { host } from "../../utils";
// import { littleAppLogin, littleAppRegister,getPhoneNumber } from "../../api/login";
import { littleAppLogin, littleAppRegister, isCapOrSup } from "../../api/login";
export default {
  created() {},
  onShow() {
    this.doLogin();
  },
  data() {
    return {
      //与后台交互的数据模型
      openId: "",
      userInfo: {
        mobile: "321321321",
        openId: ""
      },
      signFlag: false //注册页面是否显示
    };
  },
  components: {},
  methods: {
    getPhoneNumber (e) {
      let params = Object.assign({},e.mp.detail);
      // console.log(e);
      wx.login({
        success: res => {
          console.log(res,777);
          params.session_key = res.session_key;
          getPhoneNumber(params).then((res) => {
          console.log(res.data);
            }).catch((err) => {
            
          });
        }
      })
      
      
    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData)
  },
    //手机号改变 赋值给本地变量
    mobileChange(mp) {
      this.mobile = mp.mp.detail;
    },
    //根据code调取登录接口获取openid 如果用户已注册 则同时返回用户信息
    doLogin() {
      wx.showLoading({
        title: '加载中'
      });
      wx.login({
        success: res => {
          if (res.code) {
            let params = {
              code: res.code
            };
            littleAppLogin(params)
              .then(res => {
                wx.hideLoading();
                //返回状态值999 代表没注册 显示获取用户信息按钮并且让用户点击登录
                if (res.data.code == "999") {
                  this.openId = res.data.result;
                  this.signFlag = true;
                } else if (res.data.code == "200") {
                  wx.setStorageSync("userInfo", res.data.result.memberLoginVo);
                  wx.setStorageSync(
                    "tokenInfo",
                    res.data.result.token
                  );
                  wx.navigateBack({
                    delta: 1
                  });
                }
              })
              .catch(err => {
                wx.hideLoading();
                
              });
            
            
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    },
    //注册接口
    signIn(params) {
      wx.showLoading({
        title: '加载中'
      });
      wx.getUserInfo({
        success: res => {
          this.userInfo = res.userInfo;
          console.log(this.userInfo);
          this.userInfo.avatar = this.userInfo.avatarUrl;
          this.userInfo.openId = this.openId;
          this.userInfo.mobile = this.mobile;
          littleAppRegister(this.userInfo)
            .then(res => {
              wx.hideLoading();
              if (res.data.code == "200") {
                wx.setStorageSync("userInfo", res.data.result.memberLoginVo);
                wx.setStorageSync("tokenInfo", res.data.result.token);
                wx.navigateBack({
                  delta: 1
                });
              }
            })
            .catch(err => {
              wx.hideLoading();
            });
        }
      });
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

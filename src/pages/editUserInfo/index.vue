<template>
  <div class="feedback team">
    <van-toast id="van-toast" />

    <div class="title">请填写您的真实信息</div>
    <div class="connect">
      <label>所在地区:</label>
      <picker mode="region" @change="bindRegionChange" value="region">
        <view class="picker">
          <div v-if="region.length>0">{{region[0].name}}，{{region[1].name}}，{{region[2].name}}</div>
          <div v-else>请选择地区</div>
        </view>
      </picker>
    </div>
    <div class="connect">
      <label>出生年月日:</label>
      <picker mode="date" value="date" @change="bindDateChange">
        <view class="picker" v-if="date!=''">{{date}}</view>
        <view class="picker" v-else>请选择日期</view>
      </picker>
    </div>
    <div class="connect">
      <label>选择性别:</label>
      <picker mode="selector" :range="objectArray" range-key="name" @change="bindPickerChange">
        <view class="picker" v-if="gender!=''">{{gender}}</view>
        <view class="picker" v-else>请选择性别</view>
      </picker>
    </div>
    <div class="connect">
      <label>你的姓名:</label>
      <input type="text" v-model="userInfoForm.lastName" placeholder="请输入您的姓名" />
    </div>
    <div class="connect">
      <label>身份证号:</label>
      <input type="text" v-model="userInfoForm.credentialsNo" placeholder="请输入您的身份证号" />
    </div>
    <div class="connect">
      <label>邮箱:</label>
      <input type="text" v-model="userInfoForm.email" placeholder="请输入您的邮箱" />
    </div>
    <div class="connect">
      <label>手机号:</label>
      <input type="number" v-model="userInfoForm.mobile" placeholder="请输入您的手机号" />
      <div>
        <button class="btn" @click="sendMsg" :disabled="msgFlag" v-if="userInfoForm.mobile.length==11">
          <span v-if="msgFlag==false">发送短信</span>
          <span v-else>{{msgTime}}s后重发</span>
        </button>
      </div>
    </div>
    <div class="connect" v-if="msgFlag">
      <label>短信验证码:</label>
      <input type="number" v-model="userInfoForm.smsCode" placeholder="请输入您收到的短信验证码" />
    </div>

    <van-button
      custom-class="btnStyle"
      class="btnView"
      :loading="btnLoading"
      loading-text="提交中..."
      @click="submitMes"
      type="primary"
    >确 认</van-button>
  </div>
</template>

<script>
import { saveOrEditCaptain } from "../../api/beTeam";
import { getMemberProfile, updateMemberInfo } from "../../api/editUserInfo";
import Toast from "../../../static/vant/toast/toast";
import amapFile from "../../utils/amap-wx";

export default {
  data() {
    return {
      //短信是否已发出 发送短信按钮是否禁用标识
      msgFlag:false,
      msgTime:60,//倒计时时间
      objectArray: [
        {
          id: 0,
          name: "保密"
        },
        {
          id: 1,
          name: "男"
        },
        {
          id: 2,
          name: "女"
        }
      ],
      userInfo: {},
      region: [], //地区
      date: "", //日期
      gender: "", //性别
      //交互数据
      userInfoForm: {
        gender: "",
        city: "",
        address: "",
        community: "",
        deliveryAddress: "",
        name: "",
        mobile: "",
        latitude: "",
        longitude: ""
      },
      btnLoading: false
    };
  },
  components: {},
  onShow() {
    getMemberProfile({ memberId: wx.getStorageSync("userInfo").memberId })
      .then(res => {
        if (res.data.code == "200") {
          this.userInfoForm = Object.assign({}, res.data.result);
        }
        //性别回显
        if (this.userInfoForm.gender == 0) {
          this.gender = "未知";
        } else if (this.userInfoForm.gender == 1) {
          this.gender = "男";
        } else if (this.userInfoForm.gender == 2) {
          this.gender = "女";
        } else {
          this.gender = "";
        }
        //地区回显
        if (this.userInfoForm.provinceId != null) {
          this.region.push(
            {
              name: this.userInfoForm.province,
              code: this.userInfoForm.provinceId
            },
            {
              name: this.userInfoForm.city,
              code: this.userInfoForm.cityId
            },
            {
              name: this.userInfoForm.district,
              code: this.userInfoForm.districtId
            }
          );
        }
        //日期回显
        if (this.userInfoForm.birthYear != null) {
          this.date =
            this.userInfoForm.birthYear + "-" + this.userInfoForm.birthMonth + "-" + this.userInfoForm.birthDay;
        }
      })
      .catch(err => {});
  },
  methods: {
    //发送短信
    sendMsg(){
      console.log(9876);
      this.msgFlag = true;
      this.msgTime = 60;
      let timer = setInterval(() => {
        this.msgTime--;
        if(this.msgTime==0){
          this.msgFlag = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    //性别选择器
    bindPickerChange: function(e) {
      this.userInfoForm.gender = e.mp.detail.value;
      if (this.userInfoForm.gender == 0) {
        this.gender = "未知";
      } else if (this.userInfoForm.gender == 1) {
        this.gender = "男";
      } else if (this.userInfoForm.gender == 2) {
        this.gender = "女";
      } else {
        this.gender = "";
      }
    },
    //地区选择器改变值方法
    bindRegionChange: function(e) {
      // console.log(e, "666");
      // this.region=e.mp.detail.value;
      this.region = [];
      e.mp.detail.value.map((item, index) => {
        this.region.push({
          name: item,
          code: e.mp.detail.code[index]
        });
      });
    },
    //时间选择器改变值方法
    bindDateChange: function(e) {
      this.date = e.mp.detail.value;
    },

    getMap() {
      wx.getLocation({
        type: "gcj02", //返回可以用于wx.openLocation的经纬度
        success: res => {
          let latitude = res.latitude;
          let longitude = res.longitude;
          wx.chooseLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 28,
            success: res => {
              this.teamForm.address = res.name;
              this.teamForm.latitude = res.latitude;
              this.teamForm.longitude = res.longitude;
            },
            fail: error => {
              console.log(error);
            }
          });
        }
      });
    },

    async submitMes() {
      //省份数据赋值
      if (this.region.length > 0) {
        this.userInfoForm.province = this.region[0].name;
        this.userInfoForm.provinceId = this.region[0].code;
        this.userInfoForm.city = this.region[1].name;
        this.userInfoForm.cityId = this.region[1].code;
        this.userInfoForm.district = this.region[2].name;
        this.userInfoForm.districtId = this.region[2].code;
      }

      //日期数据赋值
      if (this.date.length > 0) {
        let dateArr = this.date.split("-");
        this.userInfoForm.birthYear = dateArr[0];
        this.userInfoForm.birthMonth = dateArr[1];
        this.userInfoForm.birthDay = dateArr[2];
      }

      for (let i in this.userInfoForm) {
        if (this.userInfoForm[i] == "") {
          Toast("请将信息填写完整不要有遗漏");
          return;
        }
      }
      if (this.btnLoading) return;
      this.btnLoading = true;
      const res = await updateMemberInfo(this.userInfoForm);
      if (res.data.code == 200) {
        wx.showToast({
          title: "修改成功", //提示的内容,
          icon: "none", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {
            wx.navigateBack({
              delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            });
          }
        });
      } else {
        Toast(res.data.message);
      }
      this.btnLoading = false;
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.van-toast {
  view,
  text {
    color: #fff;
  }
}
.btnStyle {
  width: 90%;
  margin: 70px 0 0 5%;
}
.btnView {
  .van-button {
    background: #ab2b2b !important;
    border: 1px solid #ab2b2b !important;
    view,
    text {
      color: #fff;
    }
  }
}
</style>
<style lang='scss' scoped>
@import "./style";
</style>

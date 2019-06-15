<template>
  <div class="addaddress">
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <div class="item">
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" placeholder="身份、城市、区县" v-model="address">
      </picker>
    </div>
    <!-- <view class="section">
      <view class="section__title">省市区选择器</view>
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <view class="picker">
          当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
        </view>
      </picker>
    </view> -->
    <div class="item">
      <input type="text" placeholder="详细地址，如楼道、楼盘号等" v-model="detailadress">
    </div>
    <div class="item itemend">
      <checkbox-group @change="checkboxChange">
        <label class="checkbox">
          <checkbox class="box" value="true" :checked="checked" color="#B4282D" />设置为默认地址
        </label>
      </checkbox-group>
      <!--<div @click="wxaddress">一键导入微信></div>-->
    </div>
    <div @click="saveAddress" class="bottom">
      保存
    </div>
  </div>
</template>

<script>
import {
  get,
  post,
  getStorageOpenid
} from "../../utils";

import {
  insertOrEditMemAddress
} from '../../api/address/index'
export default {
  created() { },
  mounted() {
    // 一键导入功能
    this.openId = getStorageOpenid();
    if (this.$root.$mp.query.res) {
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res));
      this.userName = this.res.userName;
      this.telNumber = this.res.telNumber;
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`;
      this.detailadress = this.res.detailInfo;
    }
    
    if (this.$root.$mp.query.edit) {
      this.getDetail();
    }
  },
  data() {
    return {
      region: [],
      customItem: "全部",
      edit: "",
      openId: "",
      res: {},
      userName: "",
      telNumber: "",
      address: [],
      detailadress: "",
      checked: false,
      areaList: []
    };
  },
  methods: {
    bindRegionChange(e) {
      var value = e.mp.detail.value;
      this.areaList = value;
      this.address = value[0] + " " + value[1] + " " + value[2];
    },
    async getDetail() {
      let data = wx.getStorageSync('address');
      this.id = data.id;
      this.userName = data.firstName;
      this.telNumber = data.mobile;
      this.address = data.province + " " + data.district + " " + data.city;
      this.detailadress = data.address;
      this.checked = data.defalutFlag;
    },
    checkboxChange(e) {
     this.checked = !this.checked;
    },
    async saveAddress() {
      var _this = this;
      // var obj = {
      //   userName: _this.userName,
      //   telNumber: _this.telNumber,
      //   address: _this.address,
      //   detailadress: _this.detailadress,
      //   checked: _this.checked,
      //   openId: _this.openId,
      //   addressId: _this.id
      // };
      const res = await insertOrEditMemAddress({
        firstName: _this.userName,
        mobile: _this.telNumber,
        defalutFlag: _this.checked,
        address: _this.detailadress,
        province: _this.areaList[0],
        city: _this.areaList[1],
        district: _this.areaList[2],
  
        id: _this.id,
        openId: _this.openId
      });
     
      if (res.data.code == 200) {
        wx.showToast({
          title: "添加成功", //提示的内容,
          icon: "success", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {
            wx.navigateBack({
              delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
            });
          }
        });
      }
    },
    wxaddress() {
      var _this = this;
      wx.chooseAddress({
        success: function (res) {
          _this.userName = res.userName;
          _this.telNumber = res.telNumber;
          _this.address = `${res.provinceName} ${res.cityName} ${res.countyName}`;
          _this.detailadress = res.detailInfo;
        }
      });
    }
  }
};

</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-31 09:22:28
 * @LastEditTime: 2019-09-24 09:56:03
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="addaddress">
    <div class="item">
      <span>收货人</span>
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <div class="item">
      <span>联系电话</span>
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <div class="item">
      <span>所在区域</span>
      <picker class="picker" mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
        <input type="text" disabled placeholder="省份、城市、区县" v-model="address">
      </picker>
    </div>
    <div class="item">
      <span>详细地址</span>
      <input type="text" placeholder="详细地址，如楼道、楼盘号等" v-model="detailadress">
    </div>
    <div class="item itemend">
      
      <span>设为默认地址</span>
       <switch :checked="checked" color="#E63936"  @change="checkboxChange" />
      <!-- <checkbox-group @change="checkboxChange">
        <label class="checkbox">
          <checkbox class="box" value="true" :checked="checked" color="#B4282D" />设置为默认地址
        </label>
      </checkbox-group> -->
      <!--<div @click="wxaddress">一键导入微信></div>-->
    </div>
    <div @click="saveAddress" class="bottom">
      保 存
    </div>
	
	  <van-notify id="van-notify" />
  </div>
</template>

<script>
import {
  getStorageOpenid
} from "../../utils";
import Notify from '../../../static/vant/notify/notify';
import {
  insertOrEditMemAddress
} from '../../api/address/index'
export default {
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
		this.id = '';
    if (this.$root.$mp.query.edit) {
      this.getDetail();
      wx.setNavigationBarTitle({
        title: '修改地址',
      });
    }
  },
  data() {
    return {
      id: '',
      region: [],
      customItem: "",
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
      this.address = data.province + " " +data.city+ " "+ data.district  ;
      this.areaList.push(data.province);
      this.areaList.push(data.city);
      this.areaList.push(data.district);
      this.detailadress = data.address;
      this.checked = data.defalutFlag;
      t
    },
    checkboxChange(e) {
     this.checked = !this.checked;
    },
    async saveAddress() {
      var _this = this;
      
      if(this.userName && this.telNumber && this.areaList.length > 0 && this.detailadress ) {
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
      }else {
        Notify('请填写完整');
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

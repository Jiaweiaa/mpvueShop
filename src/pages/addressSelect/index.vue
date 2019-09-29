<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-13 17:24:09
 * @LastEditTime: 2019-09-25 14:42:36
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="address">
    <scroll-view scroll-y="true" class="addcont" style="height: 100%;">
      <!-- <div class="addcont"> -->
      <div v-if="listData.length!=0" class="item">
        <div class="list" v-for="(item, index) in listData" :key="index">
          <!-- <div class="addresslist" :style="item.textStyle">
            <div>
              <span>{{item.firstName}}</span>
              <div v-if="item.defalutFlag" class="moren">默认</div>
            </div>
            <div @click="selAddress(item)" class="info">
              <p>{{item.mobile}}</p>
              <p>{{item.dizhi}}</p>
            </div>
            <div @click="toDetail(item)"></div>
          </div>-->
          <!-- //a...... -->
          <div class="group" >
            <div class="top" @click="selAddress(item)">
              <span>{{item.firstName}}</span>
              <span>{{item.mobile}}</span>
              <div v-if="item.defalutFlag" class="moren">默认</div>
            </div>
            <div class="bottom" @click="selAddress(item)">
              <p>{{item.province + item.city + item.district + item.address}}</p>
            </div>
            <div class="edit" @click="toDetail(item)">
              <p>编辑</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="center">
        <p>收货地址在哪里?</p>
      </div>
    </scroll-view>

    <div class="newAddress">
      <div @click="wxaddress(1)">添加新地址</div>
      <!--<div @click="wxaddress">一键导入微信地址</div>-->
    </div>
  </div>
</template>

<script>
import { get, getStorageOpenid } from "../../utils";
import { getMemAddressList, setDefaultAddress } from "../../api/address";

export default {
  onShow() {
    this.openId = getStorageOpenid();
    this.getAddressList();
  },
  created() {},
  computed: {},
  data() {
    return {
      listData: []
    };
  },
  components: {},
  methods: {
    selAddress(address) {
      wx.setStorageSync("orderAdress", address);
      // wx.redirectTo({ url: "/pages/order/main?id=" + id });
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },
    toDetail(row) {
      // console.log(id);
      // wx.setStorageSync("orderAdress", row);
      wx.setStorageSync("address", row);
      wx.navigateTo({
        url: "/pages/addaddress/main?edit=true"
      });
    },
    async getAddressList() {
      wx.showLoading({
        title: "加载中",
        mask: true
      });
      getMemAddressList()
        .then(res => {
          if (res.data.code == 200) {
            this.showFlag = false;
            this.listData = res.data.result;
            this.listData.map(v => {
              this.$set(
                v,
                "dizhi",
                v.province + v.city + v.district + v.address
              );
            });
            for (let i = 0; i < this.listData.length; i++) {
              this.listData[i].name = this.listData[i].firstName;
              this.listData[i].tel = this.listData[i].mobile;
              if (this.listData[i].defalutFlag == true) {
                this.chosenAddressId = this.listData[i].id;
              }
            }
          }
          wx.hideLoading();
        })
        .catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: "网络错误",
            icon: "none"
          });
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 1500);
        });
    },
    wxaddress(index) {
      if (index == 1) {
        wx.navigateTo({
          url: "/pages/addaddress/main"
        });
      } else {
        wx.chooseAddress({
          success: function(res) {
            var res = encodeURIComponent(JSON.stringify(res));
            wx.navigateTo({
              url: "/pages/addaddress/main?res=" + res
            });
          }
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

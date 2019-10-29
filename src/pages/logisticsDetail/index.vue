<!--
 * @Author: your name
 * @Date: 2019-07-01 15:44:58
 * @LastEditTime: 2019-10-25 17:11:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin-master/Users/duang/Desktop/mpvueShop/src/pages/logisticsDetail/index.vue
 -->
<template>
  <div class="logistics" v-if="detail!=null">
    <div class="top">
      <p class="title">{{detail.logisticsDto.logisticsProviderName}}</p>
      <p class="code">运单号:{{detail.logisticsDto.transCode}}</p>
    </div>
    <div class="step">
      <div class="item">
        <div class="left"></div>
        <div class="right">
          <img src="http://pz5bdcnvo.bkt.clouddn.com/get.png" alt />
          <div class="detail" style="font-size:30rpx;">
            <p>收货地址:{{address}}</p>
          </div>
        </div>
      </div>
      <div
        class="item"
        v-for="(step,stepIndex) in detail.logisticsDetail"
        :key="stepIndex"
        :class="{active:stepIndex==0}"
      >
        <div class="left">
          <p class="date">{{step.trackingDate}}</p>
          <!-- <p class="time">21:13</p> -->
        </div>
        <div class="right">
          <img
            src="http://pz5bdcnvo.bkt.clouddn.com/raduis_active.png"
            alt
            v-if="stepIndex==0"
            style="width:30rpx;height:30rpx;"
          />
          <img
            src="http://pz5bdcnvo.bkt.clouddn.com/raduis_active.png"
            alt
            v-else
            style="width:15rpx;height:15rpx;left: -8rpx;top: 10rpx;"
          />
          <!-- <img
            :src="stepIndex==0?'http://pz5bdcnvo.bkt.clouddn.com/raduis_active.png':'http://pz5bdcnvo.bkt.clouddn.com/raduis.png'"
            alt
          />-->
          <!-- <div class="title">{{step.}}</div> -->
          <div class="detail">
            <p v-for="(detailItem,detailIndex) in step.list" :key="detailIndex">
              <span>{{detailItem.trackingDescription}}</span>
              <span>{{detailItem.trackingTime}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <van-steps :steps="steps" direction="vertical" active-color="#f44" /> -->
  </div>
</template>

<script>
import { host } from "../../utils";
import { logisticsDetail } from "../../api/order";
export default {
  onLoad(options) {
    if (wx.getStorageSync("logisticsAddress")) {
      this.address = wx.getStorageSync("logisticsAddress");
    }
    if (options.id) {
      // logisticsDetail({ id: options.id })
      //   .then(res => {
      //     console.log(res.data, "678");
      //   })
      //   .catch(err => {});
      logisticsDetail({ id: options.id })
        .then(res => {
          if (res.data.code == 200) {
            this.detail = res.data.result;
          }
        })
        .catch(err => {});
    }
  },
  onShow() {},
  data() {
    return {
      address: "",
      detail: null,
      steps: [] //物流详情
    };
  },
  components: {},
  methods: {},
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
button[disabled] {
  background: #ccc;
}
</style>

<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-09-30 09:12:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="top">
      <div class="row">
        <div class="pic">
          <img src="/static/images/bt_my.png" alt />
        </div>
        <div class="text">
          <p>易起省商城</p>
          <p>辽宁省盘锦市兴隆台区永祥小区 2134-4</p>
        </div>
      </div>
      <div class="row">
        <div class="title">我的店铺</div>
        <div class="group">
          <div class="item">
            <p>100</p>
            <p>浏览量</p>
          </div>
          <div class="item">
            <p>100</p>
            <p>商品总量</p>
          </div>
          <div class="item">
            <p>100</p>
            <p>销售金额</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="group">
        <div class="item">
          <div class="pic">
            <img src="/static/images/myStore/storePic.png" alt />
          </div>
          <p>店铺照片</p>
        </div>
        <div class="item">
          <div class="pic">
            <img src="/static/images/myStore/xuke.png" alt />
          </div>
          <p>经营许可</p>
        </div>
        <div class="item" @click="toEditStoreInfo">
          <div class="pic">
            <img src="/static/images/myStore/editInfo.png" alt />
          </div>
          <p>修改信息</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notify from "../../../static/vant/notify/notify";

export default {
  onShow() {},
  data() {
    return {};
  },
  components: {},
  methods: {
    toEditStoreInfo() {
      wx.navigateTo({
        url: "/pages/editStoreInfo/main"
      });
    }
  },
  computed: {}
};
</script>

<style lang='scss' >
@import "./style";
</style>


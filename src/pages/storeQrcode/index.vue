<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 16:55:19
 * @LastEditTime: 2019-10-08 12:16:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="feedback team">
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
    <div class="myMenu boxMenu">
      <div class="left">
        <button class="qroCodeBox" @click="saveImage">
          <p>店铺小程序码</p>
          <img class="code" :src="qrCode" alt />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { showQRCodeToScan, updateQrCode } from "../../api/distribution/index";
export default {
  data() {
    return {
      memberInfo: {},
      parentMemberInfo: null,
      memRelationship: null, //级别关系对象
      qrCode: "",
      storeId: "",
      btnLoading: false
    };
  },
  components: {},
  onLoad: function(options) {
    // this.storeId = options.id;
    this.storeId = options.storeId;
    this.getData();
  },
  methods: {
    //保存图片
    saveImage() {
      wx.previewImage({
        current: this.qrCode, // 当前显示图片的http链接
        urls: [this.qrCode] // 需要预览的图片http链接列表
      });
    },
    getData() {
      wx.showLoading();
      let _this = this;
      wx.cloud
        .callFunction({
          name: "getStoreQrcode",
          data: {
            storeId: this.storeId
            // memberId: 1146359099936837633
          }
        })
        .then(res => {
          wx.hideLoading();
          console.log("成功回调", res);
          if (res.result.buffer) {
            this.qrCode =
              "data:image/png;base64," +
              wx.arrayBufferToBase64(res.result.buffer);
          }
          console.log(this.qrCode,'aaa');
        })
        .catch(err => {
          wx.hideLoading();
          console.log("失败回调", err);
        });
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
.myMenu {
  // position: absolute;
  // left: 2.5%;
  // top: 150px;
  overflow: hidden;
  // padding: 10px;
  width: 100% !important;
  height: 100vh !important;
  background: #1989fa;
  .left {
    width: calc(100% - 1px);
    height: 100%;
    float: left;
    p {
      width: 50%;
      height: 100%;
      line-height: 80px;
      margin: 0 auto;
      color: #fff;
    }
    .code {
      width: 400rpx;
      height: 400rpx;
    }
    color: #fff;
  }
}
.qroCodeBox {
  position: absolute;
  top: 20%;
  width: 500px;
  left: 50%;
  margin-left: -250px;
}
</style>

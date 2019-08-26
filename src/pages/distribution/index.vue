<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 16:55:19
 * @LastEditTime: 2019-08-26 11:46:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="feedback team">
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
    <div class="myMenu boxMenu">
      <div class="left">
        <button class="qroCodeBox" @click="saveImage">
          <p>我的二维码</p>
          <img class="code" :src="qrCode" alt />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { showQRCodeToScan } from "../../api/distribution/index";
export default {
  data() {
    return {
      memberInfo: {},
      parentMemberInfo: null,
      memRelationship: null, //级别关系对象
      qrCode: "",

      btnLoading: false
    };
  },
  components: {},
  onShow() {
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
      wx.login({
        success: res => {
          // console.log(111);
          if (res.code) {
            console.log(res,'456');
            let params = {
              code: res.code
            };
            showQRCodeToScan(params)
              .then(res => {
                if (res.data.code == "200") {
                  this.qrCode = res.data.result;
                  console.log(res);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
          }
        }
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
  padding: 10px;
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

<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 16:55:19
 * @LastEditTime: 2019-09-09 10:57:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="feedback team">
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
    <div class="myMenu boxMenu">
      <div class="left">
        <div class="top_box">
          <van-icon
            class="icon"
            custom-class="iconBorder"
            name="gold-coin"
            size="60px"
            color="orange"
          />
          <div class="title">补贴金余额</div>
          <div class="myMoney">
            <span style="display: inline-block; vertical-align: middle;">
              <van-icon name="points" style="margin-right: 5px;" />
            </span>
            {{myScore}}
          </div>
        </div>
        <div class="input-box">
          <div>转出补贴金:</div>
          <div>
            <input type="number" v-model="score" name placeholder="输入数量" />
          </div>
        </div>
        <div class="qrcode_box">
          <button @click="saveImage">
            <img v-if="qrCode!=''" class="code" :src="qrCode" alt />
          </button>
        </div>
        <!-- <van-button custom-class="btnStyle" @click="createQrcode" type="primary">生成二维码</van-button> -->
        <button class="create_btn" @click="createQrcode">生成二维码</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  showQRCodeToScan,
  updateQrCode,
  genSendScoreQrCode,
  getBPortCurrentScore
} from "../../api/distribution/index";
import Dialog from "../../../static/vant/dialog/dialog";
export default {
  data() {
    return {
      memberInfo: {},
      parentMemberInfo: null,
      memRelationship: null, //级别关系对象
      myScore: "",
      score: "",
      qrCode: "",
      btnLoading: false
    };
  },
  components: {},
  onShow() {
    this.searchMyScore();
    // this.getData();
    this.score = "";
  },
  methods: {
    // 查询我的积分
    async searchMyScore() {
      wx.showLoading();
      const res = await getBPortCurrentScore();
      wx.hideLoading();
      if (res.data.code == 200) {
        this.myScore = res.data.result;
      }

      // console.log(res,'098');
    },
    //生成带积分的二维码
    createQrcode() {
      if (this.score != "") {
        let params = {
          score: this.score
        };

        wx.showLoading();
        genSendScoreQrCode(params)
          .then(res => {
            wx.hideLoading();
            if (res.data.code == 200) {
              Dialog.alert({
                message: res.data.message
              }).then(() => {
                // on close
              });
              this.qrCode = res.data.result;
            } else {
              wx.hideLoading();
              Dialog.alert({
                message: res.data.message
              }).then(() => {
                // on close
              });
            }
          })
          .catch(err => {});
      }else{
        wx.showToast({
          icon:'none',
          title:'请输入补贴金数量'
        })
      }
    },
    //保存图片
    saveImage() {
      wx.previewImage({
        current: this.qrCode, // 当前显示图片的http链接
        urls: [this.qrCode] // 需要预览的图片http链接列表
      });
    },
    getData() {
      showQRCodeToScan()
        .then(res => {
          if (res.data.code == "200") {
            this.qrCode = res.data.result;
          } else if (res.data.code == "500") {
            wx.cloud
              .callFunction({
                name: "getQrCode",
                data: {
                  memberId: wx.getStorageSync("userInfo").memberId
                  // memberId: 1146359099936837633
                }
              })
              .then(res => {
                console.log("成功回调", res);
                if (res.result.buffer) {
                  this.qrCode =
                    "data:image/png;base64," +
                    wx.arrayBufferToBase64(res.result.buffer.data);
                  updateQrCode({
                    qrCode:
                      "data:image/png;base64," +
                      wx.arrayBufferToBase64(res.result.buffer.data)
                  })
                    .then(res => {})
                    .catch(err => {});
                }
              })

              .catch(err => {
                console.log("失败回调", err);
              });
          }
        })
        .catch(err => {
          console.log(err);
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
  width: 100% !important;
  height: 100vh !important;
  background: #fff;
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

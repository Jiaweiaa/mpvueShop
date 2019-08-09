<template>
  <div class="feedback team">
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
    <!-- <div class="title">
      操作区  扫码
    </div>-->
    <div class="myMenu boxMenu">
      <div class="left">
        <button @click="saveImage">
          <p>我的二维码</p>
          <img  class="code" :src="qrCode" alt />
        </button>
      </div>
    </div>
    <!-- <div class="myMenu boxMenu">
      <div class="left">
        <button @tap="scanFun">
          <p>扫码绑定</p>
          <van-icon custom-class="code_icon" color="#fff;" size="35px" name="scan" />
        </button>
      </div>
    </div>-->
    <div class="connect">
      <label>昵称:</label>
      <input type="text" v-model="memberInfo.nickname" disabled />
    </div>
    <div class="connect">
      <label>国家:</label>
      <input type="text" v-model="memberInfo.country" disabled />
    </div>
    <div class="connect">
      <label>省份:</label>
      <input type="text" v-model="memberInfo.province" disabled />
    </div>
    <div class="connect">
      <label>城市:</label>
      <input type="text" v-model="memberInfo.city" disabled />
    </div>
    <!-- <div class="connect" v-if="parentMemberInfo!=null"> -->
    <div class="connect">
      <label>我的上级:</label>
      <!-- <span>{{parentMemberInfo.nickname}}</span> -->
      <span>我是上级</span>
      <div class="btn-group">
        <button class="btn bound" @click="scanFun">扫码绑定</button>
        <!-- <button class="btn relieve">解除绑定</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { showQRCodeToScan, scanQrCode } from "../../api/distribution/index";
import Toast from "../../../static/vant/toast/toast";
import Dialog from "../../../static/vant/dialog/dialog";
import amapFile from "../../utils/amap-wx";

export default {
  data() {
    return {
      memberInfo: {},
      parentMemberInfo: null,
      qrCode: "",

      btnLoading: false
    };
  },
  components: {},
  onShow() {
    
    this.aa();
  },
  methods: {
    //保存图片
    saveImage() {
      console.log(1111);
      wx.previewImage({
        current: this.qrCode, // 当前显示图片的http链接
        urls: [this.qrCode] // 需要预览的图片http链接列表
      });
    },
    aa() {
      let params = {};
      showQRCodeToScan(params)
        .then(res => {
          if (res.data.code == "200") {
            this.memberInfo = res.data.result.memberInfo;
            this.parentMemberInfo = res.data.result.parentMemberInfo;
            this.qrCode = res.data.result.qrCode;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /*
      * 扫码核销  扫码之后相当于调取接口 返回json 通过返回json的result值判断是否获取到商品唯一标识 未获取到提示不是商城商品
      * 拿唯一标识调取后台核销端口改变商品状态
      * */
    scanFun() {
      wx.scanCode({
        scanType: ["qrCode"],
        onlyFromCamera: true,
        complete: res => {
          if (res.result) {
            console.log(res.result);

            Dialog.confirm({
              title: "绑定上级",
              message: "确认绑定这位用户为上级吗?"
            })
              .then(() => {
                let params = {
                  parentMemberId: '1150014441393565711'
                };
                scanQrCode(params)
                  .then(res => {})
                  .catch(err => {});
                // let data = [];
                // // data.push(res.result);
                // writeOffByQRcode({
                //   orderCode: res.result
                // }).then(res => {
                //   //   console.log(res.data, "456");
                //   if (res.data.code == 200) {
                //     Dialog.alert({
                //       message: res.data.result
                //     }).then(() => {
                //       // on close
                //     });

                //     // });
                //   } else {
                //     Dialog.alert({
                //       message: res.data.message
                //     }).then(() => {
                //       // on close
                //     });
                //   }
                // });
              })
              .catch(() => {
                Notify("网络错误,请检查网络");
                // on cancel
              });
          } else {
            // Notify("该二维码已失效");
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
  height: 560rpx !important;
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
</style>

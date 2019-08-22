<template>
  <div class="my">
    <van-notify id="custom-selector" />
    <div class="myinfo">
      <div v-if="isFlag">
        <div class="myMoney">
          <p>我的佣金</p>
          <p>¥&nbsp;{{teamData.commission}}</p>
        </div>
        <div class="noMoney">
          <p>未到账佣金</p>
          <p>¥&nbsp;{{teamData.undrawnCommission}}</p>
        </div>
        <van-button
            style="position: absolute; right: 20px; bottom: 50px;"
            @click="goToDetail"
            size="small"
            custom-class="btnClass"
            round
            plain
            type="default"
        >查看详情</van-button>
      </div>
      <div class="textView" v-else>
        <p>您还不是代理用户,</p>
        <p>请扫码绑定上级！</p>
        <p>绑定前请完善个人信息。</p>
      </div>
    </div>
   
    <div class="myMenu boxMenu">
      <div class="left">
        <button @tap="scanFun">
          <van-icon size="35px" name="scan" />
          <p>扫码绑定</p>
        </button>
      </div>
      <div class="right" @click="toCode">
        <van-icon size="35px" name="description" />
        <p>我的二维码</p>
      </div>
    </div>
    <div class="mySecond boxMenu">
      <div class="title">
        <div class="navTitle">代理服务</div>
      </div>
      <div class="content">
        <div
          class="childContent"
          @click="goTo(item.url)"
          :key="index"
          v-for="(item, index) in orderMenu"
        >
          <van-icon size="30px" :name="item.icon" />
          <div class="childText">{{item.title}}</div>
        </div>
      </div>
    </div>

    <div class="myThree boxMenu">
      <div class="title">
        <div class="navTitle">其他功能</div>
      </div>
      <div class="content">
        <div
          class="childContent"
          @click="goTo(item.url)"
          :key="index"
          v-for="(item, index) in myService"
        >
          <van-icon size="30px" :name="item.icon" />
          <div class="childText">{{item.title}}</div>
        </div>
      </div>
    </div>

    <van-notify id="van-notify" />
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import { myDetile } from "../../api/myTeam/index";
import Notify from "../../../static/vant/notify/notify";
import Dialog from "../../../static/vant/dialog/dialog";
import Toast from '../../../static/vant/toast/toast';
import { scanQrCode, showQRCodeToScan } from "../../api/distribution/index";
export default {
  onShow() {
    this.getTeamData();
  },
  onHide() {
    this.orderMenu = [
      {
        title: "完善信息",
        icon: "label-o",
        url: "/pages/editUserInfo/main"
      }
    ];
  },
  data() {
    return {
      orderMenu: [
        // {
        //   title: "我的信息",
        //   icon: "shop-collect-o",
        //   url: "/pages/myCommunity/main"
        // },
        {
          title: "完善信息",
          icon: "label-o",
          url: "/pages/editUserInfo/main"
        }
        // {
        //   title: "商品销量",
        //   icon: "fire-o",
        //   url: "/pages/myOrder/main?id=2"
        // },
        // {
        //   title: "团长排行",
        //   icon: "medel-o",
        //   url: "/pages/teamReaking/main?id=3"
        // }
        //   {
        //     title: "添加副团长",
        //     icon: "newspaper-o",
        //     url: "/pages/myOrder/main?id=4"
        //   },
      ],

      myService: [
        {
          title: "返回用户",
          icon: "setting-o",
          url: "/pages/my/main"
        }
      ],

      avator:
        "http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png",
      allcheck: false,
      Listids: [],
      userInfo: {},

      isFlag: false,
      
      teamData: {}
    };
  },
  methods: {
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
                parentMemberId: res.result
              };
              scanQrCode(params)
                  .then(res => {
                    if (res.data.code == 200) {
                      Dialog.alert({
                        message: res.data.message
                      }).then(() => {
                        this.getTeamData();
                      });
                    }else{
                      Dialog.alert({
                        message: res.data.message
                      }).then(() => {
                      
                      });
                    }
                  })
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
    },

    // 去哪页
    goTo(url) {
      if (url == "/pages/my/main") {
        wx.switchTab({
          url: url
        });
      } else {
        wx.navigateTo({
          url: url
        });
      }
    },

    // 详情
    goToDetail() {
      wx.navigateTo({
        url: "/pages/lookDetail/main"
      });
    },

    async getTeamData() {
      let data = await myDetile();
      this.teamData = data.data.result;
      if(this.teamData) {
        this.isFlag = true;
        this.orderMenu.push({
          title: "我的上级",
          icon: "user-o",
          url: "/pages/superior/main"
        },
        {
          title: "我的下级",
          icon: "friends-o",
          url: "/pages/subordinate/main"
        });
      }else {
        this.isFlag = false;
      }
    },

    // 团长订单
    toCode() {
      showQRCodeToScan()
      .then(res => {
        if (res.data.code == "200") {
          wx.navigateTo({
            url: "/pages/distribution/main"
          });
        }else {
          Toast(res.data.message);
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
<style lang='scss'>
.textView {
  color: #fff;
  font-size: 16px;
  margin-top: 50px;
  padding-left: 20px;
}
.van-toast {
  view, text {
    color: #fff;
  }
}
page {
  background: #eee;
}
</style>
<style lang='scss' scoped>
.my {
  position: relative;
  .myinfo {
    width: 100%;
    height: 184px;
    background: $main-color;
    padding: 0 30rpx;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    .myMoney {
      width: 100%;
      color: #fff;
      height: 50px;
      margin-top: 20px;
      margin-bottom: 20px;
      p {
        font-size: 16px;
      }
    }
    .noMoney {
      width: 100%;
      color: #fff;
      p {
        font-size: 13px;
      }
    }
    p {
      color: #fff;
    }
  }
}

.myMenu {
  position: absolute;
  left: 2.5%;
  top: 150px;
  overflow: hidden;
  padding: 10px;
  width: calc(95% - 20px) !important;
  height: 80px !important;
  .left {
    border-right: 1px solid #ab2b2b;
  }
  .left,
  .right {
    width: calc(50% - 1px);
    height: 100%;
    float: left;
    p {
      width: 50%;
      height: 100%;
      line-height: 80px;
      margin-left: 70px;
    }
  }
}
.mySecond {
  position: absolute;
  top: 275px;
  left: 2.5%;
}

.myThree {
  position: absolute;
  top: 400px;
  left: 2.5%;
}
.boxMenu {
  width: 95%;
  overflow: hidden;
  background: #fff;
  height: 100px;
  border-radius: 5px;
  .title {
    height: 30px;
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    .navTitle {
      float: left;
      width: 40%;
      font-weight: bold;
      padding-left: 10px;
    }
    .navBody {
      width: calc(60% - 20px);
      text-align: right;
      float: left;
      padding-right: 10px;
      color: #999;
      font-size: 20rpx;
    }
  }
  .content {
    overflow: hidden;
    height: 70px;
    .childContent {
      height: 100%;
      padding: 10px;
      float: left;
      width: calc(25% - 20px);
      text-align: center;
      .childText {
        font-size: 24rpx;
      }
    }
  }
}
</style>
<style>
.btnClass {
  background: rgba(255, 255, 255, 0.3) !important;
  color: #fff !important;
  border: none !important;
  padding: 0 12px !important;
}
.myMenu .van-icon {
  margin-top: 22px;
  margin-left: 30px;
  float: left;
}
</style>

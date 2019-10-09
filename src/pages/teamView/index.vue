<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 15:30:03
 * @LastEditTime: 2019-09-30 15:39:49
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="my">
    <van-notify id="custom-selector" />
    <!-- newUI -->
    <div class="myinfo">
      <div class="userImg">
        <img v-if="userImg!=''" :src="userImg" alt="">
      </div>
      
      <p class="shuju">{{teamData.realName}}</p>
      <p class="huanying">欢迎您,易起省代理</p>
      <div class="editInfo" @click="toEditInfo">完善信息</div>
    </div>
    <div class="doHandle">
      <div class="item" >
        <img src="/static/images/teamView/scan.png" alt />
        <p>扫码绑定</p>
      </div>
      <!-- <div class="item" @click="scanFun">
        <img src="/static/images/teamView/scan.png" alt />
        <p>扫码绑定</p>
      </div> -->
      <div class="item" @click="toCode">
        <img src="/static/images/teamView/code.png" alt />
        <p>我的二维码</p>
      </div>
    </div>
    <div class="money" >
      <div class="top">
        <div class="item">
          <p>{{totalData.totalCommision}}</p>
          <p>累计佣金</p>
        </div>
        <!-- <div class="item">
          <p>254</p>
          <p>累计订单</p>
        </div> -->
        <div class="item">
          <p>{{totalData.totalUser}}</p>
          <p>累计用户</p>
        </div>
        <div class="item">
          <p>{{totalData.totalInvite}}</p>
          <p>累计邀请</p>
        </div>
      </div>
      <div class="bottom">
        <p>可提现金额</p>
        <p>￥{{totalData.canGetCommision}}</p>
      </div>
    </div>
    <div class="service">
      <div class="title">商家服务</div>
      <div class="content">
        <div class="item" @click="goTo(item.url)" :key="index" v-for="(item, index) in orderMenu">
          <div class="iconBox">
            <van-icon size="30px" :name="item.icon" />
          </div>

          <div class="childText">{{item.title}}</div>
        </div>
      </div>
    </div>
    <!-- ****** -->
    <!-- <div class="myinfo">
      <div>
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
    </div>-->

    <van-notify id="van-notify" />
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import { myDetile,myAgentData } from "../../api/myTeam/index";
import Notify from "../../../static/vant/notify/notify";
import Dialog from "../../../static/vant/dialog/dialog";
import Toast from "../../../static/vant/toast/toast";
import { scanQrCode, showQRCodeToScan } from "../../api/distribution/index";
export default {
  onShow() {
    this.getTeamData();
    this.getTotalData();
    if(wx.getStorageSync("userInfo")){
      this.userImg = wx.getStorageSync("userInfo").avatar
    }
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
      userImg:"",
      teamData: {},
      totalData:{}
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
                    } else {
                      Dialog.alert({
                        message: res.data.message
                      }).then(() => {});
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
    toEditInfo() {
      wx.navigateTo({
        url: "/pages/editUserInfo/main"
      });
    },

    // 详情
    goToDetail() {
      wx.navigateTo({
        url: "/pages/lookDetail/main"
      });
    },

    async getTeamData() {
      wx.showLoading();
      let data = await myDetile();
      wx.hideLoading();
      this.teamData = data.data.result;
      if (this.teamData) {
        this.isFlag = true;
        this.orderMenu.push(
          {
            title: "我的上级",
            icon: "user-o",
            url: "/pages/superior/main"
          },
          {
            title: "我的下级",
            icon: "friends-o",
            url: "/pages/subordinate/main"
          },
          {
            title: "推广海报",
            icon: "http://pydsg4puk.bkt.clouddn.com/haibao.png",
            url: "/pages/subordinate/main"
          }
        );
      } else {
        this.isFlag = false;
      }
    },
    async getTotalData() {
      wx.showLoading();
      let data = await myAgentData();
      console.log(data,'444');
      wx.hideLoading();
      this.totalData = data.data.result;
   
    },
    // 团长订单
    toCode() {
      // showQRCodeToScan()
      // .then(res => {
      //   if (res.data.code == "200") {
      wx.navigateTo({
        url: "/pages/distribution/main"
      });
      //   }else {
      //     Toast(res.data.message);
      //     }
      // })
      // .catch(err => {
      //   console.log(err);
      // });
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
  view,
  text {
    color: #fff;
  }
}
page {
  background: #eee;
}
</style>
<style lang='scss' scoped>
@import "./newStyle";
</style>


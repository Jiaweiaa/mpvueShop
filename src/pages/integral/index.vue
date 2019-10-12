<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 14:25:58
 * @LastEditTime: 2019-10-10 17:03:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="my">
    <div class="tabs">
      <div
        class="tabItem"
        @click="tabChange(tab)"
        :class="{active:tab.active}"
        v-for="(tab,tabIndex) in tabs"
        :key="tabIndex"
      >{{tab.title}}</div>
    </div>
    <div class="butiejin" v-if="tabIndex==0">
      <div class="detail" @click="beanList">购物豆明细</div>
      <div class="btMain">
        <div>
          <img src="http://pz59eou1l.bkt.clouddn.com/bean.png" alt />
        </div>
        <div class="text">
          <p>我的购物豆</p>
          <p>{{beanScore}}</p>
        </div>
      </div>
      <div class="btnRow">
        <button class="btnStyle" @click="getBean">充值购物豆</button>
      </div>
      <div class="tip" @click="toWhatBean">
        <p>
          <img src="http://pz59eou1l.bkt.clouddn.com/what.png" alt />
          什么是购物豆?
        </p>
      </div>
    </div>
    <div class="butiejin" v-else>
      <div class="detail" @click="integralList">补贴金明细</div>
      <div class="btMain">
        <div>
          <img src="http://pz59eou1l.bkt.clouddn.com/butie.png" alt />
        </div>
        <div class="text">
          <p>我的补贴金</p>
          <p>{{score}}</p>
        </div>
      </div>
      <div class="btnRow">
        <button class="btnStyle" @click="getQrcode">扫码获取补贴金</button>
        <button class="btnStyle" @click="getIntegral">充值补贴金</button>
      </div>
      <div class="tip" @click="toWhatIntegral">
        <p>
          <img src="http://pz59eou1l.bkt.clouddn.com/what.png" alt />
          什么是补贴金?
        </p>
      </div>
    </div>

    <!--
	    充值积分
    -->
    <van-popup :show="show" position="bottom" @close="onClose">
      <div class="popupBox">
        <div class="title">补贴金充值</div>
        <div class="content">
          <van-cell-group>
            <van-field
              :value="code"
              required
              clearable
              label="补贴金券码"
              placeholder="请输入补贴金券码"
              @change="fieldChange"
            />
          </van-cell-group>
        </div>
        <div class="btnRow" style="top: 135px">
          <button
            class="btnStyle"
            :loading="btnLoading"
            loading-text="充值中..."
            @click="integralClick"
            type="primary"
          >充值</button>
        </div>
      </div>
    </van-popup>
    <!-- 充值购物豆 -->
    <van-popup :show="beanShow" position="bottom" @close="onBeanClose">
      <div class="popupBox">
        <div class="title">购物豆充值</div>
        <div class="content">
          <van-cell-group>
            <van-field
              :value="beanCode"
              required
              clearable
              label="购物豆充值卡"
              placeholder="请输入购物豆充值卡码"
              @change="fieldChange"
            />
          </van-cell-group>
        </div>
        <div class="beanBtnRow" style="top: 135px">
          <button
            class="btnStyle"
            :loading="btnLoading"
            loading-text="充值中..."
            @click="BeanClick"
            type="primary"
          >充值</button>
        </div>
      </div>
    </van-popup>
    <van-notify id="van-notify" />
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Notify from "../../../static/vant/notify/notify";
import Dialog from "../../../static/vant/dialog/dialog";
import { getShoppingBeansLogList } from "@/api/shopping/index";
import {
  getMemberAmount,
  rechargeScore,
  scanQrCode2AddScore
} from "@/api/integral/index";
import { rechargeShoppingBeans } from "@/api/shopping/index";

export default {
  onShow() {
    if (this.$root.$mp.query.active) {
      this.tabIndex = this.$root.$mp.query.active;
    }
    this.tabs.map((item, index) => {
      // console.log(item, "xxx");
      item.active = false;
      if (index == this.tabIndex) {
        item.active = true;
        this.tabIndex = index;
      }
    });

    this.getData();
  },
  data() {
    return {
      tabs: [
        {
          title: "购物豆",
          active: false
        },
        {
          title: "补贴金",
          active: true
        }
      ],
      tabIndex: 1,
      code: "",
      beanCode: "",
      show: false,
      beanShow: false,
      score: "", //补贴金
      beanScore: "", //购物豆

      btnLoading: false
    };
  },
  methods: {
    toWhatIntegral() {
      wx.navigateTo({
        url: "/pages/whatButie/main"
      });
    },
    toWhatBean() {
      wx.navigateTo({
        url: "/pages/whatBean/main"
      });
    },
    //选项卡
    tabChange(tab) {
      this.tabs.map((item, index) => {
        item.active = false;
        if (item.title == tab.title) {
          item.active = true;
          this.tabIndex = index;
        }
      });
    },
    //扫码获取补贴金
     getQrcode() {
       let _this = this;
      wx.scanCode({
        success(res) {
          console.log(res)
          if (res.result) {
            let arr = res.result.split(",");
            console.log('scan')
            scanQrCode2AddScore({
              qrCodeId: arr[0],
              bMemberId: arr[1]
            })
              .then(res => {
                console.log("111");
                _this.getData();

                Dialog.alert({
                  title: "提示",
                  message: res.data.message
                }).then(() => {
                  // getMemberAmount().then(resData => {
                  //   this.score = resData.data.result.scoreAmount;
                  // });
                });
              })
              .catch(err => {});
          }
        }
      });
    },
    // 获取数据
    getData() {
      // let data = getMemberAmount();
       console.log("22");
      getMemberAmount()
        .then(res => {
          console.log("3333");
          this.score = res.data.result.scoreAmount;
          this.beanScore = res.data.result.shoppingBeans;
        })
        .catch(err => {});
      // console.log(data, "111888");
    },
    // 充值积分
    getIntegral() {
      this.show = true;
    },
    getBean() {
      this.beanShow = true;
    },
    BeanClick() {
      if (this.beanCode) {
        if (this.btnLoading) return;
        this.btnLoading = true;
        rechargeShoppingBeans({
          code: this.beanCode
        }).then(res => {
          if (res.data.code == 200) {
            Notify({
              text: res.data.result,
              duration: 1000,
              selector: "#van-notify",
              backgroundColor: "#ab2b2b"
            });
            this.beanCode = "";
            this.getData();
            this.beanShow = false;
          } else {
            Notify(res.data.message);
          }
          this.btnLoading = false;
        });
      } else {
        Notify("请填写卡号");
      }
    },
    integralClick() {
      if (this.code) {
        if (this.btnLoading) return;
        this.btnLoading = true;
        rechargeScore({
          code: this.code
        }).then(res => {
          if (res.data.code == 200) {
            Notify({
              text: res.data.result,
              duration: 1000,
              selector: "#van-notify",
              backgroundColor: "#ab2b2b"
            });
            this.code = "";
            this.getData();
            this.beanShow = false;
          } else {
            Notify(res.data.message);
          }
          this.btnLoading = false;
        });
      } else {
        Notify("请填写卡号");
      }
    },
    // 输入框变化
    fieldChange(val) {
      this.beanCode = val.mp.detail;
    },

    integralList() {
      wx.navigateTo({
        url: "/pages/integralList/main"
      });
    },
    beanList() {
      wx.navigateTo({
        url: "/pages/shoppingBeanList/main"
      });
    },
    onClose() {
      this.show = false;
    },
    onBeanClose() {
      this.beanShow = false;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style.scss";
</style>
<style >
page {
  background: #fff;
}
</style>

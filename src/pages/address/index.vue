<template>
  <div class="address">

    <scroll-view :scroll-y="scrollflag" class="addcont" style="height: 100%;">
      <!-- <div class="addcont"> -->
      <div v-if="listData.length!=0" class="item">
        <div class="list" @touchstart="startMove" :data-index="index" @touchmove="deleteGoods" @touchend="endMove" v-for="(item, index) in listData" :key="index">
          <div class="addresslist" :style="item.textStyle">
            <div>
              <span>{{item.firstName}}</span>
              <div v-if="item.defalutFlag" class="moren">
                默认
              </div>
            </div>
            <div class="info">
              <p>{{item.mobile}}</p>
              <p>{{item.province + item.city + item.district + item.address}}</p>
            </div>
            <div @click="toDetail(item)"></div>

          </div>
          <div @click="delAddress(item.id)" class="delete" :style="item.textStyle1">
            <div>
              删除
            </div>
          </div>
        </div>

      </div>

      <div v-else class="center">
        <p>收货地址在哪里?</p>
      </div>
    </scroll-view>

    <div class="bottom">
      <div @click="wxaddress(1)">+新建地址</div>
      <!--<div @click="wxaddress">一键导入微信地址</div>-->
    </div>
  </div>
</template>

<script>
import { get, getStorageOpenid } from "../../utils";
import { getMemAddressList, setDefaultAddress, deleteMemAddress } from '../../api/address';
export default {
  onShow() {
    // this.openId = getStorageOpenid();
    this.getAddressList();
  },
  created() {},
  computed: {
    tranX() {},
    tranX1() {}
  },
  data() {
    return {
      chosenAddressId: '',
      scrollflag: true,
      nowIndex: 0,
      userInfo: {},
      imgUrl: "",
      listData: [],  //地址列表
      list: [],
      tranX: 0,
      tranX1: 0,
      startX: "",
      startY: "",
      moveX: "",
      moveY: "",
      moveEndX: "",
      moveEndY: "",
      X: 0,
      Y: "",
      flag: false
    };
  },
  components: {},
  methods: {
    initTextStyle() {
      //滑动之前先初始化数据
      for (var i = 0; i < this.listData.length; i++) {
        this.listData[i].textStyle = "";
        this.listData[i].textStyle1 = "";
      }
    },
    startMove(e) {
      this.initTextStyle();
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
    },
    async delAddress(id) {
      var _this = this;
      wx.showModal({
        title: "",
        content: "是否要删除该收货地址",
        success: function(res) {
          if (res.confirm) {
            deleteMemAddress({
              id: id
            }).then(() => {
              _this.getAddressList();
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
            //滑动之前先初始化样式数据
            _this.initTextStyle();
          }
        }
      });
    },
    deleteGoods(e) {
      //滑动之前先初始化样式数据
      this.initTextStyle();
      var index = e.currentTarget.dataset.index;
      if (this.X <= -100) {
        this.flag = true;
      }
      if (!this.flag) {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        if (this.X >= 100) {
          this.X = 0;
        }
        this.tranX = this.X;
        if (this.X <= -100) {
          this.X = -100;
        }
        this.tranX1 = this.X;
        this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      } else {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;

        this.tranX = this.X - 100;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        // transform:'translateX(' + tranX + 'rpx)'

        if (this.X + -100 > -100) {
          this.flag = false;
        }
        this.tranX1 = -100;
        this.listData[index].textStyle1 = `transform:translateX(-100rpx);`;
        // this.listData = this.listData;
      }

      // this.listData = this.listData;
      // transform:'translateX(' + tranX1 + 'rpx)'
      //大于这个值认为在滑动
      // if (X > 10 || X < -10) {

      // }

      //

      // if (Math.abs(this.X) > Math.abs(this.Y) && this.X > 20) {
      //   this.scrollflag = false;
      // } else if (Math.abs(this.X) > Math.abs(this.Y) && this.X < 20) {
      //   console.log("right 2 left");
      // }
    },
    endMove(e) {
      var index = e.currentTarget.dataset.index;
      if (this.X > -50) {
        this.tranX1 = 0;
        this.tranX = 0;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      } else if (this.X <= -50) {
        this.tranX1 = -100;
        this.tranX = -100;
        this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
        this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
      }
      // if (Math.abs(this.X) >= 300) {
      //   this.tranX = 0;
      // }
      // if (Math.abs(this.X) <= -300) {
      //   this.tranX = -100;
      // }
      // this.moveEndX = e.touches[0].pageX;
      // this.moveEndY = e.touches[0].pageY;
      // let X = this.moveEndX - this.startX;
      // let Y = this.moveEndY - this.startY;
      // if (X > 50 || X >= 100) {
      //   X = 0;
      // }
      // if (X < -50 || X <= -100) {
      //   X = -100;
      // }
      // this.tranX = X;
    },
    toDetail(row) {
      wx.setStorageSync('address', row)
      wx.navigateTo({
        url: "/pages/addaddress/main?edit=true"
      });
    },
    
    
    async getAddressList() {
      wx.showLoading();
      getMemAddressList().then(res => {
        if (res.data.code == 200) {
          this.listData = res.data.result;
          for (let i = 0; i < this.listData.length; i++) {
            this.list[i] = {};
            this.listData[i].name = this.list[i].firstName;
            this.listData[i].tel = this.list[i].mobile;
            if(this.listData[i].defalutFlag == true) {
              this.chosenAddressId = this.listData[i].id;
            }
          }
        }
        wx.hideLoading();
      }).catch((err) => {
        wx.hideLoading();
      })
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

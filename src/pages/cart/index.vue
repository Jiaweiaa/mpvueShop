<template>
  <div class="cart">
    <div class="top">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>
    <div class="cartlist">
      <!--  -->
      <div
        class="item"
        @touchstart="startMove"
        @touchmove="deleteGoods"
        @touchend="endMove"
        :data-index="index"
        v-for="(item,index) in listData"
        :key="index"
      >
        <div class="con" :style="item.textStyle">
          <div class="left">
            <div
              class="icon"
              @click="changeColor(index,item.id)"
              :class="[ Listids[index] ? 'active' : '',{active:allcheck}]"
            ></div>
            <div class="img">
              <img :src="'http://qn.gaoshanmall.cn/'+item.imageUrl" alt>
            </div>
            <div class="info">
              <p>{{item.itemTitle}}</p>
              <p>￥{{item.salePrice}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">x{{item.quantity}}</div>
          </div>
        </div>

        <div @click="delGoods(item.skuId,index)" class="delete" :style="item.textStyle1">
          <div>删除</div>
        </div>
      </div>
    </div>
    <div v-if="false" class="nogoods">
      <img
        src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png"
        alt
      >
    </div>
    <div class="fixed">
      <div @click="allCheck" :class="{active:allcheck}" class="left">全选({{isCheckedNumber}})</div>
      <div class="right">
        <div>￥{{allPrise}}</div>
        <div @click="orderDown">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, login, getStorageOpenid } from "../../utils";
import {
  insertOrEditMemAddress,
  addShoppingcart,
  shoppingcartCount,
  delShoppingcart,
  updateShoppingcart,
  checkShoppingcart,
  availableCoupon,
  getcoupon,
  orderconfirm
} from "../../api/shoppingcart";
export default {
  onShow() {
    this.openId = getStorageOpenid();
    this.getListData();
  },
  created() {},
  data() {
    return {
      openId: "",
      allcheck: false,
      listData: [],
      Listids: [],
      userInfo: {},
      tranX: 0,
      tranX1: 0,
      startX: "",
      startY: "",
      moveX: "",
      moveY: "",
      moveEndX: "",
      moveEndY: "",
      X: 0,
      Y: ""
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
    deleteGoods(e) {
      //滑动之前先初始化样式数据
      this.initTextStyle();
      var index = e.currentTarget.dataset.index;
      console.log(index);
      if (this.X <= -100) {
        this.flag = true;
      }
      if (!this.flag) {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;
        this.listData[index].textStyle = `transform:translateX(${
          this.tranX
        }rpx);`;
        if (this.X >= 100) {
          this.X = 0;
        }
        this.tranX = this.X;
        if (this.X <= -100) {
          this.X = -100;
        }
        this.tranX1 = this.X;
        this.listData[index].textStyle1 = `transform:translateX(${
          this.tranX1
        }rpx);`;
      } else {
        this.moveX = e.touches[0].pageX;
        this.moveY = e.touches[0].pageY;
        this.X = this.moveX - this.startX;
        this.Y = this.moveX - this.startY;

        this.tranX = this.X - 100;
        this.listData[index].textStyle = `transform:translateX(${
          this.tranX
        }rpx);`;
        // transform:'translateX(' + tranX + 'rpx)'
        console.log("heyushuo");

        console.log(this.listData[index].textStyle);

        if (this.X + -100 > -100) {
          this.flag = false;
        }
        this.tranX1 = -100;
        this.listData[index].textStyle1 = `transform:translateX(-100rpx);`;
        console.log(this.listData[index].textStyle1);
        // this.listData = this.listData;
      }
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
        this.listData[index].textStyle = `transform:translateX(${
          this.tranX
        }rpx);`;
        this.listData[index].textStyle1 = `transform:translateX(${
          this.tranX1
        }rpx);`;
      } else if (this.X <= -50) {
        this.tranX1 = -100;
        this.tranX = -100;
        this.listData[index].textStyle = `transform:translateX(${
          this.tranX
        }rpx);`;
        this.listData[index].textStyle1 = `transform:translateX(${
          this.tranX1
        }rpx);`;
      }
    },
    //下单
    async orderDown() {
      if (this.Listids.length == 0) {
        wx.showToast({
          title: "请选择商品",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      // 去掉数组中空的false的
      var newgoodsid = [];
      for (let i = 0; i < this.Listids.length; i++) {
        const element = this.Listids[i];
        if (element) {
          newgoodsid.push(element);
        }
      }
      // console.log(newgoodsid);
      // var goodsId = newgoodsid.join(",");
      // const data = await post("/order/submitAction", {
      //   goodsId: goodsId,
      //   openId: this.openId,
      //   allPrise: this.allPrise
      // });
      if (newgoodsid.length > 0) {
        let model = JSON.stringify(newgoodsid);
        wx.navigateTo({
          url: "/pages/order/main?from=shoppingcart&params=" + model
        });
      }
    },
    //删除购物车商品
    async delGoods(skuId, index) {
      console.log(skuId);
      var _this = this;
      wx.showModal({
        title: "",
        content: "是否要删除该商品",
        success: function(res) {
          if (res.confirm) {
            let params = {
              skuId: skuId
            };
            delShoppingcart(params)
              .then(res => {
                
                  wx.showToast(  {title:res.data.result});
                  // console.log('aaaa');
                  _this.getListData();
                
              })
              .catch(err => {});
          } else if (res.cancel) {
            console.log("用户点击取消");
            //滑动之前先初始化样式数据
            _this.initTextStyle();
          }
        }
      });
    },
    //获取购物车数据
    async getListData() {
      insertOrEditMemAddress()
        .then(res => {
          console.log(res);
          if(res.data.code == '200'){
            this.listData =
            res.data.result.shoppingCartDto.storeShoppingCartLineDtos[0].shoppingCartLineDtos;
          }else if(res.data.code == '500'){
            this.listData = [];
          }
          
      
        })
        .catch(err => {
          console.log(err);
        });
      this.listData = data.data;
    },
    allCheck() {
      //先清空
      this.Listids = [];
      if (this.allcheck) {
        this.allcheck = false;
      } else {
        console.log("选择全部");

        this.allcheck = true;
        //循环遍历所有的商品id
        for (let i = 0; i < this.listData.length; i++) {
          const element = this.listData[i];
          this.Listids.push(element.id);
        }
      }
    },
    change(e) {},
    changeColor(index, id) {
      if (this.Listids[index]) {
        this.$set(this.Listids, index, false);
      } else {
        this.$set(this.Listids, index, id);
      }
    }
  },
  computed: {
    isCheckedNumber() {
      let number = 0;
      for (let i = 0; i < this.Listids.length; i++) {
        if (this.Listids[i]) {
          number++;
        }
      }
      if (number == this.listData.length && number != 0) {
        this.allcheck = true;
      } else {
        this.allcheck = false;
      }
      return number;
    },
    allPrise() {
      var Prise = 0;
      for (let i = 0; i < this.Listids.length; i++) {
        if (this.Listids[i]) {
          Prise =
            Prise + this.listData[i].salePrice * this.listData[i].quantity;
        }
      }
      return Prise;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>

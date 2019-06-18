<template>
  <div class="order">
    <div @click="toAddressList" v-if="address.firstName" class="address">
      <div class="item">
        <div class="list">
          <div class="addresslist">
            <div>
              <span>{{address.firstName}}</span>
              <div class="moren">默认</div>
            </div>
            <div class="info">
              <p>{{address.mobile}}</p>
              <p>{{address.dizhi}}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div @click="toAdd" v-else class="seladdress">请选择收货地址</div>
    <div class="orderbox">
      <div class="item">
        <div>商品合计</div>
        <div>￥{{originPayAmount}}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>
    <div class="cartlist" v-if="listData.length>0">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="con">
          <div class="left">
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
      </div>
    </div>
    <div class="bottom">
      <div>实付 : ￥{{currentPayAmount}}</div>
      <div @click="pay">支付</div>
    </div>
  </div>
</template>

<script>
import {
  ShopCartOrderconfirm,
  detailOrderconfirm
} from "../../api/shoppingcart";
import { getMemAddressList } from "../../api/address";
import { get, post, login, getStorageOpenid } from "../../utils";
import { createOrder } from "../../api/order";
export default {
  onLoad: function(options) {
    this.from = options.from;

    //将字符串转换成数组或者对象
    // console.log(params);
    if (options.from == "shoppingcart") {
      let params = JSON.parse(options.params);
      this.storeId = params.storeId;
      ShopCartOrderconfirm(params)
        .then(res => {
          this.orderLines =
            res.data.result.storeShoppingCartLineDtos[0].shoppingCartLineDtos;
          this.listData =
            res.data.result.storeShoppingCartLineDtos[0].shoppingCartLineDtos;
          this.currentPayAmount = res.data.result.currentPayAmount;
          this.originPayAmount = res.data.result.originPayAmount;
          this.currentShippingFee = res.data.result.currentShippingFee;
        })
        .catch(err => {});
    } else if (options.from == "goodsDetail") {
      let params = JSON.parse(options.params);
      this.orderLines = [];
      this.orderLines.push(JSON.parse(options.params));
      detailOrderconfirm(params)
        .then(res => {
          console.log(res);
          if (res.data.code == "200") {
            // console.log(this.listData,1);
            this.listData =
              res.data.result.storeShoppingCartLineDtos[0].shoppingCartLineDtos;
            this.currentPayAmount = res.data.result.currentPayAmount;
            this.originPayAmount = res.data.result.originPayAmount;
            this.currentShippingFee = res.data.result.currentShippingFee;
          } else if (res.data.code == "500") {
            this.listData = [];
          }
        })
        .catch(err => {});
    }
    this.getAddressList();
  },
  onShow() {
    if (wx.getStorageSync("addressId")) {
      this.addressId = wx.getStorageSync("addressId");
    }
    this.openId = getStorageOpenid();
  },
  created() {},
  mounted() {},
  data() {
    return {
      addressId: "",
      openId: "",
      allprice: "",
      listData: [],
      originPayAmount: "", //应付金额
      currentPayAmount: "", //实付金额
      currentShippingFee: "", //运费
      address: {},
      orderLines: null,
      from:"",//从哪个入口进入的下单页面
      storeId:"",//店铺ID 从购物车进入此页面时需要用到
    };
  },
  components: {},
  methods: {
    //获取收货地址列表
    getAddressList() {
      getMemAddressList().then(res => {
        if (res.data.code == 200) {
          this.showFlag = false;
          res.data.result.map(v => {
            if (v.defalutFlag) {
              this.address = v;
              this.$set(
                this.address,
                "dizhi",
                this.address.province +
                  this.address.city +
                  this.address.town +
                  this.address.address
              );
            }
          });
        }
      });
    },
    pay() {
      if(this.from!=""){
        let params = {
        codPaymentType: "",
        deliveryDescription: "",
        deliveryTimebar: "",
        deliveryType: "",
        expectDeliveryDate: "",
        expectDeliveryTime: "",
        memberId: "1136203741534760962",
        orderLines: [],
        paymentType: 4,
        shppingAddressId: "", //地址
        type: 1,   //type为1是从商品详情页面进入  2是购物车中进入
        shoppingCartIds:[]
      };
      if (this.orderLines != null) {
        this.orderLines.map(v => {
          params.orderLines.push(v);
          params.shoppingCartIds.push(v.id);
        });
      }
      params.orderLines.map((v) => {
        this.$set(v,"buyType","N");
      })
      params.shoppingCartIds = params.shoppingCartIds.toString();
      params.shppingAddressId = params.shppingAddressId.toString();
      params.storeId = this.storeId;
      if(this.from == "shoppingcart"){
        params.type = 2; 
        params.buyType = "N";
        
      }
      // console.log(this.orderLines,222);
      

      // params.orderLines.push(this.orderLines);
      params.shppingAddressId = this.address.id;
      createOrder(params)
        .then(res => {
          wx.showToast({
            title: "下单成功,订单为待支付状态"
          });
        })
        .catch(err => {});
      }
      
    },
    toAddressList() {
      wx.navigateTo({
        url: "/pages/addressSelect/main"
      });
    },
    toAdd() {
      wx.navigateTo({
        url: "/pages/addaddress/main"
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>

<template>
  <div class="goods">
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="tru/e"
        interval="3000"
        duration="1000"
      >
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <img :src="'http://qn.gaoshanmall.cn/'+item.picUrl" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="price-bg">
      <p class="listPrice">￥{{goodsInfo.salePrice}}</p>
      <p class="salePrice">
        ￥{{goodsInfo.listPrice}}
        <span class="tag">优惠价</span>
      </p>
      <div class="countDown" v-if="timeFlag">
        <p v-if="havaTimeFlag&&!textFlag" class="title">距结束仅剩</p>
        <div class="time" v-if="havaTimeFlag&&!textFlag">
          <span>{{day}}</span>天
          <span>{{h}}</span>:
          <span>{{m}}</span>:
          <span>{{s}}</span>
        </div>
        <p class="title" v-if="havaTimeFlag&&textFlag">活动已结束</p>
      </div>
    </div>
    <div class="goods-info">
      <div class="c">
        <button class="share" hover-class="none" open-type="share" value>分 享</button>
        <p class="title">{{goodsInfo.title}}</p>
        <div class="tags" v-if="goodsInfo!=null">
          <span class="item" v-for="(tag,tagIndex) in goodsInfo.itemTags" :key="tagIndex">{{tag}}</span>
        </div>
        <p class="sketch">{{goodsInfo.sketch}}</p>
      </div>
    </div>
    <van-cell
      title="店铺优惠"
      icon="shop-collect-o"
      is-link
      arrow-direction="right"
      @click="showCoupon"
      v-if="couponShowFlag"
    >
      <span style="height:48rpx;line-height:48rpx;">
        领券
        <van-icon name="arrow-down" />
      </span>
    </van-cell>
    <div v-if="recordList.length>0">
      <div class="record" @click="toRecord">
        <div class="header">
          <div class="label">
            购买记录
            <p class="item">
              已有
              <span>{{buyerNum}}</span>人购买,商品共销售
              <span>{{buyCount}}</span>份
            </p>
          </div>
          <div></div>
        </div>
        <div class="img_group">
          <div class="img_item" v-for="(item,index) in recordList" :key="index">
            <img :src="item.avatar" />
          </div>
          <div class="img_item">
            <img src="/static/images/omit.png" alt />
          </div>
        </div>
      </div>
    </div>

    <div v-if="attribute.length!=0" class="attribute">
      <div class="head">商品参数</div>
      <div v-for="(item,index) in attribute" :key="index" class="item">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <div v-if="goods_desc" class="detail">
      <wxParse :content="goods_desc" />
    </div>

    <!-- sku -->
    <van-popup class="attr-pop" position="bottom" :show="showpop" @close="showType">
      <div class="top">
        <div class="left">
          <img v-if="gallery.length>0" :src="'http://qn.gaoshanmall.cn/'+gallery[0].picUrl" />
        </div>
        <div class="right">
          <div>
            <p>￥{{nowPrice}}</p>
            <p>库存:{{quantity}}</p>
          </div>
        </div>
        <div @click="showType" class="close">X</div>
      </div>
      <!-- <div style="display:block;min-width:50px;min-height:50px;">
        <div style="float:left;">
          <img
            v-if="gallery.length>0"
            style="width:50px;height:50px;"
            :src="'http://qn.gaoshanmall.cn/'+gallery[0].picUrl"
          >
        </div>
        <div style="float:right;">
          <h3>{{goodsInfo.title}}</h3>
          <span>{{nowPrice}}</span>
        </div>
      </div>-->
      <div id="goodsinfo">
        <div v-for="(item,index) in keys" :key="index">
          <div class="tabContent">
            {{item ? item.name : ''}}:
            <div v-for="(citem,cindex) in item.value" :key="cindex">
              <button
                type="button"
                class="sku"
                @click="tabInfoChange(index,cindex,citem.id,$event)"
                :class="{notClick:citem.notClick,active:citem.isActiveC}"
                :attr_id="citem.id"
                :value="citem.cname"
                :key="citem.id"
              >{{citem.cname}}</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <p>请选择商品数量</p> -->
      <div style="display:flex;justify-content: space-between;align-items:center;">
        <p style="margin-left:30px;font-size:16px;">我要买:</p>
        <van-stepper
          style="margin-right:30px;"
          async-change
          @change="valueChange"
          :step="1"
          :min="1"
          :value="goodsNum"
        />
      </div>

      <div class="handle">
        <van-button type="danger" size="large" custom-class="buyBtn" @click="submit()">确定</van-button>
      </div>
    </van-popup>

    <!-- 底部 -->
    <div class="bottom-fixed">
      <div @click="toIndex()" class="home">
        <div class="car">
          <img src="/static/images/sk_home_active.png" />
          <span class="text">首页</span>
        </div>
      </div>
      <!-- <div @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' :'']"></div>
      </div>-->
      <div @click="toCart" class="cart">
        <div class="car">
          <span>{{allnumber}}</span>
          <img src="/static/images/sk_cart_active.png" />
          <p class="text">购物车</p>
        </div>
      </div>
      <div class="btn-group">
        <div class="addCart" @click="openSku('addCart')">加入购物车</div>
        <div class="buyNow" @click="openSku('buyNow')">立即购买</div>
      </div>
    </div>
    <canvas canvas-id="canvas" v-if="booleanCanvas" class="canvas"></canvas>
    <!-- 优惠券弹出层 -->
    <!-- 优惠券弹出层 -->
    <van-popup
      :show="couponShow"
      position="bottom"
      :overlay="true"
      @close="onClose"
      class="coupon_popup"
    >
      <div class="coupon_group">
        <h3 class="title">优惠</h3>
        <p class="coupon_title" v-if="couponList.length>0">领券</p>
        <div class="coupon_box" v-for="(item,index) in couponList" :key="index">
          <img class="bg" src="/static/images/coupon.png" />
          <div class="content">
            <div class="left">
              <p style="position:relative;">
                <!-- <span class="name">{{item.mDescription.name}}</span> -->
                <span class="coupon_price">{{item.mDescription.amount}}</span>
                <span class="coupon_type">{{item.mDescription.action}}</span>
                <span class="name">{{item.name}}</span>
              </p>
              <p>
                <span>{{item.mDescription.name}}</span><br>
                <span>{{item.mDescription.scope}}</span>
              </p>
              <p>有效期:{{item.mDescription.date}}</p>
            </div>
            <div class="right">
              <p @click="getCoupon(item)" v-if="item.btnAble" class="btn">立即领取</p>
              <p class="btn" v-else>领取中</p>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { toLogin, login, getStorageOpenid } from "../../utils";
import { getGoodsDetail, itemPurchaseHistory } from "../../api/goods";
import wxParse from "mpvue-wxparse";
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
    //判断是否登录获取用户信息
    if (login()) {
      this.userInfo = login();
    }
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    this.id = this.$root.$mp.query.id;
    this.openId = getStorageOpenid();
    this.getCartGoodsNum();
    this.goodsDetail();
    this.goodsRecord();
    if (wx.getStorageSync("userInfo")) {
      this.level = wx.getStorageSync("userInfo").level;
    }
  },
  data() {
    return {
      couponList:[],//优惠券列表
      couponShowFlag:false,//是否显示领取优惠券单元格
      couponShow:false,//领取优惠券弹出层是否展示 
      booleanCanvas: true,
      shareImgPath: "", //用于储存canvas生成的图片
      level: 1,
      allnumber: 0, //购物车商品数量
      openId: "",
      collectFlag: false,
      number: 0,
      showpop: false,
      gallery: [],
      goodsInfo: {}, //商品数据
      brand: {},
      attribute: [],
      issueList: [],
      productList: [],
      goods_desc: "", //商品详情富文本
      id: "",
      userInfo: "",
      goodsId: "",
      allPrise: "",
      quantList: null, //sku数据
      flag: "",
      selectSkuData: null, //已选中的sku对象
      goodsNum: 1,
      quantity: "-",
      keys: [],
      pageNum: 1,
      pageSize: 19,
      recordList: [], //购买记录列表
      total: null, //数据总条数
      buyCount: "", //总购买数
      buyerNum: "", //购买总人数
      data: {},
      SKUResult: {},
      nowPrice: "--",
      h: "",
      m: "",
      s: "",
      day: "",
      timeFlag: false, //倒计时是否显示
      havaTimeFlag: false,
      textFlag: false
    };
  },
  components: {
    wxParse
  },
  onHide() {
    this.selectSkuData = null;
    this.keys.map(v => {
      v.isActiveC = false;
      v.value.map(vv => {
        vv.isActiveC = false;
      });
    });
  },
  //商品转发
  onShareAppMessage() {
    let that = this;
    return {
      title: that.goodsInfo.title, // 转发后 所显示的title
      path: "/pages/goods/main?id=" + that.id, // 分享回来的相对的路径
      imageUrl: that.shareImgPath,
      success: res => {
        // 成功后要做的事情
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: res => {
            that.setData({
              isShow: true
            });
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {
            console.log(res);
          }
        });
      },
      fail: function(res) {
        // 分享失败
        console.log(res);
      }
    };
  },
  methods: {
    //优惠券列表弹出层是否展示
    showCoupon(){
      this.couponShow = true
    },
    //领取优惠券
    getCoupon(item) {
      let params = {
        uniqueId: item.uniqueId,
        storeId: item.storeId
      };
      item.btnAble = false;
      getcoupon(params)
        .then(res => {
          if (res.data.code == "200") {
            wx.showToast({
              icon: "none",
              title: res.data.result
            });
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.message
            });
          }

          item.btnAble = true;
        })
        .catch(err => {
          item.btnAble = true;
        });
    },
    // 关闭弹层
    onClose() {
      this.couponShow = false;
    },
    // 画分享图
    drawImg() {
      let that = this;
      wx.downloadFile({
        url: "https://qn.gaoshanmall.cn/" + that.gallery[0].picUrl, //网络路径
        success: function(res3) {
          var img = res3.tempFilePath; //商品图片保存地址
          // var img1=res.path  //二维码图片保存地址
          var name = that.goodsInfo.subTitle; //图片描述,描述和下面的价格都是从后台获取的内容，可以随意换成其他文本内容，这里不是重点所以就不讲内容的获取方法了
          var price = that.goodsInfo.listPrice; //图片价格
          let context = wx.createCanvasContext("canvas"); //这里的“share”是“canvas-id”
          context.setFillStyle("#fff");
          context.drawImage(img, 0, 0, 250, 200); //绘制商品图片

          context.setFillStyle("#5c49ab");
          context.fillRect(0, 150, 250, 50); // 底部栏

          context.setFontSize(12);
          context.setFillStyle("#fff");
          context.fillText(name, 20, 195); //绘制描述

          context.setFontSize(18);
          context.setFillStyle("#fff");
          context.fillText("￥" + price, 20, 175); //绘制价格

          //把画板内容绘制成图片，并回调画板图片路径
          context.draw(false, function() {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: 250,
              height: 200,
              destWidth: 250,
              destHeight: 200,
              canvasId: "canvas",
              success: res => {
                that.shareImgPath = res.tempFilePath; //将绘制的图片地址保存在shareImgPath 中
                that.booleanCanvas = false;
                // wx.getFileSystemManager().readFile({
                //   filePath: that.shareImgPath, //选择图片返回的相对路径
                //   encoding: 'base64', //编码格式
                //   success: res => { //成功的回调
                //     // that.shareImgPath = 'data:image/png;base64,' + res.data;
                //     console.log(that.shareImgPath);
                //   },
                //   fail: res => {
                //     console.log(res);
                //   }
                // })
              }
            });
          });
        }
      });
    },

    valueChange(e) {
      // console.log(e.mp.detail);
      if (this.selectSkuData) {
        if (e.mp.detail == "") {
          this.goodsNum = 1;
        } else {
          this.goodsNum = e.mp.detail;
          if (this.goodsNum > this.selectSkuData.quantity) {
            wx.showToast({
              title: "购买数量超过最大值",
              icon: "none"
            });
            this.goodsNum = this.selectSkuData.quantity;
          }
        }
      } else {
        wx.showToast({
          title: "请选择商品规格",
          icon: "none"
        });
      }
    },
    //倒计时
    countTime: function() {
      if (this.goodsInfo.activeEndTime) {
        //获取当前时间
        var date = new Date();
        var now = date.getTime();
        //设置截止时间
        var endDate = new Date(this.goodsInfo.activeEndTime);
        var end = endDate.getTime();
        //时间差
        var leftTime = end - now;
        //定义变量 d,h,m,s保存倒计时的时间
        if (leftTime >= 0) {
          this.havaTimeFlag = true;
          this.timeFlag = true;
          this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
          this.h < 10 ? (this.h = "0" + String(this.h)) : (this.h = this.h);
          this.m = Math.floor((leftTime / 1000 / 60) % 60);
          this.m < 10 ? (this.m = "0" + String(this.m)) : (this.m = this.m);
          this.s = Math.floor((leftTime / 1000) % 60);
          this.s < 10 ? (this.s = "0" + String(this.s)) : (this.s = this.s);
        } else {
          // this.havaTimeFlag = true;
          this.textFlag = true;
        }
        // console.log(this.s);
        //递归每秒调用countTime方法，显示动态时间效果
        setTimeout(this.countTime, 1000);
      }
    },

    //跳转到首页
    toIndex() {
      wx.switchTab({
        url: "/pages/index/main"
      });
    },
    //跳转商品购买记录页面
    toRecord() {
      wx.navigateTo({
        url: "/pages/record/main?id=" + this.id
      });
    },
    //获取购物车中的商品数量
    getCartGoodsNum() {
      shoppingcartCount()
        .then(res => {
          if (res.data.code == "200") {
            this.allnumber = res.data.result;
          }
        })
        .catch(err => {});
    },
    // 加商品
    plusGoodsNum() {
      if (this.selectSkuData != null) {
        if (this.goodsNum > this.selectSkuData.quantity) {
          this.goodsNum--;
        } else {
          this.goodsNum++;
        }
      }
    },
    //减商品
    minusGoodsNum(goods) {
      this.goodsNum--;
    },
    togoodsDetail(id) {
      wx.redirectTo({ url: "/pages/goods/main?id=" + id });
    },
    add() {
      this.number = this.number + 1;
    },
    reduce() {
      if (this.number > 1) {
        this.number = this.number - 1;
      } else {
        return false;
      }
    },
    //打开SKU
    async openSku(data) {
      this.keys.map(v => {
        v.value[0].isActiveC = false;
      });
      this.selectSkuData = null;
      if (data) {
        this.flag = data;
      }
      this.showpop = true;
    },
    //提交
    submit() {
      if (this.flag == "buyNow") {
        if (toLogin()) {
          if (this.showpop) {
            if (this.selectSkuData != null) {
              let num = 0;
              this.keys.map(v => {
                v.value.map(vv => {
                  if (vv.isActiveC) {
                    num += 1;
                  }
                });
              });
              if (num < this.keys.length) {
                wx.showToast({
                  title: "请选择商品规格",
                  icon: "none",
                  duration: 1500
                });
                return;
              }
              let params = {
                bundleGroup: "",
                bundleId: "",
                buyType: "N",
                itemId: this.selectSkuData.itemId,
                offerType: "",
                quantity: this.goodsNum,
                skuId: this.selectSkuData.id,
                skuIdInfo: this.selectSkuData.id,
                storeId: this.selectSkuData.storeId
              };
              let model = JSON.stringify(params);
              wx.setStorageSync("orderParams", model);
              wx.setStorageSync("orderFrom", "goodsDetail");
              wx.navigateTo({
                url: "/pages/order/main"
              });
            } else {
              wx.showToast({
                title: "请选择商品规格",
                icon: "none",
                duration: 1500
              });
            }
          }
        }
      } else if (this.flag == "addCart") {
        if (toLogin()) {
          if (this.showpop) {
            if (this.selectSkuData != null) {
              let num = 0;
              this.keys.map(v => {
                v.value.map(vv => {
                  if (vv.isActiveC) {
                    num += 1;
                  }
                });
              });
              if (num < this.keys.length) {
                wx.showToast({
                  title: "请选择商品规格",
                  icon: "none",
                  duration: 1500
                });
                return;
              }
              let params = {
                skuIdArray: [],
                skuQtyArray: []
              };
              params.skuIdArray.push(this.selectSkuData.id);
              params.skuQtyArray.push(this.goodsNum);
              addShoppingcart(params)
                .then(res => {
                  wx.showToast({ title: res.data.message });
                  this.showpop = false;
                  this.getCartGoodsNum();
                })
                .catch(err => {
                  this.showpop = false;
                });
            } else {
              wx.showToast({
                title: "请选择商品规格",
                icon: "none",
                duration: 1500
              });
            }
          }
        }
      }
    },

    async collect() {
      if (toLogin()) {
        this.collectFlag = !this.collectFlag;
        const data = await post("/collect/addcollect", {
          openId: this.userInfo.openId,
          goodsId: this.goodsId
        });
      }
    },
    //去购物车
    toCart() {
      wx.switchTab({
        url: "/pages/cart/main"
      });
    },
    //获取商品购买记录
    async goodsRecord() {
      itemPurchaseHistory({
        itemId: this.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          this.recordList = res.data.result.purchaseHistoryPage.records;
          this.total = res.data.result.purchaseHistoryPage.total;
          this.buyCount = "";
          this.buyerNum = "";
          this.buyCount = res.data.result.buyCount;
          this.buyerNum = res.data.result.buyerNum;
          // console.log(res, "333");
        })
        .catch(err => {});
    },

    //获取商品详情
    async goodsDetail() {
      getGoodsDetail({
        itemId: this.id
        // itemId: 503
      })
        .then(res => {
          if (res.data.code == "200") {
            wx.hideLoading();
            this.keys = [];
            const data = res.data.result;
            this.goods_desc = data.item.itemChannel.description; //详情描述富文本
            this.goodsList = data.item.pdpPropertiesCommands;
            this.quantityData = JSON.parse(data.skuJson); //SKU信息
            this.quantList = JSON.parse(res.data.result.skuJson);
            this.quantList.map(v => {
              v.properties = JSON.parse(v.properties).toString();
            });
            this.gallery = data.item.itemImages;
            this.goodsInfo = data.item;
            // 商品数据渲染
            this.goodsList.map(v => {
              let data = {
                isActiveC: false,
                value: []
              };
              data.name = v.propertyName;
              data.id = v.propertyId;
              for (let jsonKey in v.propertyValues) {
                data.value.push({
                  id: jsonKey,
                  isActiveC: false,
                  notClick: false,
                  cname: v.propertyValues[jsonKey]
                });
              }
              this.keys.push(data);
            });

            // 库存数据
            this.quantityData.map(v => {
              // 处理商品号
              let array = JSON.parse(v.properties);
              let str = "";
              array.map(vv => {
                str += vv + ";";
              });
              if (v.quantity > 0) {
                this.data[str.substring(0, str.length - 1)] = {
                  price: v.salePrice,
                  count: v.quantity
                };
              }
            });
            // 画商品图
            this.drawImg();
            this.countTime();
            this.queryDGoodsById();
            //查询是否存在优惠券
            availableCoupon({
              storeId: data.item.storeId
            })
              .then(res => {
                if (res.data.code == "200" && res.data.result.length>0) {
                  this.couponList = res.data.result;
                  this.couponShowFlag = true;
                  if (this.couponList.length > 0) {
                    this.couponList.map(coupon => {
                      this.$set(coupon, "btnAble", true);
                    });
                  }
                }
                // this.couponShow = true;
              })
              .catch(err => {
                this.couponShow = false;
              });
          } else {
            wx.showToast({
              icon: "none",
              title: res.data.message
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1500);
          }
        })
        .catch(err => {
          wx.showToast({
            icon: "none",
            title: "商品状态异常"
          });
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 1500);
        });
    },
    showType() {
      this.showpop = !this.showpop;
    },

    /*商品详情数据*/
    queryDGoodsById() {
      this.initSKU(); //初始化，得到SKUResult
      /*根据SKUResult得到初始化的时候哪些不能点击*/
      for (let i = 0; i < this.keys.length; i++) {
        for (let j = 0; j < this.keys[i].value.length; j++) {
          if (this.SKUResult[this.keys[i].value[j].id] == null) {
            this.keys[i].value[j].notClick = true;
          }
        }
      }
    },
    //获得对象的key
    getObjKeys(obj) {
      if (obj !== Object(obj)) throw new TypeError("Invalid object");
      var keys = [];
      for (var key in obj)
        if (Object.prototype.hasOwnProperty.call(obj, key))
          keys[keys.length] = key;
      return keys;
    },

    //把组合的key放入结果集SKUResult
    add2SKUResult(combArrItem, sku) {
      var key = combArrItem.join(";");
      if (this.SKUResult[key]) {
        //SKU信息key属性·
        this.SKUResult[key].count += sku.count;
        this.SKUResult[key].prices.push(sku.price);
      } else {
        this.SKUResult[key] = {
          count: sku.count,
          prices: [sku.price]
        };
      }
    },

    //初始化得到结果集
    initSKU() {
      var i,
        j,
        skuKeys = this.getObjKeys(this.data);
      for (i = 0; i < skuKeys.length; i++) {
        var skuKey = skuKeys[i]; //一条SKU信息key
        var sku = this.data[skuKey]; //一条SKU信息value
        var skuKeyAttrs = skuKey.split(";"); //SKU信息key属性值数组
        skuKeyAttrs.sort(function(value1, value2) {
          return parseInt(value1) - parseInt(value2);
        });

        //对每个SKU信息key属性值进行拆分组合
        var combArr = this.combInArray(skuKeyAttrs);
        for (j = 0; j < combArr.length; j++) {
          this.add2SKUResult(combArr[j], sku);
        }

        //结果集接放入SKUResult
        this.SKUResult[skuKeyAttrs.join(";")] = {
          count: sku.count,
          prices: [sku.price]
        };
      }
    },

    /**
     * 从数组中生成指定长度的组合
     * 方法: 先生成[0,1...]形式的数组, 然后根据0,1从原数组取元素，得到组合数组
     */
    combInArray(aData) {
      if (!aData || !aData.length) {
        return [];
      }

      var len = aData.length;
      var aResult = [];

      for (var n = 1; n < len; n++) {
        var aaFlags = this.getCombFlags(len, n);
        while (aaFlags.length) {
          var aFlag = aaFlags.shift();
          var aComb = [];
          for (var i = 0; i < len; i++) {
            aFlag[i] && aComb.push(aData[i]);
          }
          aResult.push(aComb);
        }
      }

      return aResult;
    },

    /**
     * 得到从 m 元素中取 n 元素的所有组合
     * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
     */
    getCombFlags(m, n) {
      if (!n || n < 1) {
        return [];
      }

      var aResult = [];
      var aFlag = [];
      var bNext = true;
      var i, j, iCnt1;

      for (i = 0; i < m; i++) {
        aFlag[i] = i < n ? 1 : 0;
      }

      aResult.push(aFlag.concat());

      while (bNext) {
        iCnt1 = 0;
        for (i = 0; i < m - 1; i++) {
          if (aFlag[i] == 1 && aFlag[i + 1] == 0) {
            for (j = 0; j < i; j++) {
              aFlag[j] = j < iCnt1 ? 1 : 0;
            }
            aFlag[i] = 0;
            aFlag[i + 1] = 1;
            var aTmp = aFlag.concat();
            aResult.push(aTmp);
            if (
              aTmp
                .slice(-n)
                .join("")
                .indexOf("0") == -1
            ) {
              bNext = false;
            }
            break;
          }
          aFlag[i] == 1 && iCnt1++;
        }
      }
      return aResult;
    },
    /*商品条件筛选*/
    tabInfoChange(index, cindex, cid, e) {
      let orderInfo = this.keys; /*所有规格*/
      let orderInfoChild = this.keys[index]
        .value; /*当前点击的规格的所有子属性内容*/
      //选中自己，兄弟节点取消选中
      if (orderInfoChild[cindex].notClick != true) {
        if (orderInfoChild[cindex].isActiveC == true) {
          orderInfoChild[cindex].isActiveC = false;
        } else {
          for (let i = 0; i < orderInfoChild.length; i++) {
            orderInfoChild[i].isActiveC = false;
          }
          orderInfoChild[cindex].isActiveC = true;
        }
      }

      //已经选择的节点
      let haveChangedId = [];
      for (let i = 0; i < this.keys.length; i++) {
        for (let j = 0; j < this.keys[i].value.length; j++) {
          if (this.keys[i].value[j].isActiveC == true) {
            haveChangedId.push(this.keys[i].value[j].id);
          }
        }
      }
      if (haveChangedId.length) {
        //获得组合key价格
        haveChangedId.sort(function(value1, value2) {
          return parseInt(value1) - parseInt(value2);
        });
        var len = haveChangedId.length;
        var prices = this.SKUResult[haveChangedId.join(";")].prices;
        var maxPrice = Math.max.apply(Math, prices);
        var minPrice = Math.min.apply(Math, prices);
        this.nowPrice =
          maxPrice > minPrice
            ? minPrice + "-" + maxPrice
            : maxPrice; /*筛选价格*/

        //用已选中的节点验证待测试节点
        let daiceshi = []; //待测试节点
        let daiceshiId = [];
        for (let i = 0; i < this.keys.length; i++) {
          for (let j = 0; j < this.keys[i].value.length; j++) {
            if (this.keys[index].value[cindex].id != this.keys[i].value[j].id) {
              daiceshi.push({
                index: i,
                cindex: j,
                id: this.keys[i].value[j].id
              });
              daiceshiId.push(this.keys[i].value[j].id);
            }
          }
        }
        for (let i = 0; i < haveChangedId.length; i++) {
          var indexs = daiceshiId.indexOf(haveChangedId[i]);
          if (indexs > -1) {
            daiceshi.splice(indexs, 1);
          }
        }
        for (let i = 0; i < daiceshi.length; i++) {
          let testAttrIds = []; //从选中节点中去掉选中的兄弟节点
          let siblingsId = "";
          for (let m = 0; m < this.keys[daiceshi[i].index].value.length; m++) {
            if (this.keys[daiceshi[i].index].value[m].isActiveC == true) {
              siblingsId = this.keys[daiceshi[i].index].value[m].id;
            }
          }
          if (siblingsId != "") {
            for (let j = 0; j < len; j++) {
              haveChangedId[j] != siblingsId &&
                testAttrIds.push(haveChangedId[j]);
            }
          } else {
            testAttrIds = haveChangedId.concat();
          }
          testAttrIds = testAttrIds.concat(
            this.keys[daiceshi[i].index].value[daiceshi[i].cindex].id
          );
          testAttrIds.sort(function(value1, value2) {
            return parseInt(value1) - parseInt(value2);
          });
          if (!this.SKUResult[testAttrIds.join(";")]) {
            this.keys[daiceshi[i].index].value[
              daiceshi[i].cindex
            ].notClick = true;
            this.keys[daiceshi[i].index].value[
              daiceshi[i].cindex
            ].isActiveC = false;
          } else {
            this.keys[daiceshi[i].index].value[
              daiceshi[i].cindex
            ].notClick = false;
          }
        }
      } else {
        //设置默认价格
        this.nowPrice = "--";
        //设置属性状态
        for (let i = 0; i < this.keys.length; i++) {
          for (let j = 0; j < this.keys[i].value.length; j++) {
            if (this.SKUResult[this.keys[i].value[j].id]) {
              this.keys[i].value[j].notClick = false;
            } else {
              this.keys[i].value[j].notClick = true;
              this.keys[i].value[j].isActiveC = false;
            }
          }
        }
      }
      this.quantList.map(v => {
        if (v.properties == haveChangedId) {
          this.selectSkuData = v;
          this.quantity = this.selectSkuData.quantity;
        }
      });
    }
  },
  computed: {}
};
</script>

<style lang='scss' >
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style.scss";
</style>
<style lang='scss'>
.canvas {
  width: 250px;
  height: 200px;
  z-index: -999;
  position: absolute;
  left: -600px;
  bottom: 0;
}
.goods {
  margin-bottom: 100rpx;
  padding-bottom: 1rpx;
}
.goods .sku {
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  border: 1px solid #ccc;
  width: auto;
  padding: 0px 20px;
  float: left;
  font-size: 13px;
  border-radius: 20px;
  margin-right: 10px;
  margin-top: 10px;
}
.notClick {
  background: #999999;
  color: white;
}
#goodsinfo .tabContent {
  overflow: hidden;
  padding: 10px;
}

#goodsinfo .tabContent .active {
  background: $main-color;
  color: white;
}
.goods .van-stepper {
  width: 200px !important;
  margin: 30px !important;
}
.record .label {
  flex-grow: 1;
}
.record .item {
  float: right;
  color: #999;
  font-size: 28rpx;
}
.record .item span {
  font-size: 30rpx;
  color: #d8001a;
}
.img_group {
  display: flex;
  flex-wrap: wrap;
}
.img_group .img_item {
  padding: 0 10rpx;
}
.img_group .img_item img {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
}
</style>

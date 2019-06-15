<template>
  <div class="goods">
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        duration="1000"
      >
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <image :src="'http://qn.gaoshanmall.cn/'+item.picUrl" class="slide-image"></image>
          </swiper-item>
        </block>
      </swiper>
      <button class="share" hover-class="none" open-type="share" value>分享商品</button>
    </div>
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>
    <div class="goods-info">
      <div class="c">
        <p>{{goodsInfo.title}}</p>
        <p>{{goodsInfo.sketch}}</p>
        <p>￥{{goodsInfo.salePrice}}</p>
        <!--<div v-if="brand.name" class="brand">-->
        <!--<p>{{brand.name}}</p>-->
        <!--</div>-->
      </div>
    </div>
    <div @click="openSku('buyNow')" class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div>
    <!-- <div @click="showType" class="section-nav">
      <div>用户评价</div>
      <div></div>
    </div>-->

    <div v-if="attribute.length!=0" class="attribute">
      <div class="head">商品参数</div>
      <div v-for="(item,index) in attribute" :key="index" class="item">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <div v-if="goods_desc" class="detail">
      <wxParse :content="goods_desc"/>
    </div>
    <!-- 常见问题 -->
    <div class="common-problem">
      <div class="h">
        <div class="line"></div>
        <text class="title">常见问题</text>
        <div class="line"></div>
      </div>
      <div class="b">
        <div class="item" v-for="(item, index) in issueList" :key="index">
          <div class="question-box">
            <text class="spot"></text>
            <text class="question">{{item.question}}</text>
          </div>
          <div class="answer">{{item.answer}}</div>
        </div>
      </div>
    </div>
    <!-- 大家都在看 -->
    <!-- <div class="common-problem">
      <div class="h">
        <div class="line"></div>
        <text class="title">大家都在看</text>
        <div class="line"></div>
      </div>
      <div class="sublist">
        <div
          @click="togoodsDetail(subitem.id)"
          v-for="(subitem, subindex) in productList"
          :key="subindex"
        >
          <img :src="subitem.list_pic_url" alt>
          <p>{{subitem.name}}</p>
          <p>￥{{subitem.retail_price}}</p>
        </div>
      </div>
    </div> -->

    <!-- sku -->
    <van-popup class="attr-pop" position="bottom" :show="showpop" @close="showType">
      <div class="top">
        <div class="left">
          <img
            v-if="gallery.length>0"
            :src="'http://qn.gaoshanmall.cn/'+gallery[0].picUrl"
          >
        </div>
        <div class="right">
          <div>
            <p>价格￥{{nowPrice}}</p>
          </div>
        </div>
        <div @click="showType" class="close">
          X
        </div>
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
      </div> -->
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
      <p>请选择商品数量</p>
      <van-stepper style="width:100px;margin:0 auto;"
        @plus="plusGoodsNum()"
        @minus="minusGoodsNum()"
        async-change
        :step="1"
        :min="1"
        :value="goodsNum"
      />
      <div class="handle">
        <van-button type="danger" size="large" @click="submit()">确定</van-button>
      </div>
    </van-popup>

    <div class="bottom-fixed">
      <div @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' :'']"></div>
      </div>
      <div @click="toCart">
        <div class="car">
          <span>{{allnumber}}</span>
          <img src="/static/images/ic_menu_shoping_nor.png">
        </div>
      </div>
      <div @click="openSku('buyNow')">立即购买</div>
      <div @click="openSku('addCart')">加入购物车</div>
    </div>
  </div>
</template>

<script>
import { get, post, toLogin, login, getStorageOpenid } from "../../utils";
import { getGoodsDetail } from "../../api/home";
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
  onShow() {},
  data() {
    return {
      allnumber: 0,//购物车商品数量
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
      flag:"",
      selectSkuData: null, //已选中的sku对象
      goodsNum: 1,
      keys: [
        // {
        //   name: "颜色",
        //   isActive: true,
        //   value: [
        //     {
        //       id: "24",
        //       cname: "黄色",
        //       isActiveC: false,
        //       notClick: false
        //     },
        //     {
        //       id: "25",
        //       cname: "红色",
        //       isActiveC: false,
        //       notClick: false
        //     }
        //   ]
        // },
        // {
        //   name: "属性",
        //   isActive: false,
        //   value: [
        //     {
        //       id: "12",
        //       cname: "大",
        //       isActiveC: false,
        //       notClick: false
        //     },
        //     {
        //       id: "13",
        //       cname: "小",
        //       isActiveC: false,
        //       notClick: false
        //     }
        //   ]
        // },
        // {
        //   name: "尺寸",
        //   isActive: false,
        //   value: [
        //     {
        //       id: "31",
        //       cname: "长方形",
        //       isActiveC: false,
        //       notClick: false
        //     },
        //     {
        //       id: "32",
        //       cname: "圆形",
        //       isActiveC: false,
        //       notClick: false
        //     }
        //   ]
        // }
      ],
      data: {
        // "24;12;31": {
        //   price: 366.0,
        //   count: 46
        // },
        // "25;12;32": {
        //   price: 406,
        //   count: 66
        // }
      },
      SKUResult: {},
      nowPrice: "--",

      quantityData: [],
      goodsList: []
    };
  },
  onLoad() {},
  mounted() {
    //判断是否登录获取用户信息
    if (login()) {
      this.userInfo = login();
    }

    this.id = this.$root.$mp.query.id;

    this.openId = getStorageOpenid();
    this.getCartGoodsNum();
    this.goodsDetail();
  },
  //商品转发
  onShareAppMessage() {
    return {
      // title: this.info.name,
      path: "/pages/goods/main?id=" + this.info.id,
      imageUrl: this.gallery[0].img_url //拿第一张商品的图片
    };
  },
  components: {
    wxParse
  },
  methods: {
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
      
       if(this.selectSkuData!=null){
        //  console.log(this.selectSkuData);
         if(this.goodsNum>this.selectSkuData.quantity){
           this.goodsNum--;
         }else{
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
      this.selectSkuData = null;
      if(data){
         this.flag = data;
      }
      this.showpop = true;
      
    },
    //提交
    submit(){
      if(this.flag == "buyNow"){
      
        if (toLogin()) {
          if (this.showpop) {
            if(this.selectSkuData!=null){
              let params = {
                bundleGroup: "",
                bundleId: "",
                buyType: "N",
                itemId: this.selectSkuData.itemId,
                offerType: "",
                quantity: this.goodsNum,
                skuId: this.selectSkuData.id,
                skuIdInfo: this.selectSkuData.id,
                storeId: this.selectSkuData.storeId,
              }
              let model = JSON.stringify(params);
              wx.navigateTo({
                url: "/pages/order/main?from=goodsDetail&params=" + model
              });
            }else{
              wx.showToast({
                title: "请选择商品规格",
                icon: "none",
                duration: 1500
              });
            }
          } 
        }
      }else if(this.flag == "addCart"){
        console.log(this.selectSkuData);
        
          if (toLogin()) {
            if (this.showpop) {
              if(this.selectSkuData!=null){
                let params = {
                  skuIdArray:[],
                  skuQtyArray:[]
                }
                params.skuIdArray.push(this.selectSkuData.id);
                params.skuQtyArray.push(this.goodsNum);
                // console.log(params);
                addShoppingcart(params)
                  .then(res => {
                    
                    wx.showToast(  {title:res.data.message});
                    this.showpop = false;
                    this.getCartGoodsNum();
                  })
                  .catch(err => {
                    this.showpop = false;
                  });
                  }else{
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
    async goodsDetail() {
      getGoodsDetail({
        itemId: "388"
      })
        .then(res => {
          
          const data = res.data.result;
          this.goods_desc = data.item.itemChannel.description;//详情描述富文本
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
          console.log(this.data);
          this.queryDGoodsById();
        })
        .catch(err => {
          console.log(err);
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
          //  console.log(v, 1)
          this.selectSkuData = v;
          console.log(this.selectSkuData);
        }
      });
    }
  },
  computed: {}
};
</script>

<style lang='scss' scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style.scss";
</style>
<style>
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
  background: red;
  color: white;
}
.goods .van-stepper{
  width: 200px!important;
  margin: 30px!important;
}
</style>

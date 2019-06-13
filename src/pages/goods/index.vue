<template>
  <div class="goods">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.img_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
      <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
    </div>
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>
    <div class="goods-info">
      <div class="c">
        <!--<p>{{info.name}}</p>-->
        <!--<p>{{info.goods_brief}}</p>-->
        <!--<p>￥{{info.retail_price}}</p>-->
        <!--<div v-if="brand.name" class="brand">-->
          <!--<p>{{brand.name}}</p>-->
        <!--</div>-->
      </div>
    </div>
    <div @click="showType" class="section-nav">
      <div>请选择规格数量</div>
      <div></div>
    </div>
    <!-- <div @click="showType" class="section-nav">
      <div>用户评价</div>
      <div></div>
    </div> -->

    <div v-if="attribute.length!=0" class="attribute">
      <div class="head">
        商品参数
      </div>
      <div v-for="(item,index) in attribute" :key="index" class="item">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <div v-if="goods_desc" class="detail">
      <wxParse :content="goods_desc" />
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
          <div class="answer">
            {{item.answer}}
          </div>
        </div>
      </div>
    </div>
    <!-- 大家都在看 -->
    <div class="common-problem">
      <div class="h">
        <div class="line"></div>
        <text class="title">大家都在看</text>
        <div class="line"></div>
      </div>
      <div class="sublist">
        <div @click="togoodsDetail(subitem.id)" v-for="(subitem, subindex) in productList" :key="subindex">
          <img :src="subitem.list_pic_url" alt="">
          <p>{{subitem.name}}</p>
          <p>￥{{subitem.retail_price}}</p>
        </div>
      </div>
    </div>

    <!-- sku -->
    <van-popup
      position="bottom"
      :show="showpop"
      @close="showType">
      <div id="goodsinfo">
        <div v-for="(item,index) in keys" :key="index">
          <div class="tabContent">
            {{item ? item.name : ''}}:
            <div  v-for="(citem,cindex) in item.value" :key="cindex">
              <button
                type="button"
                class="sku"
                @click="tabInfoChange(index,cindex,citem.id,$event)"
                :class="{notClick:citem.notClick,active:citem.isActiveC}"
                :attr_id="citem.id"
                :value="citem.cname"
                :key="citem.id"
              >
                {{citem.cname}}
              </button>
            </div>
          </div>
        </div>
        <span id="price">{{nowPrice}}</span>
      </div>
      <van-stepper :value="1" />
    </van-popup>

    <div class="bottom-fixed">
      <div @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' :'']">

        </div>

      </div>
      <div @click="toCart">
        <div class="car">
          <span>
            {{allnumber}}
          </span>
          <img src="/static/images/ic_menu_shoping_nor.png" alt="">
        </div>
      </div>
      <div @click="bug">立即购买</div>
      <div @click="addCart">加入购物车</div>
    </div>

  </div>
</template>

<script>
  import { get, post, toLogin, login, getStorageOpenid } from "../../utils";
  import { goodsDetail } from '../../api/home'
  import wxParse from "mpvue-wxparse";

  export default {
    onShow() {
    },
    data() {
      return {
        allnumber: 0,
        openId: "",
        collectFlag: false,
        number: 0,
        showpop: true,
        gallery: [],
        info: {},
        brand: {},
        attribute: [],
        issueList: [],
        productList: [],
        goods_desc: "",
        id: "",
        userInfo: "",
        goodsId: "",
        allPrise: "",

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
    onLoad() {
      goodsDetail({
        itemId: '332'
      }).then(res => {
        this.goodsList = res.data.result.item.pdpPropertiesCommands;
        this.quantityData =JSON.parse(res.data.result.skuJson);

        // 商品数据渲染
        this.goodsList.map(v => {
          let data = {
            isActiveC: false,
            value: []
          };
          data.name =  v.propertyName;
          data.id = v.propertyId;
          for(let jsonKey in v.propertyValues) {
            data.value.push({
              id: jsonKey,
              isActiveC: false,
              notClick: false,
              cname: v.propertyValues[jsonKey]
            })
          }
          this.keys.push(data);
        });

        // 库存数据
        this.quantityData.map(v => {
          // 处理商品号
          let array =  JSON.parse(v.properties);
          let str = '';
          array.map(vv => {
            str += vv + ';'
          })
          if(v.quantity > 0) {
            this.data[str.substring(0, str.length - 1)] = {
              price: v.salePrice,
              count: v.quantity
            };
          }
        });
        console.log(this.data)
        this.queryDGoodsById();
      }).catch(err => {
        console.log(err);
      })
    },
    mounted() {
      //判断是否登录获取用户信息
      if (login()) {
        this.userInfo = login();
      }

      this.id = this.$root.$mp.query.id;

      this.openId = getStorageOpenid();
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
      async bug() {
        if (toLogin()) {
          if (this.showpop) {
            if (this.number == 0) {
              wx.showToast({
                title: "请选择商品数量", //提示的内容,
                duration: 2000, //延迟时间,
                icon: "none",
                mask: true, //显示透明蒙层，防止触摸穿透,
                success: res => { }
              });
              return false;
            }

            const data = await post("/order/submitAction", {
              goodsId: this.goodsId,
              openId: this.openId,
              allPrise: this.allPrise
            });
            if (data) {
              wx.navigateTo({
                url: "/pages/order/main"
              });
            }
          } else {
            this.showpop = true;
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
      async addCart() {
        if (toLogin()) {
          if (this.showpop) {
            if (this.number == 0) {
              wx.showToast({
                title: "请选择商品数量", //提示的内容,
                duration: 2000, //延迟时间,
                icon: "none",
                mask: true, //显示透明蒙层，防止触摸穿透,
                success: res => { }
              });
              return false;
            }
            const data = await post("/cart/addCart", {
              openId: this.userInfo.openId,
              goodsId: this.goodsId,
              number: this.number
            });
            //添加成功后
            if (data) {
              this.allnumber = this.allnumber + this.number;
              wx.showToast({
                title: "添加购物车成功",
                icon: "success",
                duration: 1500
              });
            }
          } else {
            this.showpop = true;
          }
        }
      },
      toCart() {
        wx.switchTab({
          url: "/pages/cart/main"
        });
        // wx.navigateTo({
        //   url: "/pages/cart/main"
        // });
      },
      async goodsDetail() {
        const data = await get("/goods/detailaction", {
          id: this.id,
          openId: this.openId
        });
        this.gallery = data.gallery;
        this.info = data.info;
        this.allPrise = data.info.retail_price;
        this.goodsId = data.info.id;
        this.brand = data.brand;
        this.attribute = data.attribute;
        this.goods_desc = data.info.goods_desc;
        this.issueList = data.issue;
        this.collectFlag = data.collected;
        this.allnumber = data.allnumber;
        this.productList = data.productList;
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
</style>

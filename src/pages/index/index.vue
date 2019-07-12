<template>
  <div class="index_home">
    <div class="search">
      <div @click="toMappage" class="captain">
        <div v-if="captainInfo!=null">
          <div class="title">{{captainInfo.address}}</div>
          <span class="toggle_btn">切 换</span>
          <div class="address">提货位置:{{captainInfo.deliveryAddress}}</div>
        </div>
        <div v-else>{{cityName}}</div>
      </div>
      <div @click="toSearch" class="search_bar">
        <input type="text" placeholder="搜索您要的商品" placeholder-class="phcolor" />
        <span class="icon"></span>
      </div>
    </div>
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        circular="true"
        duration="500"
      >
        <block v-for="(item, index) in banner " :key="index">
          <swiper-item class="swiper-item">
            <img
              @click="goodsDetail(item)"
              :src="'http://qn.gaoshanmall.cn/' + item.banner"
              class="slide-image"
            />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="channel">
      <div
        @click="toCategoryList(item.categoryId, item.name)"
        v-for="(item, index) in channelList"
        :key="index"
      >
        <img :src="'http://qn.gaoshanmall.cn/'+ item.logo" alt />
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(item, index) in newCategoryList" :key="index">
        <div class="head">{{item.name}}</div>
        <div class="sublist">
          <van-card
            :lazy-load="true"
            :price="good.listPrice"
            :origin-price="good.salePrice"
            :title="good.name"
            custom-class="goods-card"
            thumb-class="goods-image"
            origin-price-class="goods-origin-price"
            price-class="goods-price"
            title-class="goods-title"
            desc-class="goods-desc"
            v-for="(good, goodIndex) in item.goodsList"
            :key="goodIndex"
            @click="goodsDetail(good)"
            :thumb="'http://qn.gaoshanmall.cn/' + good.img"
          >
            <div slot="desc" class="goods-bottom">
              <div class="sketch">{{good.sketch}}</div>
              <div class="hot">热销中</div>
              <div class="sale">
                <span class="sold">已售{{good.saleCount}}份</span>
                <span class="remain">仅剩{{good.totalStock}}份</span>
              </div>
            </div>
          </van-card>
        </div>
      </div>
    </div>
    <div v-if="newCategoryList.length > 0" class="no_more_data">
      <span>—</span>
      <span>我也是有底线的</span>
      <span>—</span>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { getIndexItem } from "../../api/index/index";
import { mapState, mapMutations } from "vuex";
import { shoppingcartCount } from "../../api/shoppingcart/index";
export default {
  onPullDownRefresh: function() {
    this.brandList = [];
    this.newGoods = [];
    this.hotGoods = [];
    this.newCategoryList = [];
    this.getCartGoodsNum();
    if (wx.getStorageSync("data")) {
      this.captainInfo = Object.assign({}, wx.getStorageSync("data"));
    } else {
      wx.navigateTo({
        url: "/pages/mappage/main"
      });
    }
    this.getData();
    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  mounted() {
    this.getCityName();
    this.getData();
    this.getCartGoodsNum();
  },
  onShow() {
    this.getCartGoodsNum();
    if (wx.getStorageSync("data")) {
      this.captainInfo = Object.assign({}, wx.getStorageSync("data"));
    } else {
      wx.navigateTo({
        url: "/pages/mappage/main"
      });
    }
  },
  onShareAppMessage(res) {
    console.log(res);
  },
  computed: {
    ...mapState(["cityName"])
  },

  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
      channelList: [],
      captainInfo: null
    };
  },
  components: {},
  methods: {
    // 商品分类
    toCategoryList(id, name) {
      wx.navigateTo({
        url: "../categorylist/main?id=" + id + "&name=" + name
      });
    },

    //获取购物车中的商品数量
    getCartGoodsNum() {
      shoppingcartCount()
        .then(res => {
          if (res.data.code == "200") {
            wx.showTabBarRedDot({
              index: 3
            });
            wx.setTabBarBadge({
              index: 3,
              text: res.data.result.toString()
            });
          }
        })
        .catch(err => {});
    },
    ...mapMutations(["update"]),
    toMappage() {
      var _this = this;
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success(res) {
          //如果没有同意授权,打开设置
          if (!res.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success: res => {
                _this.getCityName();
              }
            });
          } else {
            wx.navigateTo({
              url: "/pages/mappage/main"
            });
          }
        }
      });
    },
    getCityName() {
      var _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548"
      });
      myAmapFun.getRegeo({
        success: function(data) {
          // data[0].regeocodeData.formatted_address
          // _this.cityName = data[0].regeocodeData.formatted_address;
          _this.update({ cityName: data[0].regeocodeData.formatted_address });
        },
        fail: function(info) {
          //失败回调
          console.log(info);
          //如果用户拒绝授权
          // 默认为北京
          _this.cityName = "北京市";
          _this.update({ cityName: "北京市" });
        }
      });
    },
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    },

    async getData() {
      wx.showLoading({
        title: "加载中",
        mask: true
      });
      
      const data = await getIndexItem();
      // console.log(data,'666');
      if (data.data.code=="200") {
        this.banner = data.data.result.banner;
        this.channelList = data.data.result.indexCategories;
        this.newCategoryList.push({
          name: "热销爆品",
          goodsList: data.data.result.hotSale
        });

        this.newCategoryList.push({
          name: "新品上市",
          goodsList: data.data.result.recommended
        });
      }

      setTimeout(() => {
        wx.hideLoading();
      }, 1000);
    },
    goodsDetail(item) {
      if (item.status == 1) {
        wx.navigateTo({
          url: "/pages/topicdetail/main?id=" + item.itemId
        });
      } else {
        wx.navigateTo({
          url: "/pages/goods/main?id=" + item.itemId
        });
      }
    },
    // 更多分类
    categoryList(item) {
      wx.navigateTo({
        url: "/pages/categorylist/main?id=" + id
      });
    },
    goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url: "/pages/newgoods/main?isHot=" + 1
        });
      } else {
        wx.navigateTo({
          url: "/pages/newgoods/main?isNew=" + 1
        });
      }
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
    totopic() {
      wx.navigateTo({
        url: "/pages/topic/main"
      });
    },
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main"
      });
    },
    branddetail(id) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + id
      });
    }
  },
  created() {}
};
</script>

<style lang='scss'>
@import "./style.scss";
</style>

<template>
  <div class="index">
    <div class="search">
      <div @click="toMappage" class="captain">
        <div v-if="captainInfo!=null">
          <div style="font-size: 30rpx;">{{captainInfo.address}} <span class="toggle_btn">切换</span> </div>
          <div style="font-size: 24rpx;color:#999;">提货位置:{{captainInfo.deliveryAddress}}</div>
        </div>
        <div v-else>
          {{cityName}}
        </div>
      </div>
      <div @click="toSearch" class="search_bar">
        <input type="text" placeholder="搜索商品" />
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
        <div class="head">{{item.name}}商品</div>
        <div class="sublist">
          <div
            @click="goodsDetail(subitem.itemId)"
            v-for="(subitem, subindex) in item.goodsList"
            :key="subindex"
          >
            <img :src="'http://qn.gaoshanmall.cn/'+ subitem.img" alt />
            <p>{{subitem.name}}</p>
            <p>￥{{subitem.salePrice}}</p>
          </div>
          <!--<div @click="categoryList(item)">-->
          <!--<div class="last">-->
          <!--<p>{{item.name}}商品</p>-->
          <!--<span class="icon"></span>-->
          <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div v-if="newCategoryList.length > 0" class="title">
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
  onShow() {
    this.getCartGoodsNum();
    if (wx.getStorageSync("data")) {
      this.captainInfo = Object.assign({}, wx.getStorageSync("data"));
    } else {
      wx.navigateTo({
        url: "/pages/mappage/main"
      });
    }
    this.getData();
  },
  onShareAppMessage(res) {
    console.log(res);
  },
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
    //  wx.navigateTo({
    //     url: "/pages/login/main"
    //   });
    this.getCityName();
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
      const data = await getIndexItem();
      this.banner = data.data.result.banner;
      this.channelList = data.data.result.indexCategories;
      console.log(this.channelList);
      this.newCategoryList.push({
        name: "热销",
        goodsList: data.data.result.hotSale
      });

      this.newCategoryList.push({
        name: "推荐",
        goodsList: data.data.result.recommended
      });
    },
    goodsDetail(item) {
      if(item.status == 0) {
        wx.navigateTo({
          url: "/pages/goods/main?id=" + item.itemId
        });
      }else {
        wx.navigateTo({
          url: "/pages/topicdetail/main?id=" + item.itemId
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

<style lang='scss' scoped>
@import "./style.scss";
.title {
  text-align: center;
  padding: 20rpx 0;
  width: 100%;

  span:nth-child(2) {
    font-size: 24rpx;
    color: #333;
    padding: 0 10rpx;
  }

  span:nth-child(2n + 1) {
    color: #999;
  }
}
</style>

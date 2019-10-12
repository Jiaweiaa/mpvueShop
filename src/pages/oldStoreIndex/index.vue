<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 09:42:56
 * @LastEditTime: 2019-10-10 14:25:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div v-if="tabbarActive == 0">
      <div class="search_main">
        <div class="search">
          <input
            type="text"
            confirm-type="search"
            v-model="words"
            @click="inputFocus"
            @confirm="searchWords"
            :placeholder="active==0?'搜索店铺内商品':'店铺搜索'"
          />
          <span class="icon"></span>
          <span class="cancel" v-if="showTips" @click="hideTips">取消</span>
        </div>
        <div class="tabs" @change="tabChange" v-if="false">
          <div
            class="tab_item"
            :class="tab.active?'active':''"
            v-for="(tab,tabIndex) in tabs"
            :key="tabIndex"
            @click="tabChange(tab)"
          >{{tab.name}}</div>
        </div>
      </div>
      <div class="main">
        <!--
	           搜索结果关键词
        -->
        <div class="searchtips" v-if="words && showTips">
          <div
            @click="searchWords"
            v-if="tipsData.length!=0"
            :data-value="item.name"
            v-for="(item,index) in tipsData"
            :key="index"
          >{{ item.name }}</div>
          <!-- <div v-if="tipsData.length==0" class="nogoods">暂无此类商品...</div> -->
        </div>

        <!--
	    缓存搜索记录
	    推送什么的
        -->
        <div v-if="showTips" class="helpSearch">
          <div class="history" v-if="historyData.length > 0 &&showTips">
            <div class="t">
              <div>历史记录</div>
              <div @click="clearHistory"></div>
            </div>
            <div class="cont">
              <div
                @click="searchWords"
                :data-value="item.keyword"
                v-for="(item,index) in historyData"
                :key="index"
              >{{item.keyword}}</div>
            </div>
          </div>
          <div class="history hotsearch">
            <div class="t">
              <div>热门搜索</div>
            </div>
            <div class="cont">
              <div
                @click="searchWords"
                v-for="(item,index) in hotData"
                :data-value="item.keyword"
                :class="{active:0==index}"
                :key="index"
              >{{item.keyword}}</div>
            </div>
          </div>
        </div>

        <!--商品列表  -->
        <div v-if="listData.length!=0&&active==0&&!showTips" class="goodsList">
          <!-- <div class="storeInfo">
            <img :src="'http://qn.gaoshanmall.cn/' + storeLogo" alt />
            <p>{{storeName}}</p>
          </div> -->
          <div class="swiper-group">
            <div class="swiper">
              <swiper
                class="swiper-container"
                indicator-dots="true"
                autoplay="true"
                interval="3000"
                circular="true"
                duration="500"
              >
                <block>
                  <swiper-item class="swiper-item">
                    <img
                      src="http://pz53ekn6o.bkt.clouddn.com/shuimu.jpeg"
                      class="slide-image"
                    />
                  </swiper-item>
                </block>
              </swiper>
            </div>
          </div>
          <div class="goods-group">
            <div class="sublist">
              <div
                class="good-card"
                v-for="(good, goodIndex) in listData"
                :key="goodIndex"
                @click="goodsDetail(good.id)"
              >
                <div class="thumb">
                  <img :src="'http://qn.gaoshanmall.cn/' + good.img" alt />
                </div>
                <div class="desc">
                  <div class="title">{{good.title}}</div>
                  <div class="sketch">
                    <span>家庭必备</span>
                    <span>送礼首选</span>
                  </div>
                  <!-- <div class="keywords" v-if="good.keywords.length>0">
                  <span
                    class="keywords_item"
                    v-for="(keyword,keywordIndex) in good.keywords"
                    :key="keywordIndex"
                  >{{keyword}}</span>
                  </div>-->
                  <div class="pd"></div>
                  <div class="vip" v-if="good.mixCashPrice &&good.mixScorePrice">
                    <img class="vip_img" src="http://pz53m5lax.bkt.clouddn.com/index_vip.png" alt />
                    <span>
                      ￥{{good.mixCashPrice}}+
                      <img
                        class="money"
                        src="http://pz53m5lax.bkt.clouddn.com/index_money.png"
                        alt
                      />
                      {{good.mixScorePrice}}补贴金
                    </span>
                  </div>
                  <!-- <div class="vip_price" v-if="good.mixCashPrice && good.mixScorePrice">
                  <span>
                    ￥{{good.mixCashPrice}}+
                    <img src="/static/images/index/money.png" alt />
                    {{good.mixScorePrice}}补贴金
                  </span>
                  </div>-->
                  <div class="price">
                    <p>￥{{good.listPrice}}</p>
                    <!-- <p>￥{{good.salePrice}}</p> -->
                  </div>
                  <div class="origin-price" v-if="good.salePrice!=''">
                    <!-- <span>{{good.salePrice?good.salePrice:''}}购物豆</span> -->
                  </div>
                  <!-- <div class="price_2">
                  <span class="span1">￥{{good.listPrice}}</span>

                  <span class="span2" v-if="good.peasPrice">{{good.peasPrice}}购物豆</span>
                  <span class="span3" v-else>￥{{good.salePrice}}</span>
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="noGood" v-else-if="listData.length==0&&active==0&&!showTips">
          <img src="http://pz53ekn6o.bkt.clouddn.com/base_shangpin.png" alt />
        </div>
        <!-- 商品分类 -->
        <van-popup
          :show="searchPopupShow"
          position="right"
          class="filterlayer"
          @close="searchPopupClose"
          :duration="600"
        >
          <div class="filterInner" style="overflow-y: scroll;height: 100vh; width: 85vw; ">
            <!-- <div class="item">
          <div class="itemTitle">
            <div>价格区间</div>
          </div>
          <div>
            <input placeholder="最低价" placeholder-class="center">
            <div
              style="float: left; height: 30px; width: 10%; text-align: center; line-height: 30px;"
            >-</div>
            <input placeholder-class="center" placeholder="最高价  ">
          </div>
            </div>-->
            <div
              class="item"
              v-show="filterList.length>0"
              v-for="(group, grouPindex) in filterList"
              :key="grouPindex"
            >
              <div class="itemTitle" @click="showTabber(grouPindex)">
                <div style="width: 40%; float: left;">{{group.label}}</div>
                <van-icon
                  style="float: right;margin-right: 10px;"
                  :name="group.isShowAll ? 'arrow-up' : 'arrow-down'"
                />
              </div>
              <van-transition
                style="overflow: hidden;"
                :show="group.isShowAll"
                custom-class="block"
                name="slide-down"
              >
                <div class="content">
                  <div
                    class="childItem active"
                    @click="isClickChild(item, group)"
                    :class="{'activeSearch': item.isChecked == true}"
                    v-for="(item, childItem) in group.facetFilterUnitList"
                    :key="childItem"
                  >{{item.label}}</div>
                </div>
              </van-transition>
            </div>
            <div class="footer">
              <van-button
                size="small"
                style="text-align: center;width: 47%; float: left; margin-left: 1%; margin-right: 2%"
                round
                type="danger"
                @click="resetFq()"
              >重置</van-button>
              <van-button
                size="small"
                style="text-align: center;width: 47%; float: left; margin-left: 2%;"
                round
                type="primary"
                @click="popupShow=false"
              >确认</van-button>
            </div>
          </div>
        </van-popup>
        <!-- tabbar -->
      </div>
    </div>

    <StoreCategory v-else></StoreCategory>
    <van-tabbar :active="tabbarActive" @change="tabbarChange">
      <van-tabbar-item>
        <image slot="icon" src="/static/images/bt_home.png" mode="aspectFit" />
        <image slot="icon-active" src="/static/images/bt_home_active.png" mode="aspectFit" />商品
      </van-tabbar-item>
      <van-tabbar-item>
        <image slot="icon" src="/static/images/bt_fenlei.png" mode="aspectFit" />
        <image slot="icon-active" src="/static/images/bt_fenlei_active.png" mode="aspectFit" />分类
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {
  searchItem,
  getFrontStoreList,
  getKeyword,
  setHistorySearch,
  removeHistorySearch,
  findHistorySearch,
  getStoreInfo
} from "../../api/category/index";
import StoreCategory from "./components/StoreCategory";
export default {
  // onLoad() {
  //   this.openid = wx.getStorageSync("openid") || "";
  //   this.getHistory();
  //   this.getHotData();
  // },
  components: {
    StoreCategory
  },
  onLoad: function(options) {
    if (options.storeId) {
      wx.setStorageSync("storeId", options.storeId);
    } else if (options.scene) {
      wx.setStorageSync("storeId", options.scene);
    } else {
      wx.setStorageSync("storeId", 1);
    }
    this.storeId = wx.getStorageSync("storeId");
    getStoreInfo({ storeId: this.storeId })
      .then(res => {
        this.storeName = res.data.result.name;
        this.storeLogo = res.data.result.logo;
        wx.setNavigationBarTitle({
          title: res.data.result.name
        });
      })
      .catch(err => {});
  },
  mounted() {
    this.openid = wx.getStorageSync("openid") || "";
    this.getHistory();
    this.getHotData();
    //获取页面传的参数
    if (this.$root.$mp) {
      if (this.$root.$mp.query.id) {
        this.categoryId = this.$root.$mp.query.id;
        this.showTips = false;
      }
      if (this.$root.$mp.query.name) {
        this.name = this.$root.$mp.query.name;
      }
      if (this.$root.$mp.query.storeId) {
        this.storeId = this.$root.$mp.query.storeId;
      }
    }
    this.getlistData();
  },
  // 上啦加载
  async onReachBottom() {
    if (this.loading) return;
    wx.showLoading({
      title: "加载中"
    });
    this.loading = true;
    console.log(this.active, "active的值");
    if (this.active == 0) {
      console.log(this.listData.length, "数据长度");
      console.log(this.allCount, "后台返回的总数");
      if (this.listData.length >= this.allCount) {
        this.loading = false;
        wx.hideLoading();
      } else {
        this.pageNum++;
        const res = await searchItem({
          k: this.words,
          s: this.order,
          p: this.pageNum,
          navid: this.categoryId,
          storeId: this.storeId
        });
        if (res.data.code == 200) {
          this.listData = this.listData.concat(res.data.result.itemDocs);
          // this.tipsData = this.listData;
          this.allCount = res.data.result.totalElements;
          this.listData.map(v => {
            if (this.order == "SALES-ASC") {
              if (index < 5) {
                this.$set(v, "tag", "热销");
              }
            }
            v.img = JSON.parse(v.image)[0].images[0];
            this.$set(v, "keyword", v.keywords.join("||"));
          });
          this.tipsData = [];
          this.loading = false;
        } else {
          this.loading = false;
        }
        setTimeout(() => {
          wx.hideLoading();
        }, this.GLOBAL.timer);
      }
    } else if (this.active == 1) {
      if (this.storeListData.length >= this.storeAllCount) {
        this.loading = false;
        wx.hideLoading();
      } else {
        this.pageNum++;
        const res = await findHistorySearch({ k: this.words });
        if (res.data.code == 200) {
          this.loading = false;
          this.storeListData = this.storeListData.concat(
            res.data.result.records
          );

          this.storeAllCount = res.data.result.storeAllCount;
        } else {
          this.loading = false;
        }
        setTimeout(() => {
          wx.hideLoading();
        }, this.GLOBAL.timer);
      }
    }
  },

  // 下啦刷新
  async onPullDownRefresh() {
    this.pageNum = 1;
    if (this.active == 0) {
      this.getGoodList();
      // const res = await searchItem({
      //   k: this.words,
      //   s: this.order,
      //   p: this.pageNum,
      //   navid: this.categoryId,
      //   storeId:this.storeId
      // });
      // if (res.data.code == 200) {
      //   this.listData = res.data.result.itemDocs;
      //   this.tipsData = this.listData;
      //   this.allCount = res.data.result.totalElements;
      //   this.listData.map(v => {
      //     if (this.order == "SALES-ASC") {
      //       if (index < 5) {
      //         this.$set(v, "tag", "热销");
      //       }
      //     }
      //     v.img = JSON.parse(v.image)[0].images[0];
      //     this.$set(v, "keyword", v.keywords.join("||"));
      //   });
      //   this.tipsData = [];
      // }
    } else if (this.active == 1) {
      const res = await findHistorySearch({ k: this.words });
      if (res.data.code == 200) {
        this.storeListData = res.data.result.records;
        this.storeAllCount = res.data.result.total;
      }
    }

    wx.stopPullDownRefresh(); //停止下拉刷新
  },
  data() {
    return {
      tabbarActive: 0, //tabbar默认值
      storeName: "",
      storeLogo: "",
      tabs: [
        {
          name: "商品",
          index: 0,
          active: true
        },
        {
          name: "店铺",
          index: 1,
          active: false
        }
      ],
      categoryId: "", //分类ID
      name: "", //分类名称
      storeId: "", //店铺ID
      showTips: false,
      active: 0,
      nowIndex: 0,
      words: "",
      historyData: [],
      hotData: [],
      tipsData: [],
      listData: [], //商品列表数据
      allCount: "", //商品总数
      storeListData: [], //店铺列表数据
      storeAllCount: "", //店铺总数
      aeo: "", //筛选项拼接字符串
      selectArr: [], //本地已选择的节点数组
      filterList: [],
      openid: "",
      order: "",
      isHot: "",
      isNew: "",
      navData: [],
      pageNum: 1,
      loading: false,
      searchPopupShow: false
    };
  },
  methods: {
    tabbarChange(event) {
      console.log(event, "ooo");
      this.tabbarActive = event.mp.detail;
    },
    //取消搜索
    hideTips() {
      this.showTips = false;
      this.words = "";
      this.getGoodList();
    },
    //获取商品列表
    async getGoodList() {
      const res = await searchItem({
        k: this.words,
        s: this.order,
        p: this.pageNum,
        navid: this.categoryId,
        storeId: this.storeId
      });
      if (res.data.code == 200) {
        this.listData = res.data.result.itemDocs;
        // this.tipsData = this.listData;
        this.allCount = res.data.result.totalElements;
        this.listData.map(v => {
          if (this.order == "SALES-ASC") {
            if (index < 5) {
              this.$set(v, "tag", "热销");
            }
          }
          v.img = JSON.parse(v.image)[0].images[0];
          this.$set(v, "keyword", v.keywords.join("||"));
        });
        this.tipsData = [];
      } else {
        this.loading = false;
      }
    },
    //tab栏切换
    tabChange(tab) {
      // console.log(e);
      this.active = tab.index;
      this.tabs.map(tabs => {
        if (tabs.name == tab.name) {
          tabs.active = true;
        } else {
          tabs.active = false;
        }
      });
    },
    // 获取历史记录
    async getHistory() {
      let data = await findHistorySearch();
      this.historyData = data.data.result;
    },

    //关闭筛选遮罩层
    searchPopupClose() {
      this.searchPopupShow = false;
    },
    //重置筛选项
    resetFq() {
      this.aeo = "";
      this.popupShow = false;
      this.getlistData();
    },
    // 筛选项之间用a 筛选项和筛选项值用e链接 筛选项值之间用o
    // 1e44o45a2
    // 例如：单选两个 condition: 1e3a2e3 ； 单选多选各一个 condition: 1e3 a 2e3o5
    isClickChild(item, group) {
      //记录父节点
      let fatherNode = Object.assign({}, group);
      //被点击的节点 标识取反
      item.isChecked = !item.isChecked;
      //如果该组是单选 做特殊处理 所有本节点的兄弟节点标识全部为false
      if (!group.multiple) {
        group.facetFilterUnitList.map(items => {
          if (items.value != item.value) {
            items.isChecked = false;
          }
        });
      }
      //记录该父节点下的所有标识为true的节点
      let sonNodes = group.facetFilterUnitList.filter(item => {
        return item.isChecked == true;
      });
      //如果子节点数组长度>0 则代表该组被选择上
      if (sonNodes.length > 0) {
        //判断被选中的数组中是否存在本组记录 不存在则添加 存在则重新记录
        let flag = this.selectArr.some(group => {
          return group.fatherNode.value == fatherNode.value;
        });
        let str = "";
        str = fatherNode.value + "e";
        let sonStr = "";
        sonNodes.map(item => {
          sonStr += item.value + "o";
        });

        str = str + sonStr;
        str = str.substr(0, str.length - 1);
        // console.log(str);
        // debugger;
        str = str + "a";
        if (flag) {
          if (this.selectArr.length > 0) {
            this.selectArr = this.selectArr.filter(group => {
              return group.fatherNode.value != fatherNode.value;
            });
          }

          this.selectArr.push({
            fatherNode: fatherNode,
            sonNodes: sonNodes,
            str: str
          });
        } else {
          this.selectArr.push({
            fatherNode: fatherNode,
            sonNodes: sonNodes,
            str: str
          });
        }
      } else {
        this.selectArr = this.selectArr.filter(group => {
          return group.fatherNode.value != fatherNode.value;
        });
      }
      // 筛选项之间用a 筛选组和筛选项值用e链接 筛选项值之间用o
      // 1e44o45a2
      this.aeo = "";
      //   console.log(this.aeo);
      this.selectArr.map(group => {
        this.aeo += group.str;
      });
      //   console.log(this.selectArr);
      this.aeo = this.aeo.substr(0, this.aeo.length - 1);
      this.getlistData();
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    },
    cancel() {
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },
    clearInput() {
      this.words = "";
      this.listData = [];
      this.tipsData = [];
    },
    inputFocus() {
      this.showTips = true;
      //商品清空
      // this.listData = [];
      //商品列表数据清空
      // this.storeListData = [];
      //展示搜索提示信息
      // this.tipsearch();
    },
    async getlistData() {
      wx.showLoading({
        title: "加载中"
      });
      //获取商品列表
      const res = await searchItem({
        k: this.words,
        s: this.order,
        p: this.pageNum,
        fq: this.aeo,
        storeId: this.storeId,
        navid: this.categoryId
      });
      this.navData = res.data.result;
      this.listData = res.data.result.itemDocs;
      this.allCount = res.data.result.totalElements;

      const searchData = await setHistorySearch({
        keyword: this.words
      });
      if (this.listData.length > 0) {
        this.listData.map((v, index) => {
          if (this.order == "SALES-ASC") {
            if (index < 5) {
              this.$set(v, "tag", "热销");
            }
          }
          v.img = JSON.parse(v.image)[0].images[0];
          this.$set(v, "keyword", v.keywords.join("||"));
        });
      }
      if (this.navData.facetFilter.facetFilterLineList) {
        this.filterList = this.navData.facetFilter.facetFilterLineList;
        if (this.filterList.length > 0) {
          this.filterList.map((v, index) => {
            v.isShowAll = true;
            if (index > 2) {
              v.isShowAll = false;
            }
          });
        }
      }
      wx.hideLoading();
      this.tipsData = [];
    },
    //获取商品列表数据
    async getStoreListData() {
      wx.showLoading({
        title: "加载中"
      });
      const res = await getFrontStoreList({
        k: this.words,
        s: this.order,
        p: this.pageNum
      });
      if (res.data.code == "200") {
        wx.hideLoading();
        this.storeListData = res.data.result.records;
        this.storeAllCount = res.data.result.total;
      }
    },
    // 类型切换
    changeTab(index) {
      this.nowIndex = index;
      this.pageNum = 1;
      if (index == 1) {
        this.order =
          this.order == "SALE_PRICE-ASC" ? "SALE_PRICE-DESC" : "SALE_PRICE-ASC";
      } else if (index == 2) {
        this.order = this.order == "SALES-ASC" ? "SALES-DESC" : "SALES-ASC";
      } else if (index == 0) {
        this.order = "LIST_TIME-DESC";
      } else {
        if (this.filterList != null && this.filterList.length > 0) {
          return (this.popupShow = true);
        } else {
          return wx.showToast({
            title: "暂无筛选项数据",
            icon: "none",
            duration: 2000
          });
        }
      }
      this.getlistData();
    },
    async clearHistory() {
      const data = await removeHistorySearch();
      if (data.data.code == 200) {
        this.historyData = [];
      }
    },
    async searchWords(e) {
      var value = e.currentTarget.dataset.value;
      this.words = value || this.words;
      this.showTips = false;
      // const data = await post("/search/addhistoryaction", {
      //   openId: this.openid,
      //   keyword: value || this.words
      // });
      //获取热门数据
      console.log(this.active);
      this.getHotData();
      if (this.active == 0) {
        //获取商品列表
        this.getlistData();
      } else {
        this.getStoreListData();
      }
    },
    async getHotData() {
      const data = await getKeyword();
      this.hotData = data.data.result;
    },

    topicDetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
    toStore(id) {
      wx.navigateTo({
        url: "/pages/storeIndex/main?id=" + id
      });
    },
    toQrcode(id) {
      wx.navigateTo({
        url: "/pages/storeQrcode/main?storeId=" + id
      });
    }
  }
};
</script>
<style lang='scss'>
@import "./style";
.search_main {
  // position: relative;
  .tabs-group {
    // position: absolute;
    // top: 90rpx;
    .tab_main {
      margin-top: 90rpx;
      // position: absolute;
      // top: 90rpx;
      // z-index: 1100;
    }
  }

  .activeSearch {
    background: #b4282d !important;
    color: #fff !important;
  }
  .sortnav {
    display: flex;
    width: 100%;
    height: 78rpx;
    line-height: 78rpx;
    background: #fff;
    border-bottom: 1rpx solid #d9d9d9;
    div {
      width: 250rpx;
      height: 100%;
      text-align: center;
    }
    .active {
      color: #b4282d !important;
    }
    .price {
      background: url(//yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png)
        165rpx center no-repeat;
      background-size: 15rpx 21rpx;
    }
    .active.desc {
      background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-95e035f3e5.png)
        165rpx center no-repeat;
      background-size: 15rpx 21rpx;
    }
    .active.asc {
      background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-636b92c0a5.png)
        165rpx center no-repeat;
      background-size: 15rpx 21rpx;
    }
  }

  .filterlayer {
    width: 85vw;
    height: 100%;
    background-color: #f7f7f7;
    .item {
      overflow: hidden;
      padding: 10px;
      .content {
        padding: 10px;
        .childItem {
          width: 30%;
          height: 25px;
          line-height: 25px;
          text-align: center;
          border: 1px solid #ccc;
          background: #eee;
          font-size: 12px;
          border-radius: 15px;
          float: left;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .childItem:nth-child(3n) {
          margin-right: 0;
        }
      }
      .itemTitle {
        line-height: 30px;
        height: 30px;
        padding-left: 10px;
        overflow: hidden;
        z-index: 999;
        background: #fff;
      }
      input {
        float: left;
        background: #e3e3e3;
        width: 45%;
        height: 30px;
        line-height: 30px;
        border-radius: 20px;
      }
      .center {
        text-align: center;
      }
      .footer {
        overflow: hidden;
        margin-bottom: 20px;
      }
    }
  }
}
</style>

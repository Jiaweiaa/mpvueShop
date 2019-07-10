<template>
  <div class="search">
    <div class="head">
      <div>
        <img
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png"
          alt
        />
        <input
          type="text"
          confirm-type="search"
          focus="true"
          v-model="words"
          @click="inputFocus"
          @confirm="searchWords"
          placeholder="商品搜索"
        />
        <!-- <input name="input" class="keywrod" focus="true" value="{{keyword}}" confirm-type="search" bindinput="inputChange" bindfocus="inputFocus" bindconfirm="onKeywordConfirm" confirm-type="search" placeholder="{{defaultKeyword.keyword}}" /> -->
        <img
          @click="clearInput"
          class="del"
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"
          alt
        />
      </div>
      <div @click="cancel">取消</div>
    </div>

    <!--
	    搜索结果关键词
    -->
    <div class="searchtips" v-if="words && listData.length == 0">
      <div
        @click="searchWords"
        v-if="tipsData.length!=0"
        :data-value="item.name"
        v-for="(item,index) in tipsData"
        :key="index"
      >{{ item.name }}</div>
      <div v-if="tipsData.length==0" class="nogoods">暂无此类商品...</div>
    </div>

    <!--
	    缓存搜索记录
	    推送什么的
    -->
    <div v-if="listData <= 0 " class="helpSearch">
      <div class="history" v-if="historyData.length > 0">
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
    <div v-show="listData.length!=0" class="goodsList">
      <div class="sortnav">
        <div @click="changeTab(0)" :class="[0==nowIndex ?'active':'']">综合</div>
        <div
          @click="changeTab(1)"
          class="price"
          :class="[1==nowIndex ?'active':'', order =='SALE_PRICE-DESC'? 'desc':'asc']"
        >价格</div>
        <div
          @click="changeTab(2)"
          class="price"
          :class="[2==nowIndex ?'active':'', order =='SALES-DESC'? 'desc':'asc']"
        >销量</div>
        <div @click="changeTab(3)" :class="[3==nowIndex ?'active':'']">筛选</div>
      </div>
      <div class="goodsList">
        <van-card
          :thumb-link="'/pages/goods/main?id='+item.id"
          :tag="item.tag"
          :lazy-load="true"
          :price="item.listPrice"
          :origin-price="item.salePrice"
          :desc="item.keyword"
          :title="item.title"
          thumb-class="goods-image"
          title-class="goods-title"
          desc-class="goods-desc"
          v-for="(item, index) in listData"
          :key="index"
          @click="goodsDetail(item.id)"
          :thumb="'http://qn.gaoshanmall.cn/' + item.img"
        >
          <div slot="desc" class="goods-bottom">
            <div>{{item.keyword}}</div>
            <div class="sketch">{{item.sketch}}</div>
          </div>
        </van-card>
        <!-- <div
          @click="goodsDetail(item.id)"
          v-for="(item, index) in listData"
          :key="index"
          :class="[(listData.length)%2==0?'active':'none']"
          class="item"
        >
          <img :src="'http://qn.gaoshanmall.cn/' + item.img" alt />
          <p class="name">{{item.title}} - {{item.subtitle}}</p>
          <p class="price">￥{{item.salePrice}}</p>
        </div>-->
        <div class="title">
          <span>—</span>
          <span>我也是有底线的</span>
          <span>—</span>
        </div>
      </div>
    </div>
    <!-- 商品分类 -->
    <van-popup
      @click-overlay="aaa()"
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
  </div>
</template>

<script>
import { post, get } from "../../utils";
import {
  searchItem,
  getKeyword,
  setHistorySearch,
  removeHistorySearch,
  findHistorySearch
} from "../../api/category/index";

export default {
  onLoad() {
    this.openid = wx.getStorageSync("openid") || "";
    this.getHotData();
    this.getHistory();
  },
  // 上啦加载
  async onReachBottom() {
    if (this.loading) return;
    wx.showLoading({
      title: "加载中"
    });
    this.loading = true;
    if (this.listData.length >= this.allCount) {
      this.loading = false;
      wx.hideLoading();
    } else {
      this.pageNum++;
      const res = await searchItem({
        k: this.words,
        s: this.order,
        p: this.pageNum
      });
      if (res.data.code == 200) {
        this.loading = false;
        this.listData = this.listData.concat(res.data.result.itemDocs);
        this.listData.map(v => {
          v.img = JSON.parse(v.image)[0].images[0];
        });
        this.allCount = res.data.result.totalElements;
      } else {
        this.loading = false;
      }
      wx.hideLoading();
    }
  },

  // 下啦刷新
  async onPullDownRefresh() {
    this.pageNum = 1;
    const res = await searchItem({
      k: this.words,
      s: this.order,
      p: this.pageNum
    });
    if (res.data.code == 200) {
      this.listData = res.data.result.itemDocs;
      this.tipsData = this.listData;
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
    }
    wx.stopPullDownRefresh(); //停止下拉刷新
  },
  data() {
    return {
      nowIndex: 0,
      words: "",
      historyData: [],
      hotData: [],
      tipsData: [],
      listData: [],
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
      allCount: "",
      searchPopupShow: false
    };
  },
  methods: {
    // 获取历史记录
    async getHistory() {
     let data = await findHistorySearch();
     this.historyData =data.data.result;
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
      //商品清空
      this.listData = [];
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
        fq: this.aeo
      });
      this.navData = res.data.result;
      this.listData = res.data.result.itemDocs;
      this.allCount = res.data.result.totalElements;

      const searchData = await setHistorySearch({
        keyword: this.words
      });
      this.getHistory();
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
      if(data.data.code == 200) {
        this.historyData = [];
      }
    },
    async searchWords(e) {
      var value = e.currentTarget.dataset.value;
      this.words = value || this.words;
      // const data = await post("/search/addhistoryaction", {
      //   openId: this.openid,
      //   keyword: value || this.words
      // });
      //获取人们数据
      this.getHotData();
      //获取商品列表
      this.getlistData();
    },
    async getHotData() {
      const data = await getKeyword();
      this.hotData = data.data.result;
      this.historyData = [];
    },
    async tipsearch(e) {
      const data = await get("/search/helperaction", {
        keyword: this.words
      });
      this.tipsData = data.keywords;
    },
    topicDetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "./style";
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
.sortlist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    box-sizing: border-box;
    width: 50%;
    text-align: center;
    background: #fff;
    padding: 15rpx 0;
    border-bottom: 1rpx solid #d9d9d9;
    border-right: 1rpx solid #d9d9d9;
    img {
      display: block;
      width: 302rpx;
      height: 302rpx;
      margin: 0 auto;
    }
    .name {
      margin: 15rpx 0 22rpx 0;
      text-align: center;
      padding: 0 20rpx;
      font-size: 24rpx;
    }
    .price {
      text-align: center;
      font-size: 30rpx;
      color: #b4282d;
    }
  }
  .item.active:nth-last-child(1) {
    border-bottom: none;
  }
  .item.active:nth-last-child(2) {
    border-bottom: none;
  }
  .item.none:last-child {
    border-bottom: none;
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
</style>

<template>
  <div class="search">
    <div class="head">
      <div>
        <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png" alt="">
        <input type="text" confirm-type="search" focus="true" v-model="words" @click="inputFocus" @input="tipsearch" @confirm="searchWords" placeholder="商品搜索">
        <!-- <input name="input" class="keywrod" focus="true" value="{{keyword}}" confirm-type="search" bindinput="inputChange" bindfocus="inputFocus" bindconfirm="onKeywordConfirm" confirm-type="search" placeholder="{{defaultKeyword.keyword}}" /> -->
        <img
          @click="clearInput"
          class="del"
          src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png"
          alt
        >
      </div>
      <div @click="cancel">取消</div>
    </div>

    <!--
	    搜索结果关键词
	  -->
    <div class="searchtips" v-if="words && listData.length == 0">
      <div @click="searchWords" v-if="tipsData.length!=0" :data-value="item.name" v-for="(item,index) in tipsData" :key="index">
        {{ item.name }}
      </div>
      <div v-if="tipsData.length==0" class="nogoods">
        暂无此类商品...
      </div>
    </div>

    <!--
	    缓存搜索记录
	    推送什么的
    -->
    <div v-if="listData <= 0 ">
      <div class="history" v-if="historyData.length!=0">
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
    <div v-if="listData.length!=0" class="goodsList">
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
        <div @click="changeTab(3)" :class="[3==nowIndex ?'active':'']">分类</div>
      </div>
      <div class="sortlist">
        <div
          @click="goodsDetail(item.id)"
          v-for="(item, index) in listData"
          :key="index"
          :class="[(listData.length)%2==0?'active':'none']"
          class="item"
        >
          <img :src="'http://qn.gaoshanmall.cn/' + item.img" alt>
          <p class="name">{{item.title}} - {{item.subtitle}}</p>
          <p class="price">￥{{item.salePrice}}</p>
        </div>
        <div class="title">
          <span>—</span>
          <span>我也是有底线的</span>
          <span>—</span>
        </div>
      </div>
    </div>
     <!-- 商品分类 -->
    <van-popup
      :show="popupShow"
      position="right"
      class="filterlayer"
      @close="onClose"
      :duration="600"
    >
      <div class="filterInner" style="overflow-y: scroll;height: 100vh; width: 85vw; ">
        <div class="item">
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
        </div>
        <div class="item" v-for="(group, grouPindex) in filterList" :key="grouPindex">
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
                :class="{'active': item.isChecked == true}"
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
          >重置</van-button>
          <van-button
            size="small"
            style="text-align: center;width: 47%; float: left; margin-left: 2%;"
            round
            type="primary"
          >搜索</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { post, get } from "../../utils";
import { searchItem } from "../../api/category/index";

export default {
	onShow() {
	  this.openid = wx.getStorageSync("openid") || "";
	  this.getHotData();
	},
	// 上啦加载
	async onReachBottom() {
	  if(this.loading) return;
	  wx.showLoading({
	    title: '加载中',
	  })
	  this.loading = true;
	  if(this.listData.length >= this.allCount) {
	    this.loading = false;
	    wx.hideLoading()
	  }else {
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
	        v.img = JSON.parse(v.image)[0].images[0]
	      })
	      this.allCount = res.data.result.totalElements;
	    } else {
	      this.loading = false
	    }
	    wx.hideLoading()
	    
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
      this.allCount = res.data.result.totalElements;
      this.listData.map(v => {
        v.img = JSON.parse(v.image)[0].images[0];
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
      openid: "",
      order: "",
      isHot: "",
      isNew: "",

      pageNum: 1,
      loading: false,
      allCount: "",
      popupShow: false
    };
  },
  components: {},
  methods: {
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
      this.tipsearch();
    },
    async getlistData() {
      //获取商品列表
      const res = await searchItem({
        k: this.words,
        s: this.order,
        p: this.pageNum
      });

      this.listData = res.data.result.itemDocs;
      this.allCount = res.data.result.totalElements;
      this.listData.map(v => {
        v.img = JSON.parse(v.image)[0].images[0];
      });
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
        this.popupShow = true;
      }
      this.getlistData();
    },
    async clearHistory() {
      const data = await post("/search/clearhistoryAction", {
        openId: this.openid
      });
      if (data) {
        this.historyData = [];
      }
    },
    async searchWords(e) {
      var value = e.currentTarget.dataset.value;
      this.words = value || this.words;
      const data = await post("/search/addhistoryaction", {
        openId: this.openid,
        keyword: value || this.words
      });
      //获取历史数据
      this.getHotData();
      //获取商品列表
      this.getlistData();
    },
    async getHotData(first) {
      const data = await get("/search/indexaction?openId=" + this.openid);
      this.hotData = data.hotKeywordList;
      this.historyData = data.historyData;
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
</style>

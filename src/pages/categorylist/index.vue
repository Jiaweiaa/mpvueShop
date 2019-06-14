<template>
  <div class="categoryList">
    <div class="search" @click="tosearch">
      <div class="ser">
        <span class="icon"></span>
        <span>商品搜索</span>
      </div>
    </div>
    <div class="goodsList">
      <div class="sortnav">
        <div @click="changeTab(0)" :class="[0==nowIndex ?'active':'']">综合</div>
        <div @click="changeTab(1)" class="price" :class="[1==nowIndex ?'active':'', order =='SALE_PRICE-DESC'? 'desc':'asc']">价格</div>
        <div @click="changeTab(2)" class="price" :class="[2==nowIndex ?'active':'', order =='SALES-DESC'? 'desc':'asc']">销量</div>
        <div @click="changeTab(3)" :class="[3==nowIndex ?'active':'']">分类</div>
      </div>
      <!--<div class="sortlist">-->
        <!--<div @click="goodsDetail(item.id)" v-for="(item, index) in listData" :key="index" :class="[(listData.length)%2==0?'active':'none']" class="item">-->
          <!--<img :src="item.list_pic_url" alt="">-->
          <!--<p class="name">{{item.name}}</p>-->
          <!--<p class="price">￥{{item.retail_price}}</p>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="info">
      <p>{{currentNav.name}}</p>
      <p>{{currentNav.front_desc}}</p>
    </div>
    <div class="list" v-if="goodsList.length!=0">
      <div @click="goodsDetail(item.id)" class="item" v-for="(item, index) in goodsList" :key="index">
        <img :src="'http://qn.gaoshanmall.cn/' + item.img" alt="">
        <p class="name">{{item.title}} - {{item.subtitle}}</p>
        <p class="price">￥{{item.salePrice}}</p>
      </div>
    </div>
    <div v-else class="none">
      数据库暂无数据...
    </div>
  </div>
</template>

<script>
  import { searchItem } from '../../api/category/index'
export default {
  onShow() {
    //获取页面传的参数
    if(this.$root.$mp) {
      this.categoryId = this.$root.$mp.query.id;
    }
    this.getAllData();
  },
  data() {
    return {
      categoryId: "",
      nowIndex: 0,
      goodsList: [],
      navData: [],
      currentNav: {},
      order: '',
      scrollLeft: 0
    };
  },
  components: {},
  methods: {
    tosearch() {
      wx.navigateTo({ url: "/pages/search/main" });
    },
    
    async getAllData() {
      const res = await searchItem({
        navid: 72,
        s: this.order
      });
      this.navData = res.data.result;
      this.currentNav = {};
      this.goodsList = this.navData.itemDocs;
      this.goodsList.map(v => {
        v.img = JSON.parse(v.image)[0].images[0]
      })
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    },
    changeTab(index) {
      this.nowIndex = index;
      if (index == 1) {
        this.order = this.order == "SALE_PRICE-ASC" ? "SALE_PRICE-DESC" : "SALE_PRICE-ASC";
      } else if (index == 2) {
        this.order = this.order == "SALES-ASC" ? "SALES-DESC" : "SALES-ASC";
      } else{
        this.order = "LIST_TIME-DESC";
      }
      this.getAllData();
    },
  },
  computed: {}
};

</script>
<style lang='scss'>
@import "./style";
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
    color: #b4282d;
  }
  .price {
    background: url(//yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-3127092a69.png) 165rpx center no-repeat;
    background-size: 15rpx 21rpx;
  }
  .active.desc {
    background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-95e035f3e5.png) 165rpx center no-repeat;
    background-size: 15rpx 21rpx;
  }
  .active.asc {
    background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-636b92c0a5.png) 165rpx center no-repeat;
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
</style>

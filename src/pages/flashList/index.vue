<template>
  <div class="search">
    <!--商品列表  -->
    <div v-show="listData.length!=0" class="goodsList">
      <div class="goodsList">
        <van-card
          :tag="item.tag"
          :lazy-load="true"
          :price="item.offerCommand.offerSkuList ? item.offerCommand.offerSkuList[0].discountedPrice : ''"
          :origin-price="item.offerCommand.offerSkuList ? item.offerCommand.offerSkuList[0].salePrice : ''"
          :desc="item.item.keyword"
          :title="item.item.title"
          thumb-class="goods-image"
          title-class="goods-title"
          desc-class="goods-desc"
          v-for="(item, index) in listData"
          :key="index"
          @click="goodsDetail(item)"
          :thumb="'http://qn.gaoshanmall.cn/' +( item.item? item.item.itemImages[0].picUrl : '')"
        >
          <div slot="desc" class="goods-bottom">
            <div>{{item.item.keywords}}</div>
            <div class="sketch">{{item.item.sketch}}</div>
            <div class="saleType">
              {{item.saleType}}
            </div>
            <div class="timeInterval">
              {{item.date}}
            </div>
          </div>
        </van-card>
        <div class="title">
          <span>—</span>
          <span>我也是有底线的</span>
          <span>—</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  flashSaleList
} from "../../api/flashList/index";

export default {
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
      this.getlistData();
      setTimeout(() => {
        wx.hideLoading();
      }, this.GLOBAL.timer);
      // wx.hideLoading();
    }
  },

  // 下啦刷新
  async onPullDownRefresh() {
    this.pageNum = 1;
    this.getlistData();
    wx.stopPullDownRefresh(); //停止下拉刷新
  },
  
  onShow() {
    this.getlistData();
  },
  onHide() {
    clearTimeout(this.timeOut);
  },
  data() {
    return {
      listData: [],
      pageNum: 1,
      pageSize: 10,
      loading: false,
      allCount: "",
      timeOut: null
      
    };
  },
  methods: {
    // 详情
    goodsDetail(item) {
      console.log(item);
      wx.navigateTo({
        url: "/pages/goodsFlash/main?itemCode=" + item.item.code
      });
    },
    cancel() {
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },
    
    async getlistData() {
      wx.showLoading({
        title: "加载中"
      });
      //获取商品列表
      const res = await flashSaleList({
        pageNum: this.pageNum
      });
      this.listData = res.data.result.records;
      console.log(this.listData);
      this.countTime()
      this.allCount = res.data.result.total;
      wx.hideLoading();
    },
  
    //倒计时
    countTime: function() {
      // 时间设置
      //获取当前时间
      let date = new Date();
      let now = date.getTime();
      this.listData.map(v => {
        //设置截止时间
        let end = Number(v.offerExpireTime);
        //设置开始时间
        let start = Number(v.offerAnotherTime);
  
        if(start - now > 0) {
          let leftTime = start - now;
          let saleType = '距离限时抢购开始还有';
          let day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          let hour = Math.floor((leftTime / 1000 / 60 / 60) % 24);
          hour < 10 ? (hour = "0" + String(hour)) : (hour = hour);
          let minute = Math.floor((leftTime / 1000 / 60) % 60);
          minute < 10 ? (minute = "0" + String(minute)) : (minute = minute);
          let seconds = Math.floor((leftTime / 1000) % 60);
          seconds < 10 ? (seconds = "0" + String(seconds)) : (seconds = seconds);
          let date = day + '天' + hour + '小时' + minute +'分' + seconds + '秒';
          v.saleType = saleType;
          v.date = date;
        }else if(end - now > 0) {
          let leftTime = end - now;
          let saleType = '距离限时抢购结束还有';
          let day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
          let hour = Math.floor((leftTime / 1000 / 60 / 60) % 24);
          hour < 10 ? (hour = "0" + String(hour)) : (hour = hour);
          let minute = Math.floor((leftTime / 1000 / 60) % 60);
          minute < 10 ? (minute = "0" + String(minute)) : (minute = minute);
          let seconds = Math.floor((leftTime / 1000) % 60);
          seconds < 10 ? (seconds = "0" + String(seconds)) : (seconds = seconds);
          let date = day + '天' + hour + '小时' + minute +'分' + seconds + '秒';
          v.saleType = saleType;
          v.date = date;
        }else {
          let saleType  = '限时抢购已经结束';
          v.saleType = saleType;
        }
      });
      //递归每秒调用countTime方法，显示动态时间效果
      this.timeOut = setTimeout(this.countTime, 1000);
    },
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
.saleType {
  position: absolute;
  right: 0;
  bottom: 20px;
  color: red!important;
  font-size: 12px!important;
}
.timeInterval {
  border: 1px solid red;
  border-radius: 8px;
  padding: 0 5px;
  position: absolute;
  right: 0;
  bottom: 0;
  color: red!important;
  font-size: 11px!important;
}

</style>

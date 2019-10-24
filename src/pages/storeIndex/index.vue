<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 16:21:11
 * @LastEditTime: 2019-10-15 16:21:11
 * @LastEditors: your name
 -->
<!--
  店铺首页
 -->
<template>
  <div class="pageIndex">
    <!-- dataItem中的data.id作为组件唯一标识,
      1.商品组件
      2.
      3.图片广告组件
      4.
      5.图文导航组件
      6.文本组件
      7.
      8.标题组件
      9.优惠券组件
      10.拼团组件
      11.限时抢购组件
      12.
      13.店铺信息组件
      14.
      15.商品搜索组件
      16.公告组件
      17.语音组件
      18.视频组件
      19.
      20.辅助线组件
      21.辅助空白组件
    -->
    <div style="overflow: hidden;" v-for="(item, index) in storeStyleData" :key="index" v-if="tabbarActive == 0">
      <Goods :dataSource="item" v-if="item.data.id == 1"></Goods>
      <Picture :dataSource="item" v-if="item.data.id == 3"></Picture>
      <Navigation :dataSource="item" v-if="item.data.id == 5"></Navigation>
      <TextComponents :dataSource="item" v-if="item.data.id == 6"></TextComponents>
      <TitleComponents :dataSource="item" v-if="item.data.id == 8"></TitleComponents>
      <CouponComponents :dataSource="item" v-if="item.data.id == 9"></CouponComponents>
      <StoreInformation :dataSource="item" v-if="item.data.id == 13"></StoreInformation>
      <GoodsSearch :dataSource="item" v-if="item.data.id == 15"></GoodsSearch>
      <Notice :dataSource="item" v-if="item.data.id == 16"></Notice>
      <Guide :dataSource="item" v-if="item.data.id == 20"></Guide>
      <AuxiliaryBlank :dataSource="item" v-if="item.data.id == 21"></AuxiliaryBlank>
    </div>
    
    <StoreCategory v-if="tabbarActive == 1"></StoreCategory>
    
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
    getUsingTemplate4Front
  } from "../../api/storeIndex/index";
  
  import StoreCategory from "../oldStoreIndex/components/StoreCategory";
  import Goods from './components/Goods';
  import Picture from './components/Picture';
  import Navigation from './components/Navigation';
  import TextComponents from './components/text';
  import TitleComponents from './components/title';
  import CouponComponents from './components/coupon';
  import StoreInformation from './components/StoreInformation';
  import GoodsSearch from './components/GoodsSearch';
  import Notice from './components/Notice';
  import Guide from './components/Guide';
  import AuxiliaryBlank from './components/auxiliaryBlank'
  
  export default {
    onLoad: function(options) {
      if(options.id){
        this.storeId = options.id;
      }else if(options.scene){
        this.storeId = options.scene;
      }
      // this.storeId = 315;
      this.getStoreStyle();
    },
    components: {
      Goods,
      Picture,
      Navigation,
      TextComponents,
      TitleComponents,
      StoreInformation,
      Guide,
      Notice,
      GoodsSearch,
      CouponComponents,
      AuxiliaryBlank,
  
      StoreCategory
    },
    data() {
      return {
        storeStyleData: '',
        tabbarActive: 0, //tabbar默认值
      };
    },
    methods: {
      async getStoreStyle() {
        let res = await getUsingTemplate4Front({ storeId: this.storeId });
        if(res.data.result == null) {
          wx.navigateTo({
            url: "/pages/oldStoreIndex/main?storeId=" + this.storeId
          });
        }else {
          this.storeStyleData = JSON.parse(res.data.result.template);
          console.log(this.storeStyleData);
        }
      },
      tabbarChange(event) {
        console.log(event, "ooo");
        this.tabbarActive = event.mp.detail;
      }
    }
  };
</script>
<style lang='scss'>
  .pageIndex {
    height: 100%;
  }
</style>

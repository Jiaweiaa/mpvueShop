<template>
  <div class="category">
    <div class="search" @click="tosearch">
      <div class="ser">
        <span class="icon"></span>
        <span>商品搜索</span>
      </div>

    </div>
    <div class="content">
      <scroll-view class="left" scroll-y="true">
        <div class="iconText" @click="selectitem(item, index)" v-for="(item, index) in listData.nodes" :class="[index==nowIndex?'active':'']" :key="index">
          {{item.name}}
        </div>
      </scroll-view>
      <scroll-view class="right" scroll-y="true">
        <div class="banner">
          <img :src="detailData.url ? 'http://qn.gaoshanmall.cn/' +detailData.url: '/static/images/asd.png'" alt="">
        </div>
        <div class="bottom">
          <div v-for="(item,index) in detailData.nodes" :key="index" style="width: 100%;">
            <div class="title">
              <span>—</span>
              <span>{{item.name}}分类</span>
              <span>—</span>
            </div>
            <div @click="categoryList(childItem.id)" v-for="(childItem, childIndex) in item.nodes"  :key="childIndex" class="item" style="float: left;">
              <img style="width: 25px; height: 25px; margin-bottom: 5px;" :src="childItem.url ? 'http://qn.gaoshanmall.cn/' + childItem.url: '/static/images/close.png'" alt="">
              {{childItem.name}}
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { get } from "../../utils";
import { getNavigations } from '../../api/category/index'

export default {
  created() {},
  onShow() {
    this.nowIndex = 0;
    //获取列表数据
    this.getListData();
  },
  data() {
    return {
      id: "1005000",
      nowIndex: 0,
      listData: [],
      detailData: {
        url: ''
      }
    };
  },
  components: {},
  methods: {
    tosearch() {
      wx.navigateTo({ url: "/pages/search/main" });
    },
    selectitem(data, index) {
      this.nowIndex = index;
      this.detailData = data;
    },
    async getListData() {
     let res = await getNavigations();
      this.listData = res.data.result;
      this.selectitem(this.listData.nodes[0]);
      // const data = await get("/category/indexaction");
      // this.listData = data.categoryList;
    },
    categoryList(id) {
      wx.navigateTo({
        url: "../categorylist/main?id=" + id
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>

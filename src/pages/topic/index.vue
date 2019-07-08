<template>
  <div class="topic">
    <ul class="list">
      <li @click="topicDetail(item.id)" v-for="(item, index) in topicList" :key="index">
        <div class="t-img">
          <img :src="'http://qn.gaoshanmall.cn/'+ item.img" alt="">
        </div>
        <div class="info">
          <p>{{item.title}}</p>
          <p>{{item.spare}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  getNewsPage
} from '../../api/topic/index'

import { get } from "../../utils";
export default {
  onPullDownRefresh() {
    this.page = 1;
    this.getListData(true);
    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.total) {
      return false;
    }
    this.getListData();
  },
  created() {},
  mounted() {
    this.getListData(true);
  },
  data() {
    return {
      topicList: [],
      page: 1,
      total: ""
    };
  },
  methods: {
    async getListData(first) {
      const data = await getNewsPage({
        pageNum: this.page
      });
      this.total = data.data.result.pages;
      if (first) {
        this.topicList = data.data.result.records;
      } else {
        //上拉加载跟多
        this.topicList = this.topicList.concat(data.data.result.records);
      }
    },
    topicDetail(id) {
      wx.navigateTo({ url: "/pages/topicdetail/main?id=" + id });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>

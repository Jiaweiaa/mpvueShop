<template>
  <div class="topicdetail">
    <div class="content">
      <div v-if="goods_desc" class="detail">
        <wxParse :content="goods_desc" />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getNewsById
  } from '../../api/topic/index'

import wxParse from "mpvue-wxparse";

export default {
  onPullDownRefresh: function() {
    this.id = this.$root.$mp.query.id;
    this.getListData();
    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  created() {},
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.getListData();
  },
  data() {
    return {
      recommendList: [],
      id: "",
      goods_desc: ""
    };
  },
  components: {
    wxParse
  },
  methods: {
    async getListData() {
      const data = await getNewsById({
        id: this.id
      });
      this.goods_desc = data.data.result.content;
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style";
</style>

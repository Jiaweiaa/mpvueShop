<template>
  <div class="category">
    <div class="search" @click="tosearch">
      <div class="ser">
        <span class="icon"></span>
        <span class="text">商品搜索</span>
      </div>
    </div>
    <div class="content">
      <scroll-view class="left" scroll-y="true">
        <div
          class="iconText"
          @click="selectitem(item, index)"
          v-for="(item, index) in listData.nodes"
          :class="[index==nowIndex?'active':'']"
          :key="index"
        >{{item.name}}</div>
      </scroll-view>
      <scroll-view class="right" scroll-y="true">
        <div class="banner" v-if="detailData.icon!=''">
          <img :src="'http://qn.gaoshanmall.cn/'+detailData.icon" alt />
        </div>
        <div class="bottom">
          <div v-for="(item,index) in detailData.nodes" :key="index" style="width: 100%;">
            <div class="title">
              <span>—</span>
              <span>{{item.name}}分类</span>
              <span>—</span>
            </div>
            <div
              @click="categoryList(childItem.id, childItem.name)"
              v-for="(childItem, childIndex) in item.nodes"
              :key="childIndex"
              class="item"
              style="float: left;font-size:24rpx;color:rgba(102,102,102,1);"
            >
              <img
                style="width: 35px; height: 30px; margin-bottom: 5px;"
                :src="childItem.icon ? 'http://qn.gaoshanmall.cn/' + childItem.icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560861771007&di=3d96c78920a6e873229c09bba2d637d3&imgtype=jpg&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170428%2F74b6a76d39694e03beba6089c9f262de_th.png'"
                alt
              />
              {{childItem.name}}
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { getNavigations } from "../../api/category/index";
import { shoppingcartCount } from "../../api/shoppingcart";
export default {
  onShow() {
    this.getCartGoodsNum();
    //获取列表数据
    this.getListData();
  },

  data() {
    return {
      id: "1005000",
      nowIndex: 0,
      listData: [],
      detailData: {
        url: ""
      }
    };
  },
  components: {},
  methods: {
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
    tosearch() {
      wx.navigateTo({ url: "/pages/search/main" });
    },
    selectitem(data, index) {
      if (index == 0 || index) {
        wx.setStorageSync("categoryIndex", Number(index));
        this.nowIndex = wx.getStorageSync("categoryIndex");
        wx.setStorageSync("categoryDetailData", data);
        this.detailData = wx.getStorageSync("categoryDetailData");
      } else {
        if (wx.getStorageSync("categoryDetailData")) {
          this.detailData = wx.getStorageSync("categoryDetailData");
        } else {
          this.detailData = data;
        }
      }
    },
    async getListData() {
      let res = await getNavigations();
      this.listData = res.data.result;
      this.selectitem(this.listData.nodes[0]);
      // const data = await get("/category/indexaction");
      // this.listData = data.categoryList;
    },
    categoryList(id, name) {
      wx.navigateTo({
        url: "../categorylist/main?id=" + id + "&name=" + name
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>

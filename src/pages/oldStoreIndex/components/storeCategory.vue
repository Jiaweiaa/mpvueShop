<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 16:25:00
 * @LastEditTime: 2019-10-08 10:53:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="category">
      <div class="search" @click="tosearch">
        <div class="ser">
          <div class="icon_group">
            <span class="icon"></span>
          </div>
          <span class="text">搜索你想要的商品</span>
        </div>
      </div>
      <div class="content" v-if="listData.length>0">
        <scroll-view class="left" scroll-y="true">
          <div
            class="iconText"
            @click="selectitem(item, index)"
            v-for="(item, index) in listData.nodes"
            :class="[index==nowIndex?'active':'']"
            :key="index"
          >{{item.name}}</div>
        </scroll-view>

        <div @scrolltolower="toNextGroup" class="right">
          <div class="banner" v-if="detailData.icon!=''">
            <img :src="'http://qn.gaoshanmall.cn/'+detailData.icon" alt />
          </div>
          <div class="bottom">
            <div v-for="(item,index) in detailData.nodes" :key="index" style="width: 100%;">
              <div class="title">
                <span>{{item.name}}</span>
              </div>
              <div
                @click="categoryList(childItem.id, childItem.name)"
                v-for="(childItem, childIndex) in item.nodes"
                :key="childIndex"
                class="item"
                style="float: left;font-size:26rpx;color:rgba(102,102,102,1);"
              >
                <img
                  style="width: 182rpx; height: 182rpx; margin-bottom: 5rpx;"
                  :src="childItem.icon ? 'http://qn.gaoshanmall.cn/' + childItem.icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560861771007&di=3d96c78920a6e873229c09bba2d637d3&imgtype=jpg&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170428%2F74b6a76d39694e03beba6089c9f262de_th.png'"
                  alt
                />
                <span>{{childItem.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStoreNavigations } from "../../../api/category/index";
import { shoppingcartCount } from "../../../api/shoppingcart";
export default {
  mounted() {
    this.getCartGoodsNum();
    //获取列表数据
    this.getListData();
  },
  onReachBottom() {
    if (this.nowIndex < this.listData.nodes.length - 1) {
      this.nowIndex += 1;
      this.listData.nodes.map((item, itemIndex) => {
        if (this.nowIndex == itemIndex) {
          this.detailData = item;
        }
      });
      // this.selectitem(this.listData.nodes[this.nowIndex])
    }
  },
  onPullDownRefresh() {
    console.log(this.nowIndex, "aaa", this.listData.nodes.length);
    if (this.nowIndex > 0) {
      this.nowIndex -= 1;
      this.listData.nodes.map((item, itemIndex) => {
        if (this.nowIndex == itemIndex) {
          this.detailData = item;
        }
      });
      // this.selectitem(this.listData.nodes[this.nowIndex])
    }
    wx.stopPullDownRefresh(); //停止下拉刷新
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
    toPrevGroup() {},
    toNextGroup() {},
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
      wx.navigateTo({
        url: "/pages/search/main?storeId=" + wx.getStorageSync("storeId")
      });
    },
    selectitem(data, index) {
      this.detailData = data;
    },
    async getListData() {
      let res = await getStoreNavigations({
        storeId: wx.getStorageSync("storeId")
      });
      this.listData = res.data.result;
      this.selectitem(this.listData.nodes[0]);
      // const data = await get("/category/indexaction");
      // this.listData = data.categoryList;
    },
    categoryList(id, name) {
      wx.navigateTo({
        url:
          "../search/main?id=" +
          id +
          "&name=" +
          name +
          "&storeId=" +
          wx.getStorageSync("storeId")
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>

<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 09:42:56
 * @LastEditTime: 2019-09-29 09:29:54
 * @LastEditors: Please set LastEditors
 -->
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
    </div>
    <div class="info">
      <p>{{name}}</p>
      <p>性价比超高.</p>
    </div>
    <div class="list" v-if="listData.length!=0">
     
      <div class="newcategory">
        <div class="sublist">
          <div
            class="good-card"
            v-for="(good, goodIndex) in listData"
            :key="goodIndex"
            @click="goodsDetail(good.id)"
          >
            <div class="thumb">
              <img :src="'http://qn.gaoshanmall.cn/' + good.img" alt />
            </div>
            <div class="desc">
              <div class="title">{{good.title}}</div>
              <div class="vip" v-if="good.mixCashPrice &&good.mixScorePrice">
                <img src="/static/images/vip_price.png" alt />
                <span v-if="good.mixCashPrice" class="span1">￥{{good.mixCashPrice}}</span>
                <span v-if="good.mixScorePrice" class="span2">+{{good.mixScorePrice}}补贴金</span>
              </div>
              <div class="price">
                <img src="/static/images/list_price.png" alt />
                ￥{{good.listPrice}}
              </div>
              <div class="origin-price">
                市场价:￥
                <span>{{good.salePrice}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="nodata">
        <span>—</span>
        <span>我也是有底线的</span>
        <span>—</span>
      </div>
    </div>
    <div v-else class="none">暂无数据</div>

    <!-- 商品分类 -->
    <van-popup
      :show="popupShow"
      position="right"
      class="filterlayer"
      @close="onClose"
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
        <div style=" min-height: 80vh;">
          <div
            class="item"
            v-show="filterList.length>0"
            v-for="(group, grouPindex) in filterList"
            :key="grouPindex"
          >
            <div class="itemTitle" @click="showTabber(grouPindex)">
              <div
                style="width: 40%; float: left;color:24rpx;color:rgba(136,136,136,1);"
              >{{group.label}}</div>
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
                >
                  <p>{{item.label}}</p>
                </div>
              </div>
            </van-transition>
          </div>
        </div>

        <div class="footer">
          <van-button custom-class="resetBtn" @click="resetFq()">重置</van-button>
          <van-button custom-class="submitBtn" @click="popupShow=false">确认</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { searchItem } from "../../api/category/index";
export default {
  mounted() {
    //获取页面传的参数
    if (this.$root.$mp) {
      this.categoryId = this.$root.$mp.query.id;
      this.name = this.$root.$mp.query.name;
    }
    this.getAllData();
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
        navid: this.categoryId,
        p: this.pageNum,
        s: this.order,
        fq: this.aeo
      });

      if (res.data.code == 200) {
        this.loading = false;
        this.listData = this.listData.concat(res.data.result.itemDocs);
        this.allCount = res.data.result.totalElements;
        this.listData.map(v => {
          v.img = JSON.parse(v.image)[0].images[0];
          this.$set(v, "keyword", v.keywords.join("||"));
        });
      } else {
        this.loading = false;
      }
      setTimeout(() => {
        wx.hideLoading();
      }, this.GLOBAL.timer);
    }
  },

  // 下啦刷新
  async onPullDownRefresh() {
    this.pageNum = 1;
    const res = await searchItem({
      navid: this.categoryId,
      p: this.pageNum,
      s: this.order,
      fq: this.aeo
    });
    if (res.data.code == 200) {
      this.listData = res.data.result.itemDocs;
      this.allCount = res.data.result.totalElements;
      this.listData.map((v, index) => {
        if (this.order == "SALES-ASC") {
          if (index < 5) {
            this.$set(v, "tag", "热销");
          }
        }

        v.img = JSON.parse(v.image)[0].images[0];
        this.$set(v, "keyword", v.keywords.join("||"));
        // console.log(v.keyword,'---');
      });
      this.tipsData = [];
    }
    wx.stopPullDownRefresh(); //停止下拉刷新
  },
  data() {
    return {
      filterList: [],
      categoryId: "",
      nowIndex: 0,
      listData: [],
      navData: [],
      currentNav: {},
      order: "",
      scrollLeft: 0,
      aeo: "", //筛选项拼接字符串
      selectArr: [], //本地已选择的节点数组
      pageNum: 1,
      loading: false,
      allCount: "",

      name: "",

      popupShow: false
    };
  },
  components: {},
  methods: {
    // 展开收藏
    showTabber(index) {
      let newFilter = this.filterList;
      newFilter[index].isShowAll = !newFilter[index].isShowAll;
      this.filterList = [];
      this.filterList = newFilter;
    },

    // 去搜索页
    tosearch() {
      wx.navigateTo({ url: "/pages/search/main" });
    },

    // 获取数据
    async getAllData() {
      wx.showLoading({
        title: "加载中"
      });
      const res = await searchItem({
        navid: this.categoryId,
        p: this.pageNum,
        s: this.order,
        fq: this.aeo
      });
      wx.hideLoading();
      this.navData = res.data.result;
      this.currentNav = {};
      this.listData = this.navData.itemDocs;
      this.allCount = res.data.result.totalElements;
      // wx.hideLoading();
      this.listData.map((v, index) => {
        if (this.order == "SALES-ASC") {
          if (index < 5) {
            this.$set(v, "tag", "热销");
          }
        }
        v.img = JSON.parse(v.image)[0].images[0];
        this.$set(v, "keyword", v.keywords.join("||"));
      });
      this.filterList = this.navData.facetFilter.facetFilterLineList;
      this.filterList.map((v, index) => {
        v.isShowAll = true;
        if (index > 2) {
          v.isShowAll = false;
        }
      });
    },

    // 商品详情
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
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
      this.getAllData();
    },

    // 关闭弹层
    onClose() {
      this.popupShow = false;
    },
    //重置筛选项
    resetFq() {
      this.aeo = "";
      this.popupShow = false;
      this.getAllData();
    },
    // 筛选项之间用a 筛选项和筛选项值用e链接 筛选项值之间用o
    // 1e44o45a2
    // 例如：单选两个 condition: 1e3a2e3 ； 单选多选各一个 condition: 1e3 a 2e3o5
    isClickChild(item, group) {
      //记录父节点
      let fatherNode = Object.assign({}, group);
      console.log("多选状态为", group.multiple);
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
      this.getAllData();
    }
  }
};
</script>
<style lang='scss'>
@import "./style";
.resetBtn {
  width: 255rpx !important;
  height: 80rpx !important;
  border: 2rpx solid rgba(255, 108, 0, 1) !important;
  border-radius: 10rpx !important;
  color: rgba(255, 108, 0, 1) !important;
}
.submitBtn {
  width: 255rpx !important;
  height: 80rpx !important;
  background: rgba(255, 108, 0, 1) !important;
  color: rgba(255, 255, 255, 1) !important;
  border-radius: 10rpx !important;
}
.nodata {
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
  // background: #b4282d !important;
  // color: #fff !important;
  background: rgba(255, 108, 0, 0.1) !important;
  border-radius: 4rpx !important;
  span {
    color: rgba(255, 108, 0, 1) !important;
  }
}
.goodsList {
  position: fixed;
  z-index: 99;
  top: 88rpx;
}
.sortnav {
  // margin-top: 88rpx;
  // padding-top: 1rpx;
  display: flex;
  width: 100%;
  height: 78rpx;
  line-height: 78rpx;
  background: #fff;
  border-bottom: 1rpx solid #d9d9d9;
  div {
    width: 183rpx;
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
        width: 163rpx;
        height: 80rpx;
        text-align: center;
        background: rgba(245, 245, 245, 1);
        border-radius: 4rpx;
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          width: 150rpx;
          font-size: 28rpx;
          color: rgba(51, 51, 51, 1);
        }
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
  }
  .footer {
    overflow: hidden;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
  }
}
</style>

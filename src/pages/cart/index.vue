<template>
  <div class="cart_main">
    <div class="top">
      <div>时刻益每家</div>
      <div>轻松购</div>
      <div>乐享购</div>
    </div>
    <div class="cartlist" v-if="shopList!=null&&shopList.length>0">
      <!-- 分店铺形式的购物车列表 -->
      <div class="store-list" v-for="(group,index) in shopList" :key="index">
        <!-- 店铺名称 -->
        <van-cell>
          <div class="store-name" style="display:flex;">
            <div
              class="icon"
              @click="storeChange(group)"
              :class="[ group.storeAllCheck==true ? 'active' : '',{active:allCheck}]"
            ></div>
            <van-icon name="shop-o" />
            <span>{{group.storeInfoVo.name}}</span>
          </div>
        </van-cell>
        <!-- 购物车中所选的该店铺商品 -->
        <div class="cartView" v-for="(item,key) in group.shoppingCartLineDtos" :key="key">
          <van-swipe-cell :right-width="65">
            <van-cell-group>
              <van-cell>
                <div style="display:flex;">
                  <div style="margin:auto 0;">
                    <div
                      class="icon"
                      @click="itemChange(item,group)"
                      :class="[ item.checked==true ? 'active' : '',{active:allCheck}]"
                    ></div>
                  </div>
                  <van-card
                    custom-class="cardStyle"
                    style="width: 100%;"
                    :num="item.quantity"
                    :price="item.salePrice"
                    :title="item.itemTitle"
                    title-class="goods-title"
                    :thumb="'http://qn.gaoshanmall.cn/'+item.imageUrl"
                  >
                    <div slot="desc" class="goods-bottom">
                      <div class="sketch">{{item.sketch}}</div>
                      <div class="sketch">
                        <span
                          v-for="(property,proIndex) in item.saleProperties"
                          :key="proIndex"
                        >{{property}}&nbsp;</span>
                      </div>
                    </div>
                    <div slot="footer">
                      <!-- <div>￥  {{item.salePrice}}</div> -->
                      <van-stepper
                        v-model="item.quantity"
                        @plus="plusGoodsNum(item)"
                        @minus="minusGoodsNum(item)"
                        :disable-input="true"
                        async-change
                        integer
                        :min="1"
                        :step="1"
                      />
                    </div>
                  </van-card>
                </div>
              </van-cell>
            </van-cell-group>
            <div slot="right" class="deleteBtn">
              <div @click="deleteGoods(item)">
                <span style="color:#fff;">删除</span>
              </div>
            </div>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <div v-if="cartShow" class="nogoods" @click="toIndex()">
      <img
        src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png"
        alt
      />
      <p style="text-align:center;">购物车中空空如也,快点击我去购物吧!</p>
    </div>

    <div class="fixed">
      <div style="margin-left:15px;">
        <div class="icon" @click="allCheckChange()" :class="allCheck==true ? 'active' : ''"></div>
      </div>

      <div class="checkAll">全选</div>
      <div class="right">
        <div style="min-width:170px;">￥{{totalPrice}}</div>
        <div @click="goAccount">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  get,
  post,
  login,
  getStorageOpenid,
  accMul,
  accAdd
} from "../../utils";
import {
  shoppingCartList,
  addShoppingcart,
  shoppingcartCount,
  delShoppingcart,
  updateShoppingcart,
  checkShoppingcart,
  availableCoupon,
  getcoupon,
  orderconfirm
} from "../../api/shoppingcart";
export default {
  onPullDownRefresh: function() {
    wx.removeTabBarBadge({
      index: 3
    });
    this.openId = getStorageOpenid();
    this.getListData();
    this.cartShow = false;
    this.allCheck = false;
    //刷新完成后关闭
    wx.stopPullDownRefresh();
  },
  onShow() {
    wx.removeTabBarBadge({
      index: 3
    });
    this.openId = getStorageOpenid();
    this.getListData();
    this.cartShow = false;
    this.allCheck = false;
  },
  created() {},
  data() {
    return {
      openId: "",
      allCheck: false,
      storeId: "", //店铺ID
      listData: [], //
      shopList: null, //购物车列表 分店铺
      cartShow: false, //购物车为空模块是否显示
      select: [], //已选中的商品集合
      Listids: [],
      userInfo: {}
    };
  },
  components: {},
  methods: {
   
    //跳转到商城首页
    toIndex() {
      wx.switchTab({
        url: "/pages/index/main"
      });
    },
    // 加商品
    plusGoodsNum(goods) {
      goods.quantity++;
      updateShoppingcart(goods)
        .then(res => {
          console.log(res);
          if (res.data.code != "200") {
            // this.$toast(res.data.message);
            goods.quantity -= 1;
            wx.showToast({
              title:res.data.message,
              icon:'none'
            })
          }
        })
        .catch(error => {
          this.$toast("抛出异常");
        });
    },
    //减商品
    minusGoodsNum(goods) {
      goods.quantity--;
      updateShoppingcart(goods)
        .then(res => {
          if (res.data.code != "200") {
            // this.$toast(res.data.message);
          }
        })
        .catch(error => {
          this.$toast("抛出异常");
        });
    },

    // 提交订单
    goAccount() {
      let shoppingCartIds = [];
      // console.log(this.shopList);
      this.shopList.map(v => {
        v.shoppingCartLineDtos.map(vv => {
          if (vv.checked == true) {
            shoppingCartIds.push(vv.id);
          }
        });
      });
      if (shoppingCartIds.length > 0) {
        let params = {
          shoppingCartIds: shoppingCartIds
        };
        let model = JSON.stringify(params);
        wx.setStorageSync("orderParams", model);
        wx.setStorageSync("orderFrom", "shoppingcart");

        wx.navigateTo({
          url: "/pages/order/main"
        });
      } else {
        console.log("请选择商品");
      }
    },
    //删除购物车
    deleteGoods(sku) {
      wx.showModal({
        title: "",
        content: "是否从购物车中删除该商品",
        success: res => {
          if (res.confirm) {
            let params = {
              skuId: sku.skuId
            };
            delShoppingcart(params)
              .then(res => {
                if (res.data.code == "200") {
                  this.allCheck = false;
                  this.shopList.map(v => {
                    v.storeAllCheck = this.allCheck;
                    v.shoppingCartLineDtos.map(vv => {
                      // console.log(vv);
                      vv.checked = this.allCheck;
                    });
                  });
                  this.getListData();
                }
              })
              .catch(err => {});
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //获取购物车数据
    async getListData() {
      wx.showLoading({
        title: "加载中",
        mask: true
      });
      shoppingCartList()
        .then(res => {
          if (res.data.code == "200") {
            this.shopList =
              res.data.result.shoppingCartDto.storeShoppingCartLineDtos;
            //将每个店铺的商品添加一个未选中状态的变量
            this.shopList.map(v => {
              this.$set(v, "storeAllCheck", false);
              v.shoppingCartLineDtos.map(vv => {
                this.$set(vv, "checked", false);
              });
            });
          } else if (res.data.code == "500") {
            this.shopList = [];
            this.cartShow = true;
          }
          wx.hideLoading();
        })
        .catch(err => {
          wx.hideLoading();
          this.cartShow = true;
        });
      this.listData = data.data;
    },
    //单选
    itemChange(item, group) {
      this.select = [];
      let shopListLength = null;
      item.checked = !item.checked;
      this.shopList.map(v => {
        shopListLength += v.shoppingCartLineDtos.length;
        v.shoppingCartLineDtos.map(vv => {
          if (vv.checked == true) {
            this.select.push(vv);
          }
        });
      });
      //如果该店铺里的所有商品都为选中状态 则该商店全选
      let flag = true;
      let filterArr = group.shoppingCartLineDtos;
      filterArr.map(v => {
        if (v.checked == false) {
          flag = false;
        }
      });

      flag == true
        ? (group.storeAllCheck = true)
        : (group.storeAllCheck = false);

      let allCheckFlag = true;
      this.shopList.map(v => {
        if (v.storeAllCheck == false) {
          allCheckFlag = false;
        }
      });
      allCheckFlag == true ? (this.allCheck = true) : (this.allCheck = false);
    },
    //店铺全选
    storeChange(group) {
      group.storeAllCheck = !group.storeAllCheck;
      if (group.storeAllCheck == true) {
        group.shoppingCartLineDtos.map(v => {
          v.checked = true;
        });
      } else {
        group.shoppingCartLineDtos.map(v => {
          v.checked = false;
        });
      }
      let flag = true;
      this.shopList.map(v => {
        if (v.storeAllCheck == false) {
          flag = false;
        }
      });
      let allCheckFlag = true;
      this.shopList.map(v => {
        if (v.storeAllCheck == false) {
          allCheckFlag = false;
        }
      });
      allCheckFlag == true ? (this.allCheck = true) : (this.allCheck = false);
      // flag == true ? (this.allChek = true) : (this.allCheck = false);
    },
    //所有全选
    allCheckChange() {
      // console.log(this.allcheck);
      this.allCheck = !this.allCheck;
      this.shopList.map(v => {
        v.storeAllCheck = this.allCheck;
        v.shoppingCartLineDtos.map(vv => {
          // console.log(vv);
          vv.checked = this.allCheck;
        });
      });
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      if (this.shopList) {
        this.shopList.map(v => {
          v.shoppingCartLineDtos.map(vv => {
            if (vv.checked) {
              // console.log(typeof(vv.quantity));
              total = accAdd(total, accMul(vv.quantity, vv.salePrice));
            }
          });
        });

        return total;
      }

      return 0;
    }
  }
};
</script>
<style lang='scss' >
@import "./style";
.deleteBtn {
  color: #fff !important;
  font-size: 15px;
  width: 65px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  line-height: 44px;
  background-color: #f44;
}
.cartView {
  .cardStyle {
    background: #fff;
  }
}
</style>
<style lang="scss">
.van-card__bottom {
  position: absolute;
  left: -5px;
  bottom: -25px;
}
</style>

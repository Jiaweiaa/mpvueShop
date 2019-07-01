<template>
  <div class="index">
    <van-notify id="van-notify" />

    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div @click="toSearch">
        <input type="text" placeholder="点击搜索社区">
        <span class="icon"></span>
      </div>
    </div>

    <div class="forFirst">
      <div style="padding-top: 15px;">
        <van-tag mark size="medium" type="primary">我的社区</van-tag>
      </div>
      <view class="cityName">{{nowData.community}}</view>
      <view class="avatar">
        <image
          style="width: 100px; height: 100px;"
          mode="scaleToFill"
          :src="nowData.user? nowData.user.avatar : 'https://bpic.588ku.com/element_pic/19/04/16/4ee64442adb1c6e51b0e020e8c32b198.jpg!/fw/253/quality/90/unsharp/true/compress/true'"></image>
      </view>
      <view class="address">{{nowData.address}}</view>
      <view class="name">团长:{{nowData.name}}</view>
    </div>
    <view style=" color: #1989fa;font-size: 18px;margin-left: 20px; margin-top: 20px;">附近社区</view>

    <scroll-view scroll-y class="scrollViewStyle" @scrolltolower="lower" >
      <div class="scrollChild" v-for="(value,index) in list" :key="index" @click="detailOrder(value)">
        <image
          class="img"
          mode="scaleToFill"
          :src="value.user? value.user.avatar : 'https://bpic.588ku.com/element_pic/19/04/16/4ee64442adb1c6e51b0e020e8c32b198.jpg!/fw/253/quality/90/unsharp/true/compress/true'"></image>
        <view class="community">{{value.community}}</view>
        <view class="address">{{value.address}}</view>
        <view class="name">团长:{{value.name}}</view>
        <view class="distance">{{value.distance}}&nbsp;公里</view>

      </div>
      <div style="width: 100%; text-align: center;margin-top: 5px;">
        <div v-if="list.length >= allCount" style="font-size: 13px;">全部加载完成!</div>
      </div>
    </scroll-view>

  </div>
</template>

<script>
  import amapFile from "../../utils/amap-wx";
  import { mapState, mapMutations } from "vuex";
  import { getDistance } from "../../api/index/index"
  import Notify from '../../../static/vant/notify/notify';

  export default {
    onShow() {
      this.getCityName();
    },
    computed: {
      ...mapState(["cityName"])
    },
    data() {
      return {
        banner: [],
        channel: [],
        brandList: [],
        newGoods: [],
        hotGoods: [],
        topicList: [],
        newCategoryList: [],

        list: [{}],
        cusLongitude: '',
        cusLatitude: '',
        allCount: null,
        loading: false,
        currentActive: 0,
        pageNum: 1,
        nowData: {user: {}}
      };
    },
    components: {},
    methods: {
      ...mapMutations(["update"]),
      toMappage() {
        var _this = this;
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
        wx.getSetting({
          success(res) {
            //如果没有同意授权,打开设置
            if (!res.authSetting["scope.userLocation"]) {
              wx.openSetting({
                success: res => {
                  _this.getCityName();
                }
              });
            } else {
              wx.navigateTo({
                url: "/pages/mappage/main"
              });
            }
          }
        });
      },
      getCityName() {
        // var _this = this;
        var myAmapFun = new amapFile.AMapWX({
          key: "e545e7f79a643f23aef187add14e4548"
        });
        myAmapFun.getRegeo({
          success: (data) =>{
            //成功回调
            this.cusLongitude = data[0].longitude + '';
            this.cusLatitude = data[0].latitude + '';
            // data[0].regeocodeData.formatted_address
            // _this.cityName = data[0].regeocodeData.formatted_address;
            this.update({ cityName: data[0].regeocodeData.formatted_address });
            this.getData();
          },
          fail:  (info)=> {
            //失败回调
            Notify({
              text: info.message,
              duration: 1000,
              selector: '#custom-selector',
              backgroundColor: '#1989fa'
            });
            //如果用户拒绝授权
            // 默认为北京
            this.cityName = "北京市";
            this.update({ cityName: "北京市" });
            this.getData();
          }
        });
      },
      toSearch() {
        wx.navigateTo({
          url: "/pages/search/main"
        });
      },
      getData() {
        
        let params = {
          cusLongitude: this.cusLongitude,
          cusLatitude: this.cusLatitude,
          pageSize: 5,
          pageNum: this.pageNum
        }
        console.log(params,'000');
        wx.showLoading({
          title: '加载中',
        })
        getDistance(params).then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.list = res.data.result.records;
            this.allCount = res.data.result.total;
            if(wx.getStorageSync('data')) {
              this.nowData = wx.getStorageSync('data')
            }else {
              wx.setStorageSync('data', this.list[0])
              this.nowData = this.list[0];
            }
          } else {
            this.loading = false
          }
          wx.hideLoading()
        }).catch(e => {
          wx.hideLoading()
          console.log(e, 333)
        })
      },
      lower() {
        if(this.loading) return;
        wx.showLoading({
          title: '加载中',
        })
        this.loading = true;
        if(this.list.length >= this.allCount) {
          this.loading = false;
          wx.hideLoading()
        }else {
          this.pageNum++;
          let params = {
            cusLongitude: this.cusLongitude,
            cusLatitude: this.cusLatitude,
            pageNum: this.pageNum,
            pageSize : 5
          }
          getDistance(params).then(res => {
            if (res.data.code == 200) {
              this.loading = false;
              this.list = this.list.concat(res.data.result.records);
              this.allCount = res.data.result.total;
            } else {
              this.loading = false
            }
            wx.hideLoading()
          })
        }
      },
      detailOrder(row) {
        wx.setStorageSync('data', row)
        wx.switchTab({
          url: "/pages/index/main",
          complete(res) {
            console.log(res);
          }
        })
      }
    },
    created() { }
  };
</script>

<style lang='scss' scoped>
  @import "./style.scss";
  .forFirst {
    width: 90%;
    height: 200px;
    background: #fff;
    border-radius: 10px;
    margin: 10px auto;
    position: relative;
    .cityName {
      color: #1989fa;
      height: 35px;
      line-height: 35px;
      font-size: 22px;
      margin-top: 20px;
      margin-left: 20px;
    }
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      right: 10px;
      top: 50px;
    }
    .address {
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      margin-top: 20px;
      margin-left: 20px;
    }
    .name {
      color: #666;
      font-size: 13px;
      margin-top: 20px;
      margin-left: 20px;
    }
  }
  .scrollViewStyle {
    .scrollChild {
      border-bottom: 1px solid #ccc;
      overflow: hidden;
      position: relative;
      height: 80px;
      .img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        float: left;
        margin-top: 10px;
      }
      .community {
        margin-top: 10px;
        width: calc(100% - 100px);
        height: 30%;
        margin-left: 70px;
        text-align: left;
      }
      .name {
        width: calc(100% - 100px);
        height: 30%;
        margin-left: 70px;
        font-size: 13px;
        color: #9e9e9e;
      }
      .address {
        width: calc(100% - 100px);
        height: 30%;
        margin-left: 70px;
      }
      .distance {
        color: red;
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }
</style>

<template>
  <div class="myOrder">
    <van-dialog id="van-dialog" />
    <van-tabs @change="tabClick">
      <van-tab title="待发货">
        <div class="content">
	        <van-panel custom-class="panelStyle">
		        <view class="btnStyle" plain>
			        <!--<van-icon size="13px"   custom-class="iconStyle" name="arrow-down" />-->
			        <span @click.stop="showPopup(1)">{{startDate}}</span>
			        &nbsp;一&nbsp;
			        <span @click.stop="showPopup(2)">{{endDate}}</span>
			        <van-icon
					        v-if="startDate !== '开始时间' || endDate !== '结束时间'"
					        @click.stop="clearTime"
					        name="cross"
					        color="#999"
					        custom-class="iconStyle"
			        />
		        </view>
	        </van-panel>
          <van-collapse :value="activeName" @change="onChange">
            <van-collapse-item name="1">
              <view slot="title">
	              待发货总览
              </view>
              <van-card
                v-for="(item, index) in overviewData"
                :key="index"
                title-class="cardTitleStyle"
								:desc="item.saleProperties"
                :num="item.quantity"
                :title="item.itemName"
                :thumb="'http://qn.gaoshanmall.cn/' + item.itemImg"
              />
            </van-collapse-item>
          </van-collapse>
          <noDataView v-if="(orderList.length <=0  && onLoadLoading == false)"></noDataView>
          <checkbox-group @change="onSelectChange">
            <div v-for="(value,index) in orderList" class="mapListView" :key="index">
              <div class="top border-bottom" style="overflow: hidden; position: relative;">
                <checkbox @click.stop class="checkBox" v-bind:value="value.code"></checkbox>
                <div class="orderCode">订单编号: {{value.code}}</div>
              </div>
              <div class="timer bottom border-top orderTime">创建时间: {{value.createTime}}</div>
              <div v-for="(val,childIndex) in value.orderLines" :key="childIndex">
                <van-card
                  :num="val.quantity"
                  :price="val.salePrice"
				  :desc="val.propertiesValue"
                  :title="val.itemName"
                  :thumb="'http://qn.gaoshanmall.cn/' +val.itemImg"
                ></van-card>
              </div>
            </div>
          </checkbox-group>
          <div style="width: 100%; text-align: center;margin-top: 5px;">
            <div
              class="title"
              v-if="allCount!=''&&orderList.length >= allCount && orderList.length > 0"
            >
              <span>—</span>
              <span>我也是有底线的</span>
              <span>—</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已发货">
        <div class="content">
          <van-collapse :value="activeName" @change="onChange">
            <van-collapse-item name="1">
              <view slot="title">
                <view class="btnStyle" plain>
                  <!--<van-icon size="13px"   custom-class="iconStyle" name="arrow-down" />-->
                  <span @click.stop="showPopup(1)">{{startDate}}</span>
                  &nbsp;一&nbsp;
                  <span @click.stop="showPopup(2)">{{endDate}}</span>
                  <van-icon
                    v-if="startDate !== '开始时间' || endDate !== '结束时间'"
                    @click.stop="clearTime"
                    name="cross"
                    color="#999"
                    custom-class="iconStyle"
                  />
                </view>
              </view>
              <span style="font-size: 14px;margin-left: 5px;margin-bottom: 5px;">已发货总览</span>
              <van-card
                v-for="(item, index) in overviewData"
                :key="index"
                title-class="cardTitleStyle"
                :num="item.quantity"
                :title="item.itemName"
                :thumb="'http://qn.gaoshanmall.cn/' + item.itemImg"
              />
            </van-collapse-item>
          </van-collapse>
          <noDataView v-if="(orderList.length <=0  && onLoadLoading == false)"></noDataView>
          <checkbox-group @change="onSelectChange">
            <div v-for="(value,index) in orderList" class="mapListView" :key="index">
              <div class="top border-bottom" style="overflow: hidden; position: relative;">
                <div class="orderCode">订单编号: {{value.code}}</div>
              </div>
              <div class="timer bottom border-top orderTime">创建时间: {{value.createTime}}</div>
              <div v-for="(val,childIndex) in value.orderLines" :key="childIndex">
                <van-card
                  :num="val.quantity"
                  :price="val.salePrice"
                  :title="val.itemName"
                  :thumb="'http://qn.gaoshanmall.cn/' +val.itemImg"
                ></van-card>
              </div>
            </div>
          </checkbox-group>
          <div style="width: 100%; text-align: center;margin-top: 5px;">
            <div
              class="title"
              v-if="allCount!=''&&orderList.length >= allCount && orderList.length > 0"
            >
              <span>—</span>
              <span>我也是有底线的</span>
              <span>—</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-popup :show="popupShow" position="bottom" @close="onClose">
      <van-datetime-picker
        type="date"
        :value="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dateConfirm"
        @cancel="dateCancel"
      />
    </van-popup>

    <van-button
      v-if="searchParams.orderType == 4"
      style="position: fixed; right: 30px; bottom: 50px;"
      size="small"
      plain
      hairline
      @click="toggleClick"
      type="primary"
    >一键发货</van-button>
  </div>
</template>

<script>
import { findAllSupOrders, supSendConfrim } from "../../api/giver/index";
import noDataView from "../../components/noDataView/index";
import { formatTime } from "../../utils";
import Dialog from "../../../static/vant/dialog/dialog";

export default {
  onShow() {
    this.getAllData();
  },
  data() {
    return {
      popupShow: false,
      minDate: "",
      maxDate: new Date().getTime(),
      currentDate: new Date().getTime(),

      loading: false,
      onLoadLoading: false,

      activeName: [],
      orderList: [],
      resultCheck: [],

      // 总揽源数据
      overviewData: "",
      dateType: "",
      allCount: 0,

      // 搜索数据
      searchParams: {
        orderType: 4,
        pageNum: 1,
        pageSize: 10
      },
      startDate: "开始时间",
      endDate: "结束时间"
    };
  },
  components: {
    noDataView
  },
  //  下啦刷新
  onPullDownRefresh(e) {
    this.getAllData();
  },

  // 上啦加载
  async onReachBottom() {
    if (this.loading) return;
    wx.showLoading({
      title: "加载中"
    });
    this.loading = true;
    if (this.orderList.length >= this.allCount) {
      this.loading = false;
      wx.hideLoading();
    } else {
      this.searchParams.pageNum++;
      findAllSupOrders(params).then(res => {
        this.orderList = this.orderList.concat(res.data.result.orders.records);
        this.loading = false;
        this.allCount = res.data.result.orders.total;
        wx.hideLoading();
      });
    }
  },
  methods: {
    // 是否显示总览
    onChange(val) {
      this.activeName = val.mp.detail;
    },

    getAllData() {
      this.searchParams.pageNum = 1;
      this.orderList = [];
      this.activeName = [];
      wx.showLoading({
        title: "加载中"
      });
      this.onLoadLoading = true;
      findAllSupOrders(this.searchParams).then(res => {
        this.overviewData = res.data.result.skuDataDtos;
        this.orderList = res.data.result.orders.records;
        this.allCount = res.data.result.orders.total;
        wx.stopPullDownRefresh(); //停止下拉刷新
        wx.hideLoading();
        this.onLoadLoading = false;
      });
    },

    // 批量审核赋值
    onSelectChange(val) {
      this.resultCheck = val.mp.detail.value;
    },
    // 一键审核
    toggleClick() {
      if (this.resultCheck.length > 0) {
        Dialog.confirm({
          title: "发货操作",
          message: "确认选择订单发货吗?"
        })
          .then(() => {
            supSendConfrim({
              orderCodes: this.resultCheck
            }).then(res => {
              if (res.data.code == "200") {
                wx.showToast({
                  icon: "none",
                  title: res.data.result
                });
				Dialog.alert({
                      message: res.data.result
                    }).then(() => {
                      // on close
                    });
                this.getAllData();
              } else {
				  Dialog.alert({
                      message: res.data.message
                    }).then(() => {
                      // on close
                    });
                
              }
              // console.log(res.data,'56780');
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },

    // tab拦变化
    tabClick(v) {
      if (v.mp.detail.title == "待发货") {
        this.searchParams.orderType = 4;
      } else {
        this.searchParams.orderType = 8;
      }
      this.clearTime();
    },

    // 关闭popup
    onClose() {
      this.popupShow = false;
    },

    // 展示popup
    showPopup(val) {
      this.dateType = val;
      this.popupShow = true;
    },

    // 确认选择时间
    dateConfirm(val) {
      if (this.dateType == 1) {
        this.startDate = formatTime(val.mp.detail).year;
        this.searchParams.startTime = formatTime(val.mp.detail).year;
      } else {
        this.endDate = formatTime(val.mp.detail).year;
        this.searchParams.endTime = formatTime(val.mp.detail).year;
      }
      this.getAllData();
      this.onClose();
    },
    // 取消选择时间
    dateCancel() {
      this.onClose();
    },

    // 清除时间 默认获取两天前的
    clearTime() {
      this.startDate = "开始时间";
      this.endDate = "结束时间";
      let timeStamp = new Date(new Date());
      // 获取时间戳 一天是86400 截取2天前的
      let ageTimeStamp = timeStamp - 86400 * 2;
      this.searchParams.startTime = "";
      this.searchParams.endTime = "";
      this.getAllData();
    }
  }
};
</script>
<style lang='scss'>
.panelStyle{
	padding: 20px 10px;
}
.content {
  .btnStyle {
    border: none;
    color: #ab2b2b;
    padding: 0 5px;
    width: 80%;
    .iconStyle {
      margin-left: 10px;
    }
  }
  .iconStyle {
    color: #ab2b2b;
    vertical-align: middle;
    margin-left: 2px;
  }
}

.mapListView {
  overflow: hidden;
  background: #fff;
  display: block;
  width: calc(94% - 10px);
  padding: 5px;
  margin-left: 3%;
  border-radius: 8px;
  margin-top: 10px;
  position: relative;
  .van-card {
    background: #fff;
  }
  .orderCode {
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    width: 300px;
    margin-left: 7px;
    margin-top: 10px;
    text-align: left;
  }
  .checkBox {
    vertical-align: middle;
    width: 100%;
    position: absolute;
    left: 300px;
    top: 13px;
  }
  .orderTitle {
    margin-top: 16px;
    font-size: 13px;
    color: #ab2b2b;
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .orderTime {
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    margin-left: 10px;
    margin-bottom: 10px;
  }
}

.title {
  text-align: center;
  padding: 20rpx 0;
  width: 100%;
  margin-bottom: 10px;
  span:nth-child(2) {
    font-size: 24rpx;
    color: #333;
    padding: 0 10rpx;
  }
  span:nth-child(2n + 1) {
    color: #999;
  }
}
</style>

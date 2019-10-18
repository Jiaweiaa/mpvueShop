<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-10-16 14:47:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="my">
    <div class="boxMenu">
      <van-tabs color="#ab2b2b" @change="tabChange">
        <van-tab title="接收记录">
          <div class="noData" v-if="listData <= 0">没有数据啦～</div>
          <div v-else>
            <div>
              <div class="item" v-for="(item, index) in listData" :key="index">
                <div class="box">
                  <p class="desc">收到来自<span class="name">{{item.nickname}}</span>的<span class="money">{{item.amount}}</span>补贴金</p>
                  <p class="time">{{item.createTime}}</p>
                  <!-- <div class="title">{{item.type == 1 ? '到账佣金' : '未到账佣金'}}</div>
								  <div class="money">￥{{item.commission}}</div>
                  <div class="date">{{item.createTime}}</div>-->
                </div>
              </div>
            </div>
            <div style="width: 100%; text-align: center;margin-top: 5px;">
              <div
                class="endTitle"
                v-if="allCount!=''&&listData.length >= allCount && listData.length > 0"
              >
                <span>—</span>
                <span>没有更多数据了</span>
                <span>—</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="发放记录">
          <div class="noData" v-if="listData <= 0">没有数据啦～</div>
          <div v-else>
            <div>
              <div class="item" v-for="(item, index) in listData" :key="index">
                <div class="box">
                  <p class="desc">
                    发给
                    <span class="name">{{item.nickname}}</span>
                    补贴金
                    <span class="money">{{item.amount}}</span>
                  </p>
                  <p class="time">{{item.createTime}}</p>
                </div>
              </div>
            </div>
            <div style="width: 100%; text-align: center;margin-top: 5px;">
              <div
                class="endTitle"
                v-if="allCount!=''&&listData.length >= allCount && listData.length > 0"
              >
                <span>—</span>
                <span>没有更多数据了</span>
                <span>—</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getScoreLogPage } from "../../api/recordList/index";
export default {
  onShow() {
    // this.getTeamData();
    this.getData();
  },
  data() {
    return {
      teamData: {},
      listData: [],
      first: true,
      commissionType: "",
      allCount: 0,
      pageNum: 1,
      type: 2,
      loading: false
    };
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
      const res = await this.commissionType({
        pageNum: this.pageNum,
        pageSize: 10,
        type: this.type
      });
      if (res.data.code == 200) {
        this.loading = false;
        this.listData = this.listData.concat(res.data.result.records);
        this.allCount = res.data.result.total;
      } else {
        this.loading = false;
      }
      wx.hideLoading();
    }
  },

  // 下啦刷新
  async onPullDownRefresh() {
    this.pageNum = 1;
    this.getData();
    wx.stopPullDownRefresh(); //停止下拉刷新
  },
  methods: {
    // 去提现
    getWithdraw() {
      wx.navigateTo({
        url: "/pages/withdraw/main"
      });
    },
    // 获取数据
    async getData() {
      // if(this.first)   this.commissionType = getScoreLogPage;
      // this.first = false;
      this.commissionType = getScoreLogPage;
      wx.showLoading({
        title: "加载中"
      });
      let data = await this.commissionType({
        pageNum: 1,
        pageSize: 10,
        type: this.type
      });
      this.listData = data.data.result.records;
      this.allCount = data.data.result.total;
      wx.hideLoading();
    },

    // 详情
    // async getTeamData() {
    //   let data = await myDetile();
    //   this.teamData = data.data.result;
    // },

    // tab 切换
    tabChange(val) {
      this.type = val.mp.detail.index + 2;
      // if(val.mp.detail.index == 0) {
      //   this.commissionType = getScoreLogPage;
      // }else {
      //   this.commissionType = getScoreLogPage;
      // }
      this.pageNum = 1;
      this.getData();
    }
  },
  computed: {}
};
</script>
<style>
page {
  background: #eee;
}
</style>
<style lang='scss' scoped>
@import "./style";
</style>


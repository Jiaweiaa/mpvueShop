<template>
	<div class="couponStore">
		<!--
		 wjw
		 优惠券
		-->
		<div class="content">
			<div
				class="child"
				v-for="(item, index) in dataSource.viewData['55'].data"
				@click="getCoupon(item)"
				:key="index"
				v-show="!(dataSource.viewData[58]== '81' && item.inventory <= 0)">
				
				<!--
					正常优惠券
				-->
				<div
					v-if="item.inventory > 0 && item.status !== 0"
					class="childBox"
					:style="{
						backgroundImage: dataSource.viewData[56] == '76' && dataSource.viewData[57] == 'rgb(231, 76, 44)' ? 'url(http://pz53yvlci.bkt.clouddn.com/a2.png)':
														 dataSource.viewData[56] == '76' && dataSource.viewData[57] == 'rgb(255, 233, 183)' ? 'url(http://pz53yvlci.bkt.clouddn.com/a3.png)':
														 dataSource.viewData[56] == '76' && dataSource.viewData[57] == 'rgb(255, 255, 255)' ? 'url(http://pz53yvlci.bkt.clouddn.com/a4.png)':
														 dataSource.viewData[56] == '76' && dataSource.viewData[57] == 'rgb(56, 59, 62)' ? 'url(http://pz53yvlci.bkt.clouddn.com/a5.png)':
														 dataSource.viewData[56] == '76' && dataSource.viewData[57] == 'rgb(224, 244, 228)' ? 'url(http://pz53yvlci.bkt.clouddn.com/a1.png)':
														 
														 dataSource.viewData[56] == '77' && dataSource.viewData[57] == 'rgb(231, 76, 44)' ? 'url(http://pz53yvlci.bkt.clouddn.com/d2.png)':
														 dataSource.viewData[56] == '77' && dataSource.viewData[57] == 'rgb(255, 233, 183)' ? 'url(http://pz53yvlci.bkt.clouddn.com/d3.png)':
														 dataSource.viewData[56] == '77' && dataSource.viewData[57] == 'rgb(255, 255, 255)' ? 'url(http://pz53yvlci.bkt.clouddn.com/d4.png)':
														 dataSource.viewData[56] == '77' && dataSource.viewData[57] == 'rgb(56, 59, 62)' ? 'url(http://pz53yvlci.bkt.clouddn.com/d5.png)':
														 dataSource.viewData[56] == '77' && dataSource.viewData[57] == 'rgb(224, 244, 228)' ? 'url(http://pz53yvlci.bkt.clouddn.com/d1.png)':
														 
														 dataSource.viewData[56] == '78' && dataSource.viewData[57] == 'rgb(231, 76, 44)' ? 'url(http://pz53yvlci.bkt.clouddn.com/b2.png)':
														 dataSource.viewData[56] == '78' && dataSource.viewData[57] == 'rgb(255, 233, 183)' ? 'url(http://pz53yvlci.bkt.clouddn.com/b3.png)':
														 dataSource.viewData[56] == '78' && dataSource.viewData[57] == 'rgb(255, 255, 255)' ? 'url(http://pz53yvlci.bkt.clouddn.com/b4.png)':
														 dataSource.viewData[56] == '78' && dataSource.viewData[57] == 'rgb(56, 59, 62)' ? 'url(http://pz53yvlci.bkt.clouddn.com/b5.png)':
														 dataSource.viewData[56] == '78' && dataSource.viewData[57] == 'rgb(224, 244, 228)' ? 'url(http://pz53yvlci.bkt.clouddn.com/b1.png)':
														 
														 dataSource.viewData[56] == '79' && dataSource.viewData[57] == 'rgb(231, 76, 44)' ? 'url(http://pz53yvlci.bkt.clouddn.com/c2.png)':
														 dataSource.viewData[56] == '79' && dataSource.viewData[57] == 'rgb(255, 233, 183)' ? 'url(http://pz53yvlci.bkt.clouddn.com/c3.png)':
														 dataSource.viewData[56] == '79' && dataSource.viewData[57] == 'rgb(255, 255, 255)' ?'url(http://pz53yvlci.bkt.clouddn.com/c4.png)':
														 dataSource.viewData[56] == '79' && dataSource.viewData[57] == 'rgb(56, 59, 62)' ? 'url(http://pz53yvlci.bkt.clouddn.com/c5.png)':
														 dataSource.viewData[56] == '79' && dataSource.viewData[57] == 'rgb(224, 244, 228)' ? 'url(http://pz53yvlci.bkt.clouddn.com/c1.png)': '',
			        sizeColor: dataSource.viewData[56] == '76' && dataSource.viewData[57] == 'rgb(231, 76, 44)' ? getImg('a2'):
												 dataSource.viewData[56] == '76' && dataSource.viewData[57] == 'rgb(255, 233, 183)' ? getImg('a3'):
												 dataSource.viewData[56] == '76' && dataSource.viewData[57] == 'rgb(255, 255, 255)' ? getImg('a4'):
												 dataSource.viewData[56] == '76' && dataSource.viewData[57] == 'rgb(56, 59, 62)' ? getImg('a5'):
												 dataSource.viewData[56] == '76' && dataSource.viewData[57] == 'rgb(224, 244, 228)' ? getImg('a1'):
												 
												 dataSource.viewData[56] == '77' && dataSource.viewData[57] == 'rgb(231, 76, 44)' ? getImg('d2'):
												 dataSource.viewData[56] == '77' && dataSource.viewData[57] == 'rgb(255, 233, 183)' ? getImg('d3'):
												 dataSource.viewData[56] == '77' && dataSource.viewData[57] == 'rgb(255, 255, 255)' ? getImg('d4'):
												 dataSource.viewData[56] == '77' && dataSource.viewData[57] == 'rgb(56, 59, 62)' ? getImg('d5'):
												 dataSource.viewData[56] == '77' && dataSource.viewData[57] == 'rgb(224, 244, 228)' ? getImg('d1'):
												 
												 dataSource.viewData[56] == '78' && dataSource.viewData[57] == 'rgb(231, 76, 44)' ? getImg('b2'):
												 dataSource.viewData[56] == '78' && dataSource.viewData[57] == 'rgb(255, 233, 183)' ? getImg('b3'):
												 dataSource.viewData[56] == '78' && dataSource.viewData[57] == 'rgb(255, 255, 255)' ? getImg('b4'):
												 dataSource.viewData[56] == '78' && dataSource.viewData[57] == 'rgb(56, 59, 62)' ? getImg('b5'):
												 dataSource.viewData[56] == '78' && dataSource.viewData[57] == 'rgb(224, 244, 228)' ? getImg('b1'):
												 
												 dataSource.viewData[56] == '79' && dataSource.viewData[57] == 'rgb(231, 76, 44)' ? getImg('c2'):
												 dataSource.viewData[56] == '79' && dataSource.viewData[57] == 'rgb(255, 233, 183)' ? getImg('c3'):
												 dataSource.viewData[56] == '79' && dataSource.viewData[57] == 'rgb(255, 255, 255)' ? getImg('c4'):
												 dataSource.viewData[56] == '79' && dataSource.viewData[57] == 'rgb(56, 59, 62)' ? getImg('c5'):
												 dataSource.viewData[56] == '79' && dataSource.viewData[57] == 'rgb(224, 244, 228)' ? getImg('c1'): '',
					  backgroundSize: '100% 100%'
				}">
					<div class="couponContent">
						<div
							class="money"
							:style="{
								color: sizeColor
							}"
						>
							<span
								style="font-size: 31px; font-weight: bold; margin-right: 5px;"
							>{{item.offerCouponType}}</span>元
						</div>
						<div
								class="type"
								:style="{
								color: sizeColor
							}">
							<span>
								{{item.offerCouponType == 1000 ? '微信卡券' : item.offerCouponType == 2000 ? '通用卡券' : item.offerCouponType == 3000 ? '专用卡券' : ''}}
							</span>
							<span>
								{{item.isWholeOrder == 1 ? '全部商品' : item.isWholeOrder == 0  ? '指定商品' : ''}}
							</span>
						</div>
					</div>
				</div>
				
				<!--
					已结束
				-->
				<div
					class="childBox"
					:style="{
						backgroundImage: dataSource.viewData[56] == '76' ? 'url(http://pz53yvlci.bkt.clouddn.com/a8.png)':
														 dataSource.viewData[56] == '77' ? 'url(http://pz53yvlci.bkt.clouddn.com/d8.png)':
														 dataSource.viewData[56] == '78' ? 'url(http://pz53yvlci.bkt.clouddn.com/b8.png)':
														 dataSource.viewData[56] == '79' ?'url(http://pz53yvlci.bkt.clouddn.com/c8.png)': '',
						sizeColor: dataSource.viewData[56] == '76' ? getImg('a8', 'isClose'):
											 dataSource.viewData[56] == '77' ? getImg('d8', 'isClose'):
											 dataSource.viewData[56] == '78' ? getImg('b8', 'isClose'):
											 dataSource.viewData[56] == '79' ? getImg('c8', 'isClose'): '',
					  backgroundSize: '100% 100%'
					}"
					v-else-if="item.status == 0">
					<div class="couponContent">
						<div
								class="money"
								:style="{
								color: sizeColor
							}"
						>
							<span
									style="font-size: 31px; font-weight: bold; margin-right: 5px;"
							>{{item.offerCouponType}}</span>元
						</div>
						<div
								class="type"
								:style="{
									color: sizeColor
								}">
							<span>
								{{item.offerCouponType == 1000 ? '微信卡券' : item.offerCouponType == 2000 ? '通用卡券' : item.offerCouponType == 3000 ? '专用卡券' : ''}}
							</span>
							<span>
								{{item.isWholeOrder == 1 ? '全部商品' : item.isWholeOrder == 0  ? '指定商品' : ''}}
							</span>
						</div>
					</div>
				</div>
				
				<!--
					已领取
				-->
				<div
					class="childBox"
					:style="{
						backgroundImage: dataSource.viewData[56] == '76' ? 'url(http://pz53yvlci.bkt.clouddn.com/a7.png)':
														 dataSource.viewData[56] == '77' ? 'url(http://pz53yvlci.bkt.clouddn.com/d7.png)':
														 dataSource.viewData[56] == '78' ? 'url(http://pz53yvlci.bkt.clouddn.com/b7.png)':
														 dataSource.viewData[56] == '79' ? 'url(http://pz53yvlci.bkt.clouddn.com/c7.png)': '',
					  sizeColor: dataSource.viewData[56] == '76' ? getImg('a7', 'isClose'):
											 dataSource.viewData[56] == '77' ? getImg('d7', 'isClose'):
											 dataSource.viewData[56] == '78' ? getImg('b7', 'isClose'):
											 dataSource.viewData[56] == '79' ? getImg('c7', 'isClose'): '',
					  backgroundSize: '100% 100%'
					}"
					v-else>
					<div class="couponContent">
						<div
							class="money"
							:style="{
								color: sizeColor
							}">
							<span
									style="font-size: 31px; font-weight: bold; margin-right: 5px;"
							>{{item.offerCouponType}}</span>元
						</div>
						<div
								class="type"
								:style="{
								color: sizeColor
							}">
							<span>
								{{item.offerCouponType == 1000 ? '微信卡券' : item.offerCouponType == 2000 ? '通用卡券' : item.offerCouponType == 3000 ? '专用卡券' : ''}}
							</span>
							<span>
								{{item.isWholeOrder == 1 ? '全部商品' : item.isWholeOrder == 0  ? '指定商品' : ''}}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
  import {
    getcoupon
  } from "../../../api/shoppingcart";
  export default {
    name: 'coupon',
    props:  ['dataSource'],
    data() {
      return {
        sizeColor: ''
      }
    },
    methods: {
      getImg(img, b) {
        // 更改字体
        if(b) {
          if(img == 'b7' || img == 'b8') {
            this.sizeColor = '#d3d6d9';
          }else {
            this.sizeColor = '#fff';
          }
        }else {
          if(img == 'a2'){
            this.sizeColor = '#fff';
          }else if(img == 'a3') {
            this.sizeColor = '#f39343';
          }else if(img == 'a4') {
            this.sizeColor = '#d45134';
          }else if(img == 'a5') {
            this.sizeColor = '#fff';
          }else if(img == 'a1') {
            this.sizeColor = '#63be72';
          }else if(img == 'd2') {
            this.sizeColor = '#fff';
          }else if(img == 'd3') {
            this.sizeColor = '#f39343';
          }else if(img == 'd4') {
            this.sizeColor = '#d45134';
          }else if(img == 'd5') {
            this.sizeColor = '#fff';
          }else if(img == 'd1') {
            this.sizeColor = '#63be72';
          }else if(img == 'b2') {
            this.sizeColor = '#d45134';
          }else if(img == 'b3') {
            this.sizeColor = '#f39343';
          }else if(img == 'b4') {
            this.sizeColor = '#d45134';
          }else if(img == 'b5') {
            this.sizeColor = '#000';
          }else if(img == 'b1') {
            this.sizeColor = '#63be72';
          }else if(img == 'c2') {
            this.sizeColor = '#fff';
          }else if(img == 'c3') {
            this.sizeColor = '#f39343';
          }else if(img == 'c4') {
            this.sizeColor = '#d45134';
          }else if(img == 'c5') {
            this.sizeColor = '#fff';
          }else if(img == 'c1') {
            this.sizeColor = '#63be72';
          }
        }
      },

      getCoupon(item) {
        let params = {
          uniqueId: item.uniqueId,
          storeId: item.storeId
        };
        getcoupon(params)
          .then(res => {
           this.$parent.getStoreStyle();
            if (res.data.code == "200") {
              wx.showToast({
                icon: "none",
                title: res.data.result
              });
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.message
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
</script>

<style lang="sass">
	.couponStore
		display: flex
		align-items: flex-start
		flex-wrap: nowrap
		overflow-x: scroll
		white-space: nowrap
		overflow-y: hidden
		.noData
			height: 25px
			line-height: 25px
			color: #f44
			font-size: 14px
			text-align: center
		.content
			padding: 10px
			display: flex
			.child
				overflow: hidden
				min-width: 140px
				max-width: 140px
				height: 100px
				margin-right: 10px
				.childBox
					width: 100%
					height: 100%
					.couponContent
						.money
							text-align: center
							height: 50px
							line-height: 90px
						.type
							margin-top: 2px
							text-align: center
							height: 30px
							line-height: 40px
							font-size: 13px
</style>

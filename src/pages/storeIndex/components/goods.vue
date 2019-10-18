<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 16:21:11
 * @LastEditTime: 2019-10-18 08:55:43
 * @LastEditors: Please set LastEditors
 -->
<template>
	<div class="goods">
		<div>
			<!--
				大图模式/一行两个/一行三个
			-->
			<div
				v-if="dataSource.viewData[2] == '3' || dataSource.viewData[2] == '4' || dataSource.viewData[2] == '5'"
				:style="{
					margin: '0 '+dataSource.viewData[3]+'px'
				}"
				:class="dataSource.viewData[2] == 3 ? 'listOne' : dataSource.viewData[2] == 4 ? 'listTwo' : 'listThree'">
				<div
					v-for="(item, index) in dataSource.viewData[1].data"
					:key="index"
					@click="toGoodsDetail(item)"
					class="listView"
					:style="{
					marginTop: dataSource.viewData[4] + 'px',
					border: dataSource.viewData[5] == '9' ? '' :  dataSource.viewData[5] == '10' ? '1px solid #ccc' : dataSource.viewData[5] == '11' ? '1px solid #fff' : ''  ,
					boxShadow: dataSource.viewData[5] == '10' ? '3px 3px 5px #ccc' : '',
					borderRadius: dataSource.viewData[6] == '14' ? '5px' : ''
					}">
					<image
					class="image"
					:style="{
					
					height:dataSource.viewData[7] == '15' && dataSource.viewData[2] == 3 ? '375px':
							dataSource.viewData[7] == '15' && dataSource.viewData[2] == 4 ? '188px':
							dataSource.viewData[7] == '15' && dataSource.viewData[2] == 5 ? '125px':
							dataSource.viewData[7] == '16' && dataSource.viewData[2] == 3 ? '375px':
							dataSource.viewData[7] == '16' && dataSource.viewData[2] == 4 ? '188px':
							dataSource.viewData[7] == '16' && dataSource.viewData[2] == 5 ? '125px':
							dataSource.viewData[7] == '17' && dataSource.viewData[2] == 3 ? '375px':
							dataSource.viewData[7] == '17' && dataSource.viewData[2] == 4 ? '188px':
							dataSource.viewData[7] == '17' && dataSource.viewData[2] == 5 ? '125px':
							dataSource.viewData[7] == '18' && dataSource.viewData[2] == 3 ? '210px':
							dataSource.viewData[7] == '18' && dataSource.viewData[2] == 4 ? '106px':
							dataSource.viewData[7] == '18' && dataSource.viewData[2] == 5 ? '70px': '',
					}"
					:mode="dataSource.viewData[8] == '19' ? 'scaleToFill' : 'aspectFit'"
					:src="'http://qn.gaoshanmall.cn/'+item.isCoverImageUrl">
					</image>
					<div v-for="(goodsDesc, goodsIndex) in dataSource.viewData[11]" :key="goodsIndex">
						<div
							class="title"
							v-show="goodsDesc == '25'"
							:style="{
								fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
								textAlign: dataSource.viewData[10] == '23'? 'left': 'center',
							}">
							{{item.propertySetName}}
							<span >{{item.categoryNames}}</span>
						</div>
						<div
							class="desc"
							v-show="goodsDesc  == '26'"
							:style="{
								fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
								textAlign: dataSource.viewData[10] == '23'? 'left': 'center',
							}">
							{{item.subTitle}}
						</div>
						<div
							class="price"
							v-show="goodsDesc == '27'"
							:style="{
								fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
								textAlign: dataSource.viewData[10] == '23'? 'left': 'center',
							}">
							<div class="vipPrice" v-show="dataSource.viewData[59] !== '88'">
								<image class="vip_img" src="http://pz53m5lax.bkt.clouddn.com/index_vip.png" alt />
								<div class="priceBox">
                ￥{{item.skuInventoryQtyDtos[0].mixCashPrice}} +
	                <image class="money_img" src="http://pz53m5lax.bkt.clouddn.com/index_money.png" alt />
								{{item.skuInventoryQtyDtos[0].mixScorePrice}}补贴金
		           </div>
							</div>
							<div>
								￥{{item.salePrice}}
								<span
									style="text-decoration: line-through; font-size: 12px; color: #ccc;"
								>￥{{item.salePrice}}</span>
								</div>
							<div style="font-size: 12px; color: #999;">
								<span v-show="dataSource.viewData[59] == '90'">
									{{item.skuInventoryQtyDtos[0].peasPrice}}购物豆
								</span>
							</div>
						</div>
					</div>
					<!--<van-icon name="cart-o" class="cart" />-->
				</div>
			</div>
			<!--
				详细列表
			-->
			<div
				v-else-if="dataSource.viewData[2] == 6"
				class="listData"
				:style="{
					margin: '0 '+dataSource.viewData[3]+'px'
				}">
				<div
					:key="index"
					v-for="(item, index) in dataSource.viewData[1].data"
					@click="toGoodsDetail(item)"
					class="listView"
					:style="{
					marginTop: dataSource.viewData[4] + 'px',
					border: dataSource.viewData[5] == '9' ? '' :  dataSource.viewData[5] == '10' ? '1px solid #ccc' : dataSource.viewData[5] == '11' ? '1px solid #fff' : ''  ,
					boxShadow: dataSource.viewData[5] == '10' ? '3px 3px 5px #ccc' : '',
					borderRadius: dataSource.viewData[6] == '14' ? '5px' : ''
					}">
					<image
						class="image"
						:style="{
						height:dataSource.viewData[7] == '15' ? '120px':
									 dataSource.viewData[7] == '16' ? '120px':
							     dataSource.viewData[7] == '17' ? '120px':
							     dataSource.viewData[7] == '18' ? '120px': ''
						 }"
						:mode="dataSource.viewData[8] == '19' ? 'scaleToFill' : 'aspectFit'"
						:src="'http://qn.gaoshanmall.cn/'+item.isCoverImageUrl"></image>
					<div v-for="(goodsDesc, goodsIndex) in dataSource.viewData[11]" :key="goodsIndex">
						<div
							class="title"
							v-if="goodsDesc == '25'"
							:style="{
							fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
							textAlign: dataSource.viewData[10] == '23'? 'left': 'center',
						}">
							{{item.propertySetName}}
							<span >{{item.categoryNames}}</span>
						</div>
						<div
							class="desc"
							v-if="goodsDesc == '26'"
							:style="{
								fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
								textAlign: dataSource.viewData[10] == '23'? 'left': 'center'
						}">
							
							{{item.subTitle}}
						</div>
						<div
							class="price"
							v-if="goodsDesc == '27'"
					     :style="{
							fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
							textAlign: dataSource.viewData[10] == '23'? 'left': 'center',
						}">
							<div class="vipPrice" v-show="dataSource.viewData[59] !== '88'">
								<image class="vip_img" src="http://pz53m5lax.bkt.clouddn.com/index_vip.png" alt />
								<div class="priceBox">
									￥{{item.skuInventoryQtyDtos[0].mixCashPrice}} +
									<image class="money_img" src="http://pz53m5lax.bkt.clouddn.com/index_money.png" alt />
									{{item.skuInventoryQtyDtos[0].mixScorePrice}}补贴金
								</div>
							</div>
							<div>
								￥{{item.salePrice}}
								<span
										style="text-decoration: line-through; font-size: 12px; color: #ccc;"
								>￥{{item.salePrice}}</span>
							</div>
							<div style="font-size: 12px; color: #999;">
								<span v-show="dataSource.viewData[59] == '90'">
									{{item.skuInventoryQtyDtos[0].peasPrice}}购物豆
								</span>
							</div>
						</div>
					</div>
					<!--<van-icon name="cart-o" class="cart" />-->
				</div>
			</div>
			
			<!--
				一大两小
			-->
			<div
				v-else-if="dataSource.viewData[2] == 7"
				class="smallData"
				:style="{
		      margin: '0 '+dataSource.viewData[3]+'px'
				}">
				<div
					:key="index"
					v-for="(item, index) in dataSource.viewData[1].data"
					@click="toGoodsDetail(item)"
					class="listView"
					:style="{
					marginTop: dataSource.viewData[4] + 'px',
					border: dataSource.viewData[5] == '9' ? '' :  dataSource.viewData[5] == '10' ? '1px solid #ccc' : dataSource.viewData[5] == '11' ? '1px solid #fff' : ''  ,
					boxShadow: dataSource.viewData[5] == '10' ? '3px 3px 5px #ccc' : '',
					borderRadius: dataSource.viewData[6] == '14' ? '5px' : ''
					}">
					<image
						class="image"
						:style="{
						height:dataSource.viewData[7] == '15' && ((index%3 +1) !== 1) ? '106px':
									 dataSource.viewData[7] == '15' && ((index%3 +1) == 1) ? '210px':
									 dataSource.viewData[7] == '16' && ((index%3 +1) !== 1) ? '188px':
									 dataSource.viewData[7] == '16' && ((index%3 +1) == 1) ? '375px':
									 
							     dataSource.viewData[7] == '17' && ((index%3 +1) !== 1) ? '188px':
									 dataSource.viewData[7] == '17' && ((index%3 +1) == 1) ? '375px':
							     dataSource.viewData[7] == '18' && ((index%3 +1) !== 1) ? '105px':
							     dataSource.viewData[7] == '18' && (index%3 +1) == 1 ? '210px': '' ,
						 }"
							:mode="dataSource.viewData[8] == '19' ? 'scaleToFill' : 'aspectFit'"
							:src="'http://qn.gaoshanmall.cn/'+item.isCoverImageUrl"></image>
					<div v-for="(goodsDesc, goodsIndex) in dataSource.viewData[11]" :key="goodsIndex">
						<div
								class="title"
								v-if="goodsDesc == '25'"
								:style="{
							fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
							textAlign: dataSource.viewData[10] == '23'? 'left': 'center',
						}">
							{{item.propertySetName}}
							<span >{{item.categoryNames}}</span>
						</div>
						<div
								class="desc"
								v-if="goodsDesc == '26'"
								:style="{
								fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
								textAlign: dataSource.viewData[10] == '23'? 'left': 'center'
						}">
							
							{{item.subTitle}}
						</div>
						<div
								class="price"
								v-if="goodsDesc == '27'"
								:style="{
							fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
							textAlign: dataSource.viewData[10] == '23'? 'left': 'center',
						}">
							<div class="vipPrice" v-show="dataSource.viewData[59] !== '88'">
								<image class="vip_img" src="http://pz53m5lax.bkt.clouddn.com/index_vip.png" alt />
								<div class="priceBox">
									￥{{item.skuInventoryQtyDtos[0].mixCashPrice}} +
									<image class="money_img" src="http://pz53m5lax.bkt.clouddn.com/index_money.png" alt />
									{{item.skuInventoryQtyDtos[0].mixScorePrice}}补贴金
								</div>
							</div>
							<div>
								￥{{item.salePrice}}
								<span
										style="text-decoration: line-through; font-size: 12px; color: #ccc;"
								>￥{{item.salePrice}}</span>
							</div>
							<div style="font-size: 12px; color: #999;">
								<span v-show="dataSource.viewData[59] == '90'">
									{{item.skuInventoryQtyDtos[0].peasPrice}}购物豆
								</span>
							</div>
						</div>
					</div>
					<!--<van-icon name="cart-o" class="cart" />-->
				</div>
			</div>
			
			<!--
				横向滑动
			-->
			<div
				v-else
				class="rowList"
	      :style="{
					margin: '0 '+dataSource.viewData[3]+'px'
				}">
				<div
					v-for="(item, index) in dataSource.viewData[1].data"
					class="listView"
					@click="toGoodsDetail(item)"
					:key="index"
					:style="{
					marginTop: dataSource.viewData[4] + 'px',
					border: dataSource.viewData[5] == '9' ? '' :  dataSource.viewData[5] == '10' ? '1px solid #ccc' : dataSource.viewData[5] == '11' ? '1px solid #fff' : ''  ,
					boxShadow: dataSource.viewData[5] == '10' ? '3px 3px 5px #ccc' : '',
					borderRadius: dataSource.viewData[6] == '14' ? '5px' : '',
					}">
					<image
						class="image"
						:style="{
						height:dataSource.viewData[7] == '15' ? '84px':
									 dataSource.viewData[7] == '16' ? '126px':
							     dataSource.viewData[7] == '17' ? '168px':
							     dataSource.viewData[7] == '18' ? '71px': ''
					 }"
						:mode="dataSource.viewData[8] == '19' ? 'scaleToFill' : 'aspectFit'"
						:src="'http://qn.gaoshanmall.cn/'+item.isCoverImageUrl"></image>
					<div v-for="(goodsDesc, goodsIndex) in dataSource.viewData[11]" :key="goodsIndex">
						<div
								class="title"
								v-if="goodsDesc == '25'"
								:style="{
							fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
							textAlign: dataSource.viewData[10] == '23'? 'left': 'center',
						}">
							{{item.propertySetName}}
							<span >{{item.categoryNames}}</span>
						</div>
						<div
								class="desc"
								v-if="goodsDesc == '26'"
								:style="{
								fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
								textAlign: dataSource.viewData[10] == '23'? 'left': 'center'
						}">
							
							{{item.subTitle}}
						</div>
						<div
								class="price"
								v-if="goodsDesc == '27'"
								:style="{
							fontWeight: dataSource.viewData[9] == '21'? '': 'bold',
							textAlign: dataSource.viewData[10] == '23'? 'left': 'center',
						}">
							<div class="vipPrice" v-show="dataSource.viewData[59] !== '88'">
								<image class="vip_img" src="http://pz53m5lax.bkt.clouddn.com/index_vip.png" alt />
								<div class="priceBox">
									￥{{item.skuInventoryQtyDtos[0].mixCashPrice}} +
									<image class="money_img" src="http://pz53m5lax.bkt.clouddn.com/index_money.png" alt />
									{{item.skuInventoryQtyDtos[0].mixScorePrice}}补贴金
								</div>
							</div>
							<div>
								￥{{item.salePrice}}
								<span
										style="text-decoration: line-through; font-size: 12px; color: #ccc;"
								>￥{{item.salePrice}}</span>
							</div>
							<div style="font-size: 12px; color: #999;">
								<span v-show="dataSource.viewData[59] == '90'">
									{{item.skuInventoryQtyDtos[0].peasPrice}}购物豆
								</span>
							</div>
						</div>
					</div>
					<!--<van-icon name="cart-o" class="cart" />-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'goods',
    props:  ['dataSource'],
    created() {},
    data() {
      return {}
    },
    methods: {
     toGoodsDetail(item) {
       wx.navigateTo({
         url: "/pages/goods/main?id=" + item.id
       });
     }
    }
  }
</script>

<style lang="sass">
	.goods
		.vipPrice
			margin-top: 5px
			align-items: center
			overflow: hidden
			margin-bottom: 5px
			.vip_img
				width: 50rpx
				height: 33rpx
				float: left
			.priceBox
				padding: 2px
				max-width: calc(95% - 20px)
				line-height: 16px
				float: left
				display: flex
				white-space: nowrap
				height: 33rpx
				font-size: 12rpx
				color: #fff
				background: rgba(217, 34, 49, 1)
				border-radius: 0 8px 8px 0
				vertical-align: center
				align-items: center
				.money_img
					margin: 0 3px
					width: 22rpx
					height: 22rpx
		.listView
			text-align: center
			overflow: hidden
		.image
			width: 100%
			text-align: center
			margin: 0 auto
		.noData
			height: 25px
			line-height: 25px
			color: #f44
			font-size: 14px
			text-align: center
		.listOne
			flex-wrap: nowrap
			overflow: hidden
			.listView
				padding: 10px
				overflow: hidden
				.title
					font-size: 14px
					margin-left: 10px
					height: 20px
					line-height: 20px
				.desc
					text-overflow: ellipsis
					white-space: nowrap
					overflow: hidden
					height: 20px
					line-height: 20px
					margin-left: 10px
					font-size: 13px
					color: #999
				.price
					line-height: 20px
					margin-left: 10px
					color: #f44
					font-size: 15px
					width: 100%
					float: left
				.cart
					color: #f44
					float: right
					margin-right: 10px
					margin-top: 5px
					font-size: 14px
					text-align: right
		.listTwo
			display: block
			overflow: hidden
			.listView
				float: left
				width: 49%
				margin-right: 1%
				position: relative
				.title
					font-size: 14px
					margin-left: 10px
					height: 20px
					line-height: 20px
				.desc
					text-overflow: ellipsis
					white-space: nowrap
					overflow: hidden
					height: 20px
					line-height: 20px
					margin-left: 10px
					font-size: 13px
					color: #999
				.price
					line-height: 20px
					margin-left: 10px
					color: #f44
					font-size: 15px
					width: 100%
					float: left
				.cart
					font-size: 14px
					color: #f44
					float: right
					position: absolute
					right: 10px
					bottom: 5px
					text-align: right
		.listThree
			overflow: hidden
			.listView
				margin-left: 1%
				width: 32%
				float: left
				.vip_img
					width: 20px
					height: 20px
					float: left
				.money_img
					margin: 0
				.title
					font-size: 14px
					height: 20px
					line-height: 20px
				.desc
					height: 20px
					line-height: 20px
					font-size: 13px
					text-overflow: ellipsis
					white-space: nowrap
					overflow: hidden
					color: #999
				.price
					line-height: 20px
					color: #f44
					font-size: 15px
					float: left
				.cart
					margin-top: 3px
					font-size: 13px
					color: #f44
					float: right
					margin-right: 10px
					text-align: right
				.priceBox
					max-width: calc(90% - 20px)
				.money_img
					width: 13px
					height: 13px
		.listData
			.listView
				overflow: hidden
				.image
					width: 120px
					height: 120px
					margin-right: 10px
					float: left
				.title
					font-size: 14px
					height: 20px
					line-height: 20px
					margin-top: 8px
				.desc
					text-overflow: ellipsis
					white-space: nowrap
					overflow: hidden
					height: 20px
					line-height: 20px
					margin-left: 10px
					margin-top: 5px
					font-size: 13px
					color: #999
				.price
					line-height: 20px
					margin-left: 10px
					color: #f44
					font-size: 15px
				.cart
					color: #f44
					float: right
					margin-top: 3px
					font-size: 14px
					margin-right: 10px
					text-align: right
		.rowList
			display: flex
			align-items: flex-start
			flex-wrap: nowrap
			overflow-x: scroll
			white-space: nowrap
			overflow-y: hidden
			.listView
				display: inline-block
				min-width: 120px
				flex: content
				margin-right: 1.5%
				float: left
				.title
					font-size: 13px
					margin-left: 10px
					height: 20px
					line-height: 20px
				.desc
					height: 20px
					line-height: 20px
					margin-left: 10px
					font-size: 13px
					text-overflow: ellipsis
					white-space: nowrap
					overflow: hidden
					color: #999
				.price
					line-height: 20px
					margin-left: 10px
					color: #f44
					font-size: 15px
					float: left
					width: 90%
				.cart
					color: #f44
					float: right
					font-size: 13px
					margin-top: 2px
					margin-right: 5px
					text-align: right
		.smallData
			overflow: hidden
			.listView:nth-child(3n + 1)
				width: 100%
				float: left
			.listView
				width: 48%
				float: left
				.title
					font-size: 14px
					margin-left: 10px
					height: 20px
					line-height: 20px
				.desc
					height: 20px
					line-height: 20px
					text-overflow: ellipsis
					white-space: nowrap
					overflow: hidden
					margin-left: 10px
					font-size: 13px
					color: #999
				.price
					width: 100%
					line-height: 20px
					margin-left: 8px
					color: #f44
					font-size: 15px
					float: left
				.cart
					color: #f44
					float: right
					font-size: 15px
					margin-right: 10px
					text-align: right
</style>

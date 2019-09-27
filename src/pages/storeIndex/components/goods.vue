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
					width: dataSource.viewData[7] == '15' && dataSource.viewData[2] == 3 ? '375px':
								dataSource.viewData[7] == '15' && dataSource.viewData[2] == 4 ? '188px':
								dataSource.viewData[7] == '15' && dataSource.viewData[2] == 5 ? '125px':
								dataSource.viewData[7] == '16' && dataSource.viewData[2] == 3 ? '375px':
								dataSource.viewData[7] == '16' && dataSource.viewData[2] == 4 ? '188px':
								dataSource.viewData[7] == '16' && dataSource.viewData[2] == 5 ? '125px':
								dataSource.viewData[7] == '17' && dataSource.viewData[2] == 3 ? '282px':
								dataSource.viewData[7] == '17' && dataSource.viewData[2] == 4 ? '141px':
								dataSource.viewData[7] == '17' && dataSource.viewData[2] == 5 ? '94px':
								dataSource.viewData[7] == '18' && dataSource.viewData[2] == 3 ? '375px':
								dataSource.viewData[7] == '18' && dataSource.viewData[2] == 4 ? '188px':
								dataSource.viewData[7] == '18' && dataSource.viewData[2] == 5 ? '125px': '',
					
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
							￥{{item.salePrice}}
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
						width: dataSource.viewData[7] == '15' ? '180px':
									 dataSource.viewData[7] == '16' ? '120px':
							     dataSource.viewData[7] == '17' ? '90px':
							     dataSource.viewData[7] == '18' ? '214px': '' ,
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
							￥{{item.salePrice}}
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
							width: dataSource.viewData[7] == '15' && ((index%3 +1) !== 1) ? '188px':
										 dataSource.viewData[7] == '15' && ((index%3 +1) == 1) ? '375px':
										 dataSource.viewData[7] == '16' && ((index%3 +1) !== 1) ? '188px':
										 dataSource.viewData[7] == '16' && ((index%3 +1) == 1) ? '375px':
										 
								     dataSource.viewData[7] == '17' && ((index%3 +1) !== 1) ? '141px':
										 dataSource.viewData[7] == '17' && ((index%3 +1) == 1) ? '282px':
								     dataSource.viewData[7] == '18' && ((index%3 +1) !== 1) ? '188px':
								     dataSource.viewData[7] == '18' && (index%3 +1) == 1 ? '375px': '' ,
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
							￥{{item.salePrice}}
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
						width: dataSource.viewData[7] == '15' ? '126px':
									 dataSource.viewData[7] == '16' ? '126px':
							     dataSource.viewData[7] == '17' ? '126px':
							     dataSource.viewData[7] == '18' ? '126px': '' ,
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
							￥{{item.salePrice}}
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
		background: #fff
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
					height: 20px
					line-height: 20px
					margin-left: 10px
					font-size: 13px
					color: #999
				.price
					height: 20px
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
					text-align: right
		.listTwo
			display: block
			overflow: hidden
			.listView
				float: left
				width: 48%
				margin-right: 1%
				position: relative
				.title
					font-size: 14px
					margin-left: 10px
					height: 20px
					line-height: 20px
				.desc
					height: 20px
					line-height: 20px
					margin-left: 10px
					font-size: 13px
					color: #999
				.price
					height: 20px
					line-height: 20px
					margin-left: 10px
					color: #f44
					font-size: 15px
					width: 100%
					float: left
				.cart
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
				width: 31.5%
				float: left
				.title
					font-size: 14px
					margin-left: 10px
					height: 20px
					line-height: 20px
				.desc
					height: 20px
					line-height: 20px
					margin-left: 10px
					font-size: 13px
					color: #999
				.price
					height: 20px
					line-height: 20px
					margin-left: 10px
					color: #f44
					font-size: 15px
					float: left
				.cart
					color: #f44
					float: right
					margin-right: 10px
					text-align: right
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
					margin-top: 10px
				.desc
					height: 20px
					line-height: 20px
					margin-left: 10px
					margin-top: 10px
					font-size: 13px
					color: #999
				.price
					height: 20px
					line-height: 20px
					margin-left: 10px
					color: #f44
					font-size: 15px
					margin-top: 20px
				.cart
					color: #f44
					float: right
					margin-right: 10px
					text-align: right
		.rowList
			display: block
			overflow-x: scroll
			white-space: nowrap
			overflow-y: hidden
			.listView
				display: inline-block;
				min-width: 120px
				margin-right: 1.5%
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
					color: #999
				.price
					height: 20px
					line-height: 20px
					margin-left: 10px
					color: #f44
					font-size: 15px
					float: left
				.cart
					color: #f44
					float: right
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
					margin-left: 10px
					font-size: 13px
					color: #999
				.price
					height: 20px
					line-height: 20px
					margin-left: 10px
					color: #f44
					font-size: 15px
					float: left
				.cart
					color: #f44
					float: right
					margin-right: 10px
					text-align: right
</style>

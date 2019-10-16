<template>
	<div class="picture">
		<!--
     wjw
     图片广告
    -->
		<!--
			一行一个
		-->
		<div
			:style="{
			margin: '0 '+dataSource.viewData[14]+'px'
			}"
			v-if="dataSource.viewData[12] == 28 && dataSource.viewData[13].length > 0"
		>
			<div
				:style="{
					marginTop: dataSource.viewData[15] + 'px',
					border: dataSource.viewData[16] == '33' ? '' :  dataSource.viewData[5] == '34' ? '1px solid #ccc' : '',
					boxShadow: dataSource.viewData[16] == '34' ? '3px 3px 5px #ccc' : '' ,
				}"
				@click="toOther(item)"
				:key="index"
				v-for="(item, index) in dataSource.viewData[13]">
				<image
					:style="{
					 borderRadius: dataSource.viewData[17] == '36' ? '5px' : ''
					}"
					style="width: 100%; height: 100%"
					:src="'http://qn.gaoshanmall.cn/'+item.imgUrl">
				</image>
			</div>
		</div>
		
		<!--
			轮播图
		-->
		<div
			v-else-if="dataSource.viewData[12] == 29 && dataSource.viewData[13].length > 0"
			:style="{
				margin: '0 '+dataSource.viewData[14]+'px',
				overflow: 'hidden'
			}">
			<swiper
				:indicator-dots="false"
				:autoplay="true"
				:interval="5000"
				:duration="1000">
				<block
					v-for="(item, index) in dataSource.viewData[13]"
					:key="item.id">
					<swiper-item>
						<image
							@click="toOther(item)"
							class="imgSwiper"
							:style="{
								boxShadow: dataSource.viewData[16] == '34' ? '10px 10px 20px #ccc' : '' ,
								borderRadius: dataSource.viewData[17] == '36' ? '5px' : ''
							}"
							:src="'http://qn.gaoshanmall.cn/'+item.imgUrl">
						</image>
					</swiper-item>
				</block>
			</swiper>
		</div>
		
		<!--
			横向滑动
		-->
		<div
			:style="{
				margin: '0 '+dataSource.viewData[14]+'px'
			}"
			v-else-if="dataSource.viewData[13].length > 0"
			:class="dataSource.viewData[12] == 30 ? 'rowList' : dataSource.viewData[12] == 31 ? 'middleList' : 'smallList'">
			<div
				class="listView"
				:key="index"
				:style="{
					marginLeft: dataSource.viewData[15] + 'px',
					border: dataSource.viewData[16] == '33' ? '' :  dataSource.viewData[5] == '34' ? '1px solid #ccc' : '',
					boxShadow: dataSource.viewData[16] == '34' ? '3px 3px 5px #ccc' : ''
				}"
				@click="toOther(item)"
				v-for="(item, index) in dataSource.viewData[13]">
				<image
					:style="{
						borderRadius: dataSource.viewData[17] == '36' ? '5px' : ''
					}"
					style="width: 100%; height: 100%"
					:src="'http://qn.gaoshanmall.cn/'+item.imgUrl">
				</image>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'pictures',
    props:  ['dataSource'],
    data() {
      return {}
    },
    methods: {
      toOther(item) {
        if(item.imgType == 1 ) {
          // 1 导航
          wx.navigateTo({
            url: "/pages/search/main?id=" + item.goodsSelected.id + "&name=" +  item.goodsSelected.mame +"&storeId=" + this.$parent.storeId
          });
        }else if(item.imgType == 2 ) {
          // 2 商品
          wx.navigateTo({
            url: "/pages/goods/main?id=" + item.goodsSelected.id
          });
        }else if(item.imgType == 3 ) {
          // 3 优惠券
	        console.log('优惠券暂无')
        }else if(item.imgType == 4) {
          // 4 专题
          wx.navigateTo({
	          url: "/pages/topicdetail/main?id=" + item.id
          });
        }
      }
    }
  }
</script>

<style lang="sass">
	.picture
		background: #fff
		.imgSwiper
			width: 100%
			height: 100%
		.noData
			height: 25px
			line-height: 25px
			color: #f44
			font-size: 14px
			text-align: center
		.rowList
			display: block
			overflow-x: scroll
			white-space: nowrap
			overflow-y: hidden
			.listView
				width: 180px
				min-width: 180px
				max-width: 180px
				height: 260px
				min-height: 260px
				max-height: 260px
				display: inline-block
				image
					width: 100%
					height: 100%
			.listView:first-child
				margin-left: 0!important
		.middleList
			display: block
			overflow-x: scroll
			white-space: nowrap
			overflow-y: hidden
			.listView
				width: 120px
				min-width: 120px
				max-width: 120px
				height: 180px
				min-height: 180px
				max-height: 180px
				display: inline-block
				image
					width: 100%
					height: 100%
			.listView:first-child
				margin-left: 0!important
		.smallList
			display: block
			overflow-x: scroll
			white-space: nowrap
			overflow-y: hidden
			.listView
				width: 60px
				min-width: 60px
				max-width: 60px
				height: 90px
				min-height: 90px
				max-height: 90px
				display: inline-block
				image
					width: 100%
					height: 100%
			.listView:first-child
				margin-left: 0!important
</style>

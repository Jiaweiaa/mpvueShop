<template>
	<div class="navigation">
		<!--
			内容
		-->
		<div class="content">
			<div
				class="listView"
				:style="{
					width: dataSource.viewData['23'] == '46' ? (100 / dataSource.viewData['pic'].length) +'%' : '150px',
					minWidth: dataSource.viewData['23'] == '46' ? (100 / dataSource.viewData['pic'].length) +'%' : '150px',
					maxWidth: dataSource.viewData['23'] == '46' ? (100 / dataSource.viewData['pic'].length) +'%' : '150px',
				}"
				:key="index"
				@click="toDetail(item)"
				v-for="(item, index) in dataSource.viewData['pic']">
				<image
					class="image"
					v-if="dataSource.viewData['22'] == '44'"
					:class="{isHidden: dataSource.viewData['22'] == '44'}"
					:src="'http://qn.gaoshanmall.cn/'+item.imgUrl"
				></image>
				<div
					:style="{
						background: dataSource.viewData[24],
						color: dataSource.viewData[25]
					}"
					class="name">
					{{item.name}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'navigation',
    props:  ['dataSource'],
    data() {
      return {
      }
    },
    methods: {
      toDetail(item) {
        console.log(item);
        if(item.imgType == 1 ) {
          // 1 导航
          wx.navigateTo({
            url: "/pages/search/main?id=" + item.goodsSelected.id + "&name=" +  item.goodsSelected.mame
          });
        }else if(item.imgType == 2 ) {
          console.log(item);
          // 2 商品
          wx.navigateTo({
            url: "/pages/goods/main?id=" + item.goodsSelected.id
          });
        }else if(item.imgType == 3 ) {
          // 3 优惠券
          console.log('优惠券暂无')
        }else {
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
	.navigation
		background: #fff
		.noData
			height: 25px
			line-height: 25px
			color: #f44
			font-size: 14px
			text-align: center
		.content
			width: 100%
			display: flex
			flex-wrap: nowrap
			padding: 0
			.listView
				.image
					height: 40px
					width: 100%
				.name
					margin-top: -3px
					width: 100%
					height: 30px
					font-size: 13px
					line-height: 30px
					text-align: center
</style>

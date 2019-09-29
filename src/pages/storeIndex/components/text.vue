<template>
	<div class="Text">
		<!--
     wjw
      文本
    -->
		<!--
			文本内容
		-->
		<div
			class="content"
			@click="toDetail"
			:style="{
				fontSize: dataSource.viewData['27'] == '49' ?  '18px' :  dataSource.viewData['27'] == '50' ? '16px' : '14px',
				color: dataSource.viewData['28'],
				backgroundColor: dataSource.viewData['29'],
				textAlign: dataSource.viewData['30'] == '52' ? 'left' :dataSource.viewData['30'] == '53' ? 'center' : 'right',
				borderBottom: dataSource.viewData['32'] == '55' ? '1px solid #ccc' : ''
			}">
			{{dataSource.viewData['26']}}
		</div>
	</div>
</template>

<script>
  export default {
    name: 'textComponents',
    props:  ['dataSource'],

    data() {
      return {}
    },
    methods: {
      toDetail() {
        let type = this.dataSource.viewData[31].type;
        if(type == 1 ) {
          // 1 导航
          wx.switchTab({
            url: "/pages/category/main"
          })
        }else if(type == 2 ) {
          // 2 商品
          wx.navigateTo({
            url: "/pages/goods/main?id=" + this.dataSource.viewData[31].goodsSelected.id
          });
        }else if(type == 3 ) {
          // 3 优惠券
          console.log('优惠券暂无')
        }else {
          // 4 专题
          wx.navigateTo({
            url: "/pages/topicdetail/main?id=" + this.dataSource.viewData[31].goodsSelected.id
          });
        }
      }
    }
  }
</script>

<style lang="sass">
	.Text
		.noData
			height: 25px
			line-height: 25px
			color: #f44
			font-size: 14px
			text-align: center
		.content
			display: block
			height: 30px
			line-height: 30px
</style>

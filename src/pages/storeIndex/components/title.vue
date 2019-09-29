<template>
	<div class="Title">
		<!--
     wjw
     标题
    -->
		<!--
			文本内容
		-->
		<div
			class="content"
			@click="toDetail"
			:style="{
				backgroundColor: dataSource.viewData['37'],
				textAlign: dataSource.viewData['35'] == '58' ? 'left' :dataSource.viewData['35'] == '59' ? 'center' : 'right',
			}">
			<p style="font-size: 15px;">{{dataSource.viewData['33']}}
				<span style="margin-left: 10px;font-size: 13px; color: #409EFF;">-{{dataSource.viewData['36']}}</span>
			</p>
			<p style="font-size: 13px; color: #ccc;">{{dataSource.viewData['navigation'].name}}</p>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'Title',
    props:  ['dataSource'],

    data() {
      return {


      }
    },
    methods: {
      toDetail() {
        console.log(this.dataSource);
        let type = this.dataSource.viewData['navigation'].type;
        if(type == 1 ) {
          // 1 导航
          wx.switchTab({
            url: "/pages/category/main"
          })
        }else if(type == 2 ) {
          // 2 商品
          wx.navigateTo({
            url: "/pages/goods/main?id=" + this.dataSource.viewData['navigation'].data.id
          });
        }else if(type == 3 ) {
          // 3 优惠券
          console.log('优惠券暂无')
        }else {
          // 4 专题
          wx.navigateTo({
            url: "/pages/topicdetail/main?id=" +  this.dataSource.viewData['navigation'].data.id
          });
        }
      }
    }
  }
</script>

<style lang="sass">
	.Title
		.noData
			height: 25px
			line-height: 25px
			color: #f44
			font-size: 14px
			text-align: center
		.content
			display: block
			line-height: 30px
</style>

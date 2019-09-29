<template>
	<div class="search">
		<!--
     wjw
     商品搜索
    -->
		<div
			class="searchBox"
			:style="{
				background: dataSource.viewData['51']
			}"
		>
			<div
				class="content"
				:style="{
				borderRadius: dataSource.viewData['49'] == 72 ? '20px' : '',
				height: dataSource.viewData['50'] + 'px',
				textAlign: dataSource.viewData['53'] == 73 ? 'center' : 'left',
				background: dataSource.viewData['52']
				}"
			>
				<van-icon
					name="search"
					class="el-icon-search searchIcon"
					:style="{
						color: dataSource.viewData['54']
					}"
				/>
				<input
					class="body"
					:style="{
						color: dataSource.viewData['54']
					}"
					@click="pageChange"
					:placeholder="dataSource.viewData['48'][0] ? dataSource.viewData['48'][0] : '商品搜索'"
				/>
			</div>
		</div>
	
	</div>
</template>

<script>
  export default {
    name: 'goodsSearch',
    props:  ['dataSource'],
    data() {
      return {
        id: ''
      }
    },
	  created() {
      this.id = this.$root.$mp.query.id;
      console.log(this.id);
    },
    methods: {
      pageChange() {
        wx.navigateTo({
          url: "../search/main?storeId=" + this.id
        });
      }
    }
  }
</script>

<style lang="sass">
	.search
		.searchBox
			background: #eee
			padding: 5px 10px
			.content
				padding: 0
				background: #fff
				overflow: hidden
				height: 30px
				line-height: 30px
				display: flex
				align-items: center
				.searchIcon
					float: left
					color: #999
					font-size: 13px
					padding: 0 10px
					margin-left: 0
					margin-top: 2px
				.body
					width: 100%
					height: 100%
					font-size: 13px
					color: #999
</style>

<template>
	<div class="search">
		<!--
     wjw
     商品
    -->
	
	</div>
</template>

<script>
  export default {
    name: 'goodsSearch',
    components: {},

    props:  ['dataSource'],
    data() {
      return {
      }
    },
    methods: {}
  }
</script>

<style lang="sass">
	.search
		.searchBox
			background: #eee
			padding: 5px 10px
			.content
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
				.body
					font-size: 13px
					color: #999
</style>

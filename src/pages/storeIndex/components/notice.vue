<template>
	<div class="notice">
		<!--
     wjw
     公告
    -->
		
	
	</div>
</template>

<script>
  export default {
    name: 'notice',
    props:  ['dataSource'],
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style lang="sass">
	.notice
		.noData
			height: 25px
			line-height: 25px
			color: #f44
			font-size: 14px
			text-align: center
		.content
			overflow: hidden
			height: 30px
			display: flex
			align-items: center
			.icon
				color: orange
				height: 15px
				width: 15px
				margin: 0px 8px 0 5px
			.floatLeft
				float: left
			.contentBody
				font-size: 14px
</style>

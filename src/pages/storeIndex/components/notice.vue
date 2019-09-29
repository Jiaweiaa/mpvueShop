<template>
	<div class="notice">
		<!--
     wjw
     公告
    -->
		<van-notice-bar
			left-icon="volume-o"
			mode="closeable"
			:text="dataSource.viewData[45]"
			:color="dataSource.viewData[47]"
			:backgroundColor="dataSource.viewData[46]"
		/>
	
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
	  created() {
      console.log(this.dataSource);
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

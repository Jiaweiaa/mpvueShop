<template>
	<div class="navigation">
		<!--
     wjw
     图文导航
    -->
	
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
    }
  }
</script>

<style lang="sass">
	.navigation
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
			.listView
				.image
					width: 100%
					height: 200px
				.name
					margin-top: -3px
					width: 100%
					height: 30px
					font-size: 13px
					line-height: 30px
					text-align: center
</style>

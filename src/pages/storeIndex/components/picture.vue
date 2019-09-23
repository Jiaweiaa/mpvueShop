<template>
	<div class="picture">
		<!--
     wjw
     图片广告
    -->
	</div>
</template>

<script>
  export default {
    name: 'pictures',
    props:  ['dataSource'],

    data() {
      return {


      }
    },
	  created() {
      console.log(this.dataSource);
    },
    components: {


    },
    methods: {

    }
  }
</script>

<style lang="sass">
	.picture
		.noData
			height: 25px
			line-height: 25px
			color: #f44
			font-size: 14px
			text-align: center
		.rowList
			display: flex
			flex-wrap: nowrap
			.listView
				flex: 1
				width: 180px
				min-width: 180px
				max-width: 180px
				height: 260px
				min-height: 260px
				max-height: 260px
				float: left
			.listView:first-child
				margin-left: 0!important
		.middleList
			display: flex
			flex-wrap: nowrap
			.listView
				flex: 1
				width: 120px
				min-width: 120px
				max-width: 120px
				height: 180px
				min-height: 180px
				max-height: 180px
				float: left
			.listView:first-child
				margin-left: 0!important
		.smallList
			display: flex
			flex-wrap: nowrap
			.listView
				flex: 1
				width: 60px
				min-width: 60px
				max-width: 60px
				height: 90px
				min-height: 90px
				max-height: 90px
				float: left
			.listView:first-child
				margin-left: 0!important
</style>

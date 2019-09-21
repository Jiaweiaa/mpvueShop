<template>
	<div class="Title">
		<!--
     wjw
     标题
    -->
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
    components: {


    },
    methods: {

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
			overflow: hidden
			align-items: center
			padding-left: 10px
</style>

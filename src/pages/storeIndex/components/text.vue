<template>
	<div class="Text">
		<!--
     wjw
      文本
    -->
	</div>
</template>

<script>
  export default {
    name: 'textComponents',
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
	.Text
		.noData
			height: 25px
			line-height: 25px
			color: #f44
			font-size: 14px
			text-align: center
		.content
			height: 30px
			line-height: 30px
			padding-left: 10px
</style>

<template>
	<div class="coupon">
		<!--
		 wjw
		 优惠券
		-->
	
	
	</div>
</template>

<script>
  export default {
    name: 'coupon',
    props:  ['dataSource'],
    data() {
      return {
      }
    },
	  created() {
      console.log(this.dataSource.viewData['55'].data);
    },
    methods: {
    }
  }
</script>

<style lang="sass">
	.noData
		height: 25px
		line-height: 25px
		color: #f44
		font-size: 14px
		text-align: center
	.content
		padding: 10px
		display: flex
		.child
			overflow: hidden
			min-width: 160px
			max-width: 160px
			height: 80px
</style>

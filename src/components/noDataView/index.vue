<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-20 10:36:07
 * @LastEditTime: 2019-09-27 17:47:01
 * @LastEditors: Please set LastEditors
 -->
<template>
	<div class="noData">
		<img style="height:305rpx;" src="/static/images/nodata/dingdan.png">
	</div>
</template>

<script>
  export default {
    name: 'name',
    data() {
      return {}
    },
    methods: {
    }
  }
</script>
<style lang="sass">
	.noData
		background: #f6f6f6
		width: 100vw
		height: 100vh
		position: relative
		img
			display:block
			position: absolute
			width: 110px
		
			left: 50%
			margin-left: -55px
			top: 130px
</style>

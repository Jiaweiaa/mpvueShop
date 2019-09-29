<template>
	<div class="auxiliary">
		<!--
     wjw
     辅助留白
    -->
		<div
			:style="{
				height: dataSource.viewData['44'] + 'px'
			}"
			class="content">
		</div>
	
	</div>
</template>

<script>
  export default {
    name: 'auxiliaryBlank',
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
	.auxiliary
		.content
			padding: 0
</style>

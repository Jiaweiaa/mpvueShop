<template>
	<div class="guide">
		<!--
     wjw
     
    -->
		<div
			:style="{
				width: dataSource.viewData['42'] == '66' ? '100%' : '90%',
				border: dataSource.viewData['41'] !== '' && dataSource.viewData['43'] == '68' ? '1px solid '+ dataSource.viewData['41'] :
								dataSource.viewData['41'] !== '' && dataSource.viewData['43'] == '69' ? '1px dashed '+ dataSource.viewData['41'] :
								dataSource.viewData['41'] !== '' && dataSource.viewData['43'] == '70' ? '1px dotted '+ dataSource.viewData['41'] : ''
 			}"
			class="content">
		</div>
	
	</div>
</template>

<script>
  export default {
    name: 'guide',
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
	.guide
		.content
			display: block
			padding: 0
			border-bottom: 1px solid #ccc
			background: #ccc
			margin: 10px auto
</style>

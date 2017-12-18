<template>
	<div class="content">
		<router-view></router-view>
	</div>
</template>

<script>
	export default{}
</script>

<style scoped lang='less'>
@import '~common/less/variable.less';
@import '~common/less/mixin.less';
	.content{
		min-height: 100%;
		.borderColor();
		padding: 15px;
		background-color: @wihteBackColor;
	}
</style>
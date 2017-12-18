<template>
	<div class="pop p-f d-f">
		<div class="panel">
			<h1 class='title ta-l'>
				<span>添加用户</span>
				<i class="f-r c-p ivu-icon ivu-icon-close" @click='closePanel'></i>
			</h1>
			<div class="pop-content"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['pop'],
		data(){
			return{
				showPop:this.pop
			}
		},
		methods:{
			closePanel(){
				console.log(352);
				this.showPop = false;
				this.$emit('closePanel',this.showPop);
			}
		}
	}
</script>

<style scoped lang='less'>
@import '~common/less/variable.less';
	.pop{
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.4);
		z-index: 101;
		justify-content:center;
		align-items:center;
		.panel{
			max-height: 500px;
			padding: 15px 20px;
			border-radius: 5px;
			background-color: @wihteBackColor;
			overflow: auto;
			.title{
				line-height: 30px;
				font-size: 18px;
				padding-bottom: 6px;
				border-bottom: 2px solid #ccc;
				span{
					font-weight: bold;
				}
			}
			.pop-content{
				width: 700px;
				height: 300px;
				padding-top: 15px;
			}
		}
	}
</style>
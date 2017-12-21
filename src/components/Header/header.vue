<template>
	<div class="header p-f">
		<div class="logo f-l ta-c">
			<Icon type="ios-analytics va-m"></Icon>
			<span class='va-m'>Management Systerm</span>
		</div>
		<div class="right-tab" v-if='showTab'>
			<Menu mode="horizontal" class='user-info f-r'>
				<Submenu name="1">
		            <template slot="title">
		                <Icon type="person"></Icon>
		                <span>admin</span>
		            </template>
	                <MenuItem name="1-1">
	                	<li @click='loginOut'>退出</li>
	                </MenuItem>
		        </Submenu>
	    	</Menu>
		</div>
	</div>
</template>

<script>
	export default{
		props:['isShow'],
		data(){
			return{
				showTab:this.isShow
			}
		},
		methods:{
			loginOut(){
				this.showTab = false;
				sessionStorage.removeItem('loginSession');
				this.$router.push('/login');
			}
		}
	}
</script>

<style scoped lang='less'>
	@import '~common/less/variable.less';
	.header{
		top: 0;
		left: 0;
		width: 100%;
		height: 61px;
		border-bottom: 1px solid #c0c0c0;
		background-color: #fff;
		z-index: 100;
		.logo{
			width: 360px;
			height: 60px;
			line-height: 60px;
			background-color: @logoColor;
			font-size: 22px;
			color:#fff;
			i{
				font-size: 32px;
				padding-right: 5px;
			}
		}
		.right-tab{
			width: 100%;
			.user-info{
				padding-right: 15px;
				font-size: 16px;
			}
		}
	}
</style>
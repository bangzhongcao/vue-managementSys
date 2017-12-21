<template>
	<div class="login">
		<m-header :isShow='showTab'></m-header>
		<div class="logo">
			<img src="../../assets/logo.png" alt="">
		</div>
		<Form class='loginForm' ref="formInline" :model="formInline" :rules="ruleInline">
	        <FormItem prop="user">
	            <Input type="text" size='large' v-model="formInline.Name" placeholder="用户名">
	                <Icon type="ios-person-outline" slot="prepend"></Icon>
	            </Input>
	        </FormItem>
	        <FormItem prop="password">
	            <Input type="password" size='large' v-model="formInline.Pass" placeholder="密码">
	                <Icon type="ios-locked-outline" slot="prepend"></Icon>
	            </Input>
	        </FormItem>
	        <FormItem>
	            <Button type="error" size='large' long @click="handleSubmit('formInline')">登录</Button>
	        </FormItem>
	    </Form>
	</div>
</template>
<script>
	 import Mheader from 'components/Header/header';
	 export default {
	 	components:{'m-header':Mheader},
        data () {
            return {
            	showTab:false,
                formInline: {
                    Name: '',
                    Pass: ''
                },
                ruleInline: {
                    Name: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    Pass: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
            	this.$http.post('/api/login',this.formInline).then(res=>{
            		if(res.body.status){
            			this.showTab = true;
            			sessionStorage.setItem('loginSession',res.body.session);
            			this.$Message.success('登录成功!');
            			this.$router.push('/table');
            		}else{
            			this.$Message.error(res.body.msg);
            		}
            	})
            }
        }
    }
</script>
<style scoped lang='less'>
	.login{
		width: 700px;
		height: 100%;
		overflow: hidden;
		margin: 0 auto;
		.logo{
			width: 40%;
			img{
				width: 100%;
			}
			margin: 50px auto;
		}
		.loginForm{
			width: 60%;
			height:200px;
			margin: 0 auto;
		}
	}
</style>
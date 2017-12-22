<template>
	<div class="pop p-f d-f">
		<div class="panel">
			<h1 class='title ta-l'>
				<span>{{Poptitle}}</span>
				<i class="f-r c-p ivu-icon ivu-icon-close" @click='closePanel'></i>
			</h1>
			<div class="pop-content">
				<Form ref="formValidate" class='popForm' :model="formValidate" :rules="ruleValidate" :label-width="80">
					<FormItem v-if='this.userInfo.haveData' label="工号" prop="userId">
			            <Input readonly number size='large' v-model="formValidate.userId" placeholder="请输入工号"></Input>
			        </FormItem>
			        <FormItem v-if='!this.userInfo.haveData' label="工号" prop="userId">
			            <Input number size='large' v-model="formValidate.userId" placeholder="请输入工号"></Input>
			        </FormItem>
			        <FormItem label="姓名" prop="userName">
			            <Input size='large' v-model="formValidate.userName" placeholder="请输入姓名"></Input>
			        </FormItem>
			        <FormItem label="身份证" prop="IDcard">
			            <Input size='large' v-model="formValidate.IDcard" placeholder="请输入身份证号"></Input>
			        </FormItem>
			        <FormItem label="部门" prop="userDepartment">
			            <Select size='large' v-model="formValidate.userDepartment" placeholder="请选择部门">
			                <Option v-for='item in departments' :key='item' :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="岗位" prop="userStation">
			            <Input size='large' v-model="formValidate.userStation" placeholder="请输入岗位"></Input>
			        </FormItem>
			        <FormItem class='input-age' label="年龄" prop="userAge">
			            <Input number size='large' v-model="formValidate.userAge" placeholder="请输入年龄"></Input>
			        </FormItem>
			        <FormItem label="性别" prop="userSex">
			            <RadioGroup v-model="formValidate.userSex">
			                <Radio size='large' label="男">男</Radio>
			                <Radio size='large' label="女">女</Radio>
			            </RadioGroup>
			        </FormItem>
			        <div class='btn-group ta-c'>
			            <Button size='large' type="success" @click="handleSubmit('formValidate')">提交</Button>
			            <Button v-if='!this.userInfo.haveData' size='large' type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
			        </div>
			    </Form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['pop','Poptitle','userInfo'],
		data(){
			//定义工号规则
			const validateID = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('工号不能为空'));
                } else if(isNaN(Number(value))){
                    callback(new Error('工号只能是数字'));
                }else{
                	callback();
                }
            };
            //定义年龄规则
            const validateAge = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('年龄不能为空'));
                } else if(isNaN(Number(value))){
                    callback(new Error('年龄只能是数字'));
                }else if(Number(value)<=0||Number(value)>=100){
                	callback(new Error('年龄应该在合理范围内'));
                }else{
                	callback();
                }
            };
			return{
				showPop:this.pop,
				departments:['总工办','核心与运营开发处','公司业务开发处','零售业务开发处','电子渠道开发处','网络金融开发处','技术平台开发处','管理信息开发处','测试规划及管理处','系统测试处','业务测试处','综合管理处'],
				formValidate: {
					userId:'',
                    userName: '',
                    IDcard: '',
                    userDepartment: '',
                    userStation:'',
                    userAge:'',
                    userSex: ''
                },
                ruleValidate: {
                	userId: [
                        { required: true,validator:validateID, trigger: 'blur' }
                    ],
                    userName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    IDcard: [
                        { required: true, message: '身份证不能为空', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    userDepartment: [
                        { required: true, message: '部门不能为空', trigger: 'change' }
                    ],
                    userStation: [
                        { required: true, message: '岗位不能为空', trigger: 'change' }
                    ],
                    userAge: [
                        { required: true,validator:validateAge, trigger: 'blur' }
                    ],
                    userSex: [
                        { required: true, message: '性别不能为空', trigger: 'change' }
                    ]
                }
			}
		},
		mounted(){
			var userData = this.userInfo['data'];
			if(this.userInfo.haveData){
				for(var key in this.formValidate){
					this.formValidate[key] = userData[key];
				}
			}
		},
		methods:{
			closePanel(){
				this.showPop = false;
				this.$emit('closePanel',this.showPop);
			},
			handleSubmit (name) {
				// 判断是新增用户还是编辑用户
				if(this.userInfo.haveData){//编辑
					this.$refs[name].validate((valid) => {
	                    if (valid) {
	                        this.$http.post('/api/alterItem',this.formValidate).then(res=>{
								if(res.body.status){
									this.$emit('operateData','alter',true,this.formValidate);
								}else{
									this.$Message.error({
			                            content: '修改用户'+this.formValidate.userName+'的信息失败！'+res.body.msg,
			                            closable:true,
			                            top:300,
			                            duration:15
			                        });
								}				
							});
	                    } else {
	                        this.$Message.error('Fail!');
	                    }
	                });
				}else{//新增
					this.$refs[name].validate((valid) => {
	                    if (valid) {
	                        this.$http.post('/api/addItem',this.formValidate).then(res=>{
								if(res.body.status){
									this.$emit('operateData','add',true,this.formValidate);	
								}else{
									this.$Message.error({
			                            content: '添加用户'+this.formValidate.userName+'的信息失败！'+res.body.msg,
			                            closable:true,
			                            top:300,
			                            duration:15
			                        });
								}	
							});
	                    } else {
	                        this.$Message.error('Fail!');
	                    }
	                });
				}
            },
            handleReset (name) {
                this.$refs[name].resetFields();
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
			width: 45%;
			max-height: 560px;
			padding: 15px 20px;
			border-radius: 5px;
			background-color: @wihteBackColor;
			.title{
				line-height: 30px;
				font-size: 18px;
				padding-bottom: 8px;
				border-bottom: 2px solid #ccc;
				span{
					font-weight: bold;
				}
			}
			.pop-content{
				max-height: 460px;
				margin: 15px 0;
				overflow: auto;
				.popForm{
					width: 80%;
					margin: 0 auto;
					.input-age{
						width: 240px;
					}
					.btn-group{
						margin: 0;
					}
				}
			}
		}
	}
</style>
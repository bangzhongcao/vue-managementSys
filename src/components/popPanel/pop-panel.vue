<template>
	<div class="pop p-f d-f">
		<div class="panel">
			<h1 class='title ta-l'>
				<span>添加用户</span>
				<i class="f-r c-p ivu-icon ivu-icon-close" @click='closePanel'></i>
			</h1>
			<div class="pop-content">
				<Form ref="formValidate" class='popForm' :model="formValidate" :rules="ruleValidate" :label-width="80">
					<FormItem label="工号" prop="id">
			            <Input type='number' v-model="formValidate.id" placeholder="请输入工号"></Input>
			        </FormItem>
			        <FormItem label="姓名" prop="name">
			            <Input type='text' v-model="formValidate.name" placeholder="请输入姓名"></Input>
			        </FormItem>
			        <FormItem label="身份证" prop="card">
			            <Input type='text' v-model="formValidate.card" placeholder="请输入身份证号"></Input>
			        </FormItem>
			        <FormItem label="部门" prop="depart">
			            <Select v-model="formValidate.depart" placeholder="请选择部门">
			                <Option v-for='item in departments' :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="岗位" prop="station">
			            <Input type='text' v-model="formValidate.station" placeholder="请输入岗位"></Input>
			        </FormItem>
			        <FormItem label="性别" prop="sex">
			            <RadioGroup v-model="formValidate.sex">
			                <Radio label="男">男</Radio>
			                <Radio label="女">女</Radio>
			            </RadioGroup>
			        </FormItem>
			        <FormItem class='btn-group'>
			            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
			            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
			        </FormItem>
			    </Form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['pop'],
		data(){
			return{
				showPop:this.pop,
				departments:['总工办','核心与运营开发处','公司业务开发处','零售业务开发处','电子渠道开发处','网络金融开发处','技术平台开发处','管理信息开发处','测试规划及管理处','系统测试处','业务测试处','综合管理处'],
				formValidate: {
					id:'',
                    name: '',
                    card: '',
                    depart: '',
                    station:'',
                    sex: ''
                },
                ruleValidate: {
                	id: [
                        { required: true, message: '工号不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    card: [
                        { required: true, message: '身份证不能为空', trigger: 'blur' }
                        // { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    depart: [
                        { required: true, message: '部门不能为空', trigger: 'change' }
                    ],
                    station: [
                        { required: true, message: '岗位不能为空', trigger: 'change' }
                    ],
                    sex: [
                        { required: true, message: '性别不能为空', trigger: 'change' }
                    ]
                }
			}
		},
		methods:{
			closePanel(){
				console.log(352);
				this.showPop = false;
				this.$emit('closePanel',this.showPop);
			},
			handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
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
			max-height: 500px;
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
				max-height: 400px;
				margin: 15px 0;
				overflow: auto;
				.popForm{
					width: 80%;
					margin: 0 auto;
					.btn-group{
						margin: 0;
					}
				}
			}
		}
	}
</style>
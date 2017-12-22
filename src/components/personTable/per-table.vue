<template>
	<div class="per-table">
        <m-header :isShow='showTab'></m-header>
		<div class="table-tab">
			<div class="operate-tab">
				<Button type="primary" class='f-l add-user' icon="plus" @click='addUser'>新增用户</Button>
                <div class="search f-r p-r ta-c">
                    <input type="text" v-model="searchValue" @keyup.enter='handleSearch(searchValue)' @input='emptySearch(searchValue)' placeholder='Search'>
                    <i class="search-btn p-a c-p ivu-icon ivu-icon-ios-search" @click='handleSearch(searchValue)'></i>
                </div>
			</div>
		</div>
		<div class="tables">
			<div class="top-pagination ta-r">
				<Page :total="itemCount" :current='pageNum' :page-size="pageSize" :page-size-opts='opts' placement='bottom' show-total show-elevator show-sizer @on-change="changePage" @on-page-size-change='changePageSize'></Page>
			</div>
			<Table border size='large' :columns="columns" :data="CurrentData" @on-sort-change='sortChange'></Table>
			<div class="bottom-pagination ta-r">
				<Page :total="itemCount" :current='pageNum' :page-size="pageSize" :page-size-opts='opts' placement='top' show-total show-elevator show-sizer @on-change="changePage" @on-page-size-change='changePageSize'></Page>
			</div>
		</div>
		<pop-panel v-if='isPop' :pop='isPop' :Poptitle='title' :userInfo='userObj' @closePanel='Close' @operateData='handleData'></pop-panel>

        <Modal v-model="modal" width="360">
            <p slot="header" class='ta-c'style="color:#f60;">
                <Icon type="information-circled"></Icon>
                <span>删除用户</span>
            </p>
            <div style="text-align:center">
                <p>工号：{{this.delUser.userId}},姓名：{{this.delUser.userName}}</p>
                <p>你确定要删除这位员工信息吗?</p>
            </div>
            <div slot="footer" class='ta-c'>
                <Button type="error" size='large' :loading="modal_loading" @click="del">确定</Button>
                <Button type="ghost" size="large" @click="cancel">取消</Button>
            </div>
        </Modal>
	</div>
</template>

<script>
    import Mheader from 'components/Header/header';
	import popPanel from 'components/popPanel/pop-panel';
	export default{
		components:{'m-header':Mheader,'pop-panel':popPanel},
		data(){
			return{
                showTab:true,//是否显示右边登录信息
                delUser:{},
                modal:false,//删除提醒框
                modal_loading: false,//删除按钮等待状态
				isPop:false,
                title:'',
                userObj:{},
				searchValue:'',//搜索的值
				operateData:[],//可进行操作的数据
				pageSize:10,//当前每页展示的条数
				pageNum:1,//当前在第几页
				opts:[10,25,50],//每页条数切换的配置
                key:'',//排序的关键字
                order:'asc',//默认的排序的升降序
				columns: [
                    {
                        title: '工号',
                        key: 'userId',
                        width:100,
                        sortable: 'custom',
                        sortType:'asc'
                    },
                    {
                        title: '姓名',
                        key: 'userName',
                        width:150,
                        sortable: 'custom'
                    },
                    {
                        title: '身份证',
                        key: 'IDcard',
                        // width:240,
                        sortable: 'custom'
                    },
                    {
                        title: '部门',
                        key: 'userDepartment',
                        sortable: 'custom'
                    },
                    {
                        title: '岗位',
                        key: 'userStation',
                        sortable: 'custom'
                    },
                    {
                        title: '年龄',
                        key: 'userAge',
                        width:100,
                        sortable: 'custom'
                    },
                    {
                        title: '性别',
                        key: 'userSex',
                        width:100,
                        sortable: 'custom'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'default'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.title = '用户编辑';
                                            this.userObj = {'haveData':true,'data':params.row};
                                            this.isPop = true;
                                            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
                                            // console.log(params);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'default'
                                    },
                                    on: {
                                        click: () => {
                                            this.delUser = params.row;
                                            this.modal = true;
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                tableData: []
			}
		},
		created(){
            this.$http.get('/api/tableData').then(function(res){
                this.tableData = res.body.data;
                this.initData();
            })
		},
        computed:{
            CurrentData(){
                var _start = ( this.pageNum - 1 ) * this.pageSize;
                var _end = this.pageNum * this.pageSize;
                if(this.operateData.length<_end){
                    return this.operateData.slice(_start);
                }else{
                    return this.operateData.slice(_start,_end);
                }
                
            },
            itemCount(){
                return this.operateData.length;
            }
        },
		methods:{
            // 搜索功能
			handleSearch(value){
                var v = value.trim();
                // 将页码重设为1
                this.pageNum = 1;
                this.operateData = this.tableData.filter(function(item){
                    // debugger
                    for(var key in item){
                        if(String(item[key])===v){
                            return item;
                        }
                    }
                });
                // 重新排序
                this.sortChange();
			},
            //当搜索框为空时自动返回所有数据
            emptySearch(value){
                if(!value){
                    this.operateData = this.tableData.slice(0);
                    // 重新排序
                    this.sortChange();
                }
            },
            // 数据初始化
			initData(){
                // this.itemCount = this.tableData.length;
                this.operateData = this.tableData.slice(0);
			},
            // 排序函数
			compare(prop,order) {
			    return function (obj1, obj2) {
			        var val1 = obj1[prop];
			        var val2 = obj2[prop];
			        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
			            val1 = Number(val1);
			            val2 = Number(val2);
			        }
			        if(order==='asc'){
			        	if (val1 < val2) {
				            return -1;
				        } else if (val1 > val2) {
				            return 1;
				        } else {
				            return 0;
				        } 
			        }else if(order==='desc'){
			        	if (val1 < val2) {
				            return 1;
				        } else if (val1 > val2) {
				            return -1;
				        } else {
				            return 0;
				        } 
			        }
			                   
			    } 
			},
            // 排序
			sortChange(obj){
                if(obj){
                    this.key = obj.key;
                    if(obj.order!=='normal'){
                        this.order = obj.order;
                    }
                }
				this.operateData.sort(this.compare(this.key,this.order));
			},
            // 翻页
			changePage(index){
                this.pageNum = index;
                window.scrollTo(0, 0);
			},
            // 修改每页显示条数
			changePageSize(size){
				this.pageSize = size;
				this.pageNum = 1;
				window.scrollTo(0, 0);
			},
            // 添加用户
			addUser(){
                this.title = '添加用户';
                this.userObj = {'haveData':false,'data':{}};
				this.isPop = true;
				document.getElementsByTagName('html')[0].style.overflow = 'hidden';
			},
            // 关闭弹窗
			Close(popShow){
				this.isPop = popShow;
				document.getElementsByTagName('html')[0].style.overflow = 'auto';
			},
            // 对操作后的数据进行处理
            handleData(op,flag,obj){
                if(op==='add'){
                    this.operateData.push(obj);
                    this.tableData.push(obj);
                    // 判断是否在搜索状态
                    if(this.searchValue){
                        this.handleSearch(this.searchValue);
                    }else{
                        this.sortChange();
                    }
                    this.$Message.success({
                        content:'工号'+obj.userId+' 的用户信息添加成功',
                        top:300,
                        duration:5
                    });
                    this.isPop = false;
                    document.getElementsByTagName('html')[0].style.overflow = 'auto';
                }else{
                    for(var i in this.operateData){
                        if(this.operateData[i].userId===obj.userId){
                            this.operateData.splice(i,1);
                            this.operateData.push(obj);
                            break;
                        }                      
                    }
                    this.$http.get('/api/tableData').then(function(res){
                        this.tableData = res.body.data;
                        this.sortChange();
                        this.$Message.success({
                            content:'工号'+obj.userId+' 的用户信息修改成功',
                            top:300,
                            duration:5
                        });
                        this.isPop = false;
                        document.getElementsByTagName('html')[0].style.overflow = 'auto';
                    });
                }
            },
            // 删除用户
            del(){
                this.modal_loading = true; 
                this.$http.post('/api/deleteItem',this.delUser).then(res=>{
                    // 删除成功
                    if(res.body.status){
                        // 先删除opearateData中的数据
                        for(var i in this.operateData){
                            if(this.operateData[i].userId===this.delUser.userId){
                                this.operateData.splice(i,1);
                            }
                            break;
                        }
                        // 重新获取tableData
                        this.$http.get('/api/tableData').then(function(res){
                            this.tableData = res.body.data;
                            this.modal = false;
                            this.modal_loading = false; 
                            this.$Message.success({
                                content:'工号'+this.delUser.userId+' 的用户删除成功',
                                top:300,
                                duration:5
                            });
                            this.sortChange();
                        });
                        
                    // 删除失败
                    }else{
                        this.modal = false;
                        this.modal_loading = false; 
                        this.$Message.error({
                            content: '删除用户失败！'+res.body.msg,
                            closable:true,
                            top:300,
                            duration:15
                        });
                    }
                })
            },
            // 取消删除
            cancel(){
                this.modal = false;
            }
		}
	}
</script>

<style scoped lang='less'>
@import '~common/less/variable.less';
	.per-table{
		.table-tab{
			padding-bottom: 10px;
			background-color: @backgroundColor;
			.operate-tab{
				overflow: hidden;
				background-color: @wihteBackColor;
				padding-bottom: 14px;
				.add-user{
                    margin-top: 4px;
					margin-left: 10px;
                    height: 40px;
                    line-height: 26px;
                    font-size: 16px;
				}
				.search{
					width: 300px;
					margin-right: 30px;
                    padding: 3px 42px 3px 8px;
                    border:1px solid #c0c0c0;
                    border-radius: 3px;
					input{
                        width: 100%;
						height: 36px;
					}
                    .search-btn{
                        top: 0;
                        right: 0;
                        width: 42px;
                        line-height: 42px;
                        font-size: 22px;
                        background-color: @backgroundColor;
                        &:hover{
                            background-color: #ccc;
                        }
                    }
				}
			}
		}
		.tables{
			padding: 10px 0;
			.top-pagination{
				padding: 10px;
			}
			.bottom-pagination{
				padding:15px;
			}
		}
	}
</style>
<template>
	<div class="per-table">
		<div class="table-tab">
			<div class="operate-tab">
				<Button type="error" class='f-l add-user' @click='addUser'>新增用户</Button>
				<AutoComplete v-model="searchValue" icon="ios-search"
			        @on-search="handleSearch" placeholder="Search" class='f-r search'>
			    </AutoComplete>
			</div>
		</div>
		<div class="tables">
			<div class="top-pagination ta-r">
				<Page :total="itemCount" :current='pageNum' :page-size="pageSize" :page-size-opts='opts' placement='bottom' show-total show-elevator show-sizer @on-change="changePage" @on-page-size-change='changePageSize'></Page>
			</div>
			<Table border size='large' :columns="columns5" :data="displayData" @on-sort-change='sortChange'></Table>
			<div class="bottom-pagination ta-r">
				<Page :total="itemCount" :current='pageNum' :page-size="pageSize" :page-size-opts='opts' placement='top' show-total show-elevator show-sizer @on-change="changePage" @on-page-size-change='changePageSize'></Page>
			</div>
		</div>
		<pop-panel v-show='isPop' :pop='isPop' @closePanel='Close'></pop-panel>
	</div>
</template>

<script>
	import popPanel from 'components/popPanel/pop-panel';
	export default{
		components:{'pop-panel':popPanel},
		data(){
			return{
				isPop:false,
				searchValue:'',
				displayData:[],
				itemCount:0,//总共有多少条数
				pageSize:5,//当前每页展示的条数
				pageNum:1,//当前在第几页
				opts:[5,10,15,20],//每页条数切换的配置
				columns5: [
                    {
                        title: 'Date',
                        key: 'date',
                        sortable: 'custom',
                        sortType:'asc'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        sortable: 'custom'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: 'custom'
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        sortable: 'custom'
                    }
                ],
                tableData: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
			}
		},
		created(){
			this.initData();
		},
		methods:{
			handleSearch(){
				console.log(111);
			},
			initData(){
                this.itemCount = this.tableData.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(this.itemCount < this.pageSize){
                    this.displayData = this.tableData;
                }else{
                    this.displayData = this.tableData.slice(0,this.pageSize);
                }
			},
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
			sortChange(obj){
				var key = obj.key;
				var order = obj.order;
				this.tableData.sort(this.compare(key,order));
				this.changePage();
			},
			changePage(index){
				if(index){
					this.pageNum = index;
				}
				var _start = ( this.pageNum - 1 ) * this.pageSize;
                var _end = this.pageNum * this.pageSize;
                this.displayData = this.tableData.slice(_start,_end);
			},
			changePageSize(size){
				this.pageSize = size;
				this.pageNum = 1;
				this.changePage();
				window.scrollTo(0, 0);
			},
			addUser(){
				this.isPop = true;
				console.log(this.$refs.tagHtml);
				document.getElementsByTagName('html')[0].style.overflow = 'hidden';
			},
			Close(popShow){
				this.isPop = popShow;
				document.getElementsByTagName('html')[0].style.overflow = 'auto';
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
					margin-left: 10px;
				}
				.search{
					width: 300px;
					margin-right: 30px;
					.ivu-input{
						height: 44px;
					}
				}
			}
		}
		.tables{
			padding: 10px 0;
			.top-pagination{
				padding: 15px;
			}
			.bottom-pagination{
				padding:15px;
			}
		}
	}
</style>
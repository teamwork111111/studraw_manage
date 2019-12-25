<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                align='center'
                >
              <el-table-column
                v-if="idFlag"
                prop="id"
                label="id"
                align='center'
                width="180">
            </el-table-column>
            <el-table-column
                type="selection"
                align='center'
                width="60">
            </el-table-column>
			<el-table-column
			prop="logo"
			label="学校图片"
			align='center'
			width="80">
			</el-table-column>
              <el-table-column
                prop="schoolname"
                label="学校名称"
                align='center'
                width="80">
            </el-table-column>
              <el-table-column
                prop="code"
                label="学校代码"
                align='center'
                >
            </el-table-column>
			<el-table-column
			prop="desc"
			label="简介"
			align='center'
			width="80">
			</el-table-column>
            <el-table-column
                align='center'
                label="操作"
                width="180">
                <template slot-scope='scope'>
                    <el-button 
                        type="warning" 
                        icon='edit' 
                        size="mini"
                        @click='onEditMoney(scope.row)'
                    >编辑</el-button>
                    <el-button 
                        type="danger" 
                        icon='delete' 
                        size="mini"
                        @click='onDeleteMoney(scope.row,scope.$index)'
                    >删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import * as mutils from '@/utils/mUtils';
    import Pagination from "@/components/pagination";
    import { getMoneyIncomePay} from "@/api/money";

    export default {
        data(){
            return {
                tableData: [],
                tableHeight:0,
                loading:true,
                idFlag:false,
                isShow:false, // 是否显示资金modal,默认为false
                editid:'',
                rowIds:[],
                sortnum:0,
                format_type_list: {
                    0: '提现',
                    1: '提现手续费',
                    2: '提现锁定',
                    3: '理财服务退出',
                    4: '购买宜定盈',
                    5: '充值',
                    6: '优惠券',
                    7: '充值礼券',
                    8: '转账'
                },
                addFundDialog:{  
                    show:false,
                    dialogRow:{}
                },
                incomePayData:{
                    page:1,
                    limit:20,
                    name:''
                },
                pageTotal:0,
                // 用于列表筛选
                fields: {
                    incomePayType:{
                        filter: {
                            list: [{
                                text: '提现',
                                value: 0
                            },{
                                text: '提现手续费',
                                value: 1
                            }, {
                                text: '提现锁定',
                                value: 2
                            }, {
                                text: '理财服务退出',
                                value: 3
                            }, {
                                text: '购买宜定盈',
                                value: 4
                            }, {
                                text: '充值',
                                value: 5
                            }, {
                                text: '优惠券',
                                value: 6
                            }, {
                                text: '充值礼券',
                                value: 7
                            }, {
                                text: '转账',
                                value: 8
                            }],
                            multiple: true
                        }
                    },
                },
               
            }
        },
        components:{
            Pagination
        },
        computed:{
            ...mapGetters(['search'])
        },mounted() {
            this.getMoneyList()
	},
        methods: {
            setTableHeight(){
                this.$nextTick(() => {
                   this.tableHeight =  document.body.clientHeight - 300
                })
            },
            // 获取资金列表数据
            getMoneyList(){
                const para = Object.assign({},this.incomePayData,this.search);
                getMoneyIncomePay(para).then(res => {
                     this.loading = false;
                     this.pageTotal = 20
                     this.tableData = res.data
                })
            },
            // 显示资金弹框
            showAddFundDialog(val){
                this.$store.commit('SET_DIALOG_TITLE', val)
                this.addFundDialog.show = true;
            },
            hideAddFundDialog(){
                this.addFundDialog.show = false;
            },
            // 上下分页
            handleCurrentChange(val){
                this.incomePayData.page = val;
                this.getMoneyList()
            },
            // 每页显示多少条
            handleSizeChange(val){
                this.incomePayData.limit = val;
                this.getMoneyList()
            },
            getPay(val){
               if(mutils.isInteger(val)){
                   return -val;
               }else{
                   return val;
               }
            },
           
            // 编辑操作方法
            onEditMoney(row){
                this.addFundDialog.dialogRow = {...row};
                this.showAddFundDialog();
            },
            onBatchDelMoney(){},
            // 用户全选checkbox时触发该事件
            selectAll(val){
                 val.forEach((item) => {
                     this.rowIds.push(item.id);
                });
                this.setSearchBtn(val);
            },
            setSearchBtn(val){
                let isFlag = true;
                if(val.length > 0){
                    isFlag = false;
                }else{
                    isFlag = true;
                }
                this.$store.commit('SET_SEARCHBTN_DISABLED',isFlag);
            }
        },
    }
</script>

<style lang="less" scoped>
    .table_container{
        padding: 10px;
        background: #fff;
        border-radius: 2px;
    }
    .el-dialog--small{
       width: 600px !important;
    }
    .pagination{
        text-align: left;
        margin-top: 10px;
    }
     
</style>



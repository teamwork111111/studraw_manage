<template>
    <el-dialog 
        :visible.sync="isVisible"
        :title="addFundDialog.title" 
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false"
        @close="closeDialog">
        <div class="form">
            <el-form 
                ref="form" 
                :model="form"
                :rules="form_rules"
                :label-width="dialog.formLabelWidth" 
                style="margin:10px;width:auto;">
                <el-form-item prop='schoolname' label="学校名称:">
                    <el-input type="text" v-model="form.schoolname"></el-input>
                </el-form-item>
                <el-form-item prop='code'  label="学校代码:">
                    <el-input v-model.number="form.code"></el-input>
                </el-form-item>
				
                <el-form-item prop='logo' label="学校logo">
                    <el-input v-model.number="form.logo"></el-input>
                </el-form-item>

                <el-form-item label="简介:">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>

                <el-form-item  class="text_right">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>

<script>
   import { mapState, mapGetters } from 'vuex'
   import { addMoney,updateMoney } from "@/api/money";

  export default {
      name:'addFundDialogs',
      data(){
          let validateData = (rule, value, callback) => {
                if(value === ''){
                    let text;
                    if(rule.field == "code"){
                        text='学校代码';
                    }else if(rule.field == "schoolname"){
                        text='学校名称';
                    }
                    callback(new Error(text+'不能为空~'));
                }else{
                   let numReg = /^[0-9]+.?[0-9]*$/;
                   if(!numReg.test(value)){
                      callback(new Error('请输入正数值'));
                   }else{
                      callback();
                   }
                }
            };
          return {
            isVisible: this.isShow,
            form:{
                schoolname: '',
                code: '',
                desc:'',
                logo:''
            },
            form_rules: {
                schoolname   : [
                    {required: true, message : '学校名称不能为空！',trigger : 'blur'}
                ],
                code   : [
                    { required: true, validator:validateData,trigger: 'blur'}
                ]
            },
            //详情弹框信息
            dialog: {
                width:'400px',
                formLabelWidth:'120px'
            }
          }
      },
      props:{
          isShow:Boolean,
          dialogRow:Object
      },
      computed:{
        ...mapGetters(['addFundDialog']),
      },
      created(){
      },
      mounted(){
        if(this.addFundDialog.type === 'edit'){
            this.form = this.dialogRow;
            console.log(this.form);
            this.form.incomePayType = (this.dialogRow.incomePayType).toString();

        }else{
            this.$nextTick(() => {
                this.$refs['form'].resetFields()
            })
        }
      },
      methods:{
          closeDialog(){
              this.$emit('closeDialog');
          },
          //表单提交
          onSubmit(form){
            this.$refs[form].validate((valid) => {
                if (valid) {//表单数据验证完成之后，提交数据;
                    let formData = this[form];
                    const para = Object.assign({}, formData)
                    console.log(para);
                    // edit
                    if(this.addFundDialog.type === 'edit'){
                        updateMoney(para).then(res => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            this.$refs['form'].resetFields()
                            this.isVisible = false
                            this.$emit('getFundList');
                       })
                    }else{
                        // add
                        addMoney(para).then(res => {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            })
                            this.$refs['form'].resetFields()
                            this.isVisible = false
                            this.$emit('getFundList');
                       })
                    }
                }
            })
          }
      }
  }
</script>

<style lang="less" scoped>
    .search_container{
        margin-bottom: 20px;
    }
    .btnRight{
        float: right;
        margin-right: 0px !important;
    }
    .searchArea{
        background:rgba(255,255,255,1);
        border-radius:2px;
        padding: 18px 18px 0;
    }
</style>

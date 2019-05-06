<template>

  <div class="form-area">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="设备名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" prop="num">
        <el-input v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择设备类型" style="width: 100%">
          <el-option label="微型" value="微型"></el-option>
          <el-option label="小型" value="小型"></el-option>
          <el-option label="中型" value="中型"></el-option>
          <el-option label="大型" value="大型"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" :span="24" placeholder="请选择设备状态"  style="width: 100%">
          <el-option label="飞行中" value="飞行中"></el-option>
          <el-option label="待命中" value="待命中"></el-option>
          <el-option label="充电中" value="充电中"></el-option>
          <el-option label="故障中" value="故障中"></el-option>
          <el-option label="维修中" value="维修中"></el-option>
          <el-option label="离线中" value="离线中"></el-option>
          <el-option label="电量低" value="电量低"></el-option>
          <el-option label="已停用" value="已停用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备简介" prop="comm">
        <el-input type="textarea" v-model="ruleForm.comm"></el-input>
      </el-form-item>
      <el-form-item label="设备描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="电池容量mAh" prop="powerMax">
        <el-input v-model="ruleForm.powerMax"></el-input>
      </el-form-item>
      <el-form-item label="设备载重 g" prop="capacity">
        <el-input v-model="ruleForm.capacity"></el-input>
      </el-form-item>
      <el-form-item label="持续飞行 km" prop="flyMileage">
        <el-input v-model="ruleForm.flyMileage"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.res.windRes.name" prop="res.windRes.value">
        <el-input v-model="ruleForm.res.windRes.value"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.res.waterRes.name" prop="res.windRes.value">
        <el-input v-model="ruleForm.res.windRes.value"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.res.hitRes.name" prop="res.windRes.value">
        <el-input v-model="ruleForm.res.windRes.value"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.res.flexibility.name" prop="res.windRes.value">
        <el-input v-model="ruleForm.res.windRes.value"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.res.emcRes.name" prop="res.windRes.value">
        <el-input v-model="ruleForm.res.windRes.value"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.loss.wingLoss.name" prop="loss.wingLoss.value">
        <el-input v-model="ruleForm.loss.wingLoss.value"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.loss.powerLoss.name" prop="loss.wingLoss.value">
        <el-input v-model="ruleForm.loss.wingLoss.value"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.loss.cameraLoss.name" prop="loss.wingLoss.value">
        <el-input v-model="ruleForm.loss.wingLoss.value"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.loss.packLoss.name" prop="loss.wingLoss.value">
        <el-input v-model="ruleForm.loss.wingLoss.value"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.loss.engineLoss.name" prop="loss.wingLoss.value">
        <el-input v-model="ruleForm.loss.wingLoss.value"></el-input>
      </el-form-item>
      <el-form-item :label="ruleForm.loss.baseLoss.name" prop="loss.wingLoss.value">
        <el-input v-model="ruleForm.loss.wingLoss.value"></el-input>
      </el-form-item>

      <el-form-item label="出厂时间" required>
        <el-col :span="11">
          <el-form-item prop="createTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">至</el-col>
        <el-col :span="12">
          <el-form-item prop="createTime">
            <el-time-picker placeholder="选择时间" v-model="ruleForm.createTime" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="导入设备" required>
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          :action="uploadUrl"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
          <div class="el-upload__tip" slot="tip">只能上传.s后缀的设备3D扫描文件</div>
        </el-upload>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始导入</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { createDev,uploadFile } from '@/api/device'
  export default {
    name: "dev-add",
    data(){
      return{
        uploadUrl:'/upload/dev/file',
        ruleForm: {

          id: '',
          type: '',
          status: '',
          num: '',
          name: '',
          comm: '',
          desc: '',
          powerMax: '',
          capacity: '',
          flyMileage: '',
          res: {
            windRes: {
              name: '抗风系数',
              value: ''
            },
            waterRes: {
              name: '抗水系数',
              value: ''
            },
            hitRes: {
              name: '放撞系数',
              value: ''
            },
            flexibility: {
              name: '灵活系数',
              value: ''
            },
            emcRes: {
              name: '抗电磁干扰系数',
              value: ''
            }
          },
          createTime: '',
          imgUrl: '',
          loss: {
            wingLoss: {
              name: '机翼损耗率',
              value: ''
            },
            powerLoss: {
              name: '电池损耗率',
              value: ''
            },
            cameraLoss: {
              name: '摄像头损耗率',
              value: ''
            },
            packLoss: {
              name: '机舱损耗率',
              value: ''
            },
            engineLoss: {
              name: '引擎损耗率',
              value: ''
            },
            baseLoss: {
              name: '底座损耗率',
              value: ''
            }
          }
        },
        rules: {
          name: [
            { required: true, message: '请输入设备名称', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请至少选择一个类型', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请至少选择一个状态', trigger: 'change' }
          ]
        }
      }
    },
    methods:{

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message('添加设备成功');
            this.$refs[formName].resetFields();
          } else {
            this.$message.error(`添加失败，请检查表单`);
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleExceed(files, fileList) {
        this.$message.warning(`文件已上传，请提交！`);
      },
      submitUpload() {

        uploadFile(this.ruleForm).then((res) => {
          if(this.$refs.upload.uploadFiles.length==0){
            this.$message.error(`文件未上传`);
            return
          }
          if(res.code===20000){
            this.ruleForm=res.data
            this.$message.success(`导入成功！`);
          }else{
            this.$message.error(`导入出错:${res.msg}`);
          }

        })

      }
    }
  }
</script>

<style scoped>
  .el-form{
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
  }
  .el-upload{
    margin: 0 auto;
  }
</style>

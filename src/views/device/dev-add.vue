<template>

  <div class="form-area">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="设备名称" prop="deviceName">
        <el-input v-model="ruleForm.deviceName"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" prop="deviceNum">
        <el-input v-model="ruleForm.deviceNum"></el-input>
      </el-form-item>
      <el-form-item label="可执行任务" prop="taskType">
        <el-select v-model="ruleForm.taskTypeId" placeholder="请选择设备类型" style="width: 100%">
          <el-option v-for="(item,idx) of taskType" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="deviceType">
        <el-select v-model="ruleForm.deviceType" placeholder="请选择设备类型" style="width: 100%">
          <el-option label="微型" value="微型"></el-option>
          <el-option label="小型" value="小型"></el-option>
          <el-option label="中型" value="中型"></el-option>
          <el-option label="大型" value="大型"></el-option>
          <el-option label="特大型" value="特大型"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="devStatus">
        <el-select v-model="ruleForm.deviceStatus" :span="24" placeholder="请选择设备状态"  style="width: 100%">
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
      <el-form-item label="设备简介" prop="deviceComm">
        <el-input type="textarea" v-model="ruleForm.deviceComm"></el-input>
      </el-form-item>
      <el-form-item label="设备描述" prop="deviceDesc">
        <el-input type="textarea" v-model="ruleForm.deviceDesc" rows="6"></el-input>
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
      <el-form-item label="抗风系数" prop="windRes">
        <el-input v-model="ruleForm.windRes"></el-input>
      </el-form-item>
      <el-form-item label="抗水系数" prop="waterRes">
        <el-input v-model="ruleForm.waterRes"></el-input>
      </el-form-item>
      <el-form-item label="放撞击系数" prop="hitRes">
        <el-input v-model="ruleForm.hitRes"></el-input>
      </el-form-item>
      <el-form-item label="灵活系数" prop="flexibility">
        <el-input v-model="ruleForm.flexibility"></el-input>
      </el-form-item>
      <el-form-item label="抗电磁干扰系数" prop="emcRes">
        <el-input v-model="ruleForm.emcRes"></el-input>
      </el-form-item>
      <el-form-item label="机翼损耗率" prop="wingLoss">
        <el-input v-model="ruleForm.wingLoss"></el-input>
      </el-form-item>
      <el-form-item label="电池损耗率" prop="powerLoss">
        <el-input v-model="ruleForm.powerLoss"></el-input>
      </el-form-item>
      <el-form-item label="摄像头损耗率" prop="cameraLoss">
        <el-input v-model="ruleForm.cameraLoss"></el-input>
      </el-form-item>
      <el-form-item label="机舱损耗率" prop="packLoss">
        <el-input v-model="ruleForm.packLoss"></el-input>
      </el-form-item>
      <el-form-item label="引擎损耗率" prop="engineLoss">
        <el-input v-model="ruleForm.wingLoss"></el-input>
      </el-form-item>
      <el-form-item label="底座损耗率" prop="baseLoss">
        <el-input v-model="ruleForm.baseLoss"></el-input>
      </el-form-item>

      <el-form-item label="出厂时间" required>
        <el-col :span="11">
          <el-form-item prop="createTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">&nbsp;</el-col>
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
          :on-success="getImportedDev"
          :action="uploadUrl"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击选择</em></div>
          <div class="el-upload__tip" slot="tip">只能上传.d后缀的设备3D扫描文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button style="margin-left: 10px;" type="success" @click="submitUpload">开始导入</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import { createDev,uploadFile } from '@/api/device'
  import { fetchTaskType } from '@/api/rode.js'
  export default {
    name: "dev-add",
    data(){
      return{
        uploadUrl:'/serve/dev/file/import',
        ruleForm: {

          id: '',
          deviceType: '',
          deviceStatus: '',
          deviceNum: '',
          deviceName: '',
          deviceComm: '',
          deviceDesc: '',
          powerMax: '',
          capacity: '',
          flyMileage: '',
          windRes:'',
          waterRes:'',
          hitRes: '',
          flexibility: '',
          emcRes: '',
          createTime: '',
          imgUrl: '',
          wingLoss: '',
          powerLoss: '',
          cameraLoss: '',
          packLoss: '',
          engineLoss: '',
          baseLoss: ''
        },
        rules: {
          deviceName: [
            { required: true, message: '请输入设备名称', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字', trigger: 'blur' }
          ],
          deviceType: [
            { required: true, message: '请至少选择一个类型', trigger: 'change' }
          ],
          deviceStatus: [
            { required: true, message: '请至少选择一个状态', trigger: 'change' }
          ],
          taskTypeId: [
            { required: true, message: '请至少选择一个可执行任务', trigger: 'change' }
          ]
        },
        taskType: []
      }
    },
    methods:{

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            createDev(this.ruleForm).then((res)=>{
              this.$message('添加设备成功');
              this.$refs[formName].resetFields();
            })

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
      getImportedDev(res, file, fileList){

        console.log(res)
        if(res.success){
          this.ruleForm=res.data
          this.$message.success(`导入成功！`);
        }else{
          this.$message.error(`导入出错:${res.msg}`);
        }
      },
      submitUpload() {

        if(this.$refs.upload.uploadFiles.length==0){
          this.$message.error(`文件未添加`);
          return
        }
        this.$refs.upload.submit();

      }
    },
    mounted() {

      fetchTaskType({}).then((res)=>{
        this.taskType=res.data
        console.log(this.taskType)
      })

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

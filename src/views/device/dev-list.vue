<template>

  <div class="dev-list">

    <div class="i-charts">
      <Pie></Pie>
      <LineChart></LineChart>
    </div>


    <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="">
        <el-select v-model="listQuery.sort" @change="findData">
          <el-option label="根据ID正序排列" value="+id"></el-option>
          <el-option label="根据ID倒序排列" value="-id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listQuery.id" placeholder="输入ID搜索"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listQuery.num" placeholder="输入型号搜索"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listQuery.name" placeholder="输入名称搜索"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="listQuery.type" placeholder="选择类型搜索">
          <el-option label="选择类型搜索" value=""></el-option>
          <el-option label="微型" value="微型"></el-option>
          <el-option label="小型" value="小型"></el-option>
          <el-option label="中型" value="中型"></el-option>
          <el-option label="大型" value="大型"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="listQuery.status" placeholder="选择状态搜索">
          <el-option label="选择状态搜索" value=""></el-option>
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
      <el-form-item label="">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="范围开始日期" v-model="listQuery.createTimeStart" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">至</el-col>
        <el-col :span="11">
          <el-date-picker placeholder="范围结束时间" v-model="listQuery.createTimeEnd" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="findData" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" @click="clearData" class="el-icon-delete"> 清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="page.list"
      style="width: 100%"
      :expand-row-keys="expands"
      :row-key='getRowKeys'
      @expand-change="expandSelect"
      border>
      <el-table-column type="expand">
        <template slot-scope="props">

          <el-form label-position="left" inline class="demo-table-expand">
            <dev-chart :dev="props.row"></dev-chart>
            <el-form-item label="可执行任务">
              <span>{{ props.row.taskType }}</span>
            </el-form-item>
            <el-form-item label="电池容量">
              <span>{{ props.row.powerMax }} mAh</span>
            </el-form-item>
            <el-form-item label="可持续飞行">
              <span>{{ props.row.flyMileage }} km</span>
            </el-form-item>
            <el-form-item label="总载重量">
              <span>{{ props.row.capacity }} g</span>
            </el-form-item>
            <el-form-item label="设备图片">
              <img :src="props.row.imgUrl" alt="无人机" class="dev-img">
            </el-form-item>
            <el-form-item label="设备描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
        width="60"
        sortable>
      </el-table-column>
      <el-table-column
        label="型号"
        prop="num"
        width="125">
      </el-table-column>
      <el-table-column
        label="设备名称"
        prop="name"
        width="140">
      </el-table-column>
      <el-table-column
        label="设备简介"
        prop="comm">
      </el-table-column>
      <el-table-column
        label="类型"
        prop="type"
        width="55">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        width="65"
        :filters="filters"
        :filter-method="filterTag">
      </el-table-column>
      <el-table-column
        label="出厂日期"
        prop="createTime"
        width="155">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="toEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            v-show="scope.row.status!='已停用'"
            @click="stopUse(scope.row.id)">停用</el-button>
          <el-button
            size="mini"
            type="success"
            v-show="scope.row.status=='已停用'"
            @click="startUse(scope.row.id)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>

    <el-dialog title="修改设备信息" :visible.sync="dialogFormVisible">
      <el-form :model="editData">
        <el-form-item label="设备ID">
          <el-input v-model="editData.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="editData.name"></el-input>
        </el-form-item>
        <el-form-item label="设备简介">
          <el-input type="textarea" v-model="editData.desc" rows="6"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="editData.type" placeholder="">
            <el-option label="微型" value="微型"></el-option>
            <el-option label="小型" value="小型"></el-option>
            <el-option label="中型" value="中型"></el-option>
            <el-option label="大型" value="大型"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前状态">
          <el-select v-model="editData.status" placeholder="">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList } from '@/api/device'
  import DevChart from './dev-chart'

  import Pie from './com/Pie'
  import LineChart from './com/Line'

  export default {
    name: "dev-list",
    data(){
      return{
        filters:[
          { text: '飞行中', value: '飞行中' },
          { text: '充电中', value: '充电中' },
          { text: '故障中', value: '故障中' },
          { text: '维修中', value: '维修中' },
          { text: '离线中', value: '离线中' },
          { text: '电量低', value: '电量低' },
          { text: '待命中', value: '待命中' },
          { text: '已停用', value: '已停用' }
        ],
        getRowKeys (row) {
          return row.id
        },
        expands: [],
        page: {},
        currentPage:1,
        listQuery: {
          id: '',
          type: '',
          status: '',
          num: '',
          name: '',
          createTimeStart: '',
          createTimeEnd: '',
          limit: 10,
          page:1,
          sort: '+id'
        },
        editData:{},
        flag:'',
        dialogFormVisible: false,
      }
    },
    computed:{

    },
    components: {
      DevChart,Pie,LineChart
    },
    created() {
      this.getList()
    },
    methods: {
      filterTag(value, row) {
        return row.status === value;
      },
      // 折叠面板每次只能展开一行
      expandSelect (row, expandedRows) {
        var that = this
        if (expandedRows.length) {
          that.expands = []
          if (row) {
            that.expands.push(row.id)
          }
        } else {
          that.expands = []
        }
      },
      toEdit(item){
        this.editData={...item}
        this.flag=this.page.list.indexOf(item)
        this.dialogFormVisible=true
      },
      edit(){
        this.page.list.splice(this.flag,1,{...this.editData})
        this.dialogFormVisible = false
      },
      stopUse(id){

        this.$confirm('此操作将使得该设备停用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let msg={};
          this.page.list.filter(item=>{

            if(id===item.id){
              if(item.status==='飞行中'){
                msg={
                  type: 'info',
                  message: '此设备正在执行任务'
                }
              }else if(item.status==='已停用'){
                msg={
                  type: 'info',
                  message: '此设备已经停用'
                }
              }else{
                item.status='已停用'
                msg={
                  type: 'success',
                  message: '停用成功'
                }
              }
            }
          })

          this.$message(msg);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      },
      startUse(id){

        this.$confirm('此操作将使得该设备恢复启用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let msg={};
          this.page.list.filter(item=>{
            item.status='待命中'
            msg={
              type: 'success',
              message: '启用成功'
            }
          })

          this.$message(msg);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      },
      async getList(){

        const { data } = await fetchList(this.listQuery)
        this.page=data
      },
      findData(){

        this.getList()
      },
      clearData(){

        this.listQuery={
          id: '',
          type: '',
          status: '',
          num: '',
          name: '',
          createTimeStart: '',
          createTimeEnd: '',
          limit: 10,
          page:1,
          sort:'+id'
        }
        this.getList()
      },
      handleSizeChange(val) {

        this.listQuery.limit=val
        this.getList()
      },
      handleCurrentChange(val) {

        this.listQuery.page=val
        this.getList()
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .dev-img{
    width: 300px;
    height: 400px;
  }
  .dev-list{
    padding: 20px;
  }
  .block{
    margin-top: 20px;
  }
  .i-charts{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    margin-bottom: 20px;
    border-bottom: 1px solid #bfc3cd;
  }
  .i-charts>div{
    /*border: 1px solid blue;*/
  }
</style>

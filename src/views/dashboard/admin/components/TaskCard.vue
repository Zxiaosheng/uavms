<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in doingTopList" :key="item.taskId">
      <!--<h3 class="medium"></h3>-->
      <span class="task-id" title="任务序号">{{item.taskId}}</span>
      <span class="task-name" title="任务名称">{{item.taskName}}</span>
      <span class="task-type" title="任务类型">{{item.taskTypes.typeName}}</span>
      <span class="task-uavs" title="执行器">{{item.taskUavs}}</span>
      <span class="task-rode" title="任务路线">{{item.rodes.rodeName}}</span>
      <span class="task-head" title="负责人">{{item.head}}</span>
      <span class="task-status" title="任务状态">{{item.taskStatus|statusFilter}}</span>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  import {fetchTasklist} from '@/api/task'
  export default {
    name: 'TaskCard',
    data(){
      return {
        taskList:[],
        doingTopList:[]
      }
    },
    mounted(){
      fetchTasklist({}).then(resp=>{
        this.taskList = resp.data.items;
        this.doingTopList = this.taskList.filter(item=>{
          return item.taskStatus === 'Normal'
        }).sort((a,b)=>{
          return a.taskId - b.taskId
        })
        console.log(this.doingTopList)
      })
    },
    filters:{
      statusFilter(value){
        return value === 'Normal'? '进行中' : null
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    border: 1px solid #fff;
    background-color: rgb(31,45,61);
    color: #fff;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    position: relative;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: rgb(31,45,61);
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: rgb(48,65,86);
  }
  .task-id{
    position: absolute;
    top:100px;
    left: 100px;
    font-size: 34px;
    color: #fffa98;
    font-weight: bold;
  }
  .task-name{
    position: absolute;
    top:15px;
    right: 20px;
    font-size:32px;
    color: #ff6966;
  }
  .task-type{
    position: absolute;
    top:50px;
    left: 50px;
    font-size: 28px;
    color: #ff8d4d;
  }
  .task-uavs{
    position: absolute;
    top:80px;
    right: 70px;
    font-size: 24px;
    color: #d7a5ff;
  }
  .task-rode{
    position: absolute;
    bottom:20px;
    right: 60px;
    font-size: 26px;
    color: #fafffb;
  }
  .task-head{
    position: absolute;
    bottom:20px;
    left: 50px;
    font-size: 26px;
    color: #7cddff;
  }
  .task-status{
    position: absolute;
    top:10px;
    left: 30px;
    font-size: 24px;
    color: #16ee08;
  }
  .box {
    width: 400px;

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }
  }
</style>

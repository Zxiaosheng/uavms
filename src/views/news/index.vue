<template>
  <div class="app-container">
      <div class="filter-container">
        <el-input v-model="listQuery.title" :placeholder="$t('news.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="getList" />
        <el-date-picker v-model="listQuery.date" type="datetime" :placeholder="$t('news.date')" />
        <el-select v-model="listQuery.type" value-key="id" @change="getList" :placeholder="$t('news.newsType')" clearable class="filter-item" style="width: 130px">
          <el-option v-for="item in newsType" :key="item.typeName" :label="item.typeName" :value="item.id" />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
          {{ $t('table.search') }}
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('table.add') }}
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          {{ $t('table.export') }}
        </el-button>
      </div>
      <el-table :data="pageData" v-loading="listLoading" border  style="width: 100%;text-align: center">

        <el-table-column prop="id" :label="$t('news.id')" sortable  width="80"></el-table-column>

        <el-table-column prop="date" :label="$t('news.date')"sortable width="110"></el-table-column>

        <el-table-column prop="newsType.typeName" sortable :label="$t('news.newsType')" width="110"></el-table-column>

        <el-table-column prop="title" :label="$t('news.title')" sortable width="100"></el-table-column>

        <el-table-column prop="content" :label="$t('news.content')"  ></el-table-column>

        <el-table-column prop="read" sortable label="热度"  width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.read | hotFilter()">{{scope.row.read}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <!--<el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">-->
              <!--{{ $t('table.publish') }}-->
            <!--</el-button>-->
            <!--<el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">-->
              <!--{{ $t('table.draft') }}-->
            <!--</el-button>-->
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
              {{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--编辑弹出窗-->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm"  :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
          <el-form-item :label="$t('news.id')" prop="id">
            <el-date-picker v-model="temp.id" placeholder="Please pick a date" />
          </el-form-item>
          <el-form-item :label="$t('news.newsType')" prop="newsType">
            <el-select v-model="temp.newsType.typeName" class="filter-item" placeholder="Please select">
              <el-option v-for="item in newsType"  :key="item.typeName" :label="item.typeName" :value="item.typeName"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('news.date')" prop="date">
            <el-date-picker v-model="temp.date" type="datetime" placeholder="Please pick a date" />
          </el-form-item>
          <el-form-item :label="$t('news.title')" prop="title">
            <el-input v-model="temp.title" />
          </el-form-item>
          <el-form-item :label="$t('news.content')">
            <el-input v-model="temp.content" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary" @click="updateData()">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    <!--新增弹出窗-->
    <el-dialog title="新增" :visible.sync="dialogFormAdd">
      <el-form ref="AddForm"   :model="addtemp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <!--<el-form-item  prop="id">-->
          <!--<el-date-picker v-model="addtemp.id" placeholder="Please pick a date" />-->
        <!--</el-form-item>-->
        <el-form-item  :label="$t('news.newsType')" prop="newsType">
          <el-select v-model="addtemp.newsType.typeName" class="filter-item" placeholder="Please select">
            <el-option v-for="item in newsType"  :key="item.typeName" :label="item.typeName" :value="item.typeName"/>
          </el-select>
        </el-form-item>
        <!--<el-form-item :label="$t('news.date')"  prop="date">-->
          <!--<el-date-picker v-model="addtemp.date" type="datetime" placeholder="Please pick a date" />-->
        <!--</el-form-item>-->
        <el-form-item :label="$t('news.title')"  prop="title">
          <el-input v-model="addtemp.title" />
        </el-form-item>
        <el-form-item :label="$t('news.content')" >
          <el-input v-model="addtemp.content" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item  label="热度" prop="read">
        <el-input v-model="addtemp.read"  />
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAdd = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="addData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
  import { fetchNewsList,updateNews,createNews } from '@/api/news'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
        name: "index",
        components: { Pagination },
        directives: { waves },
        filters: {
          //对热度数据进行过滤，生成不同颜色的标签
          hotFilter(hot) {
            return hot>=200 ? 'danger' : (hot>=100 ? 'waring' : 'success');
          },
          typeFilter(type) {
            return newsType[type]
          }
        },
        data(){
          return{
            list:[],
            dialogFormVisible: false,
            dialogFormAdd:false,
            dialogStatus: '',
            listLoading:false,
            total: 0,
            pageData:[],
            newsType:[{id:1,typeName:'时政新闻'},{id:2,typeName:'财经新闻'},{id:3,typeName:'时事热点'}],
            textMap: {
              update: 'Edit',
              create: 'Create'
            },
            temp: {
              id: undefined,
              date: new Date(),
              title: '',
              newsType: [{id:1,typeName:'时政新闻'}]
            },
            addtemp: {
              id: undefined,
              date: '',
              title: '',
              read:'',
              newsType: [{id:1,typeName:'时政新闻'}]
            },
            listLoading: true,
            listQuery: {
              page: 1,
              limit: 20,
              date: undefined,
              title: undefined,
              type: undefined,

            },
            downloadLoading: false
          }
        },
        mounted(){
          this.listLoading=true;
          //首次挂载列表组件
          fetchNewsList(this.listQuery).then(response => {
            this.list = response.data.items
            this.total = response.data.total
            this.getList();
            //关闭加载框
            this.listLoading=false;
          })
        },
        methods:{
          getList() {
            this.listLoading = true;
            let{page,limit,title,date,type}=this.listQuery;

            let fiterData=this.list.filter(item=>{
              if (date && item.date !== date) return false
              if (type && item.newsType.id !== type) return false
              if (title && item.title.indexOf(title) < 0) return false
              return true
            })

            this.pageData=fiterData.filter((item,index)=>{
              return index<page*limit && index>=limit*(page-1)
            });
          },
          handleFilter() {
            this.listQuery.page = 1
            this.getList()
          },
          handleUpdate(row) {
            this.temp = Object.assign({}, row) // copy obj
            // this.temp.timestamp = new Date(this.temp.timestamp)
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
          },
          handleCreate() {
            this.dialogFormAdd = true
            // this.$nextTick(() => {
            //   this.$refs['dataForm'].clearValidate()
            // })
          },
          addData() {
            this.$refs['AddForm'].validate((valid) => {
              if (valid) {
                let time=new Date();
                this.addtemp.id = parseInt(Math.random() * 100) + 1024 // mock a id
                this.addtemp.date=time.getFullYear()+"-"+time.getMonth()+1+"-"+time.getDay()
                createNews(this.addtemp).then(() => {
                  this.pageData.unshift(this.addtemp)
                  this.dialogFormAdd = false
                  this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                  })
                  // this.addtemp.title=''
                  // this.addtemp.content=''
                  // this.addtemp.read=''
                })
              }
            })
          },
          updateData() {
            this.$refs['dataForm'].validate((valid) => {
              if (valid) {
                const tempData = Object.assign({}, this.temp)
                // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                updateNews(tempData).then(() => {
                  for (const v of this.pageData) {
                    if (v.id === this.temp.id) {
                      const index = this.pageData.indexOf(v)
                      this.pageData.splice(index, 1, this.temp)
                      break
                    }
                  }
                  this.dialogFormVisible = false
                  this.$notify({
                    title: '成功',
                    message: '更新成功',
                    type: 'success',
                    duration: 2000
                  })
                })
              }
            })
          },
          handleModifyStatus(row, status) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            row.status = status
          },
          handleDelete(row) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            const index = this.pageData.indexOf(row)
            this.pageData.splice(index, 1)
          },
          handleDownload() {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
              const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
              const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
              const data = this.formatJson(filterVal, this.list)
              excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: 'table-list'
              })
              this.downloadLoading = false
            })
          },
        }
    }
</script>

<style scoped>

</style>

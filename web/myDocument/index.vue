<template>
  <div class="app-container">
    <!--搜索栏-->
    <el-row gutter="5">
      <el-col :span="2">
        <el-button @click="singleFormDialog=true" type="primary">新增文档</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="dialogFormVisible=true">新增多个文档</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="danger">删除文档</el-button>
      </el-col>
      <el-col :span="4">
        <el-select v-model="value" placeholder="请选择搜索项目">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          type="text"
          maxlength="20"
          v-model="input">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle>
      </el-button></el-col>
    </el-row>

    <el-dialog title="新建单个文档" :visible.sync="singleFormDialog" center="true">
      <el-form ref="formSingle" :model="formSingle">
        <el-form-item label="上下文">
          <el-input v-model="formSingle.context"></el-input>
        </el-form-item>
        <el-form-item label="文档类型">
          <el-select v-model="formSingle.type" placeholder="请选择类型">
            <el-option label="类型一" value="1"></el-option>
            <el-option label="类型二" value="2"></el-option>
            <el-option label="类型三" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择模板">
          <el-select v-model="formSingle.model" placeholder="请选择模板">
            <el-option label="不选择" value="0"></el-option>
            <el-option label="模板一" value="1"></el-option>
            <el-option label="模板二" value="2"></el-option>
            <el-option label="模板三" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件">
          <el-row>
            <el-col :span="4">
              <el-button>上传文件</el-button>
            </el-col>
            <el-col :span="2">
              <el-button>删除</el-button>
            </el-col>
          </el-row>
          <el-table 
            :data="files"
            style="width:100%">
            <el-table-column
              type="selection"
              align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              label="文件名称">
            </el-table-column>
            <el-table-column
              prop="lacation"
              label="文件位置">
            </el-table-column>
            <el-table-column
              type="radio"
              label="设置主文件">
            </el-table-column>
            <el-table-column
              prop="file_secrecy"
              label="文件密级">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="文档名称">
          <el-input v-model="formSingle.name"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formSingle.id"></el-input>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formSingle.state" placeholder="请选择阶段">
            <el-option label="阶段一" value="1"></el-option>
            <el-option label="阶段二" value="2"></el-option>
            <el-option label="阶段三" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密级">
          <el-select v-model="formSingle.secrecy" placeholder="请选择保密等级">
            <el-option label="低" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="高" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编制单位">
          <el-select v-model="formSingle.company" placeholder="请选择">
            <el-option label="单位一" value="1"></el-option>
            <el-option label="单位二" value="2"></el-option>
            <el-option label="单位三" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="formSingle.major" placeholder="请选择">
            <el-option label="专业一" value="1"></el-option>
            <el-option label="专业二" value="2"></el-option>
            <el-option label="专业三" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文档位置">
          <el-input v-model="formSingle.locate"></el-input>
        </el-form-item>
        <el-form-item label="文档页数">
          <el-input v-model="formSingle.page"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formSingle.tip"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="singleFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="singleFormDialog = false">提 交</el-button>
      </span>
    </el-dialog>

    
    <el-dialog title="新建多个文档" :visible.sync="dialogFormVisible" id="createLots">
      <el-form ref="formLots" :model="formLots">
        <el-form-item label="上下文">
          <el-input v-model="formLots.context"></el-input>
        </el-form-item>
        <el-form-item label="文档类型">
          <el-select v-model="formLots.type" placeholder="请选择类型">
            <el-option label="类型一" value="1"></el-option>
            <el-option label="类型二" value="2"></el-option>
            <el-option label="类型三" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formLots.state" placeholder="请选择阶段">
            <el-option label="阶段一" value="1"></el-option>
            <el-option label="阶段二" value="2"></el-option>
            <el-option label="阶段三" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密级">
          <el-select v-model="formLots.secrecy" placeholder="请选择保密等级">
            <el-option label="低" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="高" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编制单位">
          <el-select v-model="formLots.company" placeholder="请选择">
            <el-option label="单位一" value="1"></el-option>
            <el-option label="单位二" value="2"></el-option>
            <el-option label="单位三" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="formLots.major" placeholder="请选择">
            <el-option label="专业一" value="1"></el-option>
            <el-option label="专业二" value="2"></el-option>
            <el-option label="专业三" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文档">
          <el-row>
            <el-col :span="2">
              <el-button>增加</el-button>
            </el-col>
            <el-col :span="2">
              <el-button>删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
      </span>
    </el-dialog>

    

    <el-table 
    stripe="true"
    max-height="500px"
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      fixed="left"
      type="selection"
      width="50"
      align="center">
    </el-table-column>
    <el-table-column
      type="index"
      width="70">
    </el-table-column>
    <el-table-column
      prop="name"
      label="文档名称"
      width="347">
    </el-table-column>
    <el-table-column
      prop="id"
      label="文档编号"
      width="246">
    </el-table-column>
    <el-table-column
      prop="type"
      label="文档类型"
      width="202">
    </el-table-column>
    <el-table-column
      prop="creator"
      label="创建者"
      width="170">
    </el-table-column>
    <el-table-column
      prop="date"
      label="创建日期"
      width="138">,
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="context"
      label="上下文"
      width="138">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      width="250">
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return{
      options:[{
        value:'1',
        label:'文档名称'
      },{
        value:'2',
        label:'文档编号'
      },{
        value:'3',
        label:'文档类型'
      },{
        value:'4',
        label:'创建者'
      },{
        value:'5',
        label:'创建日期'
      },{
        value:'6',
        label:'上下文'
      }
    ],
    dialogFormVisible:false,
    formLots:{
      context:'',
      type:'',
      state:'',
      secrecy:'',
      company:''
    },
    singleFormDialog:false,
    formSingle:{
      context:'',
      type:'',
      model:'',
      name:'',
      id:'',
      state:'',
      secrecy:'',
      company:'',
      major:'',
      locate:'',
      page:'',
      tip:''
    },
    input:'',
      tableData:[{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无'
      }]
    }
  },
  methods:{
    jumpToDetail(){
      this.$router.push('/detail')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
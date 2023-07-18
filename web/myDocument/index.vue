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
        <el-button type="danger" @click="deleteDocument(selection)">删除文档</el-button>
      </el-col>
      <el-col :span="4">
        <el-select v-model="searchSelect" placeholder="请选择搜索项目" @change="$forceUpdate()">
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
        <el-button icon="el-icon-search" circle @click="search">
      </el-button></el-col>
    </el-row>

    <!--新建单个文档表单-->
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
          <!--
          <el-row>
            <el-col :span="4">
              <el-button>上传文件</el-button>
            </el-col>
            <el-col :span="2">
              <el-button>删除</el-button>
            </el-col>
          </el-row>
          <el-table 
            :data="formSingle.files"
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
          -->
          <template>
            <AspUpload ref="upload" :fileList='attachmentVos'
            v-model="fileList" text="上传" :drag="false"
            :showFileList="true"></AspUpload>
          </template>
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
        <el-button type="primary" @click="addSingleDocument(),singleFormDialog = false,refresh()">提 交</el-button>
      </span>
    </el-dialog>

    
    <!--新建多文档表单-->
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
          <template>
            <el-row>
              <el-col :span="3">
                <el-button @click="addDocumentDetail">增加</el-button>
              </el-col>
              <el-col :span="3">
                <el-button @click="deleteDocumentDetail(selection)">删除</el-button>
              </el-col>
            </el-row>
            <el-table
            :data="documentDetail"
            style="width: 100%;"
            @selection-change="handleAddDocumentSelectionChange"
            id="documentAdd">
              <el-table-column
                type="selection"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="id"
                label="编号">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.id"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="model"
                label="模板">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.model">
                    <el-option label="不选择" value="0"></el-option>
                    <el-option label="模板一" value="1"></el-option>
                    <el-option label="模板二" value="2"></el-option>
                    <el-option label="模板三" value="3"></el-option>
                  </el-select>
                </template>
              </el-table-column>
                
              <el-table-column
                prop="file"
                label="文件">
                <template slot-scope="scope">
                  <AspUpload ref="upload" :fileList='attachmentVos'
                  v-model="scope.row.file" text="上传" :drag="false"
                  :showFileList="true"></AspUpload>
                </template>
              </el-table-column>

              <el-table-column
                prop="locate"
                label="文档位置">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.locate"></el-input>
                </template>
              </el-table-column>

              <el-table-column
                prop="page"
                label="页数">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.page"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
      </span>
    </el-dialog>

    

    <!--列表页面表格-->
    <el-table 
    stripe="true"
    max-height="500px"
    ref="multipleTable"
    v-loading="loading"
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleDocumentListSelectionChange">
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
      <template slot-scope="scope">
        <p class="text" @click="jumpToDetail(scope.row.id)">{{ scope.row.name }}</p>
      </template>
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
  <div style="text-align:center">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import Elinneritem from '@/components/Elinneritem.vue'
import AspDev from '@/utils/aspdev'
const {AspUpload} = AspDev
class document{
  constructor(name,id,state,secrecy,company,major,locate,page,context,type,fileList){
    this.name = name;
    this.id = id;
    this.state = state;
    this.secrecy = secrecy;
    this.company = company;
    this.major = major;
    this.locate = locate;
    this.page = page;
    this.context = context;
    this.type = type;
    this.fileList = fileList;
  }
}
export default {
  components: { 
    Elinneritem,
    AspUpload
   },
  data(){
    return{
      attachmentVos:[],
      fileList:[],
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
    searchSelect:'',
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
    documentDetail:[],
    currentPage:1,
    pageSize:9,
    total:16,
    loading:false,
    tableData:[{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      },{
        name:'测试文档',
        id:'t-1-1',
        type:'1',
        creator:'行一',
        date:'2023-7-15',
        context:'上下文',
        remark:'无',
        url:''
      }]
    }
  },
  methods:{
    jumpToDetail(id){
      this.$router.push({
        path: '/detail', query: {
          id: id
        }
      })
    },
    getData(){
      //从后端获取文档
    },
    addDocumentDetail(){
      this.documentDetail.push({
        name:'',
        id:'',
        model:'',
        file:[],
        locate:'',
        page:''
      })
    },
    handleAddDocumentSelectionChange(selection){
      this.selectNum = selection.length;
      this.selection = selection;
      console.log(selection);
    },
    deleteDocumentDetail(selection){
      var documents = this.documentDetail;
      console.log(documents);
      console.log(selection);
      for(var i = 0;i<selection.length;i++){
        for(var j = 0;j<documents.length;j++){
          if(selection[i].id == documents[j].id){
            this.documentDetail.splice(j,1);
            break;
          }
        }
      }
    },
    addSingleDocument(){
      //获取formSingle数据
      var document = this.formSingle;
      var fileList = this.fileList;
      //提交后端

    },
    addDocuments(){
      //获取formLots数据和documentDetail组合
      let documents = new Array();
      var documentDetails = this.documentDetail;
      let commonDetail = this.formLots;
      for(var i = 0;i<documentDetails.length;i++){
        var documentDetail = documentDetails[i];
        documents[i] = new document(documentDetail.name,
          documentDetail.id,commonDetail.state,commonDetail.secrecy,commonDetail.company,
          commonDetail.major,documentDetail.locate,documentDetail.page,commonDetail.context,commonDetail.type,documentDetail.file);
      }
      //循环向后端添加
    },
    handleCurrentChange(currentPage){
      this.currentPage=currentPage;
    },
    deleteDocument(selection){
      //删除
      for(var i = 0;i<selection.length;i++){
        //逐个删除
      }
      this.refresh();
    },
    handleDocumentListSelectionChange(selection){
      this.selectNum = selection.length;
      this.selection = selection;
      console.log(selection);
    },
    refresh(){
      //刷新页面函数
      location.reload();
    },
    search(way,target){
      switch(way){
        case '1':
          //按照名称查
          break;
        case '2':
          //按编号
          break;
        case '3':
          //按类型
          break;
        case '4':
          //按创建者
          break;
        case '5':
          //按日期
          break;
        case '6':
          //按上下文
      }
      this.refresh();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
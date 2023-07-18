<template>
  <div class="child1">
    <br>
    文件
    <i class="el-icon-caret-bottom"></i><br/><br/>
    <el-link type="primary"><i class="el-icon-download"></i></el-link>
    下载<br/><br/>
    <el-table
      :data="tableData0"
      ref="multipleTable"
      border
      style="width: 100%">
      <el-table-column
        prop="name1"
        label="序号"
        type="index"
        width="138">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.name1" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name3"
        label="文件名或标签"
        width="138">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.name3" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name3}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name4"
        label="密级"
        width="138">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.name4" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name4}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name5"
        label="主文件"
        width="138">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.name5" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name5}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name6"
        label="修改者"
        width="138">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.name6" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name6}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name7"
        label="修改时间"
        width="138">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.name7" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name7}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name8"
        label="格式"
        width="138">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.name8" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name8}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name9"
        label="文件大小"
        width="138">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.name9" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name9}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row, scope)">编辑</el-button>
          <el-button type="danger" @click="save(scope.row)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>属性
    <i class="el-icon-caret-bottom"></i><br/><br/>
    <el-table
    :data="tableData1"
    border
    style="width: 100%"
    :show-header="false">
    <el-table-column
      prop="1"
      label="1"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name2"
      label="2"
      width="180">
      <template slot-scope="scope">
          <input type="text" v-model="scope.row.name2" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name2}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="3"
      label="3">
    </el-table-column>
    <el-table-column
      prop="name4"
      label="4">
      <template slot-scope="scope">
          <input type="text" v-model="scope.row.name4" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name4}}</span>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row, scope)">编辑</el-button>
          <el-button type="danger" @click="save(scope.row)">保存</el-button>
        </template>
      </el-table-column>
  </el-table>
    <br>业务<br/>
    <br/>
    <el-table
    :data="tableData2"
    border
    style="width: 100%"
    :show-header="false">
    <el-table-column
      prop="1"
      label="1"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name2"
      label="2"
      width="180">
      <template slot-scope="scope">
          <input type="text" v-model="scope.row.name2" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name2}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="3"
      label="3">
    </el-table-column>
    <el-table-column
      prop="name4"
      label="4">
      <template slot-scope="scope">
          <input type="text" v-model="scope.row.name4" v-show="scope.row.iseditor" />
          <span v-show="!scope.row.iseditor">{{scope.row.name4}}</span>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="success" @click="edit(scope.row, scope)">编辑</el-button>
          <el-button type="danger" @click="save(scope.row)">保存</el-button>
        </template>
      </el-table-column>
  </el-table>

  </div>
  </template>
  
  <script>
    export default {
      name: 'child1',
      data() {
        return {
          tableData0:[{
            name1:'1',
            name3:'文件名',
            name4:'公开',
            name5:'是',
            name6:'李四',
            name7:'2023.7.17',
            name8:'word',
            name9:'71.5KB',
            iseditor: false
          }],
          tableData1:[{
            1:'编号:',
            3:'名称',
            iseditor: false
          },{
            1:'类型:',
            3:'工作状态:',
            iseditor: false
          },
          {
            1:'状态:',
            3:'版本:',
            iseditor: false
          },
          {
            1:'备注:',
            3:'检入备注:',
            iseditor: false
          }
        ],
        tableData2:[{
            1:'型号代号:',
            3:'产品代号',
            iseditor: false
          },{
            1:'阶段:',
            3:'密级:',
            iseditor: false
          },
          {
            1:'专业:',
            3:'是否评审:',
            iseditor: false
          },
          {
            1:'编制单位:',
            3:'编制人:',
            iseditor: false
          }
        ]

        }
      },methods: {
    edit(row, index) {
      row.iseditor = true;
    },
    save(row, index) {
      row.iseditor = false;
    }}
  }
  </script>
<template>
    <div class="child2">
     <br>
    参考文档
    <i class="el-icon-caret-bottom"></i><br/><br/>
    <el-button type="primary" icon="el-icon-check">新建文档</el-button>
    <el-button type="primary" icon="el-icon-edit">添加文档</el-button>
    <el-button type="primary" icon="el-icon-delete">粘贴</el-button>
    <el-button type="primary" icon="el-icon-search">复制</el-button>
    <el-table
      :data="tableData0"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%">
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
        prop="1"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="2"
        label="工作状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="3"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="4"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="5"
        label="名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="6"
        label="版本"
        width="100">
      </el-table-column>
      <el-table-column
        prop="7"
        label="创建时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="8"
        label="创建人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="9"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="10"
        label="上下文"
        width="100">
      </el-table-column>
    </el-table>
    <br>
    被参考文档
    <i class="el-icon-caret-bottom"></i><br/><br/>
    <el-table
      :data="tableData1"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%">
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
        prop="1"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="2"
        label="工作状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="3"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="4"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="5"
        label="名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="6"
        label="版本"
        width="100">
      </el-table-column>
      <el-table-column
        prop="7"
        label="创建时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="8"
        label="创建人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="9"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="10"
        label="上下文"
        width="100">
      </el-table-column>
    </el-table>
    <br>
    参考方部件
    <i class="el-icon-caret-bottom"></i><br/><br/>
    <el-button type="primary" icon="el-icon-check">添加部件</el-button>
    <el-button type="primary" icon="el-icon-edit">新建部件</el-button>
    <el-button type="primary" icon="el-icon-delete">新建多个部件</el-button>
    <el-button type="primary" icon="el-icon-search">移除部件</el-button>
    <el-button type="primary" icon="el-icon-edit">复制</el-button>
    <el-button type="primary" icon="el-icon-delete">从剪贴板粘贴</el-button>
    <el-button type="primary" icon="el-icon-search">选择粘贴</el-button>
    <el-table
      :data="tableData2"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%">
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
        prop="1"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="2"
        label="工作状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="3"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="4"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="5"
        label="名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="6"
        label="版本"
        width="100">
      </el-table-column>
      <el-table-column
        prop="7"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="8"
        label="上下文"
        width="100">
      </el-table-column>
      <el-table-column
        prop="9"
        label="上次修改时间"
        width="100">
      </el-table-column>
    </el-table>
    <br>
    说明方部件
    <i class="el-icon-caret-bottom"></i><br/><br/>
    <el-button type="primary" icon="el-icon-check">添加部件</el-button>
    <el-button type="primary" icon="el-icon-edit">新建部件</el-button>
    <el-button type="primary" icon="el-icon-delete">新建多个部件</el-button>
    <el-button type="primary" icon="el-icon-search">移除部件</el-button>
    <el-button type="primary" icon="el-icon-edit">复制</el-button>
    <el-button type="primary" icon="el-icon-delete">从剪贴板粘贴</el-button>
    <el-button type="primary" icon="el-icon-search">选择粘贴</el-button>
    <el-table
      :data="tableData3"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%">
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
        prop="1"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="2"
        label="工作状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="3"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="4"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="5"
        label="名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="6"
        label="版本"
        width="100">
      </el-table-column>
      <el-table-column
        prop="7"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="8"
        label="上下文"
        width="100">
      </el-table-column>
      <el-table-column
        prop="9"
        label="上次修改时间"
        width="100">
      </el-table-column>
    </el-table>
</div>
  </template>
<script>
export default {
  name: 'child2',
  data() {
    return {
    }
  }
}
</script>
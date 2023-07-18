<template>
  <div class="tabZujian">
    <br> 文件名
    <el-button type="primary" icon="el-icon-check" name="sign" >签署</el-button>
    <el-button type="primary" icon="el-icon-delete">添加至</el-button>
    <el-button type="primary" icon="el-icon-search" name="delete" >删除</el-button>
    <el-button type="primary">送审<i class="el-icon-upload el-icon--right"></i></el-button>
    <el-button type="primary" icon="el-icon-search" @click="open">检入检出</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="详细信息" name="1" ></el-tab-pane>
    <child1  v-if="isChildUpdate1"></child1>
    <el-tab-pane label="相关对象" name="2"></el-tab-pane>
    <child2 v-if="isChildUpdate2"></child2>
    <el-tab-pane label="借用" name="3"></el-tab-pane>
    <child3  v-if="isChildUpdate3"></child3>
    <el-tab-pane label="专业把关" name="4"></el-tab-pane>
    <child4  v-if="isChildUpdate4"></child4>
    <el-tab-pane label="流程" name="5"></el-tab-pane>
    <child5  v-if="isChildUpdate5"></child5>
    <el-tab-pane label="函审" name="6"></el-tab-pane>
    <child6  v-if="isChildUpdate6"></child6>
    <el-tab-pane label="发放" name="7"></el-tab-pane>
    <child7  v-if="isChildUpdate7"></child7>
    <el-tab-pane label="历史记录" name="8"></el-tab-pane>
    <child8  v-if="isChildUpdate8"></child8>
    <el-tab-pane label="内容结构" name="9"></el-tab-pane>
    <child9  v-if="isChildUpdate9"></child9>
  </el-tabs>
</div>
</template>



<script>
  import docmentdetail from './docmentdetail.vue'
  import docrelated from './docrelated.vue'
  import docborrow from './docborrow.vue'
  import docprofessional from './docprofessional.vue'
  import docprocess from './docprocess.vue'
  import doccorrespondence from './doccorrespondence.vue'
  import docIssue from './docIssue.vue'
  import doccontent from './doccontent.vue'
  import dochistory from './dochistory.vue'
  export default {
    name: 'tabZujian',
    components: {
      child1: docmentdetail,
      child2: docrelated,
      child3: docborrow,
      child4: docprofessional,
      child5: docprocess,
      child6: doccorrespondence,
      child7: docIssue,
      child8: dochistory,
      child9: doccontent
    },
    data () {
      return {
        // 默认第一个选项卡
        activeName: '1',
// 初始化两个变量 isChildUpdate1:true，isChildUpdate2:false；
// 使用v-if控制child1和child2是否渲染。
// 每次切换tab选项的时候，触发事件。让当前点击的tab变量设置位true，让当前组件重新渲染。
// 这时候当你来回切换的时候，通过v-if判断是否重新渲染当前组件
        isChildUpdate1: true,
        isChildUpdate2: false,
        isChildUpdate3: false,
        isChildUpdate4: false,
        isChildUpdate5: false,
        isChildUpdate6: false,
        isChildUpdate7: false,
        isChildUpdate8: false,
        isChildUpdate9: false
      }
    },
  mounted() {
    console.log(this.$route.query)
  },methods: {
      handleClick (tab) {
        if (tab.name === '1') {
          this.isChildUpdate1 = true
          this.isChildUpdate2 = false
          this.isChildUpdate3 = false
          this.isChildUpdate4 = false
          this.isChildUpdate5 = false
          this.isChildUpdate6 = false
          this.isChildUpdate7 = false
          this.isChildUpdate8 = false
          this.isChildUpdate9 = false
        } else if (tab.name === '2') {
          this.isChildUpdate1 = false
          this.isChildUpdate2 = true
          this.isChildUpdate3 = false
          this.isChildUpdate4 = false
          this.isChildUpdate5 = false
          this.isChildUpdate6 = false
          this.isChildUpdate7 = false
          this.isChildUpdate8 = false
          this.isChildUpdate9 = false
        }else if (tab.name === '3') {
          this.isChildUpdate1 = false
          this.isChildUpdate2 = false
          this.isChildUpdate3 = true
          this.isChildUpdate4 = false
          this.isChildUpdate5 = false
          this.isChildUpdate6 = false
          this.isChildUpdate7 = false
          this.isChildUpdate8 = false
          this.isChildUpdate9 = false
        }else if (tab.name === '4') {
          this.isChildUpdate1 = false
          this.isChildUpdate2 = false
          this.isChildUpdate3 = false
          this.isChildUpdate4 = true
          this.isChildUpdate5 = false
          this.isChildUpdate6 = false
          this.isChildUpdate7 = false
          this.isChildUpdate8 = false
          this.isChildUpdate9 = false
        }else if (tab.name === '5') {
          this.isChildUpdate1 = false
          this.isChildUpdate2 = false
          this.isChildUpdate3 = false
          this.isChildUpdate4 = false
          this.isChildUpdate5 = true
          this.isChildUpdate6 = false
          this.isChildUpdate7 = false
          this.isChildUpdate8 = false
          this.isChildUpdate9 = false
        }else if (tab.name === '6') {
          this.isChildUpdate1 = false
          this.isChildUpdate2 = false
          this.isChildUpdate3 = false
          this.isChildUpdate4 = false
          this.isChildUpdate5 = false
          this.isChildUpdate6 = true
          this.isChildUpdate7 = false
          this.isChildUpdate8 = false
          this.isChildUpdate9 = false
        }else if (tab.name === '7') {
          this.isChildUpdate1 = false
          this.isChildUpdate2 = false
          this.isChildUpdate3 = false
          this.isChildUpdate4 = false
          this.isChildUpdate5 = false
          this.isChildUpdate6 = false
          this.isChildUpdate7 = true
          this.isChildUpdate8 = false
          this.isChildUpdate9 = false
        }else if (tab.name === '8') {
          this.isChildUpdate1 = false
          this.isChildUpdate2 = false
          this.isChildUpdate3 = false
          this.isChildUpdate4 = false
          this.isChildUpdate5 = false
          this.isChildUpdate6 = false
          this.isChildUpdate7 = false
          this.isChildUpdate8 = true
          this.isChildUpdate9 = false
        }else if (tab.name === '9') {
          this.isChildUpdate1 = false
          this.isChildUpdate2 = false
          this.isChildUpdate3 = false
          this.isChildUpdate4 = false
          this.isChildUpdate5 = false
          this.isChildUpdate6 = false
          this.isChildUpdate7 = false
          this.isChildUpdate8 = false
          this.isChildUpdate9 = true
        }
      },
      open() {
        const h = this.$createElement;
        this.$msgbox({
          title: '检入/检出',
          message: h('p', null, [
            h('span', null, '请选择文档状态'),
            h('i', { style: 'color: CornflowerBlue' }, '检入/检出')
          ]),
          showCancelButton: true,
          confirmButtonText: '检入',
          cancelButtonText: '检出',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 800);

            } else {
              instance.cancelButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 800);
            }
          }
        }).then(() => {
          this.$message({
            type: 'warning',
            message: '检入成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '检出成功!'
          });  
        });     
      }
    }
  }
</script>

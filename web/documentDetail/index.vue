<template>
   <div class="app-container">
    文档详情
    <button @click="gotolink" class="btn btn-success">点击跳转页面</button>
</div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
  gotolink(){
    
    this.$router.push('123')
    //this.$router.replace('\src\views\doc\documentDetail\docDetails.vue')
  }
}
}
</script>

<style lang="scss" scoped>

</style>

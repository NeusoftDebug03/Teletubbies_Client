<template>
  <div>
    <el-row class="center_menu">
      <el-col :span="5"><span class="cursor">首页</span></el-col>
      <el-col :span="5"><span class="cursor" @click="toList()">全部商品</span></el-col>
      <el-col :span="5"><span class="cursor" @click="toList('妈妈专区')">妈妈专区</span></el-col>
      <el-col :span="5"><span class="cursor" @click="toList('宝宝专区')">宝宝专区</span></el-col>
      <el-col :span="4"><span class="cursor" @click="toList('其他')">其他</span></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    toList (productClass = null) {
      this.$router.push({ name: 'List', params: { productClass: productClass } })
    }
  }
}
</script>

<style lang="less" scoped>
  .center_menu {
    height: 30px;
    background-color: #B22222;
    color: #fff;
    padding: 0 100px;
    .el-col {
      text-align: center;
      line-height: 30px;
    }
    z-index: 11;
  }
</style>

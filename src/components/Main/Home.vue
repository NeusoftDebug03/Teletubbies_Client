<template>
  <div>
    <CenterMenu></CenterMenu>
    <el-carousel height="500px" autoplay :interval="3000">
      <el-carousel-item v-for="item in carousel" :key="item">
        <img :src="item" alt="" width="100%" height="100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import CenterMenu from '../module/CenterMenu'
export default {
  data () {
    return {
      carousel: [
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1151671281,921383771&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1949920192,3949342847&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=609115235,2445501389&fm=26&gp=0.jpg'
      ]
    }
  },
  components: { CenterMenu },
  created () {
    if (this.$route.params.isReload) {
      window.location.reload()
    }
  },
  mounted () {
  },
  methods: {
    toList (productClass = null) {
      this.$router.push({ name: 'List', params: { productClass: productClass } })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-carousel__item img {
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel {
    margin: 0 auto;
  }
  .search_container {
    width: 70%;
    height: 140px;
    margin: 20px auto;
  }
  .search_box {
    height: 100px;
    padding: 50px 0;
  }
  .search_item_list {
    font-size: 12px;
    color: #666666;
    margin-top: 5px;
    span {
      float: left;
      margin-right: 10px;
    }
  }
  .center_menu {
    height: 30px;
    background-color: #B22222;
    color: #fff;
    padding: 0 100px;
    .el-col {
      text-align: center;
      line-height: 30px;
    }
  }
</style>

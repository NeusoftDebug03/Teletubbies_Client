<template>
    <el-container class="home-container">
    <el-header height="10">
      <div>
        <span class="cursor">您好，欢迎来到天线宝宝母婴商城！</span>
      </div>
      <div class="item_list">
        <span class="cursor" v-if="!username" @click="login()">请登录</span>
        <span class="cursor" v-else>用户：{{username}}</span>
        <span class="cursor" @click="toSighUp()" v-if="!username">免费注册</span>
        <span class="cursor" v-else @click="toUserCenter()">个人中心</span>
        <span class="cursor" v-if="username" @click="logout()">退出登录</span>

      </div>
    </el-header>
    <div style="padding-bottom: 60px">
      <el-row class="search_container">
        <el-col :span="8">
          <img src="https://i.loli.net/2020/04/28/vOH2VemzBRGE61T.png" alt="" width="180" height="140" style="float: left;">
        </el-col>
        <el-col :span="16" class="search_box">
          <el-row>
            <el-input placeholder="请输入内容" v-model="searchInput" size="small">
              <el-button slot="append" icon="el-icon-search" size="small" @click="setSearch()"></el-button>
            </el-input>
          </el-row>
          <el-row class="search_item_list">
            <span class="cursor" @click="setSearch('宝妈单肩包')">宝妈单肩包</span>
          <span class="cursor" @click="setSearch('多功能婴儿背带')">多功能婴儿背带</span>
          <span class="cursor" @click="setSearch('宝妈衣服')">宝妈衣服</span>
          <span class="cursor" @click="setSearch('宝妈双肩背包')">宝妈双肩背包</span>
          <span class="cursor" @click="setSearch('婴儿抽纸')">婴儿抽纸</span>
          <span class="cursor" @click="setSearch('婴儿尿不湿')">婴儿尿不湿</span>
          <span class="cursor" @click="setSearch('婴儿床')">婴儿床</span>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="center_menu">
        <el-col :span="5"><span class="cursor" @click="toHome()">首页</span></el-col>
        <el-col :span="5"><span class="cursor" @click="getProductList('')">全部商品</span></el-col>
        <el-col :span="5"><span class="cursor" @click="getProductList('妈妈专区')">妈妈专区</span></el-col>
        <el-col :span="5"><span class="cursor" @click="getProductList('宝宝专区')">宝宝专区</span></el-col>
        <el-col :span="4"><span class="cursor" @click="getProductList('其他')">其他</span></el-col>
      </el-row>
      <el-row class="list_container" :gutter="20">
        <el-col class="itemPrd" :key="item.productId" :span="6" v-for="item in product_list">
          <el-card>
            <img :src="item.productImgPath" alt="" class="itemPic" height="200px">
            <el-row class="product_msg"><span class="item_left">￥ {{item.productPrice}}</span><span class="item_right">{{item.productName}}</span></el-row>
            <el-row>
              <el-button class="item_left" size="mini" type="warning">加入购物车</el-button>
              <el-button class="item_right" size="mini" type="danger" @click="toOrder(item.productId)">立即购买</el-button>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        style="margin-top: 30px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.currentPage"
        :page-sizes="[8, 16, 24, 32]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-container>

</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        currentPage: 1,
        pageSize: 16
      },
      queryInfo2: {
        currentPage: 1,
        pageSize: 16,
        condition: {
          productClass: ''
        }
      },
      total: 100,
      product_list: [],
      productClass: null,
      key: '',
      searchInput: '',
      username: ''
    }
  },
  created () {
    this.username = sessionStorage.getItem('username')
    if (this.$route.params.productClass) {
      this.productClass = this.$route.params.productClass
      this.getProductList(this.productClass)
    } else if (this.$route.params.key) {
      this.key = this.$route.params.key
      this.getProductList(this.key, 1)
    } else {
      this.getProductList()
    }
  },
  methods: {
    toHome () {
      this.$router.push({ name: 'Home', params: {} })
    },
    async getProductList (productClass = '', check = null) {
      if (check) {
        const { data: res } = await this.$http.post('get_key_product_cover', {
          key: productClass
        })
        if (res.code !== '1') {
          return this.$message.error('获取商品列表失败！')
        }
        this.total = res.data.totalNum
        this.product_list = res.data.items
      } else {
        if (productClass) {
          this.queryInfo2.condition.productClass = productClass
          const { data: res } = await this.$http.post('query_product_cover', this.queryInfo2)
          if (res.code !== '1') {
            return this.$message.error('获取商品列表失败！')
          }
          this.total = res.data.totalNum
          this.product_list = res.data.items
        } else {
          const { data: res } = await this.$http.post('query_product_cover', this.queryInfo)
          if (res.code !== '1') {
            return this.$message.error('获取商品列表失败！')
          }
          this.total = res.data.totalNum
          this.product_list = res.data.items
        }
      }
      this.product_list.forEach((item) => {
        if (!item.productImgPath) item.productImgPath = 'https://i0.hdslb.com/bfs/article/dc1ec53d740d3e055c0c165df18c51737d68e837.jpg@1320w_1320h.webp'
        if (item.productImgPath[0] === '1') item.productImgPath = 'https://i0.hdslb.com/bfs/article/dc1ec53d740d3e055c0c165df18c51737d68e837.jpg@1320w_1320h.webp'
      })
    },
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getProductList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getProductList()
    },
    toOrder (productId) {
      this.$router.push({ name: 'Order', params: { productId } })
    },
    async setSearch (key) {
      if (key) {
        this.getProductList(key, 1)
      } else {
        if (this.searchInput) this.getProductList(this.searchInput, 1)
        else this.getProductList()
      }
    },
    toSighUp () {
      this.$router.push({ name: 'SignUp', params: {} })
    },
    toUserCenter () {
      this.$router.push({ name: 'UserCenter', params: {} })
    },
    login () {
      this.$router.push({ name: 'Login', params: {} })
    },
    logout () {
      sessionStorage.clear()
      this.username = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .list_container {
    padding: 0 100px;
  }
  .itemPic {
    width: 100%;
  }
  .product_msg {
    width: 100%;
    margin: 10px 0;
  }
  .itemPrd {
    margin-top: 30px;
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
  span {
    cursor: default;
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
  .el-container {
  height: 100%;
  }
  .el-header {
    width: 100%;
    background-color: #F5F5F5;
    display: flex;
    justify-content: space-between;
    padding: 0 100px;
    align-items: center;
    color: #7E8C8D;
    line-height: 25px;
    font-size: 12px;
    > div {
      display: flex;
      align-items: center;
    }
    box-shadow: 0 0 1px rgba(0,0,0,.25);
  }
  .el-main::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .el-main {
    padding: 0;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
  }
  .item_list {
    span {
      margin-left: 20px;
    }
  }
</style>

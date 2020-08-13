<template>
  <div>
    <CenterMenu></CenterMenu>
    <el-row :gutter="80" class="order_container">
      <el-col :span="8">
        <img :src="detail.imgUrl" alt="" width="100%">
      </el-col>
      <el-col :span="16">
        <h2>{{detail.productName}}</h2>
        <el-row class="add_border">简介：{{detail.productIntro}}</el-row>
        <el-row class="add_border">简述：{{detail.productDetails}}</el-row>
        <el-row class="add_border">详述：{{detail.productLangs}}</el-row>
        <el-row class="add_border" v-if="detail.productExtraInfo===null">其他信息：暂无信息</el-row>
        <el-row class="add_border" v-else>其他信息：{{detail.productExtraInfo}}</el-row>
        <el-row class="add_background">价格：<span class="origin_price">{{detail.productPrice}}</span>
          <span class="real_price">{{Math.floor(detail.productPrice*detail.productDiscount*100)/100}}</span></el-row>
        <el-row>数量:
          <el-input-number v-model="count" :min="1" :max="detail.productStock" label="数量" size="mini"></el-input-number>
          库存：{{detail.productStock}}
        </el-row>
        <el-row>
          <el-button type="danger" @click="setBuy()">立即购买</el-button>
          <el-button type="danger">加入购物车</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CenterMenu from '../module/CenterMenu'
export default {
  data () {
    return {
      detail: {},
      count: 0,
      productId: 0
    }
  },
  components: { CenterMenu },
  created () {
    if (this.$route.params.productId) sessionStorage.setItem('orderedProductId', this.$route.params.productId)
    this.productId = sessionStorage.getItem('orderedProductId')
    this.userId = sessionStorage.getItem('userId')
    this.getProductDetail()
  },
  methods: {
    toHome () {
      this.$router.push({ name: 'Home', params: {} })
    },
    async getProductDetail () {
      // console.log(this.productId)
      const { data: res } = await this.$http.post('get_product_detail', {
        productId: this.productId
      })
      if (res.code !== '1') {
        return this.$message.error('获取订单详情失败！')
      }
      this.detail = res.data.product
      this.detail.imgUrl = res.data.imgUrls[0]
      // console.log(this.detail)
    },
    toList (productClass = null) {
      this.$router.push({ name: 'List', params: { productClass: productClass } })
    },
    async setBuy () {
      console.log(this.productId)

      const { data: res } = await this.$http.post('create_order', {
        userId: parseInt(this.userId),
        contents: [
          {
            productId: parseInt(this.productId),
            count: parseInt(this.count)
          }
        ]
      })
      if (res.code !== '1') {
        return this.$message.error(res.msg)
      }
      this.detail.productStock -= this.count
      const balance = sessionStorage.getItem('balance')
      sessionStorage.setItem('balance', balance - res.data.cost)
      console.log(this.detail)
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
  }
  .order_container {
    margin-top: 20px;
    padding: 0 170px;
    padding-bottom: 100px;
  }
  .origin_price {
    text-decoration:line-through
  }
  .real_price {
    color: red;
  }
  .el-row {
    margin: 14px 0;
    text-align: left;
    .el-input-number {
      margin: 0 80px 0 20px;
    }
    .el-button {
      margin-right: 30px;
    }
    span {
      margin-right: 10px;
    }
  }
  .add_border {
    border-bottom: 1px solid #DCDCDC;
  }
  .add_background {
    background-color: #F5F5F5;
  }
</style>

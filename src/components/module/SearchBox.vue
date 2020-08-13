<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchInput: ''
    }
  },
  created () {
  },
  methods: {
    async setSearch (key) {
      if (key) {
        this.$router.push({ name: 'List', params: { key: key } })
      } else {
        if (this.searchInput) this.$router.push({ name: 'List', params: { key: this.setSearch() } })
        else this.$router.push({ name: 'List', params: {} })
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>

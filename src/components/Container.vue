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
    <el-container>
      <el-main>
        <SearchBox></SearchBox>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SearchBox from './module/SearchBox'
export default {
  data () {
    return {
      username: ''
    }
  },
  components: { SearchBox },
  created () {
    this.username = sessionStorage.getItem('username')
  },
  methods: {
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
      this.$router.push({ name: 'Login', params: {} })
    }
  }
}
</script>

<style lang="less" scoped>
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

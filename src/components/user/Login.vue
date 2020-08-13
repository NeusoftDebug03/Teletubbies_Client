<template>
  <div style="width: 100%;height: 100%;">
    <CenterMenu></CenterMenu>
    <el-row class="signup_container">
      <el-card class="signup_box">
        <el-row style="margin-bottom: 20px;"><h3 class="item_left">用户登录</h3></el-row>
        <el-form ref="form" :model="userInfo" label-width="70px" label-position="left">
          <el-form-item label="用户名">
            <el-input v-model="userInfo.username"  size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userInfo.passwd" type="password" size="small"></el-input>
          </el-form-item>
          <el-button class="submit_btn" type="primary" size="small" @click="setLogin()">登录</el-button>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import CenterMenu from '../module/CenterMenu'
export default {
  data () {
    return {
      userInfo: {
        username: '',
        passwd: ''
      }
    }
  },
  components: { CenterMenu },
  created () {
    this.$message.warning('请登录！')
  },
  methods: {
    async setLogin () {
      if (!this.userInfo.username || !this.userInfo.passwd) return this.$message.error('请输入您的用户名和密码！')
      const { data: res } = await this.$http.post('login', this.userInfo)
      if (res.code !== '1') {
        return this.$message.error('登录失败！')
      }
      this.$message.success('登录成功！')
      sessionStorage.setItem('userId', res.data.userId)
      sessionStorage.setItem('username', res.data.username)
      sessionStorage.setItem('phoneNumber', res.data.phoneNumber)
      sessionStorage.setItem('name', res.data.name)
      sessionStorage.setItem('passwd', res.data.passwd)
      sessionStorage.setItem('balance', res.data.balance)
      this.$router.push({ name: 'Home', params: { isReload: true } })
    }
  }
}
</script>

<style lang="less" scoped>
  .signup_container {
    width: 100%;
    height: 100%;
    background-image: url("http://pic1.win4000.com/wallpaper/2020-04-26/5ea54cd330e53.jpg");
    background-size: 100% 100%;
  }
  .signup_box {
    width: 400px;
    margin: 5% 0 0 60%;

    /*transform: translate(-50%, -50%);*/
  }
  .signTitle {
    float: left;
    margin: 0;
  }
</style>

<template>
  <div style="width: 100%;height: 100%;">
    <CenterMenu></CenterMenu>
    <el-row class="signup_container">
      <el-card class="signup_box">
        <el-row style="margin-bottom: 20px;"><h3 class="item_left">用户注册</h3></el-row>
        <el-form ref="form" :model="userInfo" label-width="70px" label-position="left">
          <el-form-item label="昵称">
            <el-input v-model="userInfo.name"  size="small"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="userInfo.username"  size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userInfo.password" type="password" size="small"></el-input>
          </el-form-item>
          <el-form-item label="再次确认">
            <el-input v-model="userInfo.checkPassword" type="password" size="small"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="userInfo.phoneNumber" size="small"></el-input>
          </el-form-item>
          <el-button class="submit_btn" type="primary" size="small" @click="setSignUp()">注册</el-button>
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
        name: '',
        username: '',
        password: '',
        checkPassword: '',
        phoneNumber: ''
      }
    }
  },
  components: { CenterMenu },
  created () {
  },
  methods: {
    async setSignUp () {
      if (!this.userInfo.username || this.userInfo.password !== this.userInfo.checkPassword || !this.userInfo.phoneNumber) return this.$message.error('输入有误，请修正！')
      const { data: res } = await this.$http.post('add_user', {
        name: this.userInfo.name,
        username: this.userInfo.username,
        passwd: this.userInfo.password,
        phoneNumber: this.userInfo.phoneNumber
      })
      if (res.code !== '1') {
        return this.$message.error(res.msg)
      }
      this.$message.success('注册成功！')
      this.$router.push({ name: 'Login', params: {} })
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

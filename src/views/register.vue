<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="userForm" status-icon label-width="80px">
          <router-link to="/"
                       style="text-align: left;
                             font-size: large;
                             color: #ceb924;
                             top: 0px;
                             left: 20px;
                             position: absolute;
                             text-decoration: none;
">{{ $t('message.homepage') }}
          </router-link>
          <lang-select class="set-language" style="
    color: gray;
    width: 15px;
    height: 15px;
    position:absolute;
    right: 50px;
"/>
          <h3>{{ $t('message.register') }}</h3>
          <hr>
          <el-form-item prop="username" :label="$t('message.us')">
            <el-input v-model="userForm.username" :placeholder="$t('message.username')"></el-input>
          </el-form-item>
          <el-form-item prop="email" :label="$t('message.emailandiphonenumber')">
            <el-input v-model="userForm.emailoriphonenumber"
                      :placeholder="$t('message.inputemailandiphonenumber')"></el-input>
          </el-form-item>


          <el-form-item prop="password" :label="$t('message.setpassword')">
            <el-input
                    :type="passwordType"
                    :model="userForm"
                    v-model="userForm.setpassword"
                    autocomplete="on"
                    :placeholder="$t('message.password')"></el-input>
          </el-form-item>
          <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" style="
    color: gray;
    width: 15px;
    height: 29px;
"/>
                    </span>

          <el-form-item prop="password"
                        :label="$t('message.confirmpassword')">
            <el-input
                    :model="userForm"
                    v-model="userForm.confirmpassword"
                    :type="passwordType"
                    autocomplete="on"
                    :placeholder="$t('message.password')"></el-input>
          </el-form-item>
          <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" style="
    color: gray;
    width: 15px;
    height: 159px;
"/>
                    </span>

          <el-form-item>
            <el-button type="primary" icon @click="doRegister()"
                       style="background-color: #DAE2F5; color: gray;">
              {{$t('message.registeraccount')}}
            </el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
    import LangSelect from '@/components/LangSelect'
    import SvgIcon from '@/components/SvgIcon'
    import {MessageBox} from "element-ui";

    export default {
        name: "login",
        components: {SvgIcon, LangSelect},
        data() {
            return {
                userForm: {
                    username: "",
                    emailoriphonenumber: "",
                    setpassword: "",
                    confirmpassword: "",
                },
                passwordType: 'password',
            };
        },
        created() {
            // console.log($);
            // console.log("1111");
        },
        methods: {
            doRegister() {
                if (!this.userForm.username) {
                    this.$msgbox.alert("请输入用户名");
                    return;
                } else if (this.userForm.emailoriphonenumber != null) {
                    if (!this.userForm.emailoriphonenumber) {
                        this.$msgbox.alert("请输入邮箱或手机号");
                    } else if (!this.userForm.setpassword) {
                        this.$msgbox.alert("请输入密码");
                        return;
                    } else if (!this.userForm.confirmpassword) {
                        this.$msgbox.alert("请确认密码");
                    } else if (this.userForm.setpassword !== this.userForm.confirmpassword) {
                        this.$msgbox.alert("密码不一致，请重新输入");
                    } else {
                        this.$store.dispatch("Register", this.userForm)
                                .then(response => {
                                    this.loading = false;
                                    let code = response.data.code;
                                    let message = response.data.message;
                                    if (code == 200) {
                                        MessageBox.alert(message, "注册成功");
                                    } else {
                                        MessageBox.alert(message, "注册失败");
                                    }
                                })
                                .catch(() => {
                                    this.loading = false;
                                });
                    }
                }
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 100%;
    background: url("../image/register.jpg") no-repeat;
    background-size: 100%;
    min-height: 100%;
    overflow: hidden;
    position: absolute;
    font-family: 隶书;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .login-wrap {
    background: #CADD9B;
    background-size: cover;
    width: 450px;
    height: 560px;
    margin: 215px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    left: 300px;
    right: 300px;
    top: -125px;
    opacity: 0.7;
  }

  .show-pwd {
    position: absolute;
    right: 95px;
    top: 260px;
    font-size: 16px;
    color: red;
    cursor: pointer;
    user-select: none;
  }

  h3 {
    color: #0babeab8;
    font-size: 24px;
  }

  hr {
    background-color: #444;
    margin: 20px auto;
  }

  .el-button {
    width: 80%;
    margin-left: -50px;
  }
</style>
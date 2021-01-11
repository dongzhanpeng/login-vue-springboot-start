<template>
  <div class="login-container">
    <el-card class="login-form" :model="loginForm" :rules="loginRules" autocomplete="on" label-position="left">
      <el-form
              autocomplete="on"
              :model="loginForm"
              ref="loginForm"
              label-position="left"
      ><br><br><br>
        <div class="title-container">
          <h2 class="login-title color-main" style="width: 287px">{{ $t('message.starrysky') }}</h2>
          <lang-select class="set-language" style="
    color: gray;
    width: 15px;
    height: 15px;
"/>
        </div>

        <el-form-item prop="username">
                    <span class="svg-container">
                        <svg-icon icon-class="user" style="
    color: indianred;
    width: 15px;
    height: 15px;"/>
                    </span>
          <el-input
                  name="username"
                  type="text"
                  v-model="loginForm.username"
                  autocomplete="on"
                  :placeholder="$t('message.username')"
                  tabindex="1"
                  ref="username"
          />
          <span slot="prefix">
                        <svg-icon icon-class="user" class="color-main"></svg-icon>
                    </span>
        </el-form-item>

        <span class="svg-container">
                        <svg-icon icon-class="password" style="
    color: indianred;
    width: 15px;
    height: 29px;"/>
                    </span>
        <el-form-item prop="password">
          <!--                    <span class="svg-container">-->
          <!--                        <svg-icon icon-class="password"/>-->
          <!--                    </span>-->
          <el-input
                  name="password"
                  :type="passwordType"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.password"
                  autocomplete="on"
                  :placeholder="$t('message.password')"
          />
          <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" style="
    color: gray;
    width: 15px;
    height: 29px;
"/>
                    </span>
        </el-form-item>

        <el-form-item style="margin-bottom: 10px;text-align: center;">
          <el-button
                  style="width: 60%; text-align: center; font-size:x-small"
                  type="primary"
                  :loading="loading"
                  @click.native.prevent="handleLogin"
          >{{ $t('message.login') }}
          </el-button>
        </el-form-item>
        <el-form-item style="margin-bottom: 10px; text-align: center;">
          <el-button
                  style="width: 60%; text-align: center; font-size:x-small"
                  type="primary"
                  :loading="loading"
                  @click.native.prevent="register"
          >{{ $t('message.register') }}
          </el-button>
        </el-form-item>
        <router-link to="forgetpassword"
                     style="text-align: center;
                             font-size: medium;
                             color: orangered;
                             text-decoration: none;
">{{ $t('message.forgetpassword') }}
        </router-link>
      </el-form>
    </el-card>
  </div>
</template>

<script>
    import SvgIcon from '@/components/SvgIcon'
    import LangSelect from '@/components/LangSelect'
    import {MessageBox} from "element-ui";

    export default {
        name: "login",
        components: {SvgIcon, LangSelect},
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!validateUsername(value)) {
                    callback(new Error('Please enter the correct user name'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('The password can not be less than 6 digits'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: "admin",
                    password: "admin"
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                passwordType: 'password',
                capsTooltip: false,
                loading: false,
                showDialog: false,
                redirect: undefined,
                otherQuery: {}
            };
        },
        methods: {
            changeLanguage() {
                if (this.$i18n.locale === "zh") {
                    this.$i18n.locale = "en";
                } else {
                    this.$i18n.locale = 'zh'
                }
            },
            register() {
                this.$router.push({
                    path: "/register",

                });
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store
                            .dispatch("Login", this.loginForm)
                            .then(response => {
                                this.loading = false;
                                let code = response.data.code;
                                let message = response.data.message;
                                if (code == 200) {
                                    this.$router.push({
                                        path: "/success",
                                        query: {data: response.data.data}
                                    });
                                } else {
                                    MessageBox.alert(message, "登陆失败");
                                }
                            })
                            .catch(() => {
                                this.loading = false;
                            });
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("参数验证不合法！");
                        return false;
                    }
                });
            }
        }
    };
</script>


<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FDFDFD;
    border: 1px solid #DCDFE6;
    border-color: #ceb924;
    color: #0c0c0c;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    background: url("../image/homepage.jpg") no-repeat;
    background-size: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    font-family: cursive;

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }

    .login-form {
      position: absolute;
      width: 380px;
      max-width: 100%;
      padding: 60px 45px 20px;
      margin: 0 auto;
      overflow: hidden;
      top: 70px;
      bottom: 60px;
      left: 500px;
      right: 500px;
      opacity: 0.5;
      background-color: #F2F99C;
    }

    .show-pwd {
      position: absolute;
      right: 25px;
      top: 10px;
      font-size: 16px;
      color: red;
      cursor: pointer;
      user-select: none;
    }

    .login-title {
      text-align: center;
      height: 60px;
    }

    .login-center-layout {
      background: green;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      margin-top: 200px;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: paleturquoise;
      vertical-align: middle;
      width: 60px;
      display: inline-block;
    }
  }
</style>

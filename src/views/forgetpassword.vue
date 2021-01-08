<template>
  <div class="forget-container">
    <el-form class="el-formlayout"
             ref="forgetpasswordForm"
             :model="forgetpasswordForm"
             autocomplete="on"
             label-position="left">
      <div style="text-align: center">
        <router-link to="/"
                     style="text-align: left;
                             font-size: x-large;
                             color: #ceb924;
                             top: 20px;
                             left: 50px;
                             position: absolute;
                             text-decoration: none;
">{{ $t('message.homepage') }}
        </router-link>
        <lang-select class="set-language" style="
    color: gray;
    width: 15px;
    height: 15px;
"/>
      </div>
      <h2>{{ $t('message.forgetpasswords') }}</h2>
      <h2>{{ $t('message.resetpassword') }}</h2>
      <div>
        <el-input class="el-input"
                  autocomplete="on"
                  :model="forgetpasswordForm"
                  v-model="forgetpasswordForm.email"
                  :placeholder="$t('message.inputemail')"
                  ref="email"
                  name="email"
                  type="text"
        />&nbsp;&nbsp;<el-button
              class="el-button"
              @click.native.prevent="getcaptcha">{{ $t('message.getcaptcha') }}
      </el-button>
      </div>

      <div style="line-height: 80px;width: 1534px">
        <el-input class="el-input"
                  name="captcha"
                  v-model="forgetpasswordForm.captcha"
                  autocomplete="on"
                  ref="captcha"
                  :placeholder="$t('message.inputcode')"/>&nbsp;&nbsp;<el-button
              class="el-button"
              @click.native.prevent="confirm">{{ $t('message.ensure') }}
      </el-button>
      </div>
      <div>
        <router-link to="messagefind"
                     style="text-align: center;
                             font-size: large;
                             color: orangered;
                             text-decoration: none;
">{{ $t('message.messagefind') }}
        </router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
    import LangSelect from '@/components/LangSelect'

    export default {
        name: "getCaptcha",
        components: {LangSelect},

        data() {
            return {
                forgetpasswordForm: {
                    email: "",
                    captcha: "",
                },
                capsTooltip: false,
                loading: false,
                showDialog: false,
                redirect: undefined,
                otherQuery: {}
            };
        },
        methods: {
            getcaptcha() {
                if (!this.forgetpasswordForm.email) {
                    this.$msgbox.alert("请输入邮箱");
                    return;
                }
                this.$store.dispatch("GetCaptcha", this.forgetpasswordForm)
            },
            confirm(){
                if (!this.forgetpasswordForm.captcha) {
                    this.$msgbox.alert("请输入验证码");
                    return;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
  .forget-container {
    width: 100%;
    background: url("../image/forgetpassword.jpg") no-repeat;
    background-size: 100%;
    min-height: 100%;
    overflow: hidden;
    position: absolute;
    font-family: 隶书;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    .el-formlayout {
      text-align: center;
      font-family: 隶书;

      .title {
        color: salmon;
        font-family: 隶书;
      }

      .el-input {
        type: text;
        width: 220px;
        font-size: medium;
        color: darkslateblue;
        font-family: 隶书;
      }

      .el-button {
        type: text;
        font-size: medium;
        background: #ddeff7;
        color: black;
        width: 120px;
        font-family: 隶书;
      }

      .set-language {
        position: center;
        color: #fff;
        top: 50px;
        left: 300px;
        font-size: 25px;
        cursor: pointer;
      }
    }
  }
</style>
